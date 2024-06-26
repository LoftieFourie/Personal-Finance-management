import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { CostServicesService } from '../services/cost-services.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { DlgEditComponent } from '../dlg/dlg-edit/dlg-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DlgViewCostDetailsComponent } from '../dlg/dlg-view-cost-details/dlg-view-cost-details.component';
import { Router } from '@angular/router';
import { DlgDateSelectComponent } from '../dlg/dlg-date-select/dlg-date-select.component';

interface Cost {
  _id: string | null;
  user_id?: string | null;
  amount: number | null;
  category?: string | null;
  date?: Date | null;
  description?: string | null;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('amountInput') amountInputRef!: ElementRef;
  @ViewChild(DlgEditComponent) editDialogComponent!: DlgEditComponent;

  newCost: Cost = { _id: null, amount: null, category: '', description: '' };
  id: any;
  isLoggedIn: boolean = false;
  categories: (string | null)[] = [];
  noCategories: boolean = false;
  loading = false;
  startDate: Date;
  endDate: Date;

  constructor(
    private localStorage: LocalStorageService,
    private costService: CostServicesService,
    private dlg: MatDialog,
    private router: Router
  ) {
    const currentDate = new Date();
    this.endDate = currentDate;
    this.startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );

    this.localStorage.userCredentials$.subscribe((credentials) => {
      this.isLoggedIn = !!credentials; // Check if user credentials are present
    });

    this.localStorage.categories$.subscribe((updatedCategories) => {
      this.categories = updatedCategories;
      this.noCategories = this.categories.length === 0;
    });
  }

  ngAfterViewInit() {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.id = this.localStorage.getUserId();
      this.categories = this.localStorage.getCategories();
      this.retrieveAndStoreOriginalMonthlyCosts();
    }

    this.noCategories = this.categories.length === 0;
  }

  formatDate(date: any): string {
    if (!date) {
      return ''; // Handle null or undefined dates
    }
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return formattedDate.toLocaleDateString('en-US', options);
  }

  retrieveAndStoreOriginalMonthlyCosts() {
    this.loading = true;
    const req = { startDate: this.startDate, endDate: this.endDate };
    this.costService
      .getCostByRange(this.id, req)
      .subscribe(
        (response) => {
          console.log(response);
          this.localStorage.setMonthlyCosts(response);
        },
        (error) => {
          this.localStorage.clearAllLocalStorage();
          this.router.navigate(['/login'], { skipLocationChange: true });
          console.error('Error retrieving monthly costs', error);
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  addCost() {
    this.loading = true;
    this.costService
      .createNewCost(this.id, this.newCost)
      .subscribe(
        (response) => {
          // Clone the object to avoid pushing the reference
          this.localStorage.addMonthlyCost({ ...response });

          // Clear the input fields after adding the cost
          this.newCost = {
            _id: null,
            amount: null,
            category: '',
            description: '',
          };
          this.setFocusOnAmountInput();
        },
        (error) => {
          // Handle error appropriately
          console.error('Error creating new cost', error);
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  selectDate() {
    let dialogRef = this.dlg.open(DlgDateSelectComponent, {
      data: { startDate: this.startDate, endDate: this.endDate },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result);
      this.costService.getCostByRange(this.id, result.data).subscribe(
        (response) => {
          console.log(response);
          this.startDate = result.data.startDate;
          this.endDate = result.data.endDate;
          this.localStorage.setMonthlyCosts(response);
        },
        (error) => {
          // Handle error appropriately
          console.error('Error creating new cost', error);
        }
      );
    });
  }

  setFocusOnAmountInput() {
    // Use timeout to set focus after Angular renders the view
    setTimeout(() => {
      this.amountInputRef.nativeElement.focus();
    });
  }

  get addedCosts(): Cost[] {
    return this.localStorage.getMonthlyCosts();
  }

  getTotalAmount(): number {
    return this.addedCosts.reduce(
      (total, cost) => total + (cost.amount ?? 0),
      0
    );
  }

  editCost(cost: any) {
    let dialogRef = this.dlg.open(DlgEditComponent, {
      data: { cost: cost },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result.action === 'save') {
        this.costService
          .updateCost(this.id, result.data._id, result.data)
          .subscribe(
            (response) => {
              this.setFocusOnAmountInput();
            },
            (error) => {
              // Handle error appropriately
              console.error('Error creating new cost', error);
            }
          );
      }
    });
  }

  deleteCost(costId: any) {
    this.loading = true;
    // Implement delete logic, e.g., remove the cost from the addedCosts array
    this.costService
      .deleteCost(this.id, costId)
      .subscribe(
        (response) => {
          // Remove the deleted cost from the addedCosts array in local storage
          this.localStorage.removeMonthlyCost(costId);
        },
        (error) => {
          // Handle error appropriately
          console.error('Error deleting cost', error);
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  viewDetails(event: MouseEvent, cost: Cost): void {
    if (!(event.target as HTMLElement).classList.contains('actions')) {
      this.dlg.open(DlgViewCostDetailsComponent, {
        data: { cost: cost },
      });
    }
  }
}
