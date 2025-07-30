import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit, ViewEncapsulation } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService, Usuario } from '@core/authentication';
import { FrmEntradasProcessoComponent } from '@core/FormSigex/frm-entradas-processo/frm-entradas-processo.component';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridModule, MtxGridColumn } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared';
import { Processo, Arquivo, EntradaProcesso } from 'app/classes/ClassesSIGEX';
import { ServicoGeral } from 'app/classes/interfacesBuscas/servico-geral';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-frmlistaentradas-from-processo',
  templateUrl: './frmlistaentradas-from-processo.component.html',
  styleUrl: './frmlistaentradas-from-processo.component.scss',
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
      MatRadioModule
        ],
    providers: [TablesRemoteDataService]
})
export class FrmlistaentradasFromProcessoComponent

implements OnInit {


  private readonly remoteSrv = inject(TablesRemoteDataService);
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  private readonly auth = inject(AuthService);
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
  translatex = inject(TranslateService);
    readonly dialogRef = inject(MatDialogRef);
    readonly data = inject(MAT_DIALOG_DATA);
    private readonly fb = inject(FormBuilder);
      private readonly _authservice = inject(ServicoGeral);
    private _snackBar= inject(MatSnackBar);
    selectedestadoe = 'EM TRAMITAÇÃO';
    isSubmitting = false;
  constructor(public _dialog: MatDialog) {}



    registerForm = this.fb.nonNullable.group(
      {
        nome: [''],
        inseriu: [''],
        alterou: [''],
        paStamp: [''],
      }
    );
  columns: MtxGridColumn[] = [
     {
    header: 'Nº',
    field: 'Numero',sortable: true,
    minWidth: 100,
  }, {
    header: 'Remetente',sortable: true,
    field: 'Remetente',
    minWidth: 100,
  },{
    header: 'Proveniência',
    field: 'Proveniencia',sortable: true,
    minWidth: 100,
  },{
    header: 'Prov. Proveniência',
    field: 'ProvProveniencia',sortable: true
  },
    {
      header: 'Nº de Doc.',
      field: 'NumeroEntrada',
      hide: true,
      minWidth: 100,
    },
    { header: 'Órgão Procedência', field: 'OrgaoProcedencia',sortable: true,
      hide: true,
    },
    { header: 'Direcção Procedência', hide: true,field: 'DirecProcedencia' ,sortable: true},
    { header: 'Data Entrada', hide: true,field: 'DataEntrada',sortable: true, type: 'date'
      ,
      typeParameter: {
        format: 'dd/MM/yyyy', // Specify your desired date format here
        locale: 'en-US' // Optionally, specify the locale
      }
    },
    { header: 'Data do Documento', hide: true,field: 'DataDocumento' ,sortable: true,type: 'date' ,
      typeParameter: {
        format: 'dd/MM/yyyy', // Specify your desired date format here
        locale: 'en-US' // Optionally, specify the locale
      }
      },
    { header: 'Código de class.', hide: true,field: 'Classificador' ,sortable: true},
    {
      header: 'Assunto',
      field: 'TipoDoc',
      hide: true,
      minWidth: 120,
    },
    {
      header: 'Detalhes do assunto',
      field: 'Observacao',hide: true,
      minWidth: 120,
    },
    { header: 'Grau de classificação', hide: true,field: 'GrauClassifi',
      sortable: true },
    {
      header: 'Despacho',
      field: 'Despacho',
      hide: true,
      minWidth: 120,
    },
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
          tooltip: this.translate.stream('table_kitchen_sink.edit'),
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
stamppaciente='';
  ngOnInit() {
     this.registerForm.patchValue({
    nome:this.data.record.Nome,
    alterou:this.data.record.Alterou,
    paStamp: this.data.record.PaStamp,
        });
        this.stamppaciente=this.data.record.PaStamp;

    this.Requery();
  }

  Requery(){

    const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='entrada';
  let condicao='';
  if(this.params.q.length>0){
    condicao=` classificador like '%${this.params.q}%' or DirecProcedencia like '%${this.params.q}%'
     or orgaoProcedencia like '%${this.params.q}%'`;
  }

    const proc: Procura = {
      tabela: 'vprocessosentradas',
      campo: 'orgaoProcedencia',
      campo1: 'DirecProcedencia',
      camposseleccionados: ' * ',
      valorprocurado: '',
      pagesize: 5,
      marcar: false,
      currentNumber: 1,
      condicoes: `${condicao}`,
      alunoestamp: 'DataEntrada desc',
      rhstamp: '',
      descricao: '',
      origem: '',
      referencia: `processostamp='${this.data.record.ProcessoStamp}'`,
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
onKey(event: KeyboardEvent) {


}


@HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {


    if(event.key === 'F2'){
      this.AddNew();
    } else if (event.key === 'Enter' ){

      console.log('Enter pressed');
    }
  }
  edit(value: any) {
    value.Alterou=this.data.record.Alterou;
    const dialogRef = this.dialog.originalOpen(FrmEntradasProcessoComponent, {
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
    usuario.inseriu='entrada';
    let condicao='';
if(this.params.q.length>0){
  condicao=` classificador like '%${this.params.q}%' or DirecProcedencia like '%${this.params.q}%'
   or orgaoProcedencia like '%${this.params.q}%'`;
}
    const proc: Procura = {
      tabela: 'EntradaProcesso',
      campo: 'orgaoProcedencia',
      campo1: 'direcProcedencia',
      camposseleccionados: '*',
      valorprocurado: '',
      pagesize: pageSize,
      marcar: false,
      currentNumber: currentPage,
      condicoes: `${condicao}`,
      alunoestamp: 'DataEntrada desc',
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
      visado: usuario.direcao,
      usrstamp: usuario.paStamp!,
      homologado: '',
      paStamp: '',
      pa,
      entradaProcesso: []
    };
    const arquivo:Arquivo={
      arquivoStamp: this.auth.Stamp(),
      processoStamp: processo.processoStamp,
      localizacao: this.registerForm.get('nome')!.value,
      dataArquivo: this.auth.ConvertDate(new Date('2007-01-01')),
      numeroArquivo: 0,
      inseriu: this.registerForm.get('nome')!.value ,
      inseriuDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
      alterou: this.registerForm.get('alterou')!.value,
      alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
      activo: false,
      pasta: this.registerForm.get('nome')!.value,
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
      dataEntrada: this.auth.ConvertDate(new Date()),
      inseriu: usuario.nome,
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
      dataDocumento: this.auth.ConvertDate(new Date()),
      endereco: '',
      observacao: '',
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
      ano: this.auth.ConvertDate(new Date()),
      saidaProcesso: [],
      assunto: 'GUIA DE PEDIDO DE JUNTA MÉDICA'
    };
      const dialogRef = this.dialog.originalOpen(FrmEntradasProcessoComponent, {
          // height: '85%',
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

      @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
   alert('You have unsaved changes. Do you really want to leave?');
  }
}

