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
import { MilFor } from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-modal-for-militar',
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
    <h2 mat-dialog-title>{{ isEdit ? 'Editar' : 'Adicionar' }} Formação</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <div class="form-fields">
           <app-header-militar
      [nimMilitar]="form.get('nimMilitar')?.value"
       [nomeMilitar]="form.get('nomeMilitar')?.value"></app-header-militar>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Tipo de Formação</mat-label>
            <mat-select formControlName="tipoFormacao" required>
              <mat-option [value]="true">Tipo 1</mat-option>
              <mat-option [value]="false">Tipo 2</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Curso</mat-label>
            <input matInput formControlName="curso" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Início</mat-label>
            <input matInput [matDatepicker]="pickerInicio" formControlName="dataInicio" required>
            <mat-datepicker-toggle matSuffix [for]="pickerInicio"></mat-datepicker-toggle>
            <mat-datepicker #pickerInicio></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Término</mat-label>
            <input matInput [matDatepicker]="pickerTermino" formControlName="dataTermino" required>
            <mat-datepicker-toggle matSuffix [for]="pickerTermino"></mat-datepicker-toggle>
            <mat-datepicker #pickerTermino></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Nível</mat-label>
            <input matInput formControlName="nivel" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Duração</mat-label>
            <input matInput formControlName="duracao" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Tipo de Instituição</mat-label>
            <mat-select formControlName="tipoInstituicao" required>
              <mat-option [value]="true">Tipo 1</mat-option>
              <mat-option [value]="false">Tipo 2</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Instituição</mat-label>
            <input matInput formControlName="instituicao" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>País</mat-label>
            <input matInput formControlName="pais" required>
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
export class ModalForMilitarComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalForMilitarComponent>,
    private remoteSrv: TablesRemoteDataService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.isEdit = !!data.isEdit;

    const formacao = this.data.for || {};
    this.form = this.fb.group({
      tipoFormacao: [formacao.tipoFormacao || false, [Validators.required]],
      curso: [formacao.curso || '', [Validators.required]],
      dataInicio: [formacao.dataInicio || '', [Validators.required]],
      dataTermino: [formacao.dataTermino || '', [Validators.required]],
      nivel: [formacao.nivel || '', [Validators.required]],
      duracao: [formacao.duracao || '', [Validators.required]],
      tipoInstituicao: [formacao.tipoInstituicao || false, [Validators.required]],
      instituicao: [formacao.instituicao || '', [Validators.required]],
      codPais: [formacao.codPais || 0],
      pais: [formacao.pais || '', [Validators.required]],
      obs: [formacao.obs || ''],
      milForStamp: [formacao.milForStamp || ''],
      codMilFor: [formacao.codMilFor || 0],
      milStamp: [formacao.milStamp || ''],
      inseriu: [formacao.inseriu || ''],
      inseriuDataHora: [formacao.inseriuDataHora || new Date()],
      alterou: [formacao.alterou || ''],
      alterouDataHora: [formacao.alterouDataHora || null],
    nimMilitar: [this.data.nimMilitar] ,
    nomeMilitar: [this.data.nomeMilitar]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form?.valid) {
      const formValue = this.form.getRawValue();
      if (formValue.curso &&
          formValue.dataInicio &&
          formValue.dataTermino &&
          formValue.nivel &&
          formValue.duracao &&
          formValue.instituicao &&
          formValue.pais) {
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
