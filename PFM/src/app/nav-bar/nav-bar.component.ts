import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DlgEditCatagoriesComponent } from '../dlg/dlg-edit-catagories/dlg-edit-catagories.component';
import { DlgFixedCostsComponent } from '../dlg/dlg-fixed-costs/dlg-fixed-costs.component';
import { DlgSchemaEditComponent } from '../dlg/dlg-schema-edit/dlg-schema-edit.component';

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
    private dlg: MatDialog
  ) {
    // Subscribe to changes in user credentials to update login status
    this.localStorageService.userCredentials$.subscribe((credentials) => {
      if (credentials) {
        this.initialColorSchema = credentials.colorSchema;
        this.isLoggedIn = !!credentials; // Check if user credentials are present
      } else {
        this.initialColorSchema = {
          primaryColor: '#575454',
          secondaryColor: '#b4ff28',
          accentColor: 'black',
        };
      }
    });

    if (this.isLoggedIn) {
      this.initialColorSchema = localStorageService.getColorSchema();
    } else {
      this.initialColorSchema = {
        primaryColor: '#575454',
        secondaryColor: '#b4ff28',
        accentColor: 'black',
      };
    }
  }

  logout() {
    this.localStorageService.clearAllLocalStorage();
    this.router.navigate(['/login']);
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
}
