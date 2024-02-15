import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DlgEditComponent } from '../dlg-edit/dlg-edit.component';
import { CostServicesService } from 'src/app/services/cost-services.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

interface Cost {
  _id: string | null;
  user_id?: string | null;
  amount: number | null;
  category?: string | null;
  date?: Date | null;
  description?: string | null;
}

@Component({
  selector: 'app-dlg-view-cost-details',
  templateUrl: './dlg-view-cost-details.component.html',
  styleUrls: ['./dlg-view-cost-details.component.css'],
})
export class DlgViewCostDetailsComponent implements OnInit {
  public cost: any;
  public id: any;

  constructor(
    private dialogRef: MatDialogRef<DlgViewCostDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cost: Cost },
    private dlg: MatDialog,
    private costService: CostServicesService,
    private localStorage: LocalStorageService
  ) {
    this.cost = data.cost;
  }

  ngOnInit(): void {
    this.id = this.localStorage.getUserId();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    this.dialogRef.close();
    let dialogRef = this.dlg.open(DlgEditComponent, {
      data: { cost: this.cost },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      this.costService
        .updateCost(this.id, result.data._id, result.data)
        .subscribe(
          (response) => {},
          (error) => {
            // Handle error appropriately
            console.error('Error creating new cost', error);
          }
        );
    });
  }
}
