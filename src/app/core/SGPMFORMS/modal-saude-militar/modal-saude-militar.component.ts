import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { HeaderMilitarComponent } from '../heade/header-militar/header-militar.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTabsModule,      // <-- Adicione aqui
    MatTooltipModule ,   // <-- Adicione aqui
HeaderMilitarComponent
  ],
  selector: 'app-modal-saude-militar',
  templateUrl: './modal-saude-militar.component.html',
  styleUrls: ['./modal-saude-militar.component.scss'],
})
export class ModalSaudeMilitarComponent implements OnInit {
  saudeForm: FormGroup;
  isEdit = false;
  dialogTitle: string;
  today: Date = new Date(); // <-- Adicionada propriedade today

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
      milStamp: [data.saude.milStamp],
    nimMilitar:  [this.data?.nimMilitar] ,
    nomeMilitar: [this.data?.nomeMilitar] ,

    });
  }

  ngOnInit(): void {
  }

  salvar(): void {
    const hoje = new Date();
    const { doencaSofre, doencaSofrida, cirurgiaSofrida,
       motivoDoenca, datainicioDoenca } = this.saudeForm.value;
    // Pelo menos um campo preenchido
    const algumPreenchido = [doencaSofre, doencaSofrida, cirurgiaSofrida, motivoDoenca].some(v => v && v.trim() !== '');
    // Data não pode ser maior que hoje
    const dataValida = !datainicioDoenca || new Date(datainicioDoenca) <= hoje;
    if (!algumPreenchido) {
      this.saudeForm.markAllAsTouched();
       Swal.fire('Preencha pelo menos um dos campos: Doença Atual, Doença Anterior, Cirurgia ou Motivo.','error');
      return;
    }
    if (!dataValida) {
      this.saudeForm.get('datainicioDoenca')?.setErrors({ dataFutura: true });
       Swal.fire('A data de início não pode ser maior que hoje.','error');
      return;
    }
    if (this.saudeForm.valid) {
      const { nimMilitar, nomeMilitar, ...rest } = this.saudeForm.value;
      this.dialogRef.close(rest);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
