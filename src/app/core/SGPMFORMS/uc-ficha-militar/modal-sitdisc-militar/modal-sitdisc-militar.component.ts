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
import { MilSitDisc } from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-modal-sitdisc-militar',
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
    <h2 mat-dialog-title>{{ isEdit ? 'Editar' : 'Adicionar' }} Situação Disciplinar</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <div class="form-fields">

           <app-header-militar
      [nimMilitar]="form.get('nimMilitar')?.value"
       [nomeMilitar]="form.get('nomeMilitar')?.value">
      </app-header-militar>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Órgão</mat-label>
            <input matInput formControlName="orgao" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Infração</mat-label>
            <input matInput formControlName="infracao" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Medidas Tomadas</mat-label>
            <textarea matInput formControlName="medTomadas" required></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Início da Medida</mat-label>
            <input matInput [matDatepicker]="pickerInicio" formControlName="dataInicioMedida" required>
            <mat-datepicker-toggle matSuffix [for]="pickerInicio"></mat-datepicker-toggle>
            <mat-datepicker #pickerInicio></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Fim da Medida</mat-label>
            <input matInput [matDatepicker]="pickerFim" formControlName="dataFimMedida">
            <mat-datepicker-toggle matSuffix [for]="pickerFim"></mat-datepicker-toggle>
            <mat-datepicker #pickerFim></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Local</mat-label>
            <input matInput formControlName="local">
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Número do Processo</mat-label>
            <input matInput formControlName="numProcesso">
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
export class ModalSitDiscMilitarComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalSitDiscMilitarComponent>,
    private remoteSrv: TablesRemoteDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
    const sitDisc = this.data.sitDisc || {};
    this.form = this.fb.group({
      orgao: [sitDisc.orgao || '', [Validators.required]],
      infracao: [sitDisc.infracao || '', [Validators.required]],
      medTomadas: [sitDisc.medTomadas || '', [Validators.required]],
      dataInicioMedida: [sitDisc.dataInicioMedida || '', [Validators.required]],
      dataFimMedida: [sitDisc.dataFimMedida || ''],
      local: [sitDisc.local || ''],
      numProcesso: [sitDisc.numProcesso || ''],
      obs: [sitDisc.obs || ''],
      milSitDiscStamp: [sitDisc.milSitDiscStamp || ''],
      codMilSitDisc: [sitDisc.codMilSitDisc || 0],
      milStamp: [sitDisc.milStamp || ''],
      inseriu: [sitDisc.inseriu || ''],
      inseriuDataHora: [sitDisc.inseriuDataHora || new Date()],
      alterou: [sitDisc.alterou || ''],
      nimMilitar: [ this.data?.nimMilitar || ''],
      nomeMilitar: [ this.data?.nomeMilitar || ''],
      alterouDataHora: [sitDisc.alterouDataHora || null]
    });
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.form?.valid) {
      const formValue = this.form.getRawValue();
      if (formValue.orgao &&
          formValue.infracao &&
          formValue.medTomadas &&
          formValue.dataInicioMedida) {
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
