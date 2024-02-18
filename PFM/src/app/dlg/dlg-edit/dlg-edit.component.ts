import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-dlg-edit',
  templateUrl: './dlg-edit.component.html',
  styleUrls: ['./dlg-edit.component.css'],
})
export class DlgEditComponent implements OnInit {
  editCostForm: UntypedFormGroup;
  public cost: any;

  constructor(
    private dialogRef: MatDialogRef<DlgEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cost: Cost },
    private formBuilder: UntypedFormBuilder,
    private localStorage: LocalStorageService
  ) {
    this.cost = data.cost;
    this.editCostForm = this.formBuilder.group({
      amount: new UntypedFormControl({ value: data.cost.amount }, [
        Validators.required,
      ]),
      description: new UntypedFormControl({ value: data.cost.description }),
      category: new UntypedFormControl({ value: data.cost.category }),
    });
  }
  categories: (string | null)[] = [];

  ngOnInit(): void {
    this.categories = this.localStorage.getCategories();
  }

  save() {
    this.dialogRef.close({ action: 'save', data: this.cost });
  }

  onCancelClick(): void {
    this.dialogRef.close({ action: 'cancel' });
  }
}
