import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DlgEditCatagoriesComponent } from '../dlg/dlg-edit-catagories/dlg-edit-catagories.component';
import { DlgFixedCostsComponent } from '../dlg/dlg-fixed-costs/dlg-fixed-costs.component';
import { DlgSchemaEditComponent } from '../dlg/dlg-schema-edit/dlg-schema-edit.component';
import { Location } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  initialColorSchema: any = {
    primaryColor: '#575454',
    secondaryColor: '#b4ff28',
    accentColor: 'black',
  };

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private dlg: MatDialog,
    private location: Location
  ) {
    this.localStorageService.userCredentials$.subscribe((credentials) => {
      if (credentials) {
        console.log(credentials);
        this.initialColorSchema = credentials.colorSchema;
        this.isLoggedIn = true; // Set to true when credentials are present
      } else {
        this.initialColorSchema = {
          primaryColor: '#575454',
          secondaryColor: '#b4ff28',
          accentColor: 'black',
        };
        this.isLoggedIn = false; // Set to false when credentials are not present
      }
    });
  }

  logout() {
    this.localStorageService.clearAllLocalStorage();
    this.router.navigate(['/login'], { skipLocationChange: true });
  }

  openCategories() {
    this.dlg.open(DlgEditCatagoriesComponent);
  }

  openColorSchema() {
    this.dlg.open(DlgSchemaEditComponent);
  }

  openFixedCost() {
    this.dlg.open(DlgFixedCostsComponent);
  }

  goAnalytics() {
    this.router.navigate(['/analytics'], { skipLocationChange: true });
  }

  goHome() {
    this.router.navigate(['/home'], { skipLocationChange: true });
  }

  goInvestments() {
    this.router.navigate(['/investments'], { skipLocationChange: true });
  }

  goLogin() {
    this.router.navigate(['/login'], { skipLocationChange: true });
  }
}
