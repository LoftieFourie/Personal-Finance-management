import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-dlg-schema-edit',
  templateUrl: './dlg-schema-edit.component.html',
  styleUrls: ['./dlg-schema-edit.component.css'],
})
export class DlgSchemaEditComponent implements OnInit {
  schemaEditor: FormGroup;
  id: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DlgSchemaEditComponent>,
    private localStorage: LocalStorageService,
    private userService: UserServicesService
  ) {
    let colorSet = this.localStorage.getColorSchema();
    this.schemaEditor = this.fb.group({
      primaryColor: [colorSet.primaryColor, Validators.required],
      secondaryColor: [colorSet.secondaryColor, Validators.required],
      accentColor: [colorSet.accentColor, Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.id = await this.localStorage.getUserId();
    this.dialogRef.updateSize('70%', '70%');
  }

  onSave(): void {
    let updatedUser = this.localStorage.updateColorSchema(
      this.schemaEditor.value
    );

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

  onCancel(): void {
    // Close the dialog without saving
    this.dialogRef.close();
  }
}
