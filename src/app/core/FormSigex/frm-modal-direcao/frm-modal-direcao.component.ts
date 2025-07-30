import { CommonModule, JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, Router } from '@angular/router';
import { AuthService, Usuario } from '@core/authentication';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared';
import { condicoesprocura, selects } from 'app/classes/CampoSessoes';
import { Arquivo, EntradaProcesso, Orgao, Processo, Unidade } from 'app/classes/ClassesSIGEX';
import { Objecto } from 'app/classes/Resposta';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-frm-modal-direcao',
  standalone: true,
  templateUrl: './frm-modal-direcao.component.html',
  styleUrl: './frm-modal-direcao.component.scss',
  imports: [MatDialogModule,
    MatButtonModule,
    //JsonPipe,
  // RouterLink,
   FormsModule,
   ReactiveFormsModule,
   MatButtonModule,
   MatCardModule,
   MatCheckboxModule,
   MatFormFieldModule,
   MatInputModule,
   TranslateModule,
   MtxButtonModule,
  // BreadcrumbComponent,
   MatIconModule,
   MtxSelectModule,
   CommonModule
 ],
 providers: [TablesRemoteDataService],
})
export class FrmModalDirecaoComponent


implements OnInit{
  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef){

  }

  visivel=false;
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private _snackBar= inject(MatSnackBar);
  translatex = inject(TranslateService);
 private readonly dialog = inject(MtxDialog);
  isSubmitting = false;

  selectorgaoprocede: selects[] = [];
  selectdirecoesproced: selects[] = [];
  selectorgaos: selects[] = [];

  loading = false;
  private readonly remoteSrv = inject(TablesRemoteDataService);

  Getorgao(){
    const se:condicoesprocura={
      tabela:'orgao',
      campo1: 'descricao',
      campo2:'codOrgao',
       condicao:'vazio',
       campochave:'orgaoStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectorgaoprocede= this.selectorgaos=data.dados.selects ;
        }
      },
      error: (e) => {

      }
    });
  }


  onSelectorgaoChange(event: any): void {

    if(this.data.record.inseriu==='inserindo'){
      const proc: condicoesprocura = {
        tabela: 'unidade',
        campo1: 'codunidade',
        campo2: 'descricao',
        condicao: `orgaoStamp='${event.chave}'`,
        campochave: null
      };
      let numero=false;
      this.remoteSrv
      .GetMax(proc)
      .pipe(
        finalize(() => {
          numero = false;
        })
      )
      .subscribe(res => {
        if(res.sucesso===true){
    const nume=res.dados.ordem;
    this.registerForm.patchValue({
      codUnidade:Number(nume),
    });
      }

      }




    );

    }
    this.registerForm.patchValue({
      orgao:event.descricao,
      orgaoStamp:event.chave,
      codOrgao:event.ordem,
    });

  }

  //codUnidade:Unidade
  registerForm = this.fb.nonNullable.group(
    {
      unidadeStamp: ['', [Validators.required]],
      codUnidade:[0, [Validators.required]],
      descricao: ['', [Validators.required]],
      codOrgao:[0, [Validators.required]],
      orgao: ['', [Validators.required]],
  orgaoStamp: ['', [Validators.required]],
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
  orgaoOrigem1:['']

    }
  );

  mostrarAlerta(mensagem: string, tipo: string) {
    this._snackBar.open(mensagem, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

   usuario!:Usuario;

  orgao!: Orgao;
  ngOnInit(): void {

    this.usuario=this.auth.obterSessao() as Usuario;

    this.Getorgao();

    this.registerForm.patchValue( {
      unidadeStamp: this.data.record.unidadeStamp,
      codUnidade: this.data.record.codUnidade,
      descricao: this.data.record.descricao,
      organica: this.data.record.organica,
      totalOf: this.data.record.totalOf,
      codOrgao:this.data.record.codOrgao,
      orgao:  this.data.record.orgao,
      orgaoStamp:  this.data.record.orgaoStamp,
      inseriu:this.usuario.nome!,
      inseriuDataHora: this.auth.ConvertDate(new Date()),
      alterou: this.usuario.nome!,
      alterouDataHora: this.auth.ConvertDate(new Date()),
      orgaoOrigem1: String(this.data.record.orgao).toUpperCase(),
    } );

  }

  login(){

    if(this.auth.isAutenticated()===false){
        return;
    }
    const processoStamps=this.auth.Stamp();
if(this.registerForm.get('unidadeStamp')!.value===null || this.registerForm.get('unidadeStamp')!.value===undefined
|| this.registerForm.get('unidadeStamp')!.value===typeof(undefined) || this.registerForm.get('unidadeStamp')!.value.length==0){
  this.registerForm.patchValue( {
    unidadeStamp: processoStamps

  } );
}

if(this.registerForm.get('orgaoStamp')!.value===null || this.registerForm.get('orgaoStamp')!.value===undefined
|| this.registerForm.get('orgaoStamp')!.value===typeof(undefined) || this.registerForm.get('orgaoStamp')!.value.length==0){

  this.dialog.alert(`Não foi indicado o orgão pertencente` );
  return;
}
const unidade:Unidade={
  unidadeStamp: this.registerForm.get('unidadeStamp')!.value,
  codUnidade: this.registerForm.get('codUnidade')!.value,
  descricao: this.registerForm.get('descricao')!.value,
  organica: 0,
  totalOf: 0,
  codOrgao: this.registerForm.get('codOrgao')!.value,
  orgao: this.registerForm.get('orgao')!.value,
  orgaoStamp: this.registerForm.get('orgaoStamp')!.value,
  inseriu: this.usuario.nome!,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: this.usuario.nome!,
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
  provincia: null,
  codProvincia: null,
  distrito: null,
  codDistrito: null,
  postoAdm: null,
  codPostoAdm: null,
  localidade: null,
  codLocalidade: null,
  pco: false,
  cibm: false,
  estabEnsino: false,
  hospitalMilitar: false,
  unidSubordCentral: false
};

    const entrda:Objecto={
      dados: unidade,
      tabela: 'unidade',
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
