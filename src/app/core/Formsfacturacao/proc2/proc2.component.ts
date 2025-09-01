import { Component, HostListener, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AuthService, Usuario } from '@core/authentication';
import { FrmModalArquivoComponent } from '@core/FormSigex/frm-modal-arquivo/frm-modal-arquivo.component';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared';
import { Processo, Arquivo } from 'app/classes/ClassesSIGEX';
import { Fact } from 'app/classes/Facturacao/Facturacao';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { FactModalComponent } from '../fact-modal/fact-modal.component';

@Component({
  selector: 'app-proc2',
  templateUrl: './proc2.component.html',
  styleUrl: './proc2.component.scss',
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
      MatCheckboxModule,
      MatRadioModule,
      MatIconModule,
    ],
})
export class Proc2Component

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
  // constructor(public _dialog: MatDialog) {}


   constructor(
    public dialogRef: MatDialogRef<Proc2Component>,
    @Inject(MAT_DIALOG_DATA) public data: Procura
    ) {
         this.columns=[{
      header: this.data.origem, field: this.data.campo||`Código`
      ,sortable: true},
    { header: this.data.descricao, field: this.data.campo1
      ||`Descrição`,sortable: true,hide:this.data.marcar
    },
    {
      header: 'Aceitar',
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
    },];
    }
  columns: MtxGridColumn[] = [
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
  usuario.inseriu=this.data.tabela;
let condicao='';
if(this.params.q.length>0){
  condicao=` ${this.data.campo} like '%${this.params.q}%' `;
}
  const proc: Procura = {
    tabela: this.data.tabela,
    campo: this.data.campo,
    campo1: this.data.campo1,
    camposseleccionados:
    this.data.camposseleccionados,
    valorprocurado: '',
    pagesize: 5,
    marcar: false,
    currentNumber: 1,
    condicoes: `${condicao}`,
    alunoestamp: this.data.alunoestamp,
    rhstamp: '',
    descricao: '',
    origem: '',
    referencia: this.data.referencia,
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
    this.dialogRef.close(value);
  }

  close(){

    this.dialogRef.close();
  }
  delete(value: any) {
   // this.dialog.alert(`You have deleted ${value.position}!`);
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
  usuario.inseriu=this.data.tabela;
let condicao='';
if(this.params.q.length>0){
  condicao=` ${this.data.campo} like '%${this.params.q}%' `;
}
  const proc: Procura = {
    tabela: this.data.tabela,
    campo: this.data.campo,
    campo1: this.data.campo1,
    camposseleccionados:
    this.data.camposseleccionados,
    valorprocurado: '',
    pagesize: pageSize,
    marcar: false,
    currentNumber: currentPage,
    condicoes: `${condicao}`,
    alunoestamp: this.data.alunoestamp,
    rhstamp: '',
    descricao: '',
    origem: '',
    referencia: this.data.referencia,
    usuario
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
 //console.log(`console.log`);
}
}
