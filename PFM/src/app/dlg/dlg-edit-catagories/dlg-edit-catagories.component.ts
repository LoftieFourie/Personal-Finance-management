import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-dlg-edit-catagories',
  templateUrl: './dlg-edit-catagories.component.html',
  styleUrls: ['./dlg-edit-catagories.component.css'],
})
export class DlgEditCatagoriesComponent implements OnInit, OnDestroy {
  categories: any;
  newCategory: string = '';
  id: any;

  constructor(
    private userService: UserServicesService,
    private dialogRef: MatDialogRef<DlgEditCatagoriesComponent>,
    private localStorage: LocalStorageService
  ) {}

  addCategory(): void {
    if (this.newCategory.trim() !== '') {
      this.categories.push(this.newCategory.trim());
      this.newCategory = '';
    }
  }

  removeCategory(category: string): void {
    const index = this.categories.indexOf(category);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.id = this.localStorage.getUserId();
    this.categories = this.localStorage.getCategories();
  }

  ngOnDestroy(): void {
    this.onCloseClick();
  }

  onCloseClick(): void {
    let updatedUser = this.localStorage.updateCategories(this.categories);

    this.userService.updateUser(this.id, updatedUser).subscribe(
      () => {
        this.dialogRef.close();
      },
      (error) => {
        console.error('Update User Error:', error);
        // Handle error as needed
      }
    );
  }
}
