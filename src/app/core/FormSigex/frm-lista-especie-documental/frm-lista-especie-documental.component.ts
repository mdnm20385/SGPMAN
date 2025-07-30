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
import { EspecieDocumental } from 'app/classes/ClassesSIGEX';
import { FrmEspecieDocumentalComponent } from '../frm-especie-documental/frm-especie-documental.component';
import { AuthService, Usuario } from '@core/authentication';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-frm-lista-especie-documental',
  templateUrl: './frm-lista-especie-documental.component.html',
  styleUrl: './frm-lista-especie-documental.component.scss',
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
})
export class FrmListaEspecieDocumentalComponent


implements OnInit {
  private readonly remoteSrv = inject(TablesRemoteDataService);
//uni!:Unidade
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
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
  columnResizable = false;
  columns: MtxGridColumn[] = [
    { header: 'Cód. Classif.', field: 'CodClassif' },
    { header: 'Descrição', field: 'Descricao' },
    { header: 'Vida útil', field: 'VidaUtil' },
    { header: 'Dest. Final', field: 'DestnFnl' },

    {
      header: 'Acções',
      field: 'operation',
      minWidth: 140,
      width: '140px',
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
    }
    // { header: 'Stars', field: 'stargazers_count', type: 'number' },
    // { header: 'Forks', field: 'forks_count', type: 'number' },
    // { header: 'Score', field: 'score', type: 'number' },
    // { header: 'Issues', field: 'open_issues', type: 'number' },
    // { header: 'Language', field: 'language' },
    // { header: 'License', field: 'license.name' },
    // { header: 'Home Page', field: 'homepage', type: 'link' },
    // { header: 'Is forked', field: 'fork', type: 'boolean' },
    // {
    //   header: 'Archived',
    //   field: 'archived',
    //   type: 'tag',
    //   tag: {
    //     true: { text: 'Yes', color: 'red-100' },
    //     false: { text: 'No', color: 'green-100' },
    //   },
    // },
    // { header: 'Created Date', field: 'created_at' },
    // { header: 'Updated Date', field: 'updated_at' },
  ];
  list: any[] = [];
  total = 0;
  pageSize = 0;
  //total = 0;
  pageIndex=0;
  isLoading = true;
  totalRecords: number = 0;
kk!:EspecieDocumental;
  pagenumber: number = 0;
  pagesize: number = 0;

  pagetotalrecord: number = 0;

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
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F2'){
      this.AddNew();
    } else if (event.key === 'Enter' ){
       this.Requery();
    }
  }


  Requery(){
    const usuario=this.auth.obterSessao() as Usuario;
  let condicao='';
  if(this.params.q.length>0){
    condicao=` descricao like '%${this.params.q}%' or codClassif like '%${this.params.q}%'

     `;
  }

  const proc: Procura = {
    tabela: 'EspecieDocumental',
    campo: 'descricao',
    campo1: 'codClassif',
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
    .MetodoGenerico(proc)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe(res => {
      this.list = res.data;
      this.totalRecords = res.totalCount;
      this.pagenumber = 0;
      this.pagesize = 5;
      this.pagetotalrecord=res.totalCount;
      this.isLoading = false;
    });




    // const proc: Procura = {
    //   tabela: 'EspecieDocumental',
    //   campo: 'descricao',
    //   campo1: 'codClassif',
    //   camposseleccionados: ' * ',
    //   valorprocurado: '',
    //   pagesize: 5,
    //   marcar: false,
    //   currentNumber: 1,
    //   condicoes: `${condicao}`,
    //   alunoestamp: 'descricao asc',
    //   rhstamp: '',
    //   descricao: '',
    //   origem: '',
    //   referencia: condicaos,
    //   usuario
    // };
    // this.remoteSrv
    // .MetodoGenerico(proc)
    // .pipe(
    //   finalize(() => {
    //     this.isLoading = false;
    //   })
    // )
    // .subscribe(res => {
    //   this.list = res.data;
    //   this.totalRecords = res.totalCount;
    //   this.pagenumber = res.currentPageNumber;
    //   this.pagesize = res.pageSize;
    //   this.pagetotalrecord=res.totalCount;
    //   this.total=res.totalCount;
    //   this.isLoading = false;
    // });
  }
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
      const dialogRef = this.dialog.originalOpen(FrmEspecieDocumentalComponent, {
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
  private readonly auth = inject(AuthService);
  ngOnInit() {
    this.Requery();

  }


  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(FrmEspecieDocumentalComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() =>
    this.Requery());
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
    // const currentPage = (e.pageIndex ?? 0) + 1;

    // const pageSize = e.pageSize ?? 0;
    // const usuario=this.auth.obterSessao() as Usuario;
    // const proc: Procura = {
    //   tabela: 'EspecieDocumental',
    //   campo: 'descricao',
    //   campo1: 'codClassif',
    //   camposseleccionados: '*',
    //   valorprocurado: '',
    //   pagesize: pageSize,
    //   marcar: false,
    //   currentNumber: currentPage,
    //   condicoes: '',
    //   alunoestamp: '',
    //   rhstamp: '',
    //   descricao: '',
    //   origem: '',
    //   referencia: '',usuario
    // };

    const currentPage = (e.pageIndex ?? 0) + 1;
    const pageSize = e.pageSize ?? 0;
    const usuario=this.auth.obterSessao() as Usuario;
      usuario.inseriu='EspecieDocumental';
    let condicao='';
if(this.params.q.length>0){
  condicao=` descricao like '%${this.params.q}%' or codClassif like '%${this.params.q}%'
   `;
}
    const proc: Procura = {
      tabela: 'EspecieDocumental',
      campo: 'descricao',
      campo1: 'codClassif',
      camposseleccionados: '*',
      valorprocurado: '',
      pagesize: pageSize,
      marcar: false,
      currentNumber: currentPage,
      condicoes: `${condicao}`,
      alunoestamp: 'descricao asc',
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

  reset() {
    this.query.page = 0;
    this.query.per_page = 10;
    //this.getList();
  }
}


