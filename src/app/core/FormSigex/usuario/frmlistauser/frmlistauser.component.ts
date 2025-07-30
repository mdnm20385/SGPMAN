import { Component, HostListener, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { AuthService, Usuario } from '@core/authentication';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FrmCadastrouserComponent } from '../frm-cadastrouser/frm-cadastrouser.component';


@Component({
  selector: 'app-frmlistauser',
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
     MatSlideToggleModule
  ],
  templateUrl: './frmlistauser.component.html',
  styleUrl: './frmlistauser.component.scss'
})
export class FrmlistauserComponent




implements OnInit,OnDestroy {
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
  constructor(public _dialog: MatDialog) {}
  columns: MtxGridColumn[] = [
    {
      header: 'Nome completo',
      field: 'Nome',
    },
    { header: 'Login', field: 'Login' },
    { header: 'Sexo', field: 'Sexo' },
    { header: 'Órgão ', field: 'Orgao' },
        { header: 'Direcção ', field: 'Direcao' },
    //{ header: 'Status', field: 'Activopa', cellTemplate: this.statusTpl ,width:'50px'},
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


  ngOnDestroy(): void {
    if(this.auth.obterentradaStamp()==true){
      this.auth.eliminarentradaStamp();
    }
  }

Requery(){
  const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='usuario';
let condicao='';
if(this.params.q.length>0){
  condicao=` nome like '%${this.params.q}%' or login like '%${this.params.q}%'
   or orgao like '%${this.params.q}%' or direcao  like '%${this.params.q}%' or Patentetegoria  like '%${this.params.q}%'
   `;
}
const condicaos='';
if(this.auth.obterentradaStamp()==true){
  //condicaos=`entradastamp='${this.auth.obterentradaStamp()}'`;
}
  const proc: Procura = {
    tabela: 'usuario',
    campo: 'nome',
    campo1: 'login',
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

const usr:Usuario={
  paStamp: value.PaStamp,
  codUsuario: value.CodUsuario,
  nome: value.Nome,
  login: value.Login,
  senha: value.Senha,
  priEntrada: value.PriEntrada,
  activopa: value.Activopa,
  inseriu: value.Inseriu,
  inseriuDataHora: value.InseriuDataHora,
  alterou: value.Alterou,
  alterouDataHora: value.AlterouDataHora,
  tipoPerfil: value.TipoPerfil,
  edaSic: value.EdaSic,
  sexo: value.Sexo,
  orgao: value.Orgao,
  direcao: value.Direcao,
  departamento: value.Departamento,
  orgaostamp: value.Orgaostamp,
  departamentostamp: value.Departamentostamp,
  direcaostamp: value.Direcaostamp,
  verSitClass: value.VerSitClass,
  pathPdf: value.PathPdf,
  tdocAniva: '',
  path1: '',
  passwordexperaem: '',
  email: value.Email,
  medico: value.Medico,
  patentetegoria: value.Patentetegoria,
  usuarioMenu: [],
};
    this.remoteSrv
    .GetUser(usr)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe(res => {
      value.path1='';
      res.dados.path1='';
      const dialogRef = this.dialog.originalOpen(FrmCadastrouserComponent, {
         width: '2000px',
        disableClose: true,
        autoFocus: false,
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: { record: res.dados },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.Requery();
      });
    });
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.Nome}!`);
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
   or orgao like '%${this.params.q}%'  or direcao like '%${this.params.q}%' or Patentetegoria  like '%${this.params.q}%'`;
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
  const usuario=this.auth.obterSessao() as Usuario;
    const value:Usuario={
      paStamp: this.auth.Stamp(),
      codUsuario: 0,
      nome: '',
      login: '',
      senha: '123',
      priEntrada: '1',
      activopa: true,
      inseriu: usuario.nome,
      inseriuDataHora: this.auth.ConvertDate(new Date()),
      alterou: '',
      alterouDataHora: this.auth.ConvertDate(new Date('2007-01-01')),
      tipoPerfil: '',
      edaSic: false,
      sexo: '',
      orgao: usuario.orgao,
      direcao: usuario.direcao,
      departamento: usuario.departamento,
      orgaostamp: usuario.orgaostamp,
      departamentostamp: usuario.departamentostamp,
      direcaostamp: usuario.direcaostamp,
      verSitClass: false,
      pathPdf: '',
      tdocAniva: '',
      path1: 'Novatosigex',
      passwordexperaem: '',
      email: null,
      medico: false,
      patentetegoria: '',
      usuarioMenu: [],

    };
      const dialogRef = this.dialog.originalOpen(FrmCadastrouserComponent, {
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
