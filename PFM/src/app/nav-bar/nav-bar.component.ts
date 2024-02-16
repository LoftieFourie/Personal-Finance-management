import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DlgEditCatagoriesComponent } from '../dlg/dlg-edit-catagories/dlg-edit-catagories.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isLoggedIn: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private dlg: MatDialog
  ) {
    // Subscribe to changes in user credentials to update login status
    this.localStorageService.userCredentials$.subscribe((credentials) => {
      this.isLoggedIn = !!credentials; // Check if user credentials are present
    });
  }

  navigateTo(route: string) {
    // Implement navigation logic based on the selected option
    if (route === 'fixed-costs') {
      this.router.navigate(['/fixed-costs']);
    } else if (route === 'fixed-investments') {
      this.router.navigate(['/fixed-investments']);
    }
  }

  logout() {
    this.localStorageService.clearAllLocalStorage();
    this.router.navigate(['/login']);
  }

  openCategories() {
    this.dlg.open(DlgEditCatagoriesComponent);
  }
}
