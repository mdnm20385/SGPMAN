import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AuthService, Usuario } from '@core/authentication';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { Processo, Arquivo, EntradaProcesso } from 'app/classes/ClassesSIGEX';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { FrmEntradasProcessoComponent } from '../frm-entradas-processo/frm-entradas-processo.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PageHeaderComponent } from '@shared';
import { FrmModalArquivoComponent } from '../frm-modal-arquivo/frm-modal-arquivo.component';
@Component({
  selector: 'app-frm-lista-arquivo',
  templateUrl: './frm-lista-arquivo.component.html',
  styleUrl: './frm-lista-arquivo.component.scss',
  providers: [TablesRemoteDataService],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MtxGridModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    PageHeaderComponent,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
  ],
})
export class FrmListaArquivoComponent


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
  constructor(public _dialog: MatDialog) {}
  columns: MtxGridColumn[] = [
    {
      header: 'Nº de Doc.',
      field: 'NumeroArquivo',
      minWidth: 100,
    },
    { header: 'Órgão Procedência', field: 'OrgaoProcedencia',sortable: true
    },
    { header: 'Direcção Procedência', field: 'DirecProcedencia' ,sortable: true},

    { header: 'Data do Documento', field: 'DataArquivo' ,sortable: true,type: 'date' ,
      typeParameter: {
        format: 'dd/MM/yyyy', // Specify your desired date format here
        locale: 'en-US' // Optionally, specify the locale
      }
      },
    { header: 'Código de class.', field: 'Classificador' ,sortable: true},
    {
      header: 'Assunto',
      field: 'Assunto',
      hide: true,
      minWidth: 120,
    },
    {
      header: 'Detalhes do assunto',
      field: 'DetalhesAssunto',
      minWidth: 120,
      hide:true
    },
    { header: 'Grau de classificação', field: 'GrauClassifi',
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
        // {
        //   type: 'icon',
        //   color: 'warn',
        //   icon: 'delete',
        //   tooltip: this.translate.stream('table_kitchen_sink.delete'),
        //   pop: {
        //     title: this.translate.stream('table_kitchen_sink.confirm_delete'),
        //     closeText: this.translate.stream('table_kitchen_sink.close'),
        //     okText: this.translate.stream('table_kitchen_sink.ok'),
        //   },
        //   click: record => this.delete(record),
        // },
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
Requery(){
  const usuario=this.auth.obterSessao() as Usuario;
  usuario.inseriu='arquivo';
let condicao='';
if(this.params.q.length>0){
  condicao=` Localizacao like '%${this.params.q}%'
   or Pasta like '%${this.params.q}%'`;
}
  const proc: Procura = {
    tabela: 'arquivo',
    campo: 'Pasta',
    campo1: 'Localizacao',
    camposseleccionados: ' * ',
    valorprocurado: '',
    pagesize: 5,
    marcar: false,
    currentNumber: 1,
    condicoes: `${condicao}`,
    alunoestamp: 'DataArquivo desc',
    rhstamp: '',
    descricao: '',
    origem: '',
    referencia: '',
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
//
    }
  }
  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(FrmModalArquivoComponent, {
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

    usuario.inseriu='arquivo';
    let condicao='';
if(this.params.q.length>0){
  condicao=` Localizacao like '%${this.params.q}%'
        or Pasta like '%${this.params.q}%'`;
}
    const proc: Procura = {
      tabela: 'arquivo',
      campo: 'Pasta',
      campo1: 'Localizacao',
      camposseleccionados: '*',
      valorprocurado: '',
      pagesize: pageSize,
      marcar: false,
      currentNumber: currentPage,
      condicoes: `${condicao}`,
      alunoestamp: 'DataArquivo desc',
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
      estado: 'TRAMITADO',
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
      localizacao: '',
      dataArquivo: this.auth.ConvertDate(new Date()),
      numeroArquivo: 0,
      inseriu: usuario.nome,
      inseriuDataHora: this.auth.ConvertDate(new Date()),
      alterou: '',
      alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
      activo: true,
      pasta: '',
      path1: '',
      scanDoc: [],
      orgaoUtilizador: usuario.orgao,
      direcUtilizador: usuario.direcao,
      depUtilizador: usuario.departamento,
      path: '',
      tdocAniva: '',
      classificador: '',
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
      paraquem: 'Novatosigex',
      grauClassifi: 'CONFIDENCIAL',
      nvlUrgencia: 'NORMAL',
      endereco: '',
      direcaoOrigem: '',
      orgaoOrigem: ''
    };
      const dialogRef = this.dialog.originalOpen(FrmModalArquivoComponent, {
      width: '2000px',
      disableClose: true,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
          data: { record: arquivo },
        });
        dialogRef.afterClosed().subscribe(() =>
          {
                this.Requery();
          });
      }


}



