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
import { MilSitCrim } from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-modal-sitcrim-militar',
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
    <h2 mat-dialog-title>{{ isEdit ? 'Editar' : 'Adicionar' }} Situação Criminal</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
           <app-header-militar
      [nimMilitar]="form.get('nimMilitar')?.value"
       [nomeMilitar]="form.get('nomeMilitar')?.value">
      </app-header-militar>

        <div class="form-fields">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Órgão</mat-label>
            <input matInput formControlName="orgao" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Infração</mat-label>
            <input matInput formControlName="infraccao" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Número do Processo</mat-label>
            <input matInput formControlName="numProcesso" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data do Processo</mat-label>
            <input matInput [matDatepicker]="pickerProcesso" formControlName="processodata" required>
            <mat-datepicker-toggle matSuffix [for]="pickerProcesso"></mat-datepicker-toggle>
            <mat-datepicker #pickerProcesso></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Pena</mat-label>
            <input matInput formControlName="pena" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Detenção</mat-label>
            <input matInput [matDatepicker]="pickerDetencao" formControlName="detencaoData">
            <mat-datepicker-toggle matSuffix [for]="pickerDetencao"></mat-datepicker-toggle>
            <mat-datepicker #pickerDetencao></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Condenação</mat-label>
            <input matInput [matDatepicker]="pickerCondenacao" formControlName="condenacaoData">
            <mat-datepicker-toggle matSuffix [for]="pickerCondenacao"></mat-datepicker-toggle>
            <mat-datepicker #pickerCondenacao></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Local de Prisão</mat-label>
            <input matInput formControlName="localPrisao">
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Soltura</mat-label>
            <input matInput [matDatepicker]="pickerSoltura" formControlName="solturaData">
            <mat-datepicker-toggle matSuffix [for]="pickerSoltura"></mat-datepicker-toggle>
            <mat-datepicker #pickerSoltura></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Número do Doc. de Soltura</mat-label>
            <input matInput formControlName="numDocSoltura">
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
export class ModalSitCrimMilitarComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalSitCrimMilitarComponent>,
    private remoteSrv: TablesRemoteDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
    const sitCrim = this.data.sitCrim || {};
    this.form = this.fb.group({
      orgao: [sitCrim.orgao || '', [Validators.required]],
      infraccao: [sitCrim.infraccao || '', [Validators.required]],
      numProcesso: [sitCrim.numProcesso || '', [Validators.required]],
      processodata: [sitCrim.processodata || '', [Validators.required]],
      pena: [sitCrim.pena || '', [Validators.required]],
      detencaoData: [sitCrim.detencaoData || ''],
      condenacaoData: [sitCrim.condenacaoData || ''],
      localPrisao: [sitCrim.localPrisao || ''],
      solturaData: [sitCrim.solturaData || ''],
      numDocSoltura: [sitCrim.numDocSoltura || ''],
      obs: [sitCrim.obs || ''],
      milSitCrimStamp: [sitCrim.milSitCrimStamp || ''],
      codMilSitCrim: [sitCrim.codMilSitCrim || 0],
      milStamp: [this.data.milStamp || ''],
      inseriu: [sitCrim.inseriu || ''],
      inseriuDataHora: [sitCrim.inseriuDataHora || new Date()],
      alterou: [sitCrim.alterou || ''],
      nimMilitar: [ this.data?.nimMilitar || ''],
      nomeMilitar: [ this.data?.nomeMilitar || ''],
      alterouDataHora: [sitCrim.alterouDataHora || null]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form?.valid) {
      const formValue = this.form.getRawValue();
      if (formValue.orgao &&
          formValue.infraccao &&
          formValue.numProcesso &&
          formValue.processodata &&
          formValue.pena) {
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
