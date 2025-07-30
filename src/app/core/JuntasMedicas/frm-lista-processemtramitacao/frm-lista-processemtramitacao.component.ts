import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { AuthService, Usuario } from '@core/authentication';
import { FrmEntradasProcessoComponent } from '@core/FormSigex/frm-entradas-processo/frm-entradas-processo.component';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridModule, MtxGridColumn } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared';
import { Processo, Arquivo, EntradaProcesso } from 'app/classes/ClassesSIGEX';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { FrmProcessoComponent } from '../frm-processo/frm-processo.component';

@Component({
  selector: 'app-frm-lista-processemtramitacao',
  templateUrl: './frm-lista-processemtramitacao.component.html',
  styleUrl: './frm-lista-processemtramitacao.component.scss',
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
export class FrmListaProcessemtramitacaoComponent
implements OnInit {
  private readonly remoteSrv = inject(TablesRemoteDataService);
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
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

  constructor(public _dialog: MatDialog) {


  }
  columns: MtxGridColumn[] = [
//Nome,Sexo,NumBi,ResProv,ConPrinc,ConAlter,Patente
    {
      header: 'Patente',
      field: 'Patente',
      minWidth: 100,
    },
    { header: 'Nome completo', field: 'Nome',sortable: true
    },
    { header: 'Sexo', field: 'Sexo' ,sortable: true,
      hide: true,},
    { header: 'Prov. de morada', field: 'ResProv' ,sortable: true},
    {
      header: 'Distr.de morada', field: 'ResDist',sortable: true
    },
    { header: 'Tipo doc', field: 'Tipodoc' ,sortable: true,
      hide: true,
      },
    { header: 'Nº de doc', field: 'NumBi' ,sortable: true,
      hide: true,},
    {
      header: 'Contacto principal',
      field: 'ConPrinc',
      minWidth: 120,
    },
    {
      header: 'Contacto alternativo',
      field: 'ConAlter',
      minWidth: 120,
    },
    { header: 'Estado da Junta', field: 'Inseriu',
      sortable: true },
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
  usuario.inseriu='pa';
let condicao='';

if(this.params.q.length>0){
  condicao=` nome like '%${this.params.q}%' or NumBi like '%${this.params.q}%'
     `;
    //  this.route.queryParams.subscribe(params => {
    //   if (params && Object.keys(params).length > 0) {
    //     condicao+=` or inseriu like '%${params.nome}%'`;

    //   }   else{
    //     condicao+=` or inseriu like '%${this.params.q}%'`;
    //   }
    //});
}else{
  // this.route.queryParams.subscribe(params => {
  //   if (params && Object.keys(params).length > 0) {
  //     condicao=` inseriu like '%${params.nome}%'`;

  //   }   else{
  //     condicao=` inseriu like '%${this.params.q}%'`;
  //   }
  // });
}


  const proc: Procura = {
    tabela: 'Pa',
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
    referencia: 'EM TRAMITAÇÃO',
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
    const dialogRef = this.dialog.originalOpen(FrmProcessoComponent, {
       width: '2000px',
      disableClose: true,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { record: value },
    });
    dialogRef.afterClosed().subscribe(
      (retorno) => {
        this.query.q=retorno;
    this.search();
    }
  );
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
    usuario.inseriu='pa';
    let condicao='';
    if(this.params.q.length>0){
      condicao=` nome like '%${this.params.q}%' or NumBi like '%${this.params.q}%'
       `;
    }
      const proc: Procura = {
        tabela: 'Pa',
        campo: 'nome',
        campo1: 'NumBi',
      camposseleccionados: '*',
      valorprocurado: '',
      pagesize: pageSize,
      marcar: false,
      currentNumber: currentPage,
      condicoes: `${condicao}`,
      alunoestamp: 'nome asc',
      rhstamp: '',
      descricao: '',
      origem: '',
      referencia: 'EM TRAMITAÇÃO',
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
    const values=this.auth.InicializarPaciente();
              const dialogRef = this.dialog.originalOpen(FrmProcessoComponent, {
                  // height: '85%',
              width: '2000px',
              disableClose: true,
              autoFocus: false,
              enterAnimationDuration: '1000ms',
              exitAnimationDuration: '1000ms',
                  data: { record: values },
                });
                dialogRef.afterClosed().subscribe(
                  (retorno) => {
                    this.query.q=retorno;
                this.search();
                }

              );
      }

      @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
   alert('You have unsaved changes. Do you really want to leave?');
  }
}
