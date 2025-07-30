import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Usuario } from '@core/authentication';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { busca } from 'app/classes/busca';
import { Orgao } from 'app/classes/ClassesSIGEX';
import { Objecto } from 'app/classes/Resposta';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Component({
  selector: 'app-frm-busca',
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
  templateUrl: './frm-busca.component.html',
  styleUrl: './frm-busca.component.scss'
})
export class FrmBuscaComponent



implements OnInit{
  constructor(
    private changeDetection: ChangeDetectorRef,private route: ActivatedRoute,

  ) {

  }

  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private _snackBar= inject(MatSnackBar);
  private readonly dialog = inject(MtxDialog);
  isSubmitting = false;
  registerForm = this.fb.nonNullable.group(
    {
  descricao: ['', [Validators.required]],
  buscaStamp:['', [Validators.required]],
  codBusca:[0],
  numTabela:['', [Validators.required]],
   inseriu:[''],
  inseriuDataHora:[''],
   alterou:[''],
  alterouDataHora:[''],

    }
  );
visivel=false;
  mostrarAlerta(mensagem: string, tipo: string) {
    this._snackBar.open(mensagem, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

titulo:string='';
  ngOnInit(): void {

   // alert(this.data.record.numTabela);
    this.registerForm.patchValue( {
  descricao:this.data.record.descricao,
  buscaStamp:this.data.record.buscaStamp,
  codBusca:this.data.record.codBusca,
  numTabela:this.data.record.numTabela,
  inseriu:this.data.record.inseriu,
  inseriuDataHora:this.data.record.inseriuDataHora,
   alterou:this.data.record.alterou,
  alterouDataHora:this.data.record.alterouDataHora,
    } );
    this.titulo=String(this.data.record.alterou).toUpperCase();
    this.changeDetection.detectChanges();
  }

  login(){

    if(this.auth.isAutenticated()===false){
        return;
    }

    const usuario=this.auth.obterSessao() as Usuario;
    const processoStamps=this.auth.Stamp();
if(this.registerForm.get('buscaStamp')!.value===null || this.registerForm.get('buscaStamp')!.value===undefined
|| this.registerForm.get('buscaStamp')!.value===typeof(undefined) || this.registerForm.get('buscaStamp')!.value.length==0){
  this.registerForm.patchValue( {
    buscaStamp: processoStamps
  } );
}
const unidade:busca={
  buscaStamp: this.registerForm.get('buscaStamp')!.value,
  descricao: this.registerForm.get('descricao')!.value,
  codBusca:this.registerForm.get('codBusca')!.value,
  numTabela:this.data.record.numTabela,
  inseriu: usuario.nome!,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.nome!,
  alterouDataHora: this.auth.ConvertDate(new Date()),

};

    const entrda:Objecto={
      dados: unidade,
      tabela: 'busca',
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
