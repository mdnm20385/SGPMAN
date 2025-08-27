import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderMilitarComponent } from '@core/SGPMFORMS/heade/header-militar/header-militar.component';

@Component({
  selector: 'app-modal-milfa',
  templateUrl: './modal-milfa.component.html',
  styleUrls: ['./modal-milfa.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatDatepickerModule,
    MatOptionModule,
        HeaderMilitarComponent
  ]
})
export class ModalMilfaComponent implements OnInit {
  milfaForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalMilfaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  isEdit = this.data.isEdit;
  ngOnInit(): void {
    this.milfaForm = this.fb.group({
      milStamp: [this.data?.fa.milStamp || ''],
      codMilFa: [this.data?.fa.codMilFa || ''],
      falecData: [this.formatDateISO(this.data?.fa.falecData) || '', Validators.required],
      falecLocal: [this.data?.fa.falecLocal || '', Validators.required],
      circunstancias: [this.data?.fa.circunstancias || ''],
      enterroData: [this.formatDateISO(this.data?.fa.enterroData) || ''],
      enterroLocal: [this.data?.fa.enterroLocal || ''],
      numCampa: [this.data?.fa.numCampa || ''],
      numCertObito: [this.data?.fa.numCertObito || ''],
      obs: [this.data?.fa.obs || ''],
    nimMilitar:  [this.data?.nimMilitar||''] ,
    nomeMilitar: [this.data?.nomeMilitar||'']
    });
  }

 salvar(): void {
  if (this.milfaForm.invalid) return;
  this.isSubmitting = true;
  const { nimMilitar, nomeMilitar, ...value } = this.milfaForm.value;

  // Converter datas para formato ISO
  if (value.falecData) {
    value.falecData = this.formatDateISO(value.falecData);
  }
  if (value.enterroData) {
    value.enterroData = this.formatDateISO(value.enterroData);
  }
  this.dialogRef.close(value);
}
  formatDateISO(date: any): string {
    if (!date) return '';
    // Se já for string ISO, retorna
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}/)) return date;
    // Se for Date, converte
    if (date instanceof Date) return date.toISOString().slice(0, 10);
    // Se for objeto datepicker, converte
    if (date && date.year && date.month && date.day) {
      const d = new Date(date.year, date.month - 1, date.day);
      return d.toISOString().slice(0, 10);
    }
    return '';
  }
  cancelar(): void {
    this.dialogRef.close(null);
  }
}
