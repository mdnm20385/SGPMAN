import { JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { AuthService, Usuario } from '@core/authentication';
import { VerVisualizadorFicheirosComponent } from '@core/FormSigex/ver-visualizador-ficheiros/ver-visualizador-ficheiros.component';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared';
import { selects, condicoesprocura } from 'app/classes/CampoSessoes';
import { Processo, Arquivo, EntradaProcesso } from 'app/classes/ClassesSIGEX';
import { ServicoGeral } from 'app/classes/interfacesBuscas/servico-geral';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-receber-pendentes',
  standalone: true,
  templateUrl: './receber-pendentes.component.html',
  styleUrl: './receber-pendentes.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [MatDialogModule,
     MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MtxButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MtxSelectModule, MatTabsModule,
    CommonModule,
    MtxGridModule,
    MatRadioModule,
  ],
  providers: [TablesRemoteDataService],
})
export class ReceberPendentesComponent



implements OnInit,AfterViewInit{

  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef){

  }

   translatex = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  ngAfterViewInit(): void {
    this.Getorgao();
    this.GetEspecieDocumental();
    this.GetEspecieParametrizacao();
    //this.Requery();
    this.FillControlos();

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  search() {
    this.query.page = 0;
    //this.Requery();
  }
  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }
  columns: MtxGridColumn[] = [
    { header: 'Descrição', field: 'Descricao',sortable: true,minWidth: 300 },
    { header: 'Data', field: 'DataArquivo',sortable: true,minWidth: 120, type: 'date',
      pinned: 'right'},
    {
      header: 'Acções',
      field: 'operation',
      minWidth: 100,
      width: '100px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translatex.stream('table_kitchen_sink.edit'),
          click: record => this.edit(record),
        },
      ],
    },

  ];


  edit(value: any) {

    const trabalho=this.auth.InitializeTrabalho();
    trabalho.path= value.Descricao;
  const dialogRef = this.dialog.originalOpen(VerVisualizadorFicheirosComponent, {
         // width: '100%',
        //  height:'100%',
        width: '2000px',
      disableClose: true,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      // disableClose: true,
      // autoFocus: false,
      // enterAnimationDuration: '1000ms',
      // exitAnimationDuration: '1000ms',
      data: trabalho,
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

FillControlos(){
this.isLoadingProcesso=true;
  this.registerForm.patchValue(
    {
entradaStamp:this.data.record.EntradaStamp,
conselhoColectivos: this.data.record.ConselhoColectivos,
conselhoCoodenador: this.data.record.ConselhoCoodenador,
conselhoDefesaNaciona: this.data.record.ConselhoDefesaNaciona,
conselhoTecnicoGeral: this.data.record.ConselhoTecnicoGeral,
consultivo: this.data.record.Consultivo,
conselhoDireccao: this.data.record.ConselhoDireccao,
processoStamp: this.data.record.ProcessoStamp,
numeroEntrada: this.data.record.NumeroEntrada,
docPdf: this.data.record.DocPdf,
remetente: this.data.record.Remetente,
orgaoProcedencia: this.data.record.OrgaoProcedencia,
orgaoproce1: this.data.record.OrgaoProcedencia,
direcProcedencia: this.data.record.DirecProcedencia,
direcaoproce1: this.data.record.DirecProcedencia,
depProcedencia: this.data.record.DepProcedencia,
dataEntrada: this.data.record.DataEntrada,
tipoDoc: this.data.record.TipoDoc,
classificador: this.data.record.Classificador,
direcaoOrigem: this.data.record.DirecaoOrigem,
orgaoOrigem: this.data.record.OrgaoOrigem,
grauClassifi: this.data.record.GrauClassifi,
grauconf: String(this.data.record.GrauClassifi).toUpperCase(),
nvlUrgencia: this.data.record.NvlUrgencia,
nvlUrgencias:this.data.record.NvlUrgencia,
numeroOrdem: this.data.record.NumeroOrdem,
despacho: this.data.record.Despacho,
dataDocumento: this.data.record.DataDocumento,
endereco: this.data.record.Endereco,
observacao: this.data.record.Observacao,
qtdFolhas: this.data.record.QtdFolhas,
qtdExemplares: this.data.record.QtdExemplares,
qtdAnexo: this.data.record.QtdAnexo,
orgaoUtilizador: this.data.record.OrgaoUtilizador,
direcUtilizador: this.data.record.DirecUtilizador,
depUtilizador: this.data.record.DepUtilizador,
orgaostamp: this.data.record.Orgaostamp,
departamentostamp: this.data.record.Departamentostamp,
direcaostamp: this.data.record.Direcaostamp,
tdocAniva: this.data.record.TdocAniva,
pathPdf: this.data.record.PathPdf,
path: this.data.record.Path,
path1: this.data.record.Path1,
firstName: '',
visado: this.data.record.Observacao,
direcaoOrigem1: String(this.data.record.DirecaoOrigem).toUpperCase(),
orgaoOrigem1: String(this.data.record.OrgaoOrigem).toUpperCase(),
especieclas: String(this.data.record.Classificador).toUpperCase(),
  }
);
this.Requery();
}


cleanup() {
  this.safeUrl= null;
  this.registerForm.patchValue({path1:''});
}
safeUrl: SafeResourceUrl | null = null;
updateUrl(url: string) {
  this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  onFileChange(event: Event) {
    this.cleanup();
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
          this.converterBase64(event);
      const reader = new FileReader();
      reader.onload = () => {
        this.updateUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }


  valida=false;
  ficheiro: string='';
  name='';
 converterBase64(event: Event){
  const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1);

const filename=file.name.replace(`.${ext}`,'');
    this.registerForm.patchValue({tdocAniva:file.name});
      const reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);

    }
 }
  _handleReaderLoaded(readerEvt:any) {
    const binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
    this.registerForm.patchValue({path1:this.base64textString});
   }
  private base64textString:string='';
    handleFileSelect(evt:any){

    }
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
    private readonly auth = inject(AuthService);
    private readonly _authservice = inject(ServicoGeral);
    private readonly remoteSrv = inject(TablesRemoteDataService);
  private _snackBar= inject(MatSnackBar);
  selectedestadoe = 'EM TRAMITAÇÃO';
  isSubmitting = false;
  registerForm = this.fb.nonNullable.group(
    {
entradaStamp: [''],
conselhoColectivos: [''],
conselhoCoodenador: [false],
conselhoDefesaNaciona: [false],
conselhoTecnicoGeral: [false],
consultivo: [false],
conselhoDireccao: [true],
processoStamp: [''],
docPdf: [''],
remetente: [''],
orgaoProcedencia: [''],
direcProcedencia: [''],
depProcedencia: [''],
dataEntrada: [''],
inseriu: [''],
inseriuDataHora: [''],
alterou: [''],
alterouDataHora: [''],
recebido: [false],
numeroEntrada: [6],
tipoDoc: ['',Validators.required],
classificador: ['',Validators.required],
direcaoOrigem: ['',Validators.required],
orgaoOrigem: ['',Validators.required],
grauClassifi: ['',Validators.required],
nvlUrgencia: ['',Validators.required],
path1: ['',Validators.required],
numeroOrdem: [6],
despacho: [''],
dataDocumento: [new Date()],
endereco: [''],
observacao: [''],
qtdFolhas: [''],
qtdExemplares: [''],
qtdAnexo: [''],
orgaoUtilizador: [''],
direcUtilizador: [''],
depUtilizador: [''],
orgaostamp: [''],
departamentostamp: [''],
direcaostamp: [''],
tdocAniva: [''],
pathPdf: [''],
path: [''],
firstName: [''],
visado: [''],
numero:  [3],
assunto: [''],
orgao:  [''],
direcao: [''],
departamento:  [''],
estado:  [''],
usrstamp:  [''],
direcaoOrigem1:  [''],
orgaoOrigem1:  [''],
direcaoproce1:  [''],
orgaoproce1:  [''],
especieclas:[''],
estadotramitat:[''],
nvlUrgencias:[''],
grauconf:[''],
detalhesAssunto:[''],
paraquem:['']
    }
  );
  translate: any;
  mostrarAlerta(mensagem: string, tipo: string) {
    this._snackBar.open(mensagem, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  Requery(){
    const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='entrada';
  let condicao='';
  condicao=`${this.data.record.ProcessoStamp}`;
    const proc: Procura = {
      tabela: 'Processo',
      campo: 'numero',
      campo1: 'tipoDoc',
      camposseleccionados: ' * ',
      valorprocurado: '',
      pagesize: 5,
      marcar: false,
      currentNumber: 1,
      condicoes: `${condicao}`,
      alunoestamp: '',
      rhstamp: '',
      descricao: '',
      origem: '',
      referencia: '',
      usuario
    };
    this.remoteSrv
    .CarregarProcesso(proc)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe(res => {
      this.processo = res.dados;
      this.registerForm.patchValue({
           estadotramitat:res.dados.estado.toUpperCase(),
           visado:res.dados.visado,
      });
    });

    usuario.inseriu='ScanDoc';
   const     ondicao=`  EntradaStamp='${this.data.record.EntradaStamp}'`;
  this.ScanDocMethod(ondicao,usuario,1,50);

  }
  ScanDocMethod(condicao:string,usuario:Usuario,currentPage:number,pageSize:number){

     const procs: Procura = {
       tabela: 'ScanDoc',
       campo: 'Descricao',
       campo1: 'DataArquivo',
       camposseleccionados: ' * ',
       valorprocurado: '',
       pagesize: pageSize,
       marcar: false,
       currentNumber: currentPage,
       condicoes: `${condicao}`,
       alunoestamp: '',
       rhstamp: '',
       descricao: '',
       origem: '',
       referencia: '',
       usuario
     };
     this.remoteSrv
     .MetodoGenerico(procs)
     .pipe(
       finalize(() => {
       })
     )
     .subscribe(res => {
       this.list = res.data;
       this.totalRecords = res.totalCount;
       this.pagenumber = 0;
       this.pagesize = 50;
       this.pagetotalrecord=res.totalCount;
     });

  }
  totalsrow?: number = 0;
  query = {
    q: '',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 10,
  };
  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = true;
  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return p;
  }
  changeSort(e: any) {

  }

  getNextPage(e: PageEvent) {

    const currentPage = (e.pageIndex ?? 0) + 1;
    const pageSize = e.pageSize ?? 0;
    const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='entrada';
    let condicao='';
if(this.params.q.length>0){
  condicao=`EntradaStamp='${this.data.record.EntradaStamp}' and  descricao like '%${this.params.q}%' `;
}else{
  condicao=`EntradaStamp='${this.data.record.EntradaStamp}'`;
}
usuario.inseriu='ScanDoc';
this.ScanDocMethod(condicao,usuario,currentPage,pageSize);
  }
  isLoadingProcesso=false;
  list: any[] = [];total = 0;
  pageSize = 0;
  pageIndex=0;
  totalRecords: number = 0;
  pagenumber: number = 0;
  pagesize: number = 0;
  pagetotalrecord: number = 0;
processo!:Processo;
  ngOnInit(): void {

  }

  Salvar(){
    if(this.auth.isAutenticated()===false){
        return;
    }
    const usuario=this.auth.obterSessao() as Usuario;
const sele:selects={
  chave: '',
  descricao: `update EntradaProcesso set Alterou='${usuario.nome}',
  alteroudatahora='${this.auth.ConvertDate(new Date())}',Recebido=1 where entradastamp='${this.data.record.EntradaStamp}'`,
  ordem: ''
};
this.auth
      .SqlCmd(sele)
      .pipe()
      .subscribe({
        next: (data) => {
          if(data.sucesso==true){
            this.dialog.alert(`Documento recebido com sucesso!`);
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

  selectorgaoprocede: selects[] = [];
  selectdirecoesproced: selects[] = [];
  selectorgaos: selects[] = [];
  selectdirecoes: selects[] = [];
  loading = false;
  selectedorgao = null;
  selectedorgaoCustom = null;
  selectedorgaoCustomPromise = null;
  selectespecie: selects[] = [];
  EstadoTramitacao: selects[] = [];
  GrauConfidencialidade: selects[] = [];
  GrauUrgencia: selects[] = [];
  isLoading = false;
   Getorgao(){
    const se:condicoesprocura={
      tabela:'orgao',
      campo1: 'descricao',
      campo2:'orgaoStamp',
       condicao:'vazio',

       campochave:'orgaoStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectorgaoprocede= this.selectorgaos=data.dados.selects ;
      this.isLoading = false;

        }
      },
      error: (e) => {

      }
    });
  }

  GetEspecieDocumental(){
    const se:condicoesprocura={
      tabela:'EspecieDocumental',
      campo1: 'descricao',
      campo2:'CodClassif',
       condicao:'vazio',
       campochave:'EspecieStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectespecie=data.dados.selects;
        }
      },
      error: (e) => {

      }
    });
  }
  GetEspecieParametrizacao():void{
    const se:condicoesprocura={
      tabela:'Busca',
      campo1: 'descricao',
      campo2:'numTabela',
       condicao:`vazio`,
       campochave:'BuscaStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          const busca=data.dados.selects;
          this.EstadoTramitacao = busca.filter(person => person.ordem =='20' && person.descricao.toLowerCase() !=='arquivado'.toLowerCase());
          this.GrauUrgencia = busca.filter(person => person.ordem =='52' );
            this.GrauConfidencialidade = busca.filter(person => person.ordem ==='51'
              && person.descricao.toLowerCase() !=='SEGREDO DO ESTADO'.toLowerCase() && person.descricao.toLowerCase() !=='SECRETO'.toLowerCase());

        }
      },
      error: (e) => {

      }
    });
  }

  selectedCompanyCustom = null;
  ClearDirecoes(): void {
    this.selectdirecoes= [];
    this.registerForm.get('direcaoOrigem1')?.setValue('');
    this.registerForm.patchValue({
      direcaoOrigem:''
    });
  }

  onEspecieChange(event: any): void {

    this.registerForm.patchValue({
      tipoDoc:event.descricao,
      classificador:event.ordem,
    });
  }

  onSelectorgaoChange(event: any): void {
    this.selectdirecoes= [];
    this.registerForm.get('direcaoOrigem1')?.setValue('');
    this.registerForm.patchValue({
      orgaoOrigem:event.descricao,
      orgaostamp:event.chave
    });
    const se:condicoesprocura={
      tabela:'unidade',
      campo1: 'descricao',
      campo2:'unidadeStamp',
       condicao:`orgaoStamp='${event.chave}'`,
       campochave:'unidadeStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectdirecoes=data.dados.selects ;
        }
      },
      error: (e) => {

      }
    });
  }

  onDirecaoChange(event: any): void {
    this.registerForm.patchValue({
      direcaoOrigem:event.descricao,
    });
  }
  ClearDirecoesrocede(): void {
    this.selectdirecoesproced= [];
    this.registerForm.get('direcaoproce1')?.setValue('');
    this.registerForm.patchValue({
      direcProcedencia:''
    });
  }
  onSelectorgaoprocendiaChange(event: any): void {
    this.selectdirecoesproced= [];
    this.registerForm.get('direcaoproce1')?.setValue('');
    this.registerForm.patchValue({
      orgaoProcedencia:event.descricao,
    });
    const se:condicoesprocura={
      tabela:'unidade',
      campo1: 'descricao',
      campo2:'unidadeStamp',
       condicao:`orgaoStamp='${event.chave}'`,
       campochave:'unidadeStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectdirecoesproced=data.dados.selects ;
        }
      },
      error: (e) => {

      }
    });
  }

  onDirecaoprocendiaChange(event: any): void {
    this.registerForm.patchValue({
      direcProcedencia:event.descricao,
    });
  }


  onEstadotramitacaChange(event: any): void {
    this.registerForm.patchValue({
      estado:event.descricao,
    });
  }
  ongrauClassifiChange(event: any): void {
    this.registerForm.patchValue({
      grauClassifi:event.descricao,
    });
  }
   onnvlUrgenciaChange(event: any): void {
    this.registerForm.patchValue({
      nvlUrgencia:event.descricao,
    });
  }

}
