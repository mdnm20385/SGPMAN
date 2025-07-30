import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { Usuario, Trabalho, AuthService, DClinicos, Pa } from '@core/authentication';
import { FrmSaidaProcessoComponent } from '@core/FormSigex/frm-saida-processo/frm-saida-processo.component';
import { VerVisualizadorFicheirosComponent } from '@core/FormSigex/ver-visualizador-ficheiros/ver-visualizador-ficheiros.component';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridModule, MtxGridColumn } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { selects, condicoesprocura } from 'app/classes/CampoSessoes';
import { SaidaProcesso, Processo, Arquivo, EntradaProcesso } from 'app/classes/ClassesSIGEX';
import { ServicoGeral } from 'app/classes/interfacesBuscas/servico-geral';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-frmmodalnovoprocesso',
  templateUrl: './frmmodalnovoprocesso.component.html',
  styleUrl: './frmmodalnovoprocesso.component.scss',
    standalone: true,
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
      MtxSelectModule,
       MatTabsModule,
      CommonModule,
      MtxGridModule,
      MatRadioModule,
    ],
    providers: [TablesRemoteDataService]
})
export class FrmmodalnovoprocessoComponent

implements OnInit,AfterViewInit{
  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef){

  }

  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;

  columnsDestinatarios: MtxGridColumn[] = [];

  columnsDestinatarios1: MtxGridColumn[] = [
    {
      header: 'Nº Doc.',
      field: 'NumeroSaida',
    },
    {
      header: 'Nº Ordem',
      field: 'NumeroOrdem',
      hide: true,
      minWidth: 100,
    },
    { header: 'Cód. class.', field: 'Classificador' },
    { header: 'Assunto', field: 'Assunto',minWidth:150},
    {
      header: 'Obs.',
      field: 'Observacao',
      hide: true,
    },
    { header: 'Órgão Origem', field: 'Orgaoorigem', hide: true,},
        { header: 'Direcção Origem', field: 'DirecaoOrigem' , hide: true},
        { header: 'Despacho', field: 'Despacho' , hide: true},
        { header: 'Data saida', field: 'DataSaida',type:'date',
          typeParameter: {
            format: 'dd/MM/yyyy', // Specify your desired date format here
            locale: 'en-US' // Optionally, specify the locale
          } },
        { header: 'Data do Documento', field: 'DataDocumento',type:'date',
          typeParameter: {
            format: 'dd/MM/yyyy', // Specify your desired date format here
            locale: 'en-US' // Optionally, specify the locale
          } },
    {
      header: 'Acções',
      field: 'operation',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'history',
          tooltip:'',
          click: record => this.Versaidas(record),
        },
      ],
    },
  ];
  multiSelectabledesti = true;
  rowSelectabledesti = true;
  hideRowSelectionCheckboxdesti = false;
  showToolbardesti = true;
  columnHideabledesti = true;
  columnSortabledesti = true;
  columnPinnabledesti = true;
  rowHoverdesti = false;
  rowStripeddesti = false;
  showPaginatordesti = true;
  expandabledesti = false;
  columnResizabledesti = true;
  isLoadingdesti= false;
  totalRecordsdest: number = 0;
  listdestinatario: any[] = [];
  listdestinatario1: any[] = [];
  listdestinatarioGeral: any[] = [];

  GetDestinatarios(){
    if(this.auth.isAutenticated()==false){
return;
    }
    const usuario=this.auth.obterSessao() as Usuario;

    this.remoteSrv
    .getDestinatarios(usuario)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe(res => {
      this.listdestinatario = res.dados;
      this.listdestinatarioGeral= res.dados;
      this.totalRecordsdest=res.dados.length;
    });
  }


  fruitSelectedOption = '';
  AddNew() {
    if(this.auth.isAutenticated()===false){
      return;
  }
  const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='entrada';
  let condicao='';
  condicao=`${this.data.record.ProcessoStamp}`;
const processo=this.processo;
const entradaProces=this.auth.InicializarProcesso('');
const entrada=entradaProces.entradaProcesso[0];
    const value:SaidaProcesso={
      entradaStamp: this.data.record.EntradaStamp,
      saidaStamp: this.auth.Stamp(),
      pathPdf: '',
      numeroSaida: 0,
      docPDF: '',
      destinatario: '',
      orgaoDest: '',
      direcDest: '',
      depDest: '',
      dataSaida: this.auth.ConvertDate(new Date()),
      inseriu: usuario.nome,
      inseriuDataHora: this.auth.ConvertDate(new Date()),
      alterou: '',
      alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
      classificador: '',
      entregue: false,
      direcaoOrigem: ``,
      orgaoorigem: ``,
      direcaoOrigemNaSaida: usuario.direcao,
      orgaoorigemNaSaida: usuario.orgao,
      numeroOrdem: '',
      despacho: '',
      dataDocumento: new Date('2007-01-01'),
      endereco: '',
      observacao: '',
      assunto: '',
      qtdFolhas: '',
      qtdExemplares: '',
      qtdAnexo: '',
      path1: '',
      processoStamp: this.data.record.ProcessoStamp,
      paraquem: 'Novatosigex',
      tdocAniva: '',
      grauClassifi: 'CONFIDENCIAL',
      nvlUrgencia: 'NORMAL',
      listaDestinatarios: [],
      processo,
      visado: '',
      recebeu: '',
      numero: '',
      protocolo: 0,
      ano: this.auth.ConvertDate(new Date()),
      entradaProcesso: entrada
    };
      const dialogRef = this.dialog.originalOpen(FrmSaidaProcessoComponent, {
      width: '2000px',
      disableClose: true,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
          data: { record: value },
        });
        dialogRef.afterClosed().subscribe(() =>
          {
            this.Requery();
          });
      }

      @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F2'){
      this.AddNew();
    }
  }
  GetDestinatariosMethod(){

    // const usuariodddd:Selects={
    //   chave: '',
    //    descricao: `select OrgaoUtilizador orgao,DirecUtilizador descricao,
    //    alterou unidadeStamp,EntradaStamp provincia from EntradaProcesso where SaidaStamp
    //    in (select s.SaidaStamp from EntradaProcesso e inner join SaidaProcesso s

    //    on e.EntradaStamp=s.EntradaStamp where e.EntradaStamp='${this.data.record.EntradaStamp}')`,
    //   ordem: ``,
    // };
    // this.remoteSrv
    // .GenDt(usuariodddd)
    // .pipe(
    //   finalize(() => {
    //     this.isLoading = false;
    //   })
    // )
    // .subscribe(res => {
    //    this.listdestinatario = res;
    //    this.listdestinatarioGeral= res;
    //   this.totalRecordsdest=res.length;
    // });









    const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='saida';
let condicao='';
if(this.params.q.length>0){
  condicao=` 1=1`;
}
let condicaos='';
if(this.auth.obterentradaStamp()==true){
  condicaos=`entradastamp='${this.auth.obterentradaStamp()}'`;
}
  const proc: Procura = {
    tabela: 'saidaProcesso',
    campo: 'orgaoDest',
    campo1: 'direcDest',
    camposseleccionados: ' * ',
    valorprocurado: '',
    pagesize: 5,
    marcar: false,
    currentNumber: 1,
    condicoes: `${condicao}`,
    alunoestamp: 'DataSaida desc',
    rhstamp: '',
    descricao: '',
    origem: '',
    referencia: condicaos,
    usuario
  };
  this.remoteSrv
  .MetodoGenerico(proc)
  .pipe(
    finalize(() => {
      this.isLoading = false;
    })
  )
  .subscribe(res => {
    this.listdestinatarioGeral = res.data;
    this.listdestinatario = res.data;
   this.totalRecordsdest= res.totalCount;
    //this.list = res.data;
    //this.totalRecords = res.totalCount;
    // this.pagenumber = res.currentPageNumber;
    // this.pagesize = res.pageSize;
    // this.pagetotalrecord=res.totalCount;
    // this.total=res.totalCount;
    // this.isLoading = false;
  });


 }
