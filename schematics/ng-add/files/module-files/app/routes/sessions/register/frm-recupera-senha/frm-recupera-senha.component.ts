import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
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
import { AuthService, Usuario } from '@core';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { Orgao } from 'app/classes/ClassesSIGEX';
import { Objecto } from 'app/classes/Resposta';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-frm-recupera-senha',
   standalone: true,
  imports: [MatDialogModule,
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
   CommonModule
 ],
 providers: [TablesRemoteDataService],
  templateUrl: './frm-recupera-senha.component.html',
  styleUrl: './frm-recupera-senha.component.scss'
})
export class FrmRecuperaSenhaComponent

implements OnInit{

  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private _snackBar= inject(MatSnackBar);
  private readonly dialog = inject(MtxDialog);
  isSubmitting = false;
  visivel=false;
  registerForm = this.fb.nonNullable.group(
    {

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

    }
  );

  mostrarAlerta(mensagem: string, tipo: string) {
    this._snackBar.open(mensagem, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }


  orgao!: Orgao;
  ngOnInit(): void {
    // this.registerForm.patchValue( {
    //   orgaoStamp: this.data.record.orgaoStamp,
    //   codOrgao: this.data.record.codOrgao,
    //   descricao: this.data.record.descricao,
    //   organica: this.data.record.organica,
    //   totalOf: this.data.record.totalOf,
    // } );
  }

  login(){
    if(this.auth.isAutenticated()===false){
        return;
    }
    const usuario=this.auth.obterSessao() as Usuario;
    const processoStamps=this.auth.Stamp();
if(this.registerForm.get('orgaoStamp')!.value===null || this.registerForm.get('orgaoStamp')!.value===undefined
|| this.registerForm.get('orgaoStamp')!.value===typeof(undefined) || this.registerForm.get('orgaoStamp')!.value.length==0){
  this.registerForm.patchValue( {
    orgaoStamp: processoStamps
  } );
}
const unidade:Orgao={
  orgaoStamp: this.registerForm.get('orgaoStamp')!.value,
  descricao: this.registerForm.get('descricao')!.value,
  organica: 0,
  totalOf: 0,
  codOrgao: this.registerForm.get('codOrgao')!.value,
  inseriu: usuario.nome,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.nome!,
  alterouDataHora: this.auth.ConvertDate(new Date()),
  totalOfGen: 0,
  totalGenEx: 0,
  totalTteGen: 0,
  totalMajGen: 0,
  totalBrigadeiro: 0,
  totalOfSup: 0,
  totalCor: 0,
  totalTteCor: 0,
  totalMaj: 0,
  totalOfSub: 0,
  totalCap: 0,
  totalTte: 0,
  totalTteMil: 0,
  totalAlf: 0,
  totalAlfMil: 0,
  totalSarg: 0,
  totalInt: 0,
  totalSub: 0,
  totalPriSar: 0,
  totalSegSar: 0,
  totalTerSar: 0,
  totalFur: 0,
  totalPra: 0,
  totalPriCab: 0,
  totalSegCab: 0,
  totalSold: 0,
};

    const entrda:Objecto={
      dados: unidade,
      tabela: 'orgao',
      condicao: 'vazio',
      sucesso: false
    };



this.auth
      .InserirAlterarObjecto(entrda)
      .pipe()
      .subscribe({
        next: (data) => {
          if(data.sucesso==true){
            this.dialog.alert(`Operação executada com sucesso!`);
            this.dialogRef.close();
          }else{
            this.dialog.alert(`Operação não executada! código do erro` +data.mensagem);
          }
        },
        error: (errorRes: HttpErrorResponse) => {
          this.isSubmitting = false;
          this.dialog.alert(`Operação não executada! código do erro` +errorRes.status);
        },
      });
  }
}

