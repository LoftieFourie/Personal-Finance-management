import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dlg-chart-data-view',
  templateUrl: './dlg-chart-data-view.component.html',
  styleUrls: ['./dlg-chart-data-view.component.css'],
})
export class DlgChartDataViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DlgChartDataViewComponent>
  ) {
    console.log(data.costs);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
