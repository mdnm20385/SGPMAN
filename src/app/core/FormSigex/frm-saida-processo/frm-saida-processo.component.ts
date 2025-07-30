import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { AuthService, Usuario } from '@core/authentication';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared';
import { selects, condicoesprocura } from 'app/classes/CampoSessoes';
import { Arquivo, EntradaProcesso, Processo, SaidaProcesso, Unidade } from 'app/classes/ClassesSIGEX';
import { ServicoGeral } from 'app/classes/interfacesBuscas/servico-geral';
import { Procura, Selects } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { VerVisualizadorFicheirosComponent } from '../ver-visualizador-ficheiros/ver-visualizador-ficheiros.component';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-frm-saida-processo',
  templateUrl: './frm-saida-processo.component.html',
  styleUrl: './frm-saida-processo.component.scss',
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
    MtxSelectModule, MatTabsModule,
    CommonModule,
    MtxGridModule,
    MatRadioModule,
    MatSlideToggleModule],
  providers: [TablesRemoteDataService],
})
export class FrmSaidaProcessoComponent
implements OnInit,AfterViewInit{
  titulocarregar: any;
  fileName: any;
  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef,
    private fbs: FormBuilder){
  }
   translatex = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  ngAfterViewInit(): void {
   this.SetarCombos();
    this.FillControlos();
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  search() {
    this.query.page = 0;
  }
  SetarCombos(){
 this.Getorgao();
    this.GetEspecieDocumental();
    this.GetEspecieParametrizacao();

  }
  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }
  columns: MtxGridColumn[] = [

    { header: 'Descrição do Ficheiro', field: 'Descricao',sortable: true,minWidth: 300 },
    { header: 'Data de criação', field: 'DataArquivo',sortable: true,minWidth: 120, type: 'date',
      pinned: 'right',
      typeParameter: {
        format: 'dd/MM/yyyy', // Specify your desired date format here
        locale: 'en-US' // Optionally, specify the locale
      }},
    {
      header: 'Ver anexo',
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
busca(event: Event){
  const target = event.target as HTMLInputElement;
  const value = target.value.toLowerCase();
  this.listdestinatario = this.listdestinatarioGeral.filter(x =>{
    return x.descricao.toLowerCase().includes(value) || x.orgao.toLowerCase().includes(value) ;
  });

this.RecheckMethod();
}

@ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;

columnsDestinatarios: MtxGridColumn[] = [];

isAllSelecteddmz() {
  const numSelected = this.selectiondmz.selected.length;
  const numRows = this.listdestinatario.length;

  return numSelected === numRows;
}
selectiondmz = new SelectionModel<any>(true, []);


masterToggledmz() {
  this.isAllSelecteddmz() ? this.selectiondmz.clear() :
   this.listdestinatario.forEach(row => this.selectiondmz.select(row));
let bol=false;
this.Seleccionartodos=false;
if (this.selectiondmz.selected.length>0){
  bol=true;
  this.Seleccionartodos=true;
  this.registerForm.patchValue({
    obrigatoriedadedestinatarios:'valido'
});

}else{

this.registerForm.patchValue({
  obrigatoriedadedestinatarios:''
});
}
      for (let i = 0; i < this.listdestinatario.length; i++) {
        this.listdestinatario[i].cibm = bol;

          }
          for (let i = 0; i < this.listdestinatarioGeral.length; i++) {
            this.listdestinatarioGeral[i].cibm = bol;
              }

              }


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

FillControlos(){

  if(this.data.record.paraquem=='Novatosigex'){
    this.columnsDestinatarios = [
      { header: 'Órgão', field: 'orgao',sortable: true,minWidth: 300 ,hide:true},
      { header: 'Direcção', field: 'descricao',sortable: true,minWidth: 300 },
      { header: 'Marcar', field: 'cibm', cellTemplate: this.statusTpl ,width:'50px'},
    ];
    this.GetDestinatarios();
    this.registerForm.patchValue(
      {
        entradaStamp:this.data.record.entradaStamp,
        saidaStamp: this.data.record.saidaStamp,
        pathPdf: this.data.record.pathPdf,
        numeroSaida: this.data.record.numeroSaida,
        docPDF: this.data.record.docPDF,
        destinatario: this.data.record.destinatario,
        orgaoDest: this.data.record.orgaoDest,
        direcDest: this.data.record.direcDest,
        depDest: this.data.record.depDest,
        dataSaida: this.data.record.dataSaida,
        classificador: this.data.record.classificador,
        entregue:this.data.record.entregue,
        direcaoOrigem: this.data.record.direcaoOrigem,
        orgaoorigem: this.data.record.orgaoorigem,
        direcaoOrigemNaSaida: this.data.record.direcaoOrigemNaSaida,
        orgaoorigemNaSaida: this.data.record.orgaoorigemNaSaida,
        numeroOrdem: this.data.record.numeroOrdem,
        despacho: this.data.record.despacho,
        dataDocumento: this.data.record.dataDocumento,
        endereco: this.data.record.endereco,
        observacao: this.data.record.observacao,
        detalhesAssunto: this.data.record.observacao,
        assunto: this.data.record.assunto,
        qtdFolhas: this.data.record.qtdFolhas,
        qtdExemplares: this.data.record.qtdExemplares,
        qtdAnexo: this.data.record.qtdAnexo,
        path1: this.data.record.path1,
         processoStamp: this.data.record.processo.processoStamp,
           alterou:this.data.record.alterou,
         tipoDoc: this.data.record.processo.tipoDoc,
         nvlUrgencias: this.data.record.nvlUrgencia,
         nvlUrgencia: this.data.record.nvlUrgencia,
         grauClassifi: this.data.record.grauClassifi,
         estadotramitat: this.data.record.processo.estado,
         grauconf: String(this.data.record.grauClassifi).toUpperCase(),
visado: '',
direcaoOrigem1: String(this.data.record.direcaoOrigem).toUpperCase(),
orgaoOrigem1: String(this.data.record.orgaoorigem).toUpperCase(),
especieclas: String(this.data.record.classificador).toUpperCase(),
destinatario1: String(this.data.record.destinatario).toUpperCase(),
firstName:this.data.record.endereco,
    }
  );
  this.processo=this.data.record.processo;

  this.titulocarregar=`Carregue um ficheiro`;

  this.fileName='';
  return;
  }
  this.columnsDestinatarios = [
    { header: 'Órgão', field: 'orgao',sortable: true,minWidth: 300 },
    { header: 'Direcção', field: 'descricao',sortable: true,minWidth: 300,pinned: 'right', },
    { header: 'Recebido por', field: 'unidadeStamp',minWidth: 300,pinned: 'right'},
  ];
this.isLoadingProcesso=true;
  this.registerForm.patchValue(
    {
      entradaStamp:this.data.record.EntradaStamp,
      saidaStamp:this.data.record.SaidaStamp,
      pathPdf:this.data.record.PathPdf,
      numeroSaida:this.data.record.NumeroSaida,
      docPDF:this.data.record.DocPDF,
      destinatario:this.data.record.Destinatario,
      orgaoDest:this.data.record.OrgaoDest,
      direcDest:this.data.record.DirecDest,
      depDest:this.data.record.DepDest,
      dataSaida:this.data.record.DataSaida,
      inseriu:this.data.record.Inseriu,
      inseriuDataHora:this.data.record.InseriuDataHora,
      alterou:this.data.record.Alterou,
      alterouDataHora:this.data.record.AlterouDataHora,
      classificador:this.data.record.Classificador,
      entregue:this.data.record.Entregue,
      direcaoOrigem:this.data.record.DirecaoOrigem,
      orgaoorigem:this.data.record.Orgaoorigem,
      direcaoOrigemNaSaida:this.data.record.DirecaoOrigemNaSaida,
      orgaoorigemNaSaida:this.data.record.OrgaoorigemNaSaida,
      numeroOrdem:this.data.record.NumeroOrdem,
      despacho:this.data.record.Despacho,
      dataDocumento:this.data.record.DataDocumento,
      endereco:this.data.record.Endereco,
      firstName:this.data.record.Endereco,
      observacao:this.data.record.Observacao,
      detalhesAssunto: this.data.record.Observacao,
      assunto:this.data.record.Assunto,
      qtdFolhas:this.data.record.QtdFolhas,
      qtdExemplares:this.data.record.QtdExemplares,
      qtdAnexo:this.data.record.QtdAnexo,
      processoStamp:this.data.record.ProcessoStamp,
      nvlUrgencias: this.data.record.NvlUrgencia,
      nvlUrgencia: this.data.record.NvlUrgencia,
grauClassifi: this.data.record.GrauClassifi,
grauconf: String(this.data.record.GrauClassifi).toUpperCase(),
visado:'',
direcaoOrigem1: String(this.data.record.DirecaoOrigem).toUpperCase(),
orgaoOrigem1:String(this.data.record.Orgaoorigem).toUpperCase(),
especieclas: String(this.data.record.Classificador).toUpperCase(),
destinatario1: String(this.data.record.Destinatario).toUpperCase(),
  }
);

this.fileName=this.data.record.pathPdf;
if(this.fileName=='' || this.fileName==null ||
  this.fileName==undefined || this.fileName==typeof(undefined)
|| this.fileName.length<=0){
  this.titulocarregar=`Carregue um ficheiro`;
} else{
  this.titulocarregar=``;
}

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

//const filename=file.name.replace(`.${ext}`,'');
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
      saidaStamp: [''],
      pathPdf: [''],
      numeroSaida: [0],
      docPDF: [''],
      destinatario: [''],
      destinatario1: [''],
      orgaoDest: [''],
      direcDest: [''],
      depDest: [''],
      dataSaida: [''],
      inseriu: [''],
      inseriuDataHora: [''],
      alterou: [''],
      alterouDataHora: [''],
      classificador: [''],
      entregue: [false],
      direcaoOrigem: [''],
      orgaoorigem: [''],
      direcaoOrigemNaSaida: [''],
      orgaoorigemNaSaida: [''],
      numeroOrdem: [''],
      despacho: [''],
      dataDocumento: [this.auth.ConvertDate(new Date())],
      endereco: [''],
      observacao: [''],
      assunto: [''],
      qtdFolhas: [''],
      qtdExemplares: [''],
      qtdAnexo: [''],
      path1: [''],
      processoStamp: [''],
      paraquem: [''],
      tdocAniva: [''],
      grauClassifi: [''],
    nvlUrgencia: [''],
orgaoOrigem: ['',Validators.required],
estadotramitat:[''],
tipoDoc:[''],
direcaoOrigem1:  [''],
orgaoOrigem1:  [''],
direcaoproce1:  [''],
orgaoproce1:  [''],
especieclas:[''],
orgaostamp:[''],
orgaoProcedencia: [''],
direcProcedencia: [''],
estado: [''],
visado: [''],
detalhesAssunto: [''],
remetente: [''],
numeroEntrada: [''],
grauconf: [''],
nvlUrgencias: [''],
firstName:[''],
obrigatoriedadedestinatarios: ['',Validators.required],
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
    usuario.inseriu='saida';
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
           tipoDoc: res.dados.tipoDoc,
      });
    });

    usuario.inseriu='ScanDoc';
   const     ondicao=`  saidaStamp='${this.data.record.SaidaStamp}'`;
  this.ScanDocMethod(ondicao,usuario,1,50);


