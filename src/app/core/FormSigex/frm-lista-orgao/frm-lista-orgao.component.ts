import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MtxGridModule, MtxGridColumn } from '@ng-matero/extensions/grid';
import { PageHeaderComponent } from '@shared';
import { Procura } from 'app/classes/Procura';
import { TablesKitchenSinkEditComponent } from 'app/routes/tables/kitchen-sink/edit/edit.component';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateService } from '@ngx-translate/core';
import { FrmModalOrgaoComponent } from '../frm-modal-orgao/frm-modal-orgao.component';
import { AuthService, Usuario } from '@core/authentication';
import { condicoesprocura } from 'app/classes/CampoSessoes';
import { Orgao, Unidade } from 'app/classes/ClassesSIGEX';
import { FrmModalDirecaoComponent } from '../frm-modal-direcao/frm-modal-direcao.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-frm-lista-orgao',
  templateUrl: './frm-lista-orgao.component.html',
  styleUrl: './frm-lista-orgao.component.scss',
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
export class FrmListaOrgaoComponent


implements OnInit {
  private readonly remoteSrv = inject(TablesRemoteDataService);

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



  AddNew() {
    if(this.auth.isAutenticated()===false){
      return;
  }

  const processoStamps=this.auth.Stamp();
  const proc: condicoesprocura = {
    tabela: 'orgao',
    campo1: 'codorgao',
    campo2: 'descricao',
    condicao: `1=1`,
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
const usr:Orgao={
  orgaoStamp: processoStamps,
  codOrgao: Number(nume),
  descricao: '',
  inseriu: 'inserindo',
  inseriuDataHora: this.auth.ConvertDate(new Date()),
  alterou: '',
  alterouDataHora: this.auth.ConvertDate(new Date()),
  organica: 0,
  totalOf: 0,
  totalOfGen: 0,
  totalGenEx: 0,
  totalTteGen: 0,
  totalMajGen: 0,
  totalBrigadeiro: 0,
  totalOfSup: 0,
  totalCor: 0,
  totalTteCor: 0,
  totalMaj: 0,
  totalOfSub: 0,
  totalCap: 0,
  totalTte: 0,
  totalTteMil: 0,
  totalAlf: 0,
  totalAlfMil: 0,
  totalSarg: 0,
  totalInt: 0,
  totalSub: 0,
  totalPriSar: 0,
  totalSegSar: 0,
  totalTerSar: 0,
  totalFur: 0,
  totalPra: 0,
  totalPriCab: 0,
  totalSegCab: 0,
  totalSold: 0,
};
const dialogRef = this.dialog.originalOpen(FrmModalOrgaoComponent, {
  width: '600px',
 disableClose: true,
 autoFocus: false,
 enterAnimationDuration: '1000ms',
 exitAnimationDuration: '1000ms',
 data: { record: usr},
});
dialogRef.afterClosed().subscribe(() => {
 this.requery();
});
    this.isLoading = false;
  }

  else{
    this.dialog.alert(`Ocorreu um erro ao tentar carregar o valor máximo!`);
  }
  }




);







      }
  columns: MtxGridColumn[] = [
    // {
    //   header: 'Name',
    //   field: 'name',
    //   formatter: (data: any) => `<a href="${data.html_url}" target="_blank">${data.name}</a>`,
    // },
    // { header: 'Owner', field: 'owner.login' },
    // { header: 'Owner Avatar', field: 'owner.avatar_url', type: 'image' },
    { header: 'Código', field: 'codOrgao', type: 'number' },
    { header: 'Descrição', field: 'descricao' },

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

  pagenumber: number = 0;
  pagesize: number = 0;

  pagetotalrecord: number = 0;

  totalsrow?: number = 0;
  query = {
    q: '',
    sort: '',
    order: 'desc',
    page: 0,
    per_page: 10,
  };

  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return p;
  }
  requery(){
    const usuario=this.auth.obterSessao() as Usuario;
    usuario.inseriu='orgao';
let condicao='';

if(this.params.q.length>0){
  condicao=` descricao like '%${this.params.q}%'
   `;
}


  const proc: Procura = {
     tabela: 'orgao',
     campo: 'descricao',
       campo1: 'codorgao',
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
  }
  private readonly auth = inject(AuthService);
  ngOnInit() {
   this.requery();
  }
  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(FrmModalOrgaoComponent, {
      width: '600px',
      data: { record: value },
    });
    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  delete(value: Orgao) {
    const proc: condicoesprocura = {
      tabela: 'Orgao',
      campo1: 'codOrgao',
      campo2: 'descricao',
      condicao: `orgaoStamp='${value.orgaoStamp}'`,
      campochave: null
    };
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
        this.requery();

    }else
    this.dialog.alert(`Não foi possível apagar o registo ${value.descricao}!\nTenta novamente e se o erro persistir\ncontacte o administrador`);

  }
  );
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
    const proc: Procura = {
      tabela: 'orgao',
      campo: 'descricao',
      campo1: 'codorgao',
      camposseleccionados: '*',
      valorprocurado: '',
      pagesize: pageSize,
      marcar: false,
      currentNumber: currentPage,
      condicoes: '',
      alunoestamp: '',
      rhstamp: '',
      descricao: '',
      origem: '',
      referencia: '',
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
    this.requery();
  }
  reset() {
    this.query.page = 0;
    this.query.per_page = 10;
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F2'){
      this.AddNew();
    } else if (event.key === 'Enter' ){
       this.requery();
    }
  }
}
