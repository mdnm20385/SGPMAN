import { Component, inject, signal, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { MtxGridModule, MtxGridColumn } from '@ng-matero/extensions/grid';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Pais } from 'app/classes/Facturacao/Facturacao';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, Usuario } from '@core/authentication/auth.service';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { condicoesprocura } from 'app/classes/CampoSessoes';
import { ModalPaisComponent } from '@core/SGPMFORMS/Modal/modal-pais/modal-pais.component';

@Component({
  selector: 'app-pais',
  standalone: true,
  imports: [
    PageHeaderComponent,
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
    MatSlideToggleModule,
  ],
  templateUrl: './pais.component.html',
  styleUrl: './pais.component.scss',
  providers: [TablesRemoteDataService],
})
export class PaisComponent implements OnInit {
  private readonly dialog = inject(MtxDialog);
  private readonly translate = inject(TranslateService);
  private readonly auth = inject(AuthService);
  private readonly remoteSrv = inject(TablesRemoteDataService);

  list = signal<any[]>([]);
  total = signal(0);
  pageSize = signal(0);
  pageIndex = signal(0);
  isLoading = signal(true);
  totalRecords = signal(0);
  pagenumber = signal(0);
  pagesize = signal(0);
  pagetotalrecord = signal(0);
  totalsrow = signal(0);

  multiSelectable = signal(true);
  rowSelectable = signal(true);
  hideRowSelectionCheckbox = signal(false);
  showToolbar = signal(true);
  columnHideable = signal(true);
  columnSortable = signal(true);
  columnPinnable = signal(true);
  rowHover = signal(false);
  rowStriped = signal(false);
  showPaginator = signal(true);
  expandable = signal(false);
  columnResizable = signal(false);
  query = signal({
    q: '',
    sort: '',
    order: 'desc',
    page: 0,
    per_page: 10,
  });

  ngOnInit(): void {
    this.requery();
  }

  columns: MtxGridColumn[] = [
    { header: 'Código', field: 'codPais', type: 'number' },
    { header: 'Descrição', field: 'descricao' },
    { header: 'Abreviatura', field: 'abreviatura' },

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
    },
  ];

  requery() {
    this.isLoading.set(true);
    const usuario = this.auth.obterSessao() as Usuario;
    usuario.inseriu = 'pais';
    let condicao = '';
    if (this.params.q.length > 0) {
      condicao = ` descricao like '%${this.params.q}%'`;
    }

    const proc: Procura = {
      tabela: 'pais',
      campo: 'descricao',
      campo1: 'codPais',
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
      usuario,
    };

    this.remoteSrv
      .MetodoGenerico(proc)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe(res => {
        this.list.set(res.data);
        this.totalRecords.set(res.totalCount);
        this.pagenumber.set(1);
        this.pagesize.set(10);
        this.pagetotalrecord.set(res.totalCount);
        this.isLoading.set(false);
      });
  }

  search() {}

  AddNew() {
    if (this.auth.isAutenticated() === false) {
      return;
    }

    const paisStamp = this.auth.Stamp();
    const proc: condicoesprocura = {
      tabela: 'pais',
      campo1: 'codPais',
      campo2: 'descricao',
      condicao: `1=1`,
      campochave: null,
    };
   

    this.remoteSrv
      .GetMax(proc)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe(res => {
        if (res.sucesso === true) {
          const nume = res.dados.ordem;


          const usr: Pais = {
            paisStamp: paisStamp,
            codPais: nume,
            descricao: '',
            inseriu: 'inserindo',
            inseriuDataHora: this.auth.ConvertDate(new Date()),
            alterou: '',
            alterouDataHora: this.auth.ConvertDate(new Date()),
            abreviatura: '',
            nacional: false,
            pordefeito: false,
          };

          const dialogRef = this.dialog.originalOpen(ModalPaisComponent, {
            width: '600px',
            disableClose: true,
            autoFocus: false,
            enterAnimationDuration: '1000ms',
            exitAnimationDuration: '1000ms',
            data: { record: usr },
          });
          dialogRef.afterClosed().subscribe(() => {
            this.requery();
          });
          this.isLoading.set(false);
        } else {
          this.dialog.alert(`Ocorreu um erro ao tentar carregar o valor máximo!`);
        }
      });
  }

  edit(value: any) {}
  delete(value: Pais) {}

  getPage(e: any) {
    const currentPage = (e.pageIndex ?? 0) + 1;
    const pageSize = e.pageSize ?? 0;
    const usuario = this.auth.obterSessao() as Usuario;

    const proc: Procura = {
      tabela: 'pais',
      campo: 'descricao',
      campo1: 'codPais',
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
      usuario,
    };

    this.remoteSrv
      .MetodoGenerico(proc)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe(res => {
        this.list = res.data;
        this.totalRecords.set(res.totalCount);
        this.pagenumber = currentPage;
        this.pagesize = pageSize;
        this.pagetotalrecord.set(res.totalCount);
        this.isLoading.set(false);
      });
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  get params() {
    const p = Object.assign({}, this.query());
    p.page += 1;
    return p;
  }
}