this.GetDestinatariosMethod();

  }
  GetDestinatarios(){
    const usuario=this.auth.obterSessao() as Usuario;
    if(this.auth.isAutenticated()==false || usuario ==null || usuario.activopa==false){
return;
    }

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
  GetDestinatariosMethod(){

    const usuario:Selects={
      chave: '',
      descricao: `select OrgaoUtilizador orgao,DirecUtilizador descricao,
       alterou unidadeStamp from EntradaProcesso where SaidaStamp='${this.data.record.SaidaStamp}'`,
      ordem: ''
    };
    this.remoteSrv
    .GenDt(usuario)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe(res => {
       this.listdestinatario = res;
       this.listdestinatarioGeral= res;
      this.totalRecordsdest=res.length;
    });

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
  selectedRows: any[] = [];
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
  condicao=`saidaStamp='${this.data.record.SaidaStamp}' and  descricao like '%${this.params.q}%' `;
}else{
  condicao=`saidaStamp='${this.data.record.SaidaStamp}'`;
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
listdestinatario: any[] = [];
listdestinatarioGeral: any[] = [];
  ngOnInit(): void {




  }

  Salvar(){
    const cun=this.listdestinatarioGeral as Unidade[];
    const usr=this.auth.obterSessao() as Usuario;
    if(this.auth.isAutenticated()===false || usr==null || usr.activopa==false){
     this.dialog.alert(`Não possui permissão para executar a operação, contacte o administrador!`);
        return;
    }
    const usuario=usr;
    let processoStamps=this.auth.Stamp();
   const todostrue= cun.filter((item: { cibm: any; }) => String(Boolean(item.cibm)).toLowerCase() == 'true');
    if(todostrue.length==0){
     this.dialog.alert(`Não marcou nenhum destinatário! por favor, marque!`);
      return;
    }
    let dest='';
if(todostrue.length>0){
dest=todostrue[0].descricao!;
}
    if(this.processo.processoStamp!=typeof(undefined)){
      processoStamps=this.processo.processoStamp;
    }

  const pa=this.auth.InicializarPaciente();
    const processo:Processo={
      processoStamp: processoStamps,
      numero: this.registerForm.get('numeroSaida')!.value,
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
      estado: this.registerForm.get('estadotramitat')!.value,
      visado: '',
      usrstamp: usuario.paStamp!,
      homologado: '',
      paStamp: '',
      pa,
      entradaProcesso: []
    };


const entradaProces=this.auth.InicializarProcesso('');
const entrada=entradaProces.entradaProcesso[0];
const entrda:SaidaProcesso={
  entradaStamp: this.registerForm.get('entradaStamp')!.value,
  saidaStamp: this.registerForm.get('saidaStamp')!.value,
  pathPdf: this.registerForm.get('pathPdf')!.value,
  numeroSaida: this.registerForm.get('numeroSaida')!.value,
  docPDF: '',
  destinatario: dest,
  orgaoDest: this.registerForm.get('orgaoDest')!.value,
  direcDest: this.registerForm.get('direcDest')!.value,
  depDest: this.registerForm.get('depDest')!.value,
  dataSaida: this.registerForm.get('dataSaida')!.value,
  inseriu: usuario.nome,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.nome,
  alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
  classificador: this.registerForm.get('classificador')!.value,
  entregue: this.registerForm.get('entregue')!.value,
  direcaoOrigem: this.registerForm.get('direcaoOrigem')!.value,
  orgaoorigem: this.registerForm.get('orgaoOrigem')!.value,
  direcaoOrigemNaSaida: this.registerForm.get('direcaoOrigemNaSaida')!.value,
  orgaoorigemNaSaida: this.registerForm.get('orgaoorigemNaSaida')!.value,
  numeroOrdem: this.registerForm.get('numeroOrdem')!.value,
  despacho: this.registerForm.get('despacho')!.value,
  dataDocumento: new Date(this.registerForm.get('dataDocumento')!.value),
  endereco: this.registerForm.get('endereco')!.value,
  observacao: this.registerForm.get('detalhesAssunto')!.value,
  assunto: processo.assunto!,
  qtdFolhas: this.registerForm.get('qtdFolhas')!.value,
  qtdExemplares: this.registerForm.get('qtdExemplares')!.value,
  qtdAnexo: this.registerForm.get('qtdAnexo')!.value,
  processoStamp: this.registerForm.get('processoStamp')!.value,
  processo,
  path1: this.registerForm.get('path1')!.value,
  paraquem: '',
  tdocAniva: this.registerForm.get('tdocAniva')!.value,
  grauClassifi: this.registerForm.get('grauClassifi')!.value,
  nvlUrgencia: this.registerForm.get('nvlUrgencia')!.value,
  listaDestinatarios: todostrue,
  entradaProcesso: entrada,
  visado: '',
  recebeu: '',
  numero: '',
  protocolo: 0,
  ano: this.auth.ConvertDate(new Date())
};


this.auth
      .InserirSaida(entrda)
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
  verNotificacion(row:any) {
    if(this.isLoadingProcesso==false){
    if(row.rowData.cibm==true){
      row.rowData.cibm=false;
    }else{
      row.rowData.cibm=true;
    }

const index = this.listdestinatarioGeral.findIndex( x => x.descricao === row.rowData.descricao
   &&  x.orgao === row.rowData.orgao);
this.listdestinatarioGeral.forEach((item, indexs) => {
if(indexs!=index){
   this.listdestinatarioGeral[indexs].cibm=false;
}
});
   this.listdestinatarioGeral[index].cibm=row.rowData.cibm;
   const todostrue= this.listdestinatarioGeral.filter((item: { cibm: any; }) => String(Boolean(item.cibm)).toLowerCase() == 'true');
   if(todostrue.length==0){
    this.registerForm.patchValue({
      obrigatoriedadedestinatarios:''
  });
   }
   else{
    this.registerForm.patchValue({
      obrigatoriedadedestinatarios:'valido'
  });
   }
  }
this.RecheckMethod();
}

RecheckMethod(){
const verf=  this.listdestinatario.filter((item: { cibm: any; }) => String(Boolean(item.cibm)).toLowerCase() == 'false');
if(verf.length>0){
this.Seleccionartodos=false;
for (let i = 0; i < verf.length; i++) {
      verf[i].cibm = false;
     this.selectiondmz.toggle(verf[i]);
    }
}else{
 const slt=this.listdestinatario.filter((item: { cibm: any; }) => String(Boolean(item.cibm)).toLowerCase() == 'true');
    this.Seleccionartodos=true;
      for (let i = 0; i < slt.length; i++) {
        slt[i].cibm = true;
    this.selectiondmz.toggle(slt[i]);
    this.selectiondmz.select(slt[i]);
      }
      this.listdestinatario.forEach(row => this.selectiondmz.select(row));
}
}
Seleccionartodos= false;
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
dDestinatarioslista:selects[]=[];
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
              this.dDestinatarioslista = busca.filter(person => person.ordem =='47'
                );

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
      direcaoOrigem:'',
      orgaoOrigem:''
    });
  }

  onEspecieChange(event: any): void {

    this.registerForm.patchValue({
      tipoDoc:event.descricao,
      classificador:event.ordem,
    });
  }
  onClearonEspecie(){
    this.registerForm.patchValue({
      tipoDoc:'',
      classificador:'',
    });
  }
  onSelectorgaoChange(event: any): void {
    this.selectdirecoes= [];
    this.registerForm.get('direcaoOrigem1')?.setValue('');

    this.registerForm.patchValue({
      orgaoOrigem:event.descricao,
      orgaostamp:event.chave,
      orgaoorigem:event.descricao,
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
  onClearonDirecao(){
    this.registerForm.patchValue({
      direcaoOrigem:''
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
  }onClearEstadotramitaca(){
    this.registerForm.patchValue({
      estado:'',
    });
  }
  onDestinatarioChange(event: any): void {
    this.registerForm.patchValue({
      destinatario:event.descricao,

    });
  }
  ClearDestinarios(): void {
    this.registerForm.patchValue({
      destinatario:'',
      destinatario1:'',
    });
  }
  ongrauClassifiChange(event: any): void {
    this.registerForm.patchValue({
      grauClassifi:event.descricao,
    });
  }
  onCleargrauClassifi(){
    this.registerForm.patchValue({
      grauClassifi:'',
    });
  }
   onnvlUrgenciaChange(event: any): void {
    this.registerForm.patchValue({
      nvlUrgencia:event.descricao,
    });
  }
  onClearvlUrgenciaChange(): void {
    this.registerForm.patchValue({
      nvlUrgencia:'',
    });
  }
}





