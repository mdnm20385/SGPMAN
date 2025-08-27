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
import { MilConde } from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-modal-conde-militar',
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
    <h2 mat-dialog-title>{{ isEdit ? 'Editar' : 'Adicionar' }} Condecoração</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
         <app-header-militar
      [nimMilitar]="form.get('nimMilitar')?.value"
       [nomeMilitar]="form.get('nomeMilitar')?.value"></app-header-militar>

        <div class="form-fields">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Galardoa</mat-label>
            <input matInput formControlName="galardoa" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Espécie</mat-label>
            <input matInput formControlName="especie" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Grau da Medalha</mat-label>
            <input matInput formControlName="grauMedalha" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Data de Galardoação</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="dataGalardoacao" required>
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
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
export class ModalCondeMilitarComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalCondeMilitarComponent>,
    private remoteSrv: TablesRemoteDataService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.isEdit = !!data.sEditing;
    const conde = this.data.conde || {};
    this.form = this.fb.group({
      galardoa: [conde.galardoa || '', [Validators.required]],
      especie: [conde.especie || '', [Validators.required]],
      grauMedalha: [conde.grauMedalha || '', [Validators.required]],
      dataGalardoacao: [conde.dataGalardoacao || '', [Validators.required]],
      obs: [conde.obs || ''],
      milCondeStamp: [conde.milCondeStamp || ''],
      codMilConde: [conde.codMilConde || 0],
      milStamp: [conde.milStamp || ''],
      inseriu: [conde.inseriu || ''],
      inseriuDataHora: [conde.inseriuDataHora || new Date()],
      alterou: [conde.alterou || ''],
      alterouDataHora: [conde.alterouDataHora || null],
    nimMilitar:  [this.data?.nimMilitar] ,
    nomeMilitar: [this.data?.nomeMilitar]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form?.valid) {
      const formValue = this.form.getRawValue();
      if (formValue.galardoa &&
          formValue.especie &&
          formValue.grauMedalha &&
          formValue.dataGalardoacao) {
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