busca(event: Event){


console.log( this.listdestinatarioGeral);
  const target = event.target as HTMLInputElement;
  const value = target.value.toLowerCase();
  this.listdestinatario = this.listdestinatarioGeral.filter(x =>{
    return x.NumeroSaida==(value) ||
     x.Classificador.toLowerCase().includes(value) ||
     x.Assunto.toLowerCase().includes(value)  ||
     x.DataSaida.toLowerCase().includes(value) ;
  });
}
  verNotificacion(row:any) {
    if(this.isLoadingProcesso==false){
    if(row.rowData.cibm==true){
      row.rowData.cibm=false;
    }else{
      row.rowData.cibm=true;
    }
const index = this.listdestinatarioGeral.findIndex( x => x.descricao === row.rowData.descricao
   &&  x.orgao === row.rowData.orgao);
   this.listdestinatarioGeral[index].cibm=row.rowData.cibm;
   const todostrue= this.listdestinatarioGeral.filter((item: { cibm: any; }) => String(Boolean(item.cibm)).toLowerCase() == 'true');
   if(todostrue.length==0){
    this.registerForm.patchValue({
      obrigatoriedadedestinatarios:'valido'
  });
   }
   else{
    this.registerForm.patchValue({
      obrigatoriedadedestinatarios:'valido'
  });
   }
  }
  // else{
  //   this.registerForm.patchValue({
  //     obrigatoriedadedestinatarios:''
  // });
  // }
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
      pinned: 'right',
      typeParameter: {
        format: 'dd/MM/yyyy', // Specify your desired date format here
        locale: 'en-US' // Optionally, specify the locale
      }},
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
          icon: 'print',
          tooltip: 'Ver Ficheiro',
          click: record => this.edit(record),
        },
      ],
    },
  ];
  edit(value: any) {


    const trabalho=this.auth.InitializeTrabalho();
    trabalho.path= value.Descricao;
  const dialogRef = this.dialog.originalOpen(VerVisualizadorFicheirosComponent, {
        width: '2000px',
      disableClose: true,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: trabalho,
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
  Versaidas(value: any) {

  const dialogRef = this.dialog.originalOpen(FrmSaidaProcessoComponent, {
        width: '2000px',
      disableClose: true,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { record: value },
    });
    dialogRef.afterClosed().subscribe(() => {
this.Requery();
    });
  }

FillControlos(){



  console.log('Dados do Processo');
  const usuario=this.auth.obterSessao() as Usuario;
  usuario.inseriu='vprocesso';
const condicao='';

console.log(this.data.record);
console.log('Dados do Processo');
return;

  const proc: Procura = {
    tabela: 'vProcessos',
    campo: 'nome',
    campo1: 'NumBi',
    camposseleccionados: ' * ',
    valorprocurado: '',
    pagesize: 5,
    marcar: false,
    currentNumber: 1,
    condicoes: `${condicao}`,
    alunoestamp: 'nome asc',
    rhstamp: '',
    descricao: '',
    origem: '',
    referencia: `${this.data.record.ProcessoStamp}`,
    usuario
  };
  this.remoteSrv
  .MetodoGenerico(proc)
  .pipe(
    finalize(() => {
      this.isLoading = false;
    })
  )
  .subscribe(res => {
    this.list = res.data;


    this.totalRecords = res.totalCount;
    this.pagenumber = res.currentPageNumber;
    this.pagesize = res.pageSize;
    this.pagetotalrecord=res.totalCount;
    this.total=res.totalCount;
    this.isLoading = false;
  });

  if(this.data.record.paraquem=='Novatosigex'){

    this.registerForm.patchValue(
      {
  entradaStamp:this.data.record.entradaStamp,
  conselhoColectivos: this.data.record.conselhoColectivos,
  conselhoCoodenador: this.data.record.conselhoCoodenador,
  conselhoDefesaNaciona: this.data.record.conselhoDefesaNaciona,
  conselhoTecnicoGeral: this.data.record.conselhoTecnicoGeral,
  consultivo: this.data.record.consultivo,
  conselhoDireccao: this.data.record.conselhoDireccao,
  processoStamp: this.data.record.processo.processoStamp,
  numeroEntrada: this.data.record.numeroEntrada,
  docPdf: this.data.record.docPDF,
  remetente: this.data.record.remetente,
  orgaoProcedencia: this.data.record.orgaoProcedencia,
  orgaoproce1: this.data.record.orgaoProcedencia,
  direcProcedencia: this.data.record.direcProcedencia,
  direcaoproce1: this.data.record.direcProcedencia,
  depProcedencia: this.data.record.depProcedencia,
  dataEntrada: this.data.record.dataEntrada,
  tipoDoc: this.data.record.processo.tipoDoc,
  classificador: this.data.record.classificador,
  direcaoOrigem: this.data.record.direcaoOrigem,
  orgaoOrigem: this.data.record.orgaoOrigem,
  grauClassifi: this.data.record.grauClassifi,
  grauconf: String(this.data.record.grauClassifi).toUpperCase(),
  nvlUrgencia: this.data.record.nvlUrgencia,
  nvlUrgencias:this.data.record.nvlUrgencia,
  numeroOrdem: this.data.record.numeroOrdem,
  despacho: this.data.record.despacho,
  dataDocumento: this.data.record.dataDocumento,
  endereco: this.data.record.endereco,
  observacao: this.data.record.observacao,
  qtdFolhas: this.data.record.qtdFolhas,
  qtdExemplares: this.data.record.qtdExemplares,
  qtdAnexo: this.data.record.qtdAnexo,
  orgaoUtilizador: this.data.record.orgaoUtilizador,
  direcUtilizador: this.data.record.direcUtilizador,
  depUtilizador: this.data.record.depUtilizador,
  orgaostamp: this.data.record.orgaostamp,
  departamentostamp: this.data.record.departamentostamp,
  direcaostamp: this.data.record.direcaostamp,
  tdocAniva: this.data.record.tdocAniva,
  pathPdf: this.data.record.pathPdf,
  path: this.data.record.path,
  path1: this.data.record.path1,
  firstName: '',
  direcaoOrigem1: String(this.data.record.direcaoOrigem).toUpperCase(),
  orgaoOrigem1: String(this.data.record.orgaoOrigem).toUpperCase(),
  especieclas: String(this.data.record.classificador).toUpperCase(),
  paraquem:''
    }
  );
  this.processo=this.data.record.processo;
  this.registerForm.patchValue({
    visado:this.processo.visado,
  });
  return;
  }
  //
this.isLoadingProcesso=true;
this.columnsDestinatarios = [
  { header: 'Órgão', field: 'orgao',sortable: true,minWidth: 300 },
  { header: 'Direcção', field: 'descricao',sortable: true,minWidth: 300,pinned: 'right', },
  { header: 'Recebido por', field: 'unidadeStamp',minWidth: 300,pinned: 'right'},
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
        icon: 'history',
        tooltip:'Detalhes da Saída',
        click: record => this.Versaidas(record),
      },
    ],
  }
];
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
recebido: [true],
numeroEntrada: [6,Validators.min(1)],
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
obrigatoriedadedestinatarios: ['valido',Validators.required],
paraquem:[''],
nome:['']
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
  this.GetDestinatariosMethod();
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
    let processoStamps=this.auth.Stamp();
    if(this.processo.processoStamp!=typeof(undefined)){
      processoStamps=this.processo.processoStamp;
    }

const dClinicos:DClinicos={
      paStamp: '',
      dadosAnamense: '',
      examesObjectivos: '',
      examesClinicos: '',
      diaDef: '',
      conclusao: '',
      inseriu: '',
      inseriuDataHora: '',
      alterou: '',
      alterouDataHora: ''
    };

    const pa:Pa={
      paStamp: '',
      nome: '',
      sexo: '',
      numBi: '',
      naturalidade: '',
      resProv: '',
      resDist: '',
      resPosto: '',
      resLocal: '',
      resBairro: '',
      resQuarteirao: '',
      resAvenida: '',
      numCasa: '',
      conPrinc: '',
      conAlter: '',
      ramo: '',
      orgao: '',
      unidade: '',
      subunidade: '',
      patente: '',
      catpat: '',
      inseriu: '',
      inseriuDataHora: '',
      alterou: '',
      alterouDataHora: '',
      tipodoc: '',
      activo: false,
      path: '',
      dClinicos,
      processo: [],
      junta: '',
      juntaHom: '',
      scanDoc: [],
      path1: ''
    };
//const value=this.auth.InicializarProcesso('');

    const processo:Processo={
      processoStamp: processoStamps,
      numero: this.registerForm.get('numeroEntrada')!.value,
      tipoDoc: this.registerForm.get('classificador')!.value,
      assunto: this.registerForm.get('tipoDoc')!.value,
      inseriu: usuario.nome,
      inseriuDataHora: this.auth.ConvertDate(new Date()),
      alterou: usuario.nome,
      alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
      orgao: usuario.orgao,
      direcao: usuario.direcao,
      departamento: usuario.departamento,
      orgaostamp: usuario.orgaostamp,
      departamentostamp: usuario.departamentostamp,
      direcaostamp: usuario.direcaostamp,
      estado: this.registerForm.get('estado')!.value,
      visado: this.registerForm.get('visado')!.value,
      usrstamp: usuario.paStamp!,
      homologado: '',
      paStamp: '',
      pa,
      entradaProcesso: []
    };
const arquivo:Arquivo={
  arquivoStamp: '',
  processoStamp: '',
  localizacao: '',
  dataArquivo: this.auth.ConvertDate(new Date('2007-01-01')),
  numeroArquivo: 0,
  inseriu: '',
  inseriuDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
  alterou: '',
  alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
  activo: false,
  pasta: '',
  path1: '',
  scanDoc: [],
  orgaoUtilizador: '',
  direcUtilizador: '',
  depUtilizador: '',
  path: '',
  tdocAniva: '',
  classificador: null,
  grauClassifi: '',
  nvlUrgencia: '',
  despacho: '',
  detalhesAssunto: '',
  assunto: '',
  qtdFolhas: '',
  qtdExemplares: '',
  qtdAnexo: '',
  orgaoProcedencia: '',
  direcProcedencia: '',
  depProcedencia: '', processo,
  paraquem: '',
  endereco: '',
  direcaoOrigem: '',
  orgaoOrigem: ''
};
const entrda:EntradaProcesso={
  entradaStamp: this.registerForm.get('entradaStamp')!.value,
  conselhoColectivos: this.registerForm.get('conselhoColectivos')!.value,
  conselhoCoodenador: this.registerForm.get('conselhoCoodenador')!.value,
  conselhoDefesaNaciona: this.registerForm.get('conselhoDefesaNaciona')!.value,
  conselhoTecnicoGeral: this.registerForm.get('conselhoTecnicoGeral')!.value,
  consultivo: this.registerForm.get('consultivo')!.value,
  conselhoDireccao: this.registerForm.get('conselhoDireccao')!.value,
  processoStamp: this.registerForm.get('processoStamp')!.value,
  numeroEntrada: this.registerForm.get('numeroEntrada')!.value,
  docPdf: this.registerForm.get('docPdf')!.value,
  remetente: this.registerForm.get('remetente')!.value,
  orgaoProcedencia: this.registerForm.get('orgaoProcedencia')!.value,
  direcProcedencia: this.registerForm.get('direcProcedencia')!.value,
  depProcedencia: this.registerForm.get('depProcedencia')!.value,
  dataEntrada: new Date(), //this.auth.ConvertDate(new Date()),
  tipoDoc: this.registerForm.get('tipoDoc')!.value,
  classificador: this.registerForm.get('classificador')!.value,
  direcaoOrigem: this.registerForm.get('direcaoOrigem')!.value,
  orgaoOrigem: this.registerForm.get('orgaoOrigem')!.value,
  grauClassifi: this.registerForm.get('grauClassifi')!.value,
  nvlUrgencia: this.registerForm.get('nvlUrgencia')!.value,
  numeroOrdem: this.registerForm.get('numeroOrdem')!.value,
  despacho: this.registerForm.get('despacho')!.value,
  dataDocumento: this.registerForm.get('dataDocumento')!.value,
  endereco: this.registerForm.get('endereco')!.value,
  observacao: this.registerForm.get('observacao')!.value,
  qtdFolhas: this.registerForm.get('qtdFolhas')!.value,
  qtdExemplares: this.registerForm.get('qtdExemplares')!.value,
  qtdAnexo: this.registerForm.get('qtdAnexo')!.value,
  orgaoUtilizador: usuario.orgao,
  direcUtilizador: usuario.direcao,
  depUtilizador: usuario.direcaostamp,
  orgaostamp: usuario.orgaostamp!,
  departamentostamp: usuario.departamentostamp,
  direcaostamp: usuario.direcaostamp,
  tdocAniva: this.registerForm.get('tdocAniva')!.value,
  pathPdf: this.registerForm.get('pathPdf')!.value,
  path: this.registerForm.get('path')!.value,
  path1: this.registerForm.get('path1')!.value,
  inseriu: usuario.nome,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.direcaostamp,
  alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
  recebido: Boolean(this.registerForm.get('recebido')!.value),
  processo,
  direcaoOrigemStamp: '',
  orgaoOrigemstamp: '',
  detalhesAssunto: '',
  vindoDeQuemquem: '',
  paraquem: '',
  arquivo,
  saidaStamp: '',
  provProveniencia: '',
  numero: '',
  documento: '',
  proveniencia: '',
  ano: null,
  saidaProcesso: [],
  assunto: this.registerForm.get('assunto')!.value
};

this.auth
      .InserirEntradas(entrda)
      .pipe()
      .subscribe({
        next: (data) => {
          if(data.sucesso==true){
            this.dialog.alert(`Dados inseridos com sucesso!`);
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
