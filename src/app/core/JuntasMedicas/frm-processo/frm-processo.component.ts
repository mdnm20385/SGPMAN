import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, MinValidator } from '@angular/forms';
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
import { Usuario, Trabalho, AuthService, Pa, DClinicos, ScanDoc } from '@core/authentication';
import { FrmEntradasProcessoComponent } from '@core/FormSigex/frm-entradas-processo/frm-entradas-processo.component';
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
import { BehaviorSubject, finalize } from 'rxjs';
import { FrmmodalnovoprocessoComponent } from '../frmmodalnovoprocesso/frmmodalnovoprocesso.component';
import { environment } from '@env/environment';
import { blob } from 'stream/consumers';
import { Objecto } from 'app/classes/Resposta';
import { busca } from 'app/classes/busca';
import { FrmlistaentradasFromProcessoComponent } from '../frmlistaentradas-from-processo/frmlistaentradas-from-processo.component';
import { useAnimation } from '@angular/animations';
import { FrmRelatorioJuntaTempComponent } from '../../../../../schematics/ng-add/files/module-files/app/routes/sessions/register/frm-relatorio-juntas/frm-relatorio-junta-temp/frm-relatorio-junta-temp.component';

@Component({
  selector: 'app-frm-processo',
  templateUrl: './frm-processo.component.html',
  styleUrl: './frm-processo.component.scss',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [MatDialogModule,
        MatButtonModule,
      //  //JsonPipe,
      //  //RouterLink,
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
    providers: [TablesRemoteDataService],
  })
export class FrmProcessoComponent
implements OnInit,AfterViewInit{
fileName: any;
titulocarregar:any;
  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef){
  }
nomecompleto='';
  showMenu = false;
  menuX = 0;
  menuY = 0;
  toggleMenu(event: MouseEvent): void {
    this.menuX = event.clientX;
    this.menuY = event.clientY;
    this.showMenu = !this.showMenu;
    event.stopPropagation(); // evita o fechamento ao clicar no botão
  }

  onOptionClick(opcao: string): void {
    this.showMenu = false;
    if(this.auth.isAutenticated()===false){
      this.dialog.alert('Precisa estar autenticado para executar esta operação');
        return;
    }
     if(this.registerForm.get('nome')!.value.length==0){
      this.dialog.alert('O nome é de preenchimento obrigatório');
      return;
  }
  const pa=this.SetarPessoa();
    const trabalho=this.auth.InitializeTrabalho();
    trabalho.path= '';
    trabalho.pa=pa;

if(opcao.toLowerCase()==='pedido'){
  trabalho.numTabela='1';
}
else if(opcao.toLowerCase()==='emissao'){
  trabalho.numTabela='3';
}

const dialogRef = this.dialog.originalOpen(FrmRelatorioJuntaTempComponent, {
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

  @HostListener('document:click', ['$event'])
  fecharMenu(event: MouseEvent) {
    this.showMenu = false;
  }
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;

  columnsDestinatarios: MtxGridColumn[] = [];
//
  columnsDestinatarios1: MtxGridColumn[] = [
    {
      header: 'Assunto',
      field: 'Assunto',
      minWidth:150
    },
    { header: 'Estado de homologação', field: 'Homologado',
      minWidth:100},
      { header: 'Data',
        field: 'InseriuDataHora',sortable: true, type: 'date'
        ,
        typeParameter: {
          format: 'dd/MM/yyyy', // Specify your desired date format here
          locale: 'en-US' // Optionally, specify the locale
        }
      },
    {
      header: 'Acções',
      field: 'operation',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip:'',
          click: record => this.Verprocessos(record),
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

fruitSelectedOption = '';
AddNew() {
  if(this.auth.isAutenticated()===false){
    return;
}

if(this.StampPaciente.length==0){
 this.dialog.alert(`Salve o paciente primeiro!`);
  return;
}
const usuario=this.auth.obterSessao() as Usuario;
const dClinicos:DClinicos={
  paStamp: this.pastampsssss,
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
  paStamp: this.pastampsssss,
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

  const processo:Processo={
    processoStamp: this.auth.Stamp(),
    numero: 0,
    tipoDoc: 'GUIA DE PEDIDO DE JUNTA MÉDICA',
    assunto: 'GUIA DE PEDIDO DE JUNTA MÉDICA',
    inseriu: usuario.nome,
    inseriuDataHora: this.auth.ConvertDate(new Date()),
    alterou: '',
    alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
    orgao: usuario.orgao,
    direcao: usuario.direcao,
    departamento: usuario.departamento,
    orgaostamp: usuario.orgaostamp,
    departamentostamp: usuario.departamentostamp,
    direcaostamp: usuario.direcaostamp,
    estado: 'EM TRAMITAÇÃO',
    visado: usuario.direcao,
    usrstamp: usuario.paStamp!,
    homologado: '',
    paStamp: this.pastampsssss,
    pa,
    entradaProcesso: []
  };
  const arquivo:Arquivo={
    arquivoStamp: this.auth.Stamp(),
    processoStamp: processo.processoStamp,
    localizacao: '',
    dataArquivo: this.auth.ConvertDate(new Date('2007-01-01')),
    numeroArquivo: 0,
    inseriu: this.registerForm.get('nome')?.value ?? '',
    inseriuDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
    alterou: 'PENDENTE',
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
    depProcedencia: '',
    processo,
    paraquem: '',
    endereco: '',
    direcaoOrigem: '',
    orgaoOrigem: ''
  };
  const value:EntradaProcesso={
    entradaStamp: this.auth.Stamp(),
    conselhoColectivos: '',
    conselhoCoodenador: false,
    conselhoDefesaNaciona: false,
    conselhoTecnicoGeral: false,
    consultivo: false,
    conselhoDireccao: true,
    processoStamp: processo.processoStamp,
    numeroEntrada: 0,
    docPdf: '',
    remetente: '',
    orgaoProcedencia: '',
    direcProcedencia: '',
    depProcedencia: '',
    dataEntrada: new Date(),
    inseriuDataHora: this.auth.ConvertDate(new Date()),
    alterou: '',
    alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
    recebido: true,
    tipoDoc: 'GUIA DE PEDIDO DE JUNTA MÉDICA',
    classificador: '',
    direcaoOrigem: '',
    orgaoOrigem: '',
    numeroOrdem: 1,
    despacho: '',
    dataDocumento: new Date(),
    endereco: '',
    observacao: 'EM TRAMITAÇÃO',
    qtdFolhas: '0',
    qtdExemplares: '0',
    qtdAnexo: '0',
    orgaoUtilizador: usuario.orgao,
    direcUtilizador: usuario.direcao,
    depUtilizador: usuario.departamento,
    orgaostamp: usuario.orgaostamp!,
    departamentostamp: usuario.departamentostamp,
    direcaostamp: usuario.direcaostamp,
    tdocAniva: '',
    pathPdf: '',
    path: '',
    path1: '',
    processo,
    direcaoOrigemStamp: '',
    orgaoOrigemstamp: '',
    detalhesAssunto: '',
    vindoDeQuemquem: '',
    paraquem: 'Novatosigex',
    arquivo,
    saidaStamp: '',
    grauClassifi: 'CONFIDENCIAL',
    nvlUrgencia: 'NORMAL',
    provProveniencia: '',
    numero: '',
    documento: '',
    proveniencia: '',
    ano: new Date(),
    saidaProcesso: [],
    inseriu: '',
    assunto: 'GUIA DE PEDIDO DE JUNTA MÉDICA',
  };


    const dialogRef = this.dialog.originalOpen(FrmEntradasProcessoComponent, {
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
  GetDestinatariosMethod(){
    const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='vProcessos';
let condicaos='';
condicaos=this.pastampsssss;
  const proc: Procura = {
    tabela: 'vProcessos',
    campo: 'Assunto',
    campo1: 'Homologado',
    camposseleccionados: ' * ',
    valorprocurado: '',
    pagesize: 5,
    marcar: false,
    currentNumber: 1,
    condicoes: `1=1`,
    alunoestamp: 'InseriuDataHora desc',
    rhstamp: '',
    descricao: '',
    origem: '',
    referencia: `pastamp='${condicaos}'`,
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

    this.listdestinatarioGeral = res.data.sort((a: any, b: any) =>
      new Date(b.InseriuDataHora).getTime() - new Date(a.InseriuDataHora).getTime()
    );

    this.listdestinatario = res.data.sort((a: any, b: any) =>
      new Date(b.InseriuDataHora).getTime() - new Date(a.InseriuDataHora).getTime()
    );


   this.totalRecordsdest= res.totalCount;

  });


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
      //obrigatoriedadedestinatarios:'valido'
  });
   }
   else{
    this.registerForm.patchValue({
      //obrigatoriedadedestinatarios:'valido'
  });
   }
  }
  // else{
  //   this.registerForm.patchValue({
  //     obrigatoriedadedestinatarios:''
  // });
  // }
 }
 GetSexo(){
  //this.selectsexo.push({ chave: '1', descricao: 'Masculino',ordem:'1' });
  //this.selectsexo.push({ chave: '2', descricao: 'Feminino',ordem:'2' });
  //this.selectsexo.push({ chave: '3', descricao: 'Outro',ordem:'3' });
}
onEspecieBi(event: any): void {

  this.registerForm.patchValue({
    tipodoc:event.descricao,
  });
}
onsexoselect(event: any): void {

  this.registerForm.patchValue({
    sexo:event.descricao,
  });
}
onClear(): void {

  this.registerForm.patchValue({
    sexo:'',
  });
}

   translatex = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  ngAfterViewInit(): void {
    this.SetarCombos();
    this.FillControlos();
    this.loading=false;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  search() {
    this.query.page = 0;
    //this.Requery();

  }
  SetarCombos(){
    this.Getorgao();
    this.GetSexo();
    this.GetEspecieDocumental();
    this.Getprovnatura();
    this.GetEspecieParametrizacao();
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
  Verprocessos(value: any) {

    const dialogRef = this.dialog.originalOpen(FrmlistaentradasFromProcessoComponent, {
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

  novo=false;
FillControlos(){

  const pa=this.data.record ;
  if(this.data.record.Alterou==undefined
    || this.data.record.Alterou==typeof(undefined)
  || this.data.record.Alterou==null &&  this.data.record.alterou!=undefined
||  this.data.record.alterou==='novo pacie'){
  this.novo=true;
    this.registerForm.patchValue(
      {
        paStamp: pa.paStamp,
        nome: String(pa.nome).toUpperCase(),
        sexo: pa.sexo,
        numBi: pa.numBi,
        naturalidade: pa.naturalidade,
        resProv: pa.resProv,
        resDist: pa.resDist,
        resPosto: pa.resPosto,
        resLocal: pa.resLocal,
        resBairro: pa.resBairro,
        resQuarteirao: pa.resQuarteirao,
        resAvenida: pa.resAvenida,
        numCasa: pa.numCasa,
        conPrinc: pa.conPrinc,
        conAlter: pa.conAlter,
        ramo: pa.ramo,
        orgao: pa.orgao,
        unidade: pa.unidade,
        subunidade: pa.subunidade,
        patente: pa.patente,
        inseriu: '',
        inseriuDataHora: this.auth.ConvertDate(new Date()),
        alterou: pa.alterou,
        alterouDataHora: this.auth.ConvertDate(new Date()),
        tipodoc: pa.tipodoc,
        activo: pa.activo,
        dadosAnamense:'',
        conclusao:'',
        diaDef:'',
        examesClinicos:'',
        examesObjectivos:''
    }
  );
  this.processo=this.data.record.processo;
  this.registerForm.patchValue({
    visado:this.data.record.nome,
  });
  this.pastampsssss=this.data.record.paStamp;
  this.fileName='';
  this.titulocarregar=` Carregue um ficheiro`;
  this.StampPaciente='';
  return;
  }
this.isLoadingProcesso=true;
this.columnsDestinatarios = [
  { header: 'Assunto', field: 'Assunto',sortable: true,minWidth: 300 },
  { header: 'Estado de homologação', field: 'Homologado',sortable: true,minWidth: 300,pinned: 'right', },
  { header: 'Despacho', field: 'Inseriu',minWidth: 300,pinned: 'right'},
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
        tooltip:'Ver Processo',
        click: record => this.Verprocessos(record),
      },
    ],
  }
];

this.pastampsssss=pa.PaStamp;

this.StampPaciente=pa.PaStamp;
  this.registerForm.patchValue(
    {
      paStamp: pa.PaStamp,
      nome: String(pa.Nome).toUpperCase(),
      sexo: pa.Sexo,
      numBi: pa.NumBi,
      naturalidade: pa.Naturalidade,
      resProv: pa.ResProv,
      resDist: pa.ResDist,
      resPosto: pa.ResPosto,
      resLocal: pa.ResLocal,
      resBairro: pa.ResBairro,
      resQuarteirao: pa.ResQuarteirao,
      resAvenida: pa.ResAvenida,
      numCasa: pa.NumCasa,
      conPrinc: pa.ConPrinc,
      conAlter: pa.ConAlter,
      ramo: pa.Ramo,
      orgao: pa.Orgao,
      unidade: pa.Unidade,
      subunidade: pa.Subunidade,
      patente: pa.Patente,
      inseriu: pa.Inseriu,
      inseriuDataHora: pa.InseriuDataHora,
      alterou: pa.Alterou,
      alterouDataHora: pa.AlterouDataHora,
      tipodoc: pa.Tipodoc,
      activo: pa.Activo,
      path: pa.Path,

  }
);
this.fileName=pa.Path;
if(this.fileName=='' || this.fileName==null ||
  this.fileName==undefined || this.fileName==typeof(undefined)
|| this.fileName.length<=0){
  this.titulocarregar=`Carregue um ficheiro`;
} else{
  this.titulocarregar=``;
}
this.titulocarregar=``;
this.CarregarProcessoFilhos();
this.registerForm.get('naturalidade1')?.setValue(`${pa.Naturalidade}`),
 this.registerForm.get('resProv1')?.setValue(`${pa.ResProv}`),
 this.registerForm.get('resDist1')?.setValue(`${pa.ResDist}`),
 this.registerForm.get('resPosto1')?.setValue(`${pa.ResPosto}`),
 this.registerForm.get('resLocal1')?.setValue(`${pa.ResLocal}`),
 this.registerForm.get('direcaoOrigem1')?.setValue(`${pa.Unidade}`);
 this.registerForm.get('orgaoOrigem1')?.setValue(`${pa.Orgao}`);
 this.registerForm.get('subunidade1')?.setValue(`${pa.Subunidade}`);
 this.registerForm.get('patente1')?.setValue(`${pa.Patente}`);
 this.registerForm.get('catpat')?.setValue(`${pa.catpat}`);

this.Requery();
}
CarregarProcessoFilhos(){
  const usuario=this.auth.obterSessao() as Usuario;
  usuario.inseriu='pa';
let condicao='';
condicao=`${this.data.record.PaStamp}`;
  const proc: Procura = {
    tabela: 'Pa',
    campo: 'nome',
    campo1: 'numBi',
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
  .CarregarPacientefilhos(proc)
  .pipe(
    finalize(() => {
      this.isLoading = false;
    })
  )
  .subscribe(res => {
    this.pa = res.dados;
    const dClinicos=this.pa.dClinicos;
    this.registerForm.patchValue({
         estadotramitat:res.dados.inseriu.toUpperCase(),
         visado:res.dados.nome,
    });
    if(dClinicos!==null){
      this.registerForm.patchValue({
        dadosAnamense:dClinicos.dadosAnamense.toUpperCase(),
        examesClinicos:dClinicos.examesClinicos.toUpperCase(),
        examesObjectivos:dClinicos.examesObjectivos.toUpperCase(),
        conclusao:dClinicos.conclusao.toUpperCase(),
        diaDef:dClinicos.diaDef.toUpperCase(),
   });
    }
  });
}
safeUrl: SafeResourceUrl | null = null;imageUrl!: string;

cleanup() {
  this.safeUrl= null;
  this.registerForm.patchValue({path1:''});
}

private _isLoading$ = new BehaviorSubject<boolean>(false);
path:string= `${environment.Apiurl}Proc2`;
get isLoading$() {
  return this._isLoading$.asObservable();
}
setUrl(fileName:string) {
  if(fileName.length<=0){
    return;
  }
  this._isLoading$.next(true);
  this.cleanups();
  this.safeUrl = this.bypassAndSanitize(`${this.path}/LeituraDeFicheiros?ficheiro=${fileName}`);

  setTimeout(() => {
    this._isLoading$.next(false);
  }, 150);
}

cleanups() {
  this.safeUrl = '';
}

bypassAndSanitize(url:string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}



updateUrl(url: string) {
  this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

  valida=false;
  ficheiro: string='';
  name='';
 converterBase64(event: Event){
  const input = event.target as HTMLInputElement;
  this.fileName='';
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
    this.registerForm.patchValue({tdocAniva:file.name,
      path1:file.name,
    path:file.name});
    this.fileName=file.name;
      const reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

    if(this.fileName=='' || this.fileName==null ||
      this.fileName==undefined || this.fileName==typeof(undefined)
    || this.fileName.length<=0){
      this.titulocarregar=`Carregue um ficheiro`;
    } else{
      this.titulocarregar=``;
    }
 }
  _handleReaderLoaded(readerEvt:any) {
    const binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
    this.registerForm.patchValue({path1:this.base64textString});
   }
  private base64textString:string='';
    handleFileSelect(){

    }
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  pastampsssss='';
  private readonly fb = inject(FormBuilder);
    private readonly auth = inject(AuthService);
    private readonly remoteSrv = inject(TablesRemoteDataService);
  private _snackBar= inject(MatSnackBar);
  selectedestadoe = 'EM TRAMITAÇÃO';
  StampPaciente = '';
  isSubmitting = false;
  registerForm = this.fb.nonNullable.group(
    {
      paStamp: ['',Validators.required],
      nome: ['',Validators.required],
      sexo: ['',Validators.required],
      numBi:['',Validators.required],
      naturalidade: [''],
      naturalidade1: [''],
      resProv:['',Validators.required],
      resProv1:[''],
      resDist: [''],
      resDist1: [''],
      resPosto: [''],
      resPosto1: [''],
      resLocal: [''],
      resLocal1: [''],
      resBairro: [''],
      resQuarteirao: [''],
      resAvenida: [''],
      numCasa: [''],
      conPrinc: ['',Validators.required],
      conAlter: [''],
      ramo: [''],
      orgao: [''],
      unidade: [''],
      subunidade: [''],
      patente: [''],
      inseriu: [''],
      inseriuDataHora: [this.auth.ConvertDate(new Date())],
      alterou: [''],
      alterouDataHora: [this.auth.ConvertDate(new Date())],
      tipodoc: [''],
      activo: [true],
      profilePhoto: [new Blob(['0'], { type: 'text/plain' })],
      profilePhotos: [new Blob(['0'], { type: 'text/plain' })],
      path: [''],
      processo:this.fb.array([]),
      dadosAnamense: [''],
      examesObjectivos: [''],
      examesClinicos: [''],
      diaDef: [''],
      conclusao: [''],
      estadotramitat:[''],
      visado:[''],
      path1:[''],
      tdocAniva:[''],
      direcaoOrigem:[''],
      classificador:[''],
      orgaoOrigem:[''],
      direcaoOrigem1:[''],
      orgaostamp:[''],
      direcProcedencia:[''],
      orgaoProcedencia:[''],firstName: [''],
      numero:  [3],
      assunto: [''],
      direcao: [''],
      departamento:  [''],
      subunidade1: [''],
      estado:  [''],
      usrstamp:  [''],
      orgaoOrigem1:  [''],
      direcaoproce1:  [''],
      orgaoproce1:  [''],
      especieclas:[''],
      nvlUrgencias:[''],
      grauconf:[''],
      detalhesAssunto:[''],
      nvlUrgencia:[''],
      grauClassifi:[''],
      catpat:[''],
      patente1:[''],
      obrigatoriedadedestinatarios: ['valido'],

    }
  );
  @ViewChild('tabGroup') tabGroup!: ElementRef;

  changeTabColor() {

  }
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
    usuario.inseriu='pa';
  let condicao='';
  condicao=`${this.data.record.PaStamp}`;
    const proc: Procura = {
      tabela: 'Pa',
      campo: 'nome',
      campo1: 'numBi',
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
    .CarregarPacientefilhos(proc)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe(res => {
      this.pa = res.dados;


      const dClinicos=this.pa.dClinicos;
      this.registerForm.patchValue({
           estadotramitat:res.dados.inseriu.toUpperCase(),
           visado:res.dados.nome,
      });
      if(dClinicos!==null){
        this.registerForm.patchValue({
          dadosAnamense:dClinicos.dadosAnamense.toUpperCase(),
          examesClinicos:dClinicos.examesClinicos.toUpperCase(),
          examesObjectivos:dClinicos.examesObjectivos.toUpperCase(),
          conclusao:dClinicos.conclusao.toUpperCase(),
          diaDef:dClinicos.diaDef.toUpperCase(),
     });
      }
    });
    this.setUrl(this.data.record.Path ?? '');

  this.GetDestinatariosMethod();
    usuario.inseriu='ScanDoc';
   const     ondicao=`  pastamp='${this.pastampsssss}'`;

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
  changeSort() {

  }


  changeSorts(e: any) {

  }
  getNextPage(e: PageEvent) {

    const currentPage = (e.pageIndex ?? 0) + 1;
    const pageSize = e.pageSize ?? 0;
    const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='pa';
    let condicao='';

if(this.params.q.length>0){
  condicao=`Pastamp='${this.data.record.PaStamp}' and  descricao like '%${this.params.q}%' `;
}else{
  condicao=`PaStamp='${this.data.record.PaStamp}'`;
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
pa!:Pa;
  ngOnInit(): void {

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

  SetarPessoa():Pa{
    const usuario=this.auth.obterSessao() as Usuario;
    const processoStamps=this.auth.Stamp();
if(this.pastampsssss=='' || this.pastampsssss==undefined ||
   this.pastampsssss==typeof(undefined)|| this.pastampsssss.length<0){
    this.pastampsssss=processoStamps;
}
const dClinicos:DClinicos={
  paStamp: this.pastampsssss,
  dadosAnamense:this.registerForm.get('dadosAnamense')!.value,
  examesObjectivos: this.registerForm.get('examesObjectivos')!.value,
  examesClinicos:  this.registerForm.get('examesClinicos')!.value,
  diaDef:  this.registerForm.get('diaDef')!.value,
  conclusao:  this.registerForm.get('conclusao')!.value,
  inseriu: usuario.nome!,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.nome!,
  alterouDataHora: this.auth.ConvertDate(new Date()),
};
const scanDoc:ScanDoc={
  scanStamp: this.pastampsssss,
  entradaStamp: '',
  descricao: this.registerForm.get('path')!.value,
  DocPdf:  '',
  path1: this.registerForm.get('path')!.value,
  dataArquivo: new Date(),
  inseriu: usuario.nome!,
  inseriuDataHora: new Date(),
  alterou: usuario.nome!,
  alterouDataHora: new Date(),
  saidaStamp: '',
  arquivoStamp: '',
  pastamp: this.pastampsssss
};
const   listscan: ScanDoc[] = [];
listscan.push(scanDoc);
const pa:Pa={
  paStamp: this.pastampsssss,
  nome: this.registerForm.get('nome')!.value,
  sexo: this.registerForm.get('sexo')!.value,
  numBi: this.registerForm.get('numBi')!.value,
  naturalidade: this.registerForm.get('naturalidade')!.value,
  resProv: this.registerForm.get('resProv')!.value,
  resDist: this.registerForm.get('resDist')!.value,
  resPosto: this.registerForm.get('resPosto')!.value,
  resLocal: this.registerForm.get('resLocal')!.value,
  resBairro: this.registerForm.get('resBairro')!.value,
  resQuarteirao: this.registerForm.get('resQuarteirao')!.value,
  resAvenida: this.registerForm.get('resAvenida')!.value,
  numCasa: this.registerForm.get('numCasa')!.value,
  conPrinc: this.registerForm.get('conPrinc')!.value,
  conAlter: this.registerForm.get('conAlter')!.value,
  ramo: this.registerForm.get('ramo')!.value,
  orgao: this.registerForm.get('orgao')!.value,
  unidade: this.registerForm.get('unidade')!.value,
  subunidade: this.registerForm.get('subunidade')!.value,
  patente: this.registerForm.get('patente')!.value,
  inseriu: usuario.nome!,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.nome!,
  alterouDataHora: this.auth.ConvertDate(new Date()),
  tipodoc: this.registerForm.get('tipodoc')!.value,
  activo: true,
  path: this.registerForm.get('path')!.value,
  processo: [],
  junta: '',
  juntaHom: '',
  catpat: this.registerForm.get('catpat')!.value,
  dClinicos,
  scanDoc:listscan,
  path1:this.registerForm.get('path1')!.value,
};
return pa;
  }
  Salvar(){
    const usuario=this.auth.obterSessao() as Usuario;
    let processoStamps=this.auth.Stamp();
if(this.pastampsssss=='' || this.pastampsssss==undefined ||
   this.pastampsssss==typeof(undefined)|| this.pastampsssss.length<0){
    this.pastampsssss=processoStamps;
}
const dClinicos:DClinicos={
  paStamp: this.pastampsssss,
  dadosAnamense:this.registerForm.get('dadosAnamense')!.value,
  examesObjectivos: this.registerForm.get('examesObjectivos')!.value,
  examesClinicos:  this.registerForm.get('examesClinicos')!.value,
  diaDef:  this.registerForm.get('diaDef')!.value,
  conclusao:  this.registerForm.get('conclusao')!.value,
  inseriu: usuario.nome!,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.nome!,
  alterouDataHora: this.auth.ConvertDate(new Date()),
};
const scanDoc:ScanDoc={
  scanStamp: this.pastampsssss,
  entradaStamp: '',
  descricao: this.registerForm.get('path')!.value,
  DocPdf:  '',
  path1: this.registerForm.get('path')!.value,
  dataArquivo: new Date(),
  inseriu: usuario.nome!,
  inseriuDataHora: new Date(),
  alterou: usuario.nome!,
  alterouDataHora: new Date(),
  saidaStamp: '',
  arquivoStamp: '',
  pastamp: this.pastampsssss
};
const   listscan: ScanDoc[] = [];
listscan.push(scanDoc);

const pa:Pa={
  paStamp: this.pastampsssss,
  nome: this.registerForm.get('nome')!.value,
  sexo: this.registerForm.get('sexo')!.value,
  numBi: this.registerForm.get('numBi')!.value,
  naturalidade: this.registerForm.get('naturalidade')!.value,
  resProv: this.registerForm.get('resProv')!.value,
  resDist: this.registerForm.get('resDist')!.value,
  resPosto: this.registerForm.get('resPosto')!.value,
  resLocal: this.registerForm.get('resLocal')!.value,
  resBairro: this.registerForm.get('resBairro')!.value,
  resQuarteirao: this.registerForm.get('resQuarteirao')!.value,
  resAvenida: this.registerForm.get('resAvenida')!.value,
  numCasa: this.registerForm.get('numCasa')!.value,
  conPrinc: this.registerForm.get('conPrinc')!.value,
  conAlter: this.registerForm.get('conAlter')!.value,
  ramo: this.registerForm.get('ramo')!.value,
  orgao: this.registerForm.get('orgao')!.value,
  unidade: this.registerForm.get('unidade')!.value,
  subunidade: this.registerForm.get('subunidade')!.value,
  patente: this.registerForm.get('patente')!.value,
  inseriu: usuario.nome!,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.nome!,
  alterouDataHora: this.auth.ConvertDate(new Date()),
  tipodoc: this.registerForm.get('tipodoc')!.value,
  activo: true,
  path: this.registerForm.get('path')!.value,
  processo: [],
  junta: '',
  juntaHom: '',
  catpat: this.registerForm.get('catpat')!.value,
  dClinicos,
  scanDoc:listscan,
  path1:this.registerForm.get('path1')!.value,
};

const pas:Pa={
  paStamp: this.pastampsssss,
  nome: this.registerForm.get('nome')!.value,
  sexo: this.registerForm.get('sexo')!.value,
  numBi: this.registerForm.get('numBi')!.value,
  naturalidade: this.registerForm.get('naturalidade')!.value,
  resProv: this.registerForm.get('resProv')!.value,
  resDist: this.registerForm.get('resDist')!.value,
  resPosto: this.registerForm.get('resPosto')!.value,
  resLocal: this.registerForm.get('resLocal')!.value,
  resBairro: this.registerForm.get('resBairro')!.value,
  resQuarteirao: this.registerForm.get('resQuarteirao')!.value,
  resAvenida: this.registerForm.get('resAvenida')!.value,
  numCasa: this.registerForm.get('numCasa')!.value,
  conPrinc: this.registerForm.get('conPrinc')!.value,
  conAlter: this.registerForm.get('conAlter')!.value,
  ramo: this.registerForm.get('ramo')!.value,
  orgao: this.registerForm.get('orgao')!.value,
  unidade: this.registerForm.get('unidade')!.value,
  subunidade: this.registerForm.get('subunidade')!.value,
  patente: this.registerForm.get('patente')!.value,
  inseriu: usuario.nome!,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: usuario.nome!,
  alterouDataHora: this.auth.ConvertDate(new Date()),
  tipodoc: this.registerForm.get('tipodoc')!.value,
  activo: true,
  path: this.registerForm.get('path')!.value,
  processo: [],
  junta: '',
  juntaHom: '',
  catpat: this.registerForm.get('catpat')!.value,
  dClinicos,
  scanDoc:listscan,
  path1:this.registerForm.get('path1')!.value,
};

const processo:Processo={
  processoStamp: processoStamps,
  numero: 0,
  tipoDoc: 'GUIA DE PEDIDO DE JUNTA MÉDICA',
  assunto: 'GUIA DE PEDIDO DE JUNTA MÉDICA',
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
  estado: `EM TRAMITAÇÃO`,
  visado: this.registerForm.get('visado')!.value,
  usrstamp: usuario.paStamp!,
  homologado: `EM TRAMITAÇÃO`,
  paStamp: pa.paStamp,
  entradaProcesso: [],
  pa:pas
};
    const entrdas:Objecto={
      dados: pa,
      tabela: 'pa',
      condicao: 'vazio',
      sucesso: false
    };
this.auth
      .InserirAlterarObjecto(entrdas)
      .pipe()
      .subscribe({
        next: (data) => {
          if(data.sucesso==true){
            if(this.novo==true)
              {
                if(this.processo.processoStamp!=typeof(undefined)){
              processoStamps=this.processo.processoStamp;
            }
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
            processo.homologado=`EM TRAMITAÇÃO`;
            const entrda:EntradaProcesso={
              direcaoOrigemStamp: '',
              orgaoOrigemstamp: '',
              detalhesAssunto: '',
              vindoDeQuemquem: '',
              paraquem: '',
              arquivo,
              entradaStamp: this.auth.Stamp(),
              conselhoColectivos: '',
              conselhoCoodenador: false,
              conselhoDefesaNaciona: false,
              conselhoTecnicoGeral: false,
              consultivo: false,
              conselhoDireccao: false,
              processoStamp: processo.processoStamp,
              numeroEntrada: 0,
              docPdf: '',
              remetente: usuario.nome!,
              orgaoProcedencia: '',
              direcProcedencia: '',
              depProcedencia: '',
              dataEntrada: new Date(),
              inseriu: usuario.nome,
              inseriuDataHora: new Date(),
              alterou: usuario.nome,
              alterouDataHora: new Date(),
              recebido: true,
              classificador: 'GUIA DE PEDIDO DE JUNTA MÉDICA',
              direcaoOrigem: '',
              orgaoOrigem: '',
              grauClassifi: 'CONFIDENCIAL',
              nvlUrgencia: 'NORMAL',
              numeroOrdem: 1,
              despacho: '',
              dataDocumento: new Date(),
              endereco: '',
              observacao:  processo.homologado,
              qtdFolhas: '',
              qtdExemplares: '',
              qtdAnexo: '',
              orgaoUtilizador: '',
              direcUtilizador: '',
              depUtilizador: '',
              orgaostamp: '',
              departamentostamp: '',
              direcaostamp: '',
              tdocAniva: '',
              pathPdf: this.registerForm.get('path')!.value,
              path:this.registerForm.get('path')!.value,
              path1: this.registerForm.get('path')!.value,
              processo,
              saidaStamp: '',
              provProveniencia: '',
              documento: '',
              proveniencia: '',
              ano: new Date(),
              saidaProcesso: [],
              numero: '0',
              tipoDoc: 'GUIA DE PEDIDO DE JUNTA MÉDICA',
              assunto: 'GUIA DE PEDIDO DE JUNTA MÉDICA',
            };
              this.auth.InserirEntradas(entrda).pipe()
              .subscribe();
            }
            this.dialog.alert(`Operação executada com sucesso!`);
            if(pa.numBi.length>0){
              this.dialogRef.close(pa.numBi);
            }else{
              this.dialogRef.close(pa.nome);
            }
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
  selectNaturalidade: selects[] = [];
  selectresprov: selects[] = [];
  selectresdist: selects[] = [];
  selectresposto: selects[] = [];
  selectreslocalidade: selects[] = [];
  selectramo: selects[] = [];
  selectdirecoes: selects[] = [];
  selectsubunidade: selects[] = [];
  selectcatpat: selects[] = [];
  selectpatente: selects[] = [];


  selectbi: selects[] = [];

  selectsexo: selects[] = [
    { chave: '1', descricao: 'Masculino', ordem: '1' },
    { chave: '2', descricao: 'Feminino', ordem: '2' },
    {chave: '3', descricao: 'Outro',ordem:'3' }
  ];
  loading = false;
  selectedorgao = null;
  selectedorgaoCustom = null;
  selectedorgaoCustomPromise = null;
  selectespecie: selects[] = [];
  EstadoTramitacao: selects[] = [];
  GrauConfidencialidade: selects[] = [];
  GrauUrgencia: selects[] = [];
  isLoading = false;



  Getprovnatura(){
    const se:condicoesprocura={
      tabela:'provincia',
      campo1: 'descricao',
      campo2:'provinciaStamp',
       condicao:'vazio',
       campochave:'provinciaStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectresprov= this.selectNaturalidade=data.dados.selects ;
      this.isLoading = false;

        }
      },
      error: () => {

      }
    });

  }
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
      error: () => {

      }
    });



    const ses:condicoesprocura={
      tabela:'ramo',
      campo1: 'descricao',
      campo2:'CodRamo',
       condicao:'vazio',
       campochave:'RamoStamp'
    };
    this.remoteSrv
    .getSelection(ses).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectramo=data.dados.selects ;

        }
      },
      error: () => {

      }
     });

    const ses1s:condicoesprocura={
      tabela:'cat',
      campo1: 'descricao',
      campo2:'CodRamo',
       condicao:'vazio',
       campochave:'catStamp'
    };
    this.remoteSrv
    .getSelection(ses1s).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectcatpat=data.dados.selects ;
        }
      },
      error: () => {

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
      error: () => {

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


              this.selectbi = busca.filter(person => person.ordem =='13' );

        }
      },
      error: () => {

      }
    });
  }

  selectedCompanyCustom = null;
  ClearDirecoes(): void {
    this.selectdirecoes= [];
    this.selectsubunidade= [];
    this.registerForm.get('direcaoOrigem1')?.setValue('');
    this.registerForm.get('subunidade1')?.setValue('');
    this.registerForm.patchValue({
      direcaoOrigem:'',
      subunidade1:'',
      orgao:'',
      orgaoOrigem:''
    });
  }
  Clearsubunidades(): void {
    this.selectsubunidade= [];
    this.registerForm.get('subunidade1')?.setValue('');
    this.registerForm.patchValue({
      subunidade1:'',
      unidade:'',
      direcaoOrigem:'',
    });
  }
  Clearramo(): void {
    this.selectpatente= [];
    this.registerForm.get('patente1')?.setValue('');
    this.registerForm.patchValue({
      patente1:'',
      ramo:''
    });
  }

  Clearpatente(): void {
    this.selectpatente= [];
    this.registerForm.get('patente1')?.setValue('');
    this.registerForm.patchValue({
      patente1:'',
      catpat:''
    });
  }



  onEspecieChange(event: any): void {

    this.registerForm.patchValue({
      //tipodoc:event.descricao,
      classificador:event.ordem,
    });
  }
  onRamoChange(event: any): void {
    this.selectpatente= [];
    this.registerForm.get('patente1')?.setValue('');
    this.registerForm.patchValue({
      ramo:event.descricao,
      patente:'',
      patente1:''
    });
    this.Chamarpatentes();

  }
Chamarpatentes(){
  const se:condicoesprocura={
    tabela:'pat',
    campo1: 'descricao',
    campo2:'patStamp',
     condicao:`ramo='${this.registerForm.value.ramo}' and  categoria='${this.registerForm.value.catpat}'`,
     campochave:'patStamp'
  };
  this.remoteSrv
  .getSelection(se).subscribe({
    next: (data) => {
      if (data.sucesso) {
        this.selectpatente=data.dados.selects;
      }
    },
    error: () => {

    }
  });
}

  onSelectorgaoChange(event: any): void {
    this.selectdirecoes= [];
    this.registerForm.get('direcaoOrigem1')?.setValue('');

    this.selectsubunidade= [];
    this.registerForm.get('subunidade1')?.setValue('');
    this.registerForm.patchValue({
      orgaoOrigem:event.descricao,
      orgaostamp:event.chave,
      orgaoOrigem1:event.descricao,
      orgao:event.descricao,
      subunidade:'',
      unidade:'',

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
      error: () => {

      }
    });
  }

  ClearResDist(): void {
    this.selectreslocalidade=this.selectresposto=this.selectresdist= [];
    this.registerForm.get('resDist1')?.setValue('');
    this.registerForm.get('resPosto1')?.setValue('');
    this.registerForm.get('resLocal1')?.setValue('');
    this.registerForm.patchValue({
        resDist: '',
      resPosto: '',
      resLocal: '',
      resProv:''
    });
  }

  onSelectresprovChange(event: any): void {
    this.registerForm.patchValue({
      resProv:event.descricao
    });

    const se:condicoesprocura={
      tabela:'Distrito',
      campo1: 'descricao',
      campo2:'distritoStamp',
       condicao:`provinciaStamp='${event.chave}'`,
       campochave:'distritoStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectresdist=data.dados.selects ;
        }
      },
      error: () => {

      }
    });
  }



  ClearResPost(): void {
    this.selectreslocalidade=this.selectresposto= [];
    this.registerForm.get('resPosto1')?.setValue('');
    this.registerForm.get('resLocal1')?.setValue('');
    this.registerForm.patchValue({
      resPosto: '',
      resLocal: '',
      resDist: '',
    });
  }

  onSelectresDistChange(event: any): void {
    this.registerForm.patchValue({
      resDist:event.descricao
    });
    const se:condicoesprocura={
      tabela:'PostAdm',
      campo1: 'descricao',
      campo2:'postAdmStamp',
       condicao:`distritoStamp='${event.chave}'`,
       campochave:'postAdmStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectresposto=data.dados.selects ;
        }
      },
      error: () => {

      }
    });
  }



  ClearResLocalidade(): void {
    this.selectreslocalidade= [];
    this.registerForm.get('resLocal1')?.setValue('');
    this.registerForm.patchValue({
      resLocal: '',
      resPosto: '',
    });
  }

  Cleartipo(){
    this.registerForm.patchValue({
      tipodoc:'',
      classificador:'',
    });
  }
  onSelectNaturalidadeChange(event: any): void {
    this.registerForm.patchValue({
      naturalidade: event.descricao,
      naturalidade1: event.descricao,
    });
  }
  ClearNaturalidade(){
    this.registerForm.patchValue({
      naturalidade: '',
    });
  }


  onSelectresPostoChange(event: any): void {
    this.registerForm.patchValue({
      resPosto:event.descricao
    });
    const se:condicoesprocura={
      tabela:'Localidade',
      campo1: 'descricao',
      campo2:'codLocalidade',
       condicao:`postAdmStamp='${event.chave}'`,
       campochave:'codLocalidade'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectreslocalidade=data.dados.selects ;
        }
      },
      error: () => {

      }
    });
  }
  onreslocalidadeChange(event: any): void {
    this.registerForm.patchValue({
      resLocal:event.ordem,
    });
  }

  Cleatloaclidadessss(){
    this.registerForm.patchValue({
      resLocal:'',
    });
  }
  onDirecaoChange(event: any): void {
    this.registerForm.patchValue({
      direcaoOrigem:event.descricao,
      direcaoOrigem1:event.descricao,
      unidade:event.descricao,
    });
    const se:condicoesprocura={
      tabela:'Subunidade',
      campo1: 'descricao',
      campo2:'SubunidadeStamp',
       condicao:`unidadeStamp='${event.chave}'`,
       campochave:'SubunidadeStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectsubunidade=data.dados.selects ;
        }
      },
      error: () => {

      }
    });

  }


  onSubunidadeChange(event: any): void {
    this.registerForm.patchValue({
      subunidade:event.descricao,
      subunidade1:event.descricao,
    });
  }
  onclearsubunidade(): void {
    this.registerForm.patchValue({
      subunidade:'',
    });
  }
  oncatpatChange(event: any): void {

    this.selectpatente= [];
    this.registerForm.get('patente1')?.setValue('');
    this.registerForm.patchValue({
      catpat:event.descricao,
      patente:'',
      patente1:''
    });
    this.Chamarpatentes();
  }
  onselectPatChange(event: any): void {
    this.registerForm.patchValue({
      patente:event.descricao,
      patente1:event.descricao,
    });
  }
  onClearPatChange(): void {
    this.registerForm.patchValue({
      patente:'',
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
      error: () => {

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


  ClearEstadotramitaca(): void {
    this.registerForm.patchValue({
      estado:'',
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
