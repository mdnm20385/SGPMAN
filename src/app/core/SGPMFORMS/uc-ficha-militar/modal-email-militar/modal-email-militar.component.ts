import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderMilitarComponent } from '@core/SGPMFORMS/heade/header-militar/header-militar.component';

@Component({
  selector: 'app-modal-email-militar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    HeaderMilitarComponent
  ],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Editar' : 'Adicionar' }} Email</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <div class="form-fields">
          <app-header-militar
            [nimMilitar]="form.get('nimMilitar')?.value"
            [nomeMilitar]="form.get('nomeMilitar')?.value"></app-header-militar>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" required type="email">
          </mat-form-field>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid || isSubmitting">
          {{ isEdit ? 'Atualizar' : 'Adicionar' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-field {
      width: 100%;
    }
  `]
})
export class ModalEmailMilitarComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEmailMilitarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data.isEditing;
    const email = this.data.email || {};
    this.form = this.fb.group({
      email: [email.email || '', [Validators.required, Validators.email]],
      emailStamp: [email.emailStamp || ''],
      milStamp: [email.milStamp || ''],
      nimMilitar: [this.data.nimMilitar],
      nomeMilitar: [this.data.nomeMilitar]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form?.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
