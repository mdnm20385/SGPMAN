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
import { MilSitQPActivo } from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-modal-sitqpactivo-militar',
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
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Editar' : 'Adicionar' }} Situação QP Ativo</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
           <app-header-militar
      [nimMilitar]="form.get('nimMilitar')?.value"
       [nomeMilitar]="form.get('nomeMilitar')?.value">
      </app-header-militar>

        <div class="form-fields">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Situação QP Ativo</mat-label>
            <input matInput formControlName="situacaoQpAtivo" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Local de Função</mat-label>
            <input matInput formControlName="localFuncao" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data OS</mat-label>
            <input matInput [matDatepicker]="pickerOS" formControlName="dataOS" required>
            <mat-datepicker-toggle matSuffix [for]="pickerOS"></mat-datepicker-toggle>
            <mat-datepicker #pickerOS></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Número OS</mat-label>
            <input matInput formControlName="numOS" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Início</mat-label>
            <input matInput [matDatepicker]="pickerInicio" formControlName="dataInicio">
            <mat-datepicker-toggle matSuffix [for]="pickerInicio"></mat-datepicker-toggle>
            <mat-datepicker #pickerInicio></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Término</mat-label>
            <input matInput [matDatepicker]="pickerTermino" formControlName="dataTermino">
            <mat-datepicker-toggle matSuffix [for]="pickerTermino"></mat-datepicker-toggle>
            <mat-datepicker #pickerTermino></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Motivo</mat-label>
            <textarea matInput formControlName="motivo"></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Observações</mat-label>
            <textarea matInput formControlName="obs"></textarea>
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
  `],
  providers: [TablesRemoteDataService]
})
export class ModalSitQPActivoMilitarComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false;
  isSubmitting = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalSitQPActivoMilitarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.isEdit = data.isEdit;
    const sitQPActivo = this.data.sitQPActivo || {};
    this.form = this.fb.group({
      situacaoQpAtivo: [sitQPActivo.situacaoQpAtivo || '', [Validators.required]],
      localFuncao: [sitQPActivo.localFuncao || '', [Validators.required]],
      dataOS: [sitQPActivo.dataOS || '', [Validators.required]],
      numOS: [sitQPActivo.numOS || '', [Validators.required]],
      dataInicio: [sitQPActivo.dataInicio || ''],
      dataTermino: [sitQPActivo.dataTermino || ''],
      motivo: [sitQPActivo.motivo || ''],
      obs: [sitQPActivo.obs || ''],
      milSitQPActivoStamp: [sitQPActivo.milSitQPActivoStamp || ''],
      codMilSitQPActivo: [sitQPActivo.codMilSitQPActivo || 0],
      milStamp: [sitQPActivo.milStamp || ''],
      inseriu: [sitQPActivo.inseriu || ''],
      inseriuDataHora: [sitQPActivo.inseriuDataHora || new Date()],
      alterou: [sitQPActivo.alterou || ''],
      alterouDataHora: [sitQPActivo.alterouDataHora || null]
    });
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.form?.valid) {
      const formValue = this.form.getRawValue();
      if (formValue.situacaoQpAtivo &&
          formValue.localFuncao &&
          formValue.dataOS &&
          formValue.numOS) {
        this.dialogRef.close(formValue);
      }
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  getFormControl(name: string) {
    return this.form?.get(name);
  }
}
