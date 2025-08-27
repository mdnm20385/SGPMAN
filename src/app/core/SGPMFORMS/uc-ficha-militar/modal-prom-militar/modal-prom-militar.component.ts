import { CommonModule } from '@angular/common';
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
import { MilProm } from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-modal-prom-militar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    HeaderMilitarComponent
  ],
  templateUrl: './modal-prom-militar.component.html',
  styleUrls: ['./modal-prom-militar.component.scss'],
  providers: [TablesRemoteDataService]
})
export class ModalPromMilitarComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false;
  isSubmitting = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalPromMilitarComponent>,
    private remoteSrv: TablesRemoteDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data.isEdit;
    const prom = this.data.prom || {};
    this.form = this.fb.group({
      categoria: [prom.categoria || '', [Validators.required]],
      patente: [prom.patente || '', [Validators.required]],
      tipoPromocao: [prom.tipoPromocao || '', [Validators.required]],
      dataOS: [prom.dataOS || '', [Validators.required]],
      numOS: [prom.numOS || '', [Validators.required]],
      obs: [prom.obs || ''],
      milPromStamp: [prom.milPromStamp || ''],
      codMilProm: [prom.codMilProm || 0],
      milStamp: [prom.milStamp || ''],
      patStamp: [prom.patStamp || ''],
      inseriu: [prom.inseriu || ''],
      inseriuDataHora: [prom.inseriuDataHora || new Date()],
      alterou: [prom.alterou || ''],
      alterouDataHora: [prom.alterouDataHora || null],
    nimMilitar:  [this.data?.nimMilitar||''] ,
    nomeMilitar: [this.data?.nomeMilitar||'']
    });
  }

  ngOnInit(): void {
    // Formatar a data para o formato ISO se existir
    const dataOSControl = this.form.get('dataOS');
    if (dataOSControl?.value && typeof dataOSControl.value === 'string') {
      try {
        // Tentar converter a data para o formato ISO
        const date = new Date(dataOSControl.value);
        if (!isNaN(date.getTime())) {
          dataOSControl.setValue(this.formatDateToISO(date));
        }
      } catch (e) {
        console.warn('Erro ao converter data:', e);
      }
    }
  }

  // Método auxiliar para formatar data no formato ISO
  private formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.form?.valid) {
      this.isSubmitting = true;
      const formValue = this.form.getRawValue();

      // Garantir que a data está no formato ISO
      if (formValue.dataOS instanceof Date) {
        formValue.dataOS = this.formatDateToISO(formValue.dataOS);
      }

      try {
        if (formValue.categoria &&
            formValue.patente &&
            formValue.tipoPromocao &&
            formValue.dataOS &&
            formValue.numOS) {
          this.dialogRef.close(formValue);
        }
      } catch (error) {
        console.error('Erro ao salvar promoção:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  onCancel(): void {
    if (!this.isSubmitting) {
      this.dialogRef.close();
    }
  }

  getFormControl(name: string) {
    return this.form?.get(name);
  }

  /**
   * Verifica se o controle tem um erro específico
   */
  hasError(controlName: string, errorName: string): boolean {
    const control = this.form?.get(controlName);
    return control?.hasError(errorName) || false;
  }

  /**
   * Verifica se o formulário é válido
   */
  isFormValid(): boolean {
    return this.form?.valid || false;
  }

  /**
   * Retorna classe CSS de acordo com estado do formulário
   */
  getStateClass(): string {
    return this.isEdit ? 'state-edit' : 'state-new';
  }
}
