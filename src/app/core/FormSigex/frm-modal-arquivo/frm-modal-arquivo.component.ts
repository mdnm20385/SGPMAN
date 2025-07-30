import { JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { Usuario, AuthService } from '@core/authentication';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridModule, MtxGridColumn } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared';
import { selects, condicoesprocura } from 'app/classes/CampoSessoes';
import { SaidaProcesso, Processo, Arquivo, EntradaProcesso } from 'app/classes/ClassesSIGEX';
import { ServicoGeral } from 'app/classes/interfacesBuscas/servico-geral';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { FrmSaidaProcessoComponent } from '../frm-saida-processo/frm-saida-processo.component';
import {  VerVisualizadorFicheirosComponent } from '../ver-visualizador-ficheiros/ver-visualizador-ficheiros.component';

@Component({
  selector: 'app-frm-modal-arquivo',
  templateUrl: './frm-modal-arquivo.component.html',
  styleUrl: './frm-modal-arquivo.component.scss', standalone: true,
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
    MatRadioModule],
  providers: [TablesRemoteDataService],
})
export class FrmModalArquivoComponent

implements OnInit,AfterViewInit{
  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef){

  }

  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;
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



  fileName: any;
  titulocarregar:any;
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
busca(event: Event){
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

 }

   translatex = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  ngAfterViewInit(): void {
    this.Getorgao();
    this.GetEspecieDocumental();
    this.GetEspecieParametrizacao();
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
  if(this.data.record.paraquem=='Novatosigex'){
    this.registerForm.patchValue(
      {
  arquivoStamp:this.data.record.arquivoStamp,
  processoStamp: this.data.record.processo.processoStamp,
  numeroArquivo: this.data.record.numeroArquivo,
  pasta: this.data.record.pasta,
  localizacao: this.data.record.localizacao,
  orgaoProcedencia: this.data.record.orgaoProcedencia,
  orgaoproce1: this.data.record.orgaoProcedencia,
  direcProcedencia: this.data.record.direcProcedencia,
  direcaoproce1: this.data.record.direcProcedencia,
  depProcedencia: this.data.record.depProcedencia,
  dataArquivo: this.data.record.dataArquivo,
  classificador: this.data.record.classificador,
  direcaoOrigem: this.data.record.direcaoOrigem,
  orgaoOrigem: this.data.record.orgaoOrigem,
  grauClassifi: this.data.record.grauClassifi,
  grauconf: String(this.data.record.grauClassifi).toUpperCase(),
  nvlUrgencia: this.data.record.nvlUrgencia,
  nvlUrgencias:this.data.record.nvlUrgencia,
  despacho: this.data.record.despacho,
  qtdFolhas: this.data.record.qtdFolhas,
  qtdExemplares: this.data.record.qtdExemplares,
  qtdAnexo: this.data.record.qtdAnexo,
  orgaoUtilizador: this.data.record.orgaoUtilizador,
  direcUtilizador: this.data.record.direcUtilizador,
  depUtilizador: this.data.record.depUtilizador,
  tdocAniva: this.data.record.tdocAniva,
  path: this.data.record.path,
  path1: this.data.record.path1,
  direcaoOrigem1: String(this.data.record.direcaoOrigem).toUpperCase(),
  orgaoOrigem1: String(this.data.record.orgaoOrigem).toUpperCase(),
  especieclas: String(this.data.record.classificador).toUpperCase(),
  endereco: this.data.record.endereco,
    }
  );
  this.processo=this.data.record.processo;
  this.titulocarregar=`Carregue um ficheiro`;

  this.fileName='';
  return;
  }
  //
this.isLoadingProcesso=true;
  this.registerForm.patchValue(
    {arquivoStamp:this.data.record.ArquivoStamp,
      localizacao: this.data.record.Localizacao,
      processoStamp: this.data.record.ProcessoStamp,
      numeroArquivo: this.data.record.NumeroArquivo,
      pasta: this.data.record.Pasta,
      orgaoProcedencia: this.data.record.OrgaoProcedencia,
      orgaoproce1: this.data.record.OrgaoProcedencia,
      direcProcedencia: this.data.record.DirecProcedencia,
      direcaoproce1: this.data.record.DirecProcedencia,
      depProcedencia: this.data.record.DepProcedencia,
      dataArquivo: this.data.record.DataArquivo,
      classificador: this.data.record.Classificador,
      direcaoOrigem: this.data.record.DirecaoOrigem,
      orgaoOrigem: this.data.record.OrgaoOrigem,
      grauClassifi: this.data.record.GrauClassifi,
      grauconf: String(this.data.record.GrauClassifi).toUpperCase(),
      nvlUrgencia: this.data.record.NvlUrgencia,
      nvlUrgencias:this.data.record.NvlUrgencia,
      despacho: this.data.record.Despacho,
      qtdFolhas: this.data.record.QtdFolhas,
      qtdExemplares: this.data.record.QtdExemplares,
      qtdAnexo: this.data.record.QtdAnexo,
      orgaoUtilizador: this.data.record.OrgaoUtilizador,
      direcUtilizador: this.data.record.DirecUtilizador,
      depUtilizador: this.data.record.DepUtilizador,
      tdocAniva: this.data.record.TdocAniva,
      path: this.data.record.Path,
      path1: this.data.record.Path1,
      endereco: this.data.record.endereco,
      direcaoOrigem1: String(this.data.record.DirecaoOrigem).toUpperCase(),
      orgaoOrigem1: String(this.data.record.OrgaoOrigem).toUpperCase(),
      especieclas: String(this.data.record.Classificador).toUpperCase(),
  }
);

this.fileName=this.data.record.Path;
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

    this.registerForm.patchValue({tdocAniva:file.name,
      path:file.name,
    });
    this.fileName=file.name;
    if(this.fileName=='' || this.fileName==null ||
      this.fileName==undefined || this.fileName==typeof(undefined)
    || this.fileName.length<=0){
      this.titulocarregar=`Carregue um ficheiro`;
    } else{
      this.titulocarregar=``;
    }
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
    {arquivoStamp: ['',Validators.required],
      processoStamp: ['',Validators.required],
      localizacao: ['',Validators.required],
      dataArquivo: [new Date()],
      numeroArquivo: [0,Validators.min(1)],
      inseriu: '',
      inseriuDataHora:  [this.auth.ConvertDate(new Date('2007-01-01'))],
      alterou: '',
      alterouDataHora:  [this.auth.ConvertDate(new Date('2007-01-01'))],
      activo: [true],
      pasta: ['',Validators.required],
      path1: ['',Validators.required],
      orgaoUtilizador: ['',Validators.required],
      direcUtilizador: ['',Validators.required],
      depUtilizador: [''],
      path: [''],
      tdocAniva: [''],
      classificador: ['',Validators.required],
      grauClassifi: [''],
      nvlUrgencia: [''],
      despacho: [''],
      detalhesAssunto: [''],
      assunto: ['',Validators.required],
      qtdFolhas: [''],
      qtdExemplares: [''],
      qtdAnexo: [''],
      orgaoProcedencia: [''],
      direcProcedencia: [''],
      depProcedencia: [''],
      orgaoproce1: [''],
      direcaoproce1:[''],
      direcaoOrigem: [''],
      orgaoOrigem:[''],
      grauconf:[''],
      direcaoOrigem1:  [''],
      orgaoOrigem1:  [''],
      especieclas:[''],
      estadotramitat:[''],
      nvlUrgencias:[''],
      estado:[''],
      visado:[''],
      tipoDoc:[''],
      endereco:[''],
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
   const  ondicao=`  ArquivoStamp='${this.data.record.ArquivoStamp}'`;
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
    usuario.inseriu='arquivo';
    let condicao='';
if(this.params.q.length>0){
  condicao=` descricao like '%${this.params.q}%' `;
}else{
  //condicao=`ArquivoStamp='${this.data.record.ArquivoStamp}'`;
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
    const pa=this.auth.InicializarPaciente();
    const processo:Processo={
      processoStamp: processoStamps,
      numero: this.registerForm.get('numeroArquivo')!.value,
      tipoDoc: this.registerForm.get('classificador')!.value,
      assunto: this.registerForm.get('assunto')!.value,
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
  arquivoStamp: this.registerForm.get('arquivoStamp')!.value,
  processoStamp: this.registerForm.get('processoStamp')!.value,
  localizacao: this.registerForm.get('localizacao')!.value,
  dataArquivo: this.auth.ConvertDate(new Date('2007-01-01')),
  numeroArquivo: Number(this.registerForm.get('numeroArquivo')!.value),
  inseriu: usuario.nome,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.direcaostamp,
  alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
  activo: true,
  pasta: this.registerForm.get('pasta')!.value,
  scanDoc: [],
  orgaoUtilizador: usuario.orgao,
  direcUtilizador: usuario.direcao,
  depUtilizador: usuario.direcaostamp,
  detalhesAssunto: this.registerForm.get('detalhesAssunto')!.value,
  assunto: this.registerForm.get('assunto')!.value,
  processo,
  orgaoProcedencia: this.registerForm.get('orgaoProcedencia')!.value,
  direcProcedencia: this.registerForm.get('direcProcedencia')!.value,
  depProcedencia: this.registerForm.get('depProcedencia')!.value,
  classificador: this.registerForm.get('classificador')!.value,
  grauClassifi: this.registerForm.get('grauClassifi')!.value,
  nvlUrgencia: this.registerForm.get('nvlUrgencia')!.value,
  despacho: this.registerForm.get('despacho')!.value,
  qtdFolhas: this.registerForm.get('qtdFolhas')!.value,
  qtdExemplares: this.registerForm.get('qtdExemplares')!.value,
  qtdAnexo: this.registerForm.get('qtdAnexo')!.value,
  tdocAniva: this.registerForm.get('tdocAniva')!.value,
  path: this.registerForm.get('path')!.value,
  path1: this.registerForm.get('path1')!.value,
  paraquem: '',
  endereco: this.registerForm.get('endereco')!.value,
  direcaoOrigem: this.registerForm.get('direcaoOrigem')!.value,
  orgaoOrigem: this.registerForm.get('orgaoOrigem')!.value,
};

this.auth
      .InserirArquivo(arquivo)
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
      direcaoOrigem:'',
      orgaoOrigem:''
    });
  }

  onEspecieChange(event: any): void {
    this.registerForm.patchValue({
      assunto:event.descricao,
      classificador:event.ordem,
      tipoDoc:event.descricao,
    });
  }
  onClearEspecieChange(){
    this.registerForm.patchValue({
      assunto:'',
      classificador:'',
      tipoDoc:''
    });
  }
  onSelectorgaoChange(event: any): void {

    this.selectdirecoes= [];
    this.registerForm.get('direcaoOrigem1')?.setValue('');
    this.registerForm.patchValue({
      orgaoOrigem:event.descricao,
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
  onClearDirecaoChange(){
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
  @ViewChild('iframeRef', { static: false })
  iframe!: ElementRef;

  isImageLoaded = false;

  // Função chamada quando o iframe carrega
  onIframeLoad() {
    const iframe = this.iframe.nativeElement;
    const iframeDocument = iframe.contentWindow.document;

    // Verifica se há uma tag <img> dentro do iframe
    const imgElement = iframeDocument.querySelector('img');
    this.isImageLoaded = imgElement !== null;
  }

  // Função para imprimir o conteúdo do iframe
  imprimirIframe() {
    const iframe = this.iframe.nativeElement;
    const iframeWindow = iframe.contentWindow;

    // Verifique se o conteúdo do iframe é carregado
    if (iframeWindow) {
      iframeWindow.focus();
      iframeWindow.print();
    }
  }
  onDirecaoprocendiaChange(event: any): void {
    this.registerForm.patchValue({
      direcProcedencia:event.descricao,
    });
  }
  onClearDirecaoprocendiaChange(){
    this.registerForm.patchValue({
      direcProcedencia:''
    });
  }

  onEstadotramitacaChange(event: any): void {
    this.registerForm.patchValue({
      estado:event.descricao,
    });
  }
  onClearEstadotramitacaChange(){
    this.registerForm.patchValue({
      estado:''
    });
  }
  ongrauClassifiChange(event: any): void {
    this.registerForm.patchValue({
      grauClassifi:event.descricao,
    });
  }
  onCleargrauClassifiChange(){
    this.registerForm.patchValue({
      grauClassifi:''
    });
  }
   onnvlUrgenciaChange(event: any): void {
    this.registerForm.patchValue({
      nvlUrgencia:event.descricao,
    });
  }
  onClearnvlUrgenciaChange(){
    this.registerForm.patchValue({
      nvlUrgencia:''
    });
  }

}

