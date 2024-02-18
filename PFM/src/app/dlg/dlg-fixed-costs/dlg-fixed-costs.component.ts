import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserServicesService } from 'src/app/services/user-services.service';
import { FormGroup, FormControl } from '@angular/forms';

interface fixedCost {
  amount: number | null;
  category?: string | null;
  date?: number | null;
  description?: string | null;
}

@Component({
  selector: 'app-dlg-fixed-costs',
  templateUrl: './dlg-fixed-costs.component.html',
  styleUrls: ['./dlg-fixed-costs.component.css'],
})
export class DlgFixedCostsComponent implements OnInit {
  newFixedCost: fixedCost = {
    amount: null,
    category: '',
    description: '',
    date: null,
  };

  fixedCostForm: FormGroup;

  allFixedCosts: fixedCost[] = [];

  categories: any;
  id: any;

  constructor(
    private userService: UserServicesService,
    private localStorage: LocalStorageService,
    private dialogRef: MatDialogRef<DlgFixedCostsComponent>
  ) {
    this.fixedCostForm = new FormGroup({
      amount: new FormControl(),
      category: new FormControl(),
      description: new FormControl(),
      date: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.id = this.localStorage.getUserId();
    this.categories = this.localStorage.getCategories();
    this.allFixedCosts = this.localStorage.getFixedCosts();
  }

  addFixedCost(): void {
    console.log('asbdasfnjabsfj');
    console.log(this.fixedCostForm.value);
    this.allFixedCosts.push(this.fixedCostForm.value);
  }

  removeFixedCost(fixedCost: fixedCost): void {
    const index = this.allFixedCosts.indexOf(fixedCost);
    if (index !== -1) {
      this.allFixedCosts.splice(index, 1);
    }
  }

  onCloseClick(): void {
    let updatedUser = this.localStorage.updateFixedCosts(this.allFixedCosts);

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
