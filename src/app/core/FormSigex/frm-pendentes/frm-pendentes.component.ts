import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridModule, MtxGridColumn } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { FrmModalOrgaoComponent } from '../frm-modal-orgao/frm-modal-orgao.component';
import { AuthService, Usuario } from '@core/authentication';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Arquivo, EntradaProcesso, Processo } from 'app/classes/ClassesSIGEX';
import { FrmModalDirecaoComponent } from '../frm-modal-direcao/frm-modal-direcao.component';
import { FrmEntradasProcessoComponent } from '../frm-entradas-processo/frm-entradas-processo.component';
import { Console } from 'console';
import { FrmSaidaProcessoComponent } from '../frm-saida-processo/frm-saida-processo.component';
import { ProcessEnvOptions } from 'child_process';
import { MatDialog } from '@angular/material/dialog';
import { ReceberPendentesComponent } from './receber-pendentes/receber-pendentes.component';

@Component({
  selector: 'app-frm-pendentes',
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
  templateUrl: './frm-pendentes.component.html',
  styleUrl: './frm-pendentes.component.scss'
})
export class FrmPendentesComponent




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
      field: 'NumeroEntrada',
      minWidth: 100,
    },
    { header: 'Órgão Procedência', field: 'OrgaoProcedencia',sortable: true
    },
    { header: 'Direcção Procedência', field: 'DirecProcedencia' ,sortable: true},
    { header: 'Data Entrada', field: 'DataEntrada',sortable: true, type: 'date'
      ,
      typeParameter: {
        format: 'dd/MM/yyyy', // Specify your desired date format here
        locale: 'en-US' // Optionally, specify the locale
      }
    },
    { header: 'Data do Documento', field: 'DataDocumento' ,sortable: true,type: 'date' ,
      typeParameter: {
        format: 'dd/MM/yyyy', // Specify your desired date format here
        locale: 'en-US' // Optionally, specify the locale
      }
      },
    { header: 'Código de class.', field: 'Classificador' ,sortable: true},
    {
      header: 'Assunto',
      field: 'TipoDoc',
      hide: true,
      minWidth: 120,
    },
    {
      header: 'Detalhes do assunto',
      field: 'Observacao',
      minWidth: 120,
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
      header: 'Receber',
      field: 'operation',
      minWidth: 100,
      width: '100px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
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
  usuario.inseriu='pendente';
let condicao='';

if(this.params.q.length>0){
  condicao=` classificador like '%${this.params.q}%' or DirecProcedencia like '%${this.params.q}%'
   or orgaoProcedencia like '%${this.params.q}%'`;
}
  const proc: Procura = {
    tabela: 'EntradaProcesso',
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

      console.log('Enter pressed');
    }
  }
  edit(value: any) {

this.dialog.confirm(`Tens certeza de que pretende receber o documento?!`,'',() => {
  const dialogRef = this.dialog.originalOpen(ReceberPendentesComponent, {
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
},
() => {
  // Action to perform on cancellation
  this.dialog.alert('cancelado pelo usuário');
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
    usuario.inseriu='pendente';
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
const value=this.auth.InicializarProcesso('');
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
}
