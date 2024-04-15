import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms'; // Import FormBuilder and Validators
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dlg-date-select',
  templateUrl: './dlg-date-select.component.html',
  styleUrls: ['./dlg-date-select.component.css'],
})
export class DlgDateSelectComponent {
  dateSelectForm: FormGroup;
  startDate: Date;
  endDate: Date;

  constructor(
    private dialogRef: MatDialogRef<DlgDateSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { startDate: any; endDate: any },
    private formBuilder: UntypedFormBuilder,
    private localStorage: LocalStorageService
  ) {
    if (data && data.startDate && data.endDate) {
      this.endDate = data.endDate;
      this.startDate = data.startDate;
    } else {
      const currentDate = new Date();
      this.endDate = currentDate;
      this.startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      );
    }

    this.dateSelectForm = this.formBuilder.group({
      startDate: [this.startDate, Validators.required],
      endDate: [this.endDate, [Validators.required]],
    });
  }

  save() {
    console.log(this.dateSelectForm.get('startDate')?.value);
    this.dialogRef.close({
      action: 'save',
      data: {
        startDate: this.dateSelectForm.get('startDate')?.value,
        endDate: this.dateSelectForm.get('endDate')?.value,
      },
    });
  }

  ngOnDestroy(): void {
    this.onCancelClick();
  }

  onCancelClick(): void {
    this.dialogRef.close({ action: 'cancel' });
  }
}
