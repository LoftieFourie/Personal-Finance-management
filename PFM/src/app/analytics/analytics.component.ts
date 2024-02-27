import { Component, OnInit, HostListener } from '@angular/core';
import { CostServicesService } from '../services/cost-services.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable, of } from 'rxjs';
import { catchError, concatAll, concatMap, map } from 'rxjs/operators';

interface Cost {
  _id: string | null;
  user_id?: string | null;
  amount: number | null;
  category?: string | null;
  date?: Date | null;
  description?: string | null;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  view: [number, number] = [700, 400];
  chartData: any[] = [];
  id: any;
  isBarChart: boolean = true;
  selectedChartType: string = 'bar';
  lastMonth: boolean = false;
  monthCount: number = 0;
  LongchartData: any[] = [];
  colorScheme: Color = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
  };
  lineChartData: any[] = [];
  isLoggedIn = false;

  gradient: boolean = true; // or any other appropriate value
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  showLineLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'X-Axis Label';
  yAxisLabel: string = 'Y-Axis Label';
  animations: boolean = true;

  constructor(
    private costService: CostServicesService,
    private localStorage: LocalStorageService
  ) {
    this.localStorage.userCredentials$.subscribe((credentials) => {
      this.isLoggedIn = !!credentials; // Check if user credentials are present
    });
  }

  ngOnInit(): void {
    this.adjustViewDimensions();
    if (this.isLoggedIn) {
      this.id = this.localStorage.getUserId();

      this.costService.getMonthCosts(this.id, 0).subscribe(
        (response) => {
          const currentMonthData = response;
          this.chartData = this.processData(currentMonthData);
          // Call longTermData method here, inside the subscription callback
          this.updateLongTermData();
        },
        (error) => {
          console.error('Update User Error:', error);
          // Handle error as needed
        }
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustViewDimensions(); // Call on window resize
  }

  adjustViewDimensions(): void {
    // Adjust view dimensions based on window.innerWidth
    if (window.innerWidth <= 600) {
      this.view = [350, 200]; // Adjust as needed for mobile view
      this.showLegend = false;
    } else {
      this.view = [700, 400]; // Default dimensions for larger screens
    }
  }

  updateChartType(): void {}

  updateLongTermData(): void {
    this.longTermData().subscribe(
      (longTermData) => {
        // Assign the result to lineChartData when data is available
        this.lineChartData = longTermData;

        // Now you can use this.lineChartData for rendering or any further processing
      },
      (error) => {
        console.error('Error fetching long term data:', error);
      }
    );
  }

  processData(data: any[]): any {
    // Implement logic to group costs by category

    let categories: string[] = [];
    let charData: { name: string; value: number }[] = [];

    data.forEach((entry) => {
      const index = categories.indexOf(entry.category);

      if (index !== -1) {
        // Category already exists, update value
        charData[index].value += entry.amount;
      } else {
        // Category doesn't exist, add to categories and charData
        categories.push(entry.category);
        charData.push({ name: entry.category, value: entry.amount });
      }
    });

    return charData;
  }

  longTermData(): Observable<any[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const dataMonth = currentMonth - this.monthCount;
    const dataYear = currentYear - (dataMonth <= 0 ? 1 : 0);

    return this.costService.getMonthCosts(this.id, this.monthCount).pipe(
      concatMap((data) => {
        if (data.length > 0) {
          const processedData = this.processLongTermData(
            data,
            dataMonth,
            dataYear,
            currentDate
          );
          this.LongchartData.push(processedData);
        } else {
          this.lastMonth = true;
        }
        if (!this.lastMonth && this.monthCount < currentMonth) {
          this.monthCount++;
          // Recursively call longTermData and flatten the result using of
          return of(this.longTermData()).pipe(concatAll());
        } else {
          // Return the final result
          return of(this.LongchartData);
        }
      }),
      catchError((error) => {
        console.error('Error fetching previous month data:', error);
        return of([]); // Return an empty array if there's an error
      })
    );
  }

  processLongTermData(
    data: any[],
    month: number,
    year: number,
    currentDate: Date
  ): any {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const formattedMonth = month.toString().padStart(2, '0');
    const monthName = monthNames[month - 1];
    const yearMonth = `${year}-${formattedMonth}`;

    const series: { value: number; name: string }[] = [];
    let accumulatedValue = 0;

    // Use the current day as the end point of the loop
    const currentDay = currentDate.getDate();

    for (let i = 1; i <= 31; i++) {
      if (i > currentDay) {
        // If the loop day is greater than the current day, stop the loop
        break;
      }

      const formattedDay = i.toString().padStart(2, '0');
      const currentEntryDate = `${yearMonth}-${formattedDay}`;

      // Filter entries with the same date
      const matchingEntries = data.filter((entry) => {
        // Convert the database date to the desired format for comparison
        const entryDate = new Date(entry.date).toLocaleDateString('en-CA');
        return entryDate === currentEntryDate;
      });

      // Sum up the amounts for all matching entries
      const dailyValue = matchingEntries.reduce(
        (sum, entry) => sum + entry.amount,
        0
      );
      accumulatedValue += dailyValue;

      series.push({ value: accumulatedValue, name: currentEntryDate });
    }

    return { name: monthName, series };
  }
}
