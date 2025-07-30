import { AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Usuario } from '@core/authentication';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { FrmCadastrouserComponent } from '../usuario/frm-cadastrouser/frm-cadastrouser.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PageHeaderComponent } from '@shared';
import { busca } from 'app/classes/busca';
import { FrmBuscaComponent } from '../frm-busca/frm-busca.component';
import { condicoesprocura, selects } from 'app/classes/CampoSessoes';

@Component({
  selector: 'app-frm-lista-busca',
  standalone: true,
   providers: [TablesRemoteDataService],
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
     MatSlideToggleModule
  ],
  templateUrl: './frm-lista-busca.component.html',
  styleUrl: './frm-lista-busca.component.scss'
})



export class FrmListaBuscaComponent

implements OnInit,OnDestroy, OnInit,AfterViewInit  {
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
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;
  constructor(public _dialog: MatDialog,private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,) {}

  ngAfterViewInit(): void {

  }




  columns: MtxGridColumn[] = [
    {
      header: 'Código',
      field: 'codBusca',
    },
    { header: 'Descrição', field: 'descricao' },
    {
      header: 'Acções',
      field: 'operation',
      minWidth: 100,
      width: '150px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('table_kitchen_sink.edit'),
          click: record => this.edit(record),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('table_kitchen_sink.delete'),
          pop: {
            title: this.translate.stream('table_kitchen_sink.confirm_delete'),
            closeText: this.translate.stream('table_kitchen_sink.close'),
            okText: this.translate.stream('table_kitchen_sink.ok'),
          },
          click: record => this.delete(record),
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
    this.changeDetection.detectChanges();
  }


  ngOnDestroy(): void {

  }
titulo:string='';
Requery(){
        if(localStorage.getItem('currentid')!==JSON.stringify(this.route.snapshot.paramMap.get('id')) && this.route.snapshot.paramMap.get('id')!==null){
              localStorage.setItem('currentid', JSON.stringify(this.route.snapshot.paramMap.get('id')));
              // window.location.reload();
              // return;
            }

  const id =String(this.route.snapshot.paramMap.get('id')?.replace(`:`,'')) ;
switch(id){
case '20':
  this.titulo='ESTADO DE HOMOLOGAÇÃO';
  break;
  case '45':
    this.titulo='TIPO DE PERFIL';
    break;
    case '51':
      this.titulo='Grau de classigicação'.toUpperCase();
      break;
      case '52':
        this.titulo='NÍVEL DE URGÊNCIA'.toUpperCase();
        break;
}



  const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='busca';
let condicao='';

if(this.params.q.length>0){
  condicao=` descricao like '%${this.params.q}%'
   `;
}



let condicaos='';
if(this.route.snapshot.paramMap.get('id')!==null){
  condicaos=`numtabela='${this.route.snapshot.paramMap.get('id')?.replace(`:`,'')}'`;
}else{
  return;
}
  const proc: Procura = {
    tabela: 'busca',
    campo: 'descricao',
    campo1: 'codBusca',
    camposseleccionados: ' * ',
    valorprocurado: '',
    pagesize: 5,
    marcar: false,
    currentNumber: 1,
    condicoes: `${condicao}`,
    alunoestamp: 'descricao asc',
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



const usr:busca={
  buscaStamp:value.buscaStamp,
  codBusca: value.codBusca,
  descricao:value.descricao,
  numTabela: value.numTabela,
  inseriu: value.inseriu,
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou:this.titulo,
  alterouDataHora: this.auth.ConvertDate(new Date()),
};

const dialogRef = this.dialog.originalOpen(FrmBuscaComponent, {
  width: '600px',
 disableClose: true,
 autoFocus: false,
 enterAnimationDuration: '1000ms',
 exitAnimationDuration: '1000ms',
 data: { record: usr},
});
dialogRef.afterClosed().subscribe(() => {
 this.Requery();
});
  }

  delete(value: busca) {
    const proc: condicoesprocura = {
      tabela: 'busca',
      campo1: 'codBusca',
      campo2: 'descricao',
      condicao: `buscaStamp='${value.buscaStamp}'`,
      campochave: null
    };
    //let numero=0;
    this.remoteSrv
    .Delete(proc)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe(res => {

      if(res.sucesso===true){
        this.dialog.alert(`o registo: ${value.descricao}, foi eliminado com sucesso!`);
        this.Requery();

    }else
    this.dialog.alert(`Não foi possível apagar o registo ${value.descricao}!\nTenta novamente e se o erro persistir\ncontacte o administrador`);

  }
  );
  }

  changeSelect(e: any) {
    //console.log(e);
  }

  changeSort(e: any) {
    //console.log(e);
  }

  getNextPage(e: PageEvent) {
    const currentPage = (e.pageIndex ?? 0) + 1;
    const pageSize = e.pageSize ?? 0;
    const usuario=this.auth.obterSessao() as Usuario;
      usuario.inseriu='usuario';
    let condicao='';
if(this.params.q.length>0){
  condicao=` nome like '%${this.params.q}%' or login like '%${this.params.q}%'
   or orgao like '%${this.params.q}%'  or direcao like '%${this.params.q}%'`;
}
    const proc: Procura = {
      tabela: 'usuario',
      campo: 'nome',
      campo1: 'login',
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

  const id =String(this.route.snapshot.paramMap.get('id')?.replace(`:`,'')) ;
  const processoStamps=this.auth.Stamp();
  const proc: condicoesprocura = {
    tabela: 'busca',
    campo1: 'codBusca',
    campo2: 'descricao',
    condicao: `numTabela=${id}`,
    campochave: null
  };
  //let numero=0;
  this.remoteSrv
  .GetMax(proc)
  .pipe(
    finalize(() => {
      this.isLoading = false;
    })
  )
  .subscribe(res => {

    if(res.sucesso===true){

const nume=res.dados.ordem;
const usr:busca={
  buscaStamp:processoStamps,
  codBusca:Number(nume),
  descricao:'',
  numTabela: id,
  inseriu: '',
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou:this.titulo,
  alterouDataHora:  this.auth.ConvertDate(new Date()),
};
const dialogRef = this.dialog.originalOpen(FrmBuscaComponent, {
  width: '600px',
 disableClose: true,
 autoFocus: false,
 enterAnimationDuration: '1000ms',
 exitAnimationDuration: '1000ms',
 data: { record: usr},
});
dialogRef.afterClosed().subscribe(() => {
 this.Requery();
});
    this.isLoading = false;
  }

  else{
    this.dialog.alert(`Ocorreu um erro ao tentar carregar o valor máximo!`);
  }
  }




);







      }
}




