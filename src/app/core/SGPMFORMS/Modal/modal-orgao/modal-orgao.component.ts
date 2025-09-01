import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from '@core/authentication';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { Orgao } from 'app/classes/ClassesSIGEX';
import { Objecto } from 'app/classes/Resposta';
import { AuthService } from '@core/auth.service';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-modal-orgao',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MtxButtonModule,
    MatIconModule,
    MtxSelectModule,
    CommonModule,
  ],
  templateUrl: './modal-orgao.component.html',
  styleUrl: './modal-orgao.component.scss',
  providers: [TablesRemoteDataService],
})
export class ModalOrgaoComponent {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MtxDialog);
  isSubmitting = false;
  visivel = false;
  orgaoForm = this.fb.nonNullable.group({
    orgaoStamp: ['', [Validators.required]],
    codOrgao: [0],
    descricao: ['', [Validators.required]],
    organica: [0],
    totalOf: [0],
    totalOfGen: [0],
    totalGenEx: [0],
    totalTteGen: [0],
    totalMajGen: [0],
    totalBrigadeiro: [0],
    totalOfSup: [0],
    totalCor: [0],
    totalTteCor: [0],
    totalMaj: [0],
    totalOfSub: [0],
    totalCap: [0],
    totalTte: [0],
    totalTteMil: [0],
    totalAlf: [0],
    totalAlfMil: [0],
    totalSarg: [0],
    totalInt: [0],
    totalSub: [0],
    totalPriSar: [0],
    totalSegSar: [0],
    totalTerSar: [0],
    totalFur: [0],
    totalPra: [0],
    totalPriCab: [0],
    totalSegCab: [0],
    totalSold: [0],
    inseriu: [''],
    inseriuDataHora: [''],
    alterou: [''],
    alterouDataHora: [''],
  });

  mostrarAlerta(mensagem: string, tipo: string) {
    this._snackBar.open(mensagem, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  orgao!: Orgao;
  ngOnInit(): void {
    this.orgaoForm.patchValue({
      orgaoStamp: this.data.record.orgaoStamp,
      codOrgao: this.data.record.codOrgao,
      descricao: this.data.record.descricao,
      organica: this.data.record.organica,
      totalOf: this.data.record.totalOf,
      totalOfGen: this.data.record.totalOfGen,
      totalGenEx: this.data.record.totalGenEx,
      totalTteGen: this.data.record.totalTteGen,
      totalMajGen: this.data.record.totalMajGen,
      totalBrigadeiro: this.data.record.totalBrigadeiro,
      totalOfSup: this.data.record.totalOfSup,
      totalCor: this.data.record.totalCor,
      totalTteCor: this.data.record.totalTteCor,
      totalMaj: this.data.record.totalMaj,
      totalOfSub: this.data.record.totalOfSub,
      totalCap: this.data.record.totalCap,
      totalTte: this.data.record.totalTte,
      totalTteMil: this.data.record.totalTteMil,
      totalAlf: this.data.record.totalAlf,
      totalAlfMil: this.data.record.totalAlfMil,
      totalSarg: this.data.record.totalSarg,
      totalInt: this.data.record.totalInt,
      totalSub: this.data.record.totalSub,
      totalPriSar: this.data.record.totalPriSar,
      totalSegSar: this.data.record.totalSegSar,
      totalTerSar: this.data.record.totalTerSar,
      totalFur: this.data.record.totalFur,
      totalPra: this.data.record.totalPra,
      totalPriCab: this.data.record.totalPriCab,
      totalSegCab: this.data.record.totalSegCab,
      totalSold: this.data.record.totalSold,
    });
  }

  salvar() {


    debugger;


    if (this.auth.isAutenticated() === false) {
      return;
    }
    const usuario = this.auth.obterSessao() as Usuario;
    const orgStamp = this.auth.Stamp();
    if (
      this.orgaoForm.get('orgaoStamp')!.value === null ||
      this.orgaoForm.get('orgaoStamp')!.value === undefined ||
      this.orgaoForm.get('orgaoStamp')!.value === typeof undefined ||
      this.orgaoForm.get('orgaoStamp')!.value.length == 0
    ) {
      this.orgaoForm.patchValue({
        orgaoStamp: orgStamp,
      });
    }
    const unidade: Orgao = {
      orgaoStamp: this.orgaoForm.get('orgaoStamp')!.value,
      codOrgao: this.orgaoForm.get('codOrgao')!.value,
      descricao: this.orgaoForm.get('descricao')!.value,
      organica: this.orgaoForm.get('organica')!.value,
      totalOf: this.orgaoForm.get('totalOf')!.value,
      totalOfGen: this.orgaoForm.get('totalOfGen')!.value,
      totalGenEx: this.orgaoForm.get('totalGenEx')!.value,
      totalTteGen: this.orgaoForm.get('totalTteGen')!.value,
      totalMajGen: this.orgaoForm.get('totalMajGen')!.value,
      totalBrigadeiro: this.orgaoForm.get('totalBrigadeiro')!.value,
      totalOfSup: this.orgaoForm.get('totalOfSup')!.value,
      totalCor: this.orgaoForm.get('totalCor')!.value,
      totalTteCor: this.orgaoForm.get('totalTteCor')!.value,
      totalMaj: this.orgaoForm.get('totalMaj')!.value,
      totalOfSub: this.orgaoForm.get('totalOfSub')!.value,
      totalCap: this.orgaoForm.get('totalCap')!.value,
      totalTte: this.orgaoForm.get('totalTte')!.value,
      totalTteMil: this.orgaoForm.get('totalTteMil')!.value,
      totalAlf: this.orgaoForm.get('totalAlf')!.value,
      totalAlfMil: this.orgaoForm.get('totalAlfMil')!.value,
      totalSarg: this.orgaoForm.get('totalSarg')!.value,
      totalInt: this.orgaoForm.get('totalInt')!.value,
      totalSub: this.orgaoForm.get('totalSub')!.value,
      totalPriSar: this.orgaoForm.get('totalPriSar')!.value,
      totalSegSar: this.orgaoForm.get('totalSegSar')!.value,
      totalTerSar: this.orgaoForm.get('totalTerSar')!.value,
      totalFur: this.orgaoForm.get('totalFur')!.value,
      totalPra: this.orgaoForm.get('totalPra')!.value,
      totalPriCab: this.orgaoForm.get('totalPriCab')!.value,
      totalSegCab: this.orgaoForm.get('totalSegCab')!.value,
      totalSold: this.orgaoForm.get('totalSold')!.value,
      inseriu: usuario.nome,
      inseriuDataHora: this.auth.ConvertDate(new Date()),
      alterou: usuario.nome!,
      alterouDataHora: this.auth.ConvertDate(new Date()),
    };

    const entrda: Objecto = {
      dados: unidade,
      tabela: 'orgao',
      condicao: 'vazio',
      sucesso: false,
    };

    this.auth
      .InserirAlterarObjecto(entrda)

    this.auth
      .InserirAlterarObjecto(entrda)
      .pipe()
      .subscribe({
        next: data => {
          if (data.sucesso == true) {
            this.dialog.alert(`Operação executada com sucesso!`);
            this.dialogRef.close();
          } else {
            this.dialog.alert(`Operação não executada! código do erro` + data.mensagem);
          }
        },
        error: (errorRes: HttpErrorResponse) => {
          this.isSubmitting = false;
          this.dialog.alert(`Operação não executada! código do erro` + errorRes.status);
        },
      });
  }
}
