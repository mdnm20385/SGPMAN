import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderMilitarComponent } from '@core/SGPMFORMS/heade/header-militar/header-militar.component';

@Component({
  selector: 'app-modal-saude-militar',
  templateUrl: './modal-saude-militar.component.html',
  styleUrls: ['./modal-saude-militar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    HeaderMilitarComponent
  ]
})
export class ModalSaudeMilitarComponent implements OnInit {
  saudeForm: FormGroup;
  isEdit = false;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalSaudeMilitarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
    this.dialogTitle = this.isEdit ? 'Editar Histórico Médico' : 'Adicionar Histórico Médico';

    this.saudeForm = this.fb.group({
      milSaStamp: [data.saude.milSaStamp || ''],
      codMilSa: [data.saude.codMilSa || 0],
      doencaSofre: [data.saude.doencaSofre || '', [Validators.maxLength(255)]],
      doencaSofrida: [data.saude.doencaSofrida || '', [Validators.maxLength(255)]],
      cirurgiaSofrida: [data.saude.cirurgiaSofrida || '', [Validators.maxLength(255)]],
      motivoDoenca: [data.saude.motivoDoenca || '', [Validators.maxLength(255)]],
      datainicioDoenca: [data.saude.datainicioDoenca || null],
      obs: [data.saude.obs || '', [Validators.maxLength(500)]],
      inseriu: [data.saude.inseriu || ''],
      inseriuDataHora: [data.saude.inseriuDataHora || new Date()],
      alterou: [data.saude.alterou || ''],
      alterouDataHora: [data.saude.alterouDataHora || new Date()],
      nimMilitar: [ this.data?.nimMilitar || ''],
      nomeMilitar: [ this.data?.nomeMilitar || ''],
      milStamp: [data.saude.milStamp]
    });
  }

  ngOnInit(): void {
  }

  salvar(): void {
    if (this.saudeForm.valid) {
      this.dialogRef.close(this.saudeForm.value);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
