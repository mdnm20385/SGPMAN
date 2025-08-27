import { CommonModule, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderMilitarComponent } from '@core/SGPMFORMS/heade/header-militar/header-militar.component';
import { MilEspecial } from 'app/classes/SGPM/Models';

@Component({
  selector: 'app-modal-especial-militar',
  templateUrl: './modal-especial-militar.component.html',
  styleUrls: ['./modal-especial-militar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTooltipModule,
    HeaderMilitarComponent
  ]
})
export class ModalEspecialMilitarComponent implements OnInit {
  especialForm: FormGroup;
  isEdit: boolean = false;
  isSubmitting: boolean = false;
  loading: boolean = false;
  formTitle: string = 'Adicionar Especialidade';
  stateClass: string = 'new';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEspecialMilitarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.isEdit = !!data.especial;
    this.formTitle = this.isEdit ? 'Editar Especialidade' : 'Adicionar Especialidade';
    this.especialForm = this.createForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {

    if (this.isEdit && this.data.isEdit) {
      this.especialForm.patchValue({
        milEspecialStamp: this.data.especial.milEspecialStamp || '',
        especial: this.data.especial.especial || '',
        dataEspecial: this.data.especial.dataEspecial ? this.formatDateForInput(this.data.especial.dataEspecial) : '',
        numOS: this.data.especial.numOS || '',
        milStamp: this.data.milStamp
      });
    }
  }

  private createForm(): FormGroup {
      const especial=this.data.especial;
    return this.fb.group({
      milEspecialStamp: [especial?.milEspecialStamp || ''],
      especial: ['', Validators.required],
      dataEspecial: ['', Validators.required],
      numOS: ['', Validators.required],
      milStamp: [especial.milStamp||'', Validators.required],
    nimMilitar: [this.data.nimMilitar] ,
    nomeMilitar: [this.data.nomeMilitar]
    });
  }

  formatDateForInput(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
      return formatDate(date, 'yyyy-MM-dd', 'en-US');
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }

  getStateClass(): string {
    return this.isEdit ? 'edit' : 'new';
  }

  getStateText(): string {
    return this.isEdit ? 'Editando' : 'Novo';
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.especialForm.get(controlName);
    return !!(control?.touched && control?.hasError(errorName));
  }

  onSubmit(): void {
    if (this.especialForm.valid) {
      this.isSubmitting = true;

      // Prepare form data
      const formData = this.especialForm.value;

      // Convert date to ISO format
      if (formData.dataEspecial) {
        formData.dataEspecial = new Date(formData.dataEspecial).toISOString().split('T')[0];
      }

      this.dialogRef.close(formData);
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.especialForm.controls).forEach(key => {
        this.especialForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
