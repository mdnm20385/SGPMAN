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
import { MilReg } from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-modal-reg-militar',
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
  templateUrl: './modal-reg-militar.component.html',
  styleUrls: ['./modal-reg-militar.component.scss'],
  providers: [TablesRemoteDataService]
})
export class ModalRegMilitarComponent implements OnInit {
  regForm: FormGroup;
  isEdit: boolean = false;
  isSubmitting = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalRegMilitarComponent>,
    private remoteSrv: TablesRemoteDataService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.isEdit = !!data.isEdit;
    this.regForm = this.createForm(data.reg);
  }

  ngOnInit(): void {
    // Formatar a data para o formato ISO se existir
    const dataRegControl = this.regForm.get('dataReg');
    if (dataRegControl?.value && typeof dataRegControl.value === 'string') {
      try {
        // Tentar converter a data para o formato ISO
        const date = new Date(dataRegControl.value);
        if (!isNaN(date.getTime())) {
          dataRegControl.setValue(this.formatDateToISO(date));
        }
      } catch (e) {
        console.warn('Erro ao converter data:', e);
      }
    }
  }

  private createForm(reg?: MilReg): FormGroup {
    return this.fb.group({
      milRegStamp: [reg?.milRegStamp || ''],
      regime: [reg?.regime || '', Validators.required],
      dataReg: [reg?.dataReg || '', Validators.required],
      numOS: [reg?.numOS || '', Validators.required],
      obs: [reg?.obs || ''],
      regStamp: [reg?.regStamp || ''],
      inseriu: [reg?.inseriu || ''],
      inseriuDataHora: [reg?.inseriuDataHora || new Date()],
      alterou: [reg?.alterou || ''],
      alterouDataHora: [reg?.alterouDataHora || null],
      milStamp: [reg?.milStamp],
    nimMilitar:  [this.data?.nimMilitar||''] ,
    nomeMilitar: [this.data?.nomeMilitar||'']
    });
  }

  // Método auxiliar para formatar data no formato ISO
  private formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.regForm.valid) {
      this.isSubmitting = true;
      const formValue = this.regForm.getRawValue();

      // Garantir que a data está no formato ISO
      if (formValue.dataReg instanceof Date) {
        formValue.dataReg = this.formatDateToISO(formValue.dataReg);
      }

      try {
        this.dialogRef.close(formValue);
      } catch (error) {
        console.error('Erro ao salvar registro:', error);
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

  /**
   * Verifica se o controle tem um erro específico
   */
  hasError(controlName: string, errorName: string): boolean {
    const control = this.regForm?.get(controlName);
    return control?.hasError(errorName) || false;
  }

  /**
   * Verifica se o formulário é válido
   */
  isFormValid(): boolean {
    return this.regForm?.valid || false;
  }

  /**
   * Retorna classe CSS de acordo com estado do formulário
   */
  getStateClass(): string {
    return this.isEdit ? 'state-edit' : 'state-new';
  }
}
