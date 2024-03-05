import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Table } from './generic-name-table.model';
import { GenericNameTableService } from '../generic-name-table.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'fury-generic-name-table-create-update',
  templateUrl: './generic-name-table-create-update.component.html',
  styleUrls: ['./generic-name-table-create-update.component.scss']
})
export class GenericNameTableCreateUpdateComponent implements OnInit {
  @Input()
  table: Table;
  static id = 100;
  existingNames: string[] = [];

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<GenericNameTableCreateUpdateComponent>,
    private fb: FormBuilder, private genericNameTableService: GenericNameTableService) {
  }

  ngOnInit() {
    this.mode = this.defaults.mode ;
    this.existingNames = this.defaults?.existingNames || [];
    this.form = this.fb.group({
      id: [this.defaults?.id],
      // name: [this.defaults?.name || '', Validators.required],
      name: [
        this.defaults?.name || '',
        [Validators.required, this.genericNameTableService.isNameUniqueValidator(this.existingNames)],
      ],
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createTable();
    } else if (this.mode === 'update') {
      this.updateTable();
    }
  }

   // private handleValidationErrors(errors: { [key: string]: string }): void {
  //   Object.keys(errors).forEach((field) => {
  //     const control = this.form.get(field);
  //     if (control) {
  //       control.setErrors({ serverError: errors[field] });
  //     }
  //   });
  // }

  private handleValidationErrors(errors: { [key: string]: string }): void {
    console.log('Validation errors:', errors);
    Object.keys(errors).forEach((field) => {
      const control = this.form.get(field);
      if (control) {
        control.setErrors({ serverError: errors[field] });
        console.log(`Updated form control '${field}' with error:`, control);
      }
    });
  }

  createTable() {
    const table = this.form.value;
    this.genericNameTableService.create(table).subscribe((createdTable) => {
      this.dialogRef.close(createdTable);
    },
    (error) => {
      if (error instanceof HttpErrorResponse && error.status === 400) {
        this.handleValidationErrors(error.error);
      }
    }
  );
  }

  updateTable() {
    const table = this.form.value;
    this.genericNameTableService.upsert(table.id, table).subscribe(() => {
      this.dialogRef.close(table);
    },
    (error) => {
      // Handle validation errors and update form controls
      if (error instanceof HttpErrorResponse && error.status === 400) {
        this.handleValidationErrors(error.error);
      }
    }
  );
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
