import { JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { AuthService, Usuario } from '@core';
import { FrmSaidaProcessoComponent } from '@core/FormSigex/frm-saida-processo/frm-saida-processo.component';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent, PageHeaderComponent } from '@shared';
import { Processo, SaidaProcesso, Unidade } from 'app/classes/ClassesSIGEX';
import { ServicoGeral } from 'app/classes/interfacesBuscas/servico-geral';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-ver-saidas-partir-entradas',
  providers: [TablesRemoteDataService],
  standalone: true,
  imports: [
    MatDialogModule,
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
  templateUrl: './ver-saidas-partir-entradas.component.html',
  styleUrl: './ver-saidas-partir-entradas.component.scss'
})
export class VerSaidasPartirEntradasComponent

implements OnInit,OnDestroy {
  private readonly remoteSrv = inject(TablesRemoteDataService);
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  private readonly auth = inject(AuthService);
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
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
  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef,
    private fbs: FormBuilder,public _dialog: MatDialog){
  }
  columns: MtxGridColumn[] = [
    {
      header: 'Nº Doc.',
      field: 'NumeroSaida',
      minWidth: 100,
    },
    {
      header: 'Nº Ordem',
      field: 'NumeroOrdem',
      hide: true,
      minWidth: 100,
    },
    { header: 'Cód. class.', field: 'Classificador' },
    { header: 'Assunto', field: 'Assunto' },
    {
      header: 'Obs.',
      field: 'Observacao',
    },
    { header: 'Órgão Origem', field: 'Orgaoorigem' },
        { header: 'Direcção Origem', field: 'DirecaoOrigem' },
        { header: 'Despacho', field: 'Despacho' },
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
      minWidth: 100,
      width: '100px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'info',
          tooltip: 'Ver Detalhes',
          click: record => this.edit(record),
        },
      ],
    },
  ];
  list: any[] = [];
  total = 0;
  pageSize = 0;
  pageIndex=0;
  isLoading = true;
  totalRecords: number = 0;
  pagenumber: number = 0;
  pagesize: number = 0;
  pagetotalrecord: number = 0;

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }
  totalsrow?: number = 0;
  query = {
    q: '',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 5,
  };

  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return p;
  }

  ngOnInit() {
    this.Requery();
  }


  ngOnDestroy(): void {
    if(this.auth.obterentradaStamp()==true){
      this.auth.eliminarentradaStamp();
    }
  }

Requery(){
  const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='saida';
let condicao='';
if(this.params.q.length>0){
  condicao=` classificador like '%${this.params.q}%' or DirecDest like '%${this.params.q}%'
   or Orgaoorigem like '%${this.params.q}%' or observacao  like '%${this.params.q}%'
    or  NumeroSaida like '%${this.params.q}%' or  Assunto like '%${this.params.q}%'
    or  Assunto like '%${this.params.q}%' or  DirecaoOrigem like '%${this.params.q}%'`;
}
//let s:Unidade
const condicaos=this.data.record.provincia;
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
    this.list = res.data;
    this.totalRecords = res.totalCount;
    this.pagenumber = res.currentPageNumber;
    this.pagesize = res.pageSize;
    this.pagetotalrecord=res.totalCount;
    this.total=res.totalCount;
    this.isLoading = false;
  });
}

@HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F2'){
      this.AddNew();
    } else if (event.key === 'Enter' ){
       this.Requery();
    }

  }
  edit(value: any) {


    console.log(value);

return;


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

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {


    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  getNextPage(e: PageEvent) {
    const currentPage = (e.pageIndex ?? 0) + 1;
    const pageSize = e.pageSize ?? 0;
    const usuario=this.auth.obterSessao() as Usuario;
      usuario.inseriu='saida';
    let condicao='';
if(this.params.q.length>0){
  condicao=` classificador like '%${this.params.q}%' or DirecDest like '%${this.params.q}%'
   or OrgaoDest like '%${this.params.q}%'`;
}
    const proc: Procura = {
      tabela: 'SaidaProcesso',
      campo: 'OrgaoDest',
      campo1: 'DirecDest',
      camposseleccionados: '*',
      valorprocurado: '',
      pagesize: pageSize,
      marcar: false,
      currentNumber: currentPage,
      condicoes: `${condicao}`,
      alunoestamp: 'DataSaida desc',
      rhstamp: '',
      descricao: '',
      origem: '',
      referencia: '',
      usuario,
    };
    this.remoteSrv.MetodoGenerico(proc).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(res => {
        this.list = res.data;
        this.totalRecords = res.totalCount;
        this.pagenumber = currentPage;
        this.pagesize = pageSize;
        this.pagetotalrecord=res.totalCount;
        this.isLoading = false;
      });
  }

  onRowSelectionChange(event: any) {

  }
  search() {
    this.query.page = 0;
    this.Requery();
  }
fruitSelectedOption = '';
  AddNew() {

    if(this.auth.isAutenticated()===false){
      return;
  }
  const usuario=this.auth.obterSessao() as Usuario;
  const pa=this.auth.InicializarPaciente();
    const processo:Processo={
      processoStamp: this.auth.Stamp(),
      numero: 0,
      tipoDoc: '',
      assunto: '',
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
      visado: '',
      usrstamp: usuario.paStamp!,
      homologado: '',
      paStamp: '',
      pa,
      entradaProcesso: []
    };

const entradaProces=this.auth.InicializarProcesso('');
const entrada=entradaProces.entradaProcesso[0];
    const value:SaidaProcesso={
      entradaStamp: '',
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
      processo,
      processoStamp: processo.processoStamp,
      paraquem: 'Novatosigex',
      tdocAniva: '',
      grauClassifi: 'CONFIDENCIAL',
      nvlUrgencia: 'NORMAL',
      listaDestinatarios: [],
      visado: '',
      recebeu: '',
      numero: '',
      protocolo: 0,
      ano: this.auth.ConvertDate(new Date()),
      entradaProcesso: entrada
    };
      const dialogRef = this.dialog.originalOpen(FrmSaidaProcessoComponent, {
      width: '2000px',
      //height: '1000px',
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
}
