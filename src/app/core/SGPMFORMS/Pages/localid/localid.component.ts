import { Component, inject, OnInit, signal } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { PageHeaderComponent } from "@shared";
import { TranslateService } from '@ngx-translate/core';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { AuthService, Usuario } from '@core/authentication/auth.service';
import { Procura, Selects } from 'app/classes/Procura';
import { finalize, map } from 'rxjs';
import { Localidade, PostAdm } from 'app/classes/ClassesSIGEX';
import { condicoesprocura } from 'app/classes/CampoSessoes';
import { ModalPostAdminComponent } from '@core/SGPMFORMS/Modal/modal-post-admin/modal-post-admin.component';
import { ModalLocalidComponent } from '@core/SGPMFORMS/Modal/modal-localid/modal-localid.component';


@Component({
  selector: 'app-localid',
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
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './localid.component.html',
  styleUrl: './localid.component.scss',
   providers: [TablesRemoteDataService],
})
export class LocalidComponent implements OnInit {
route=inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);
    private readonly auth = inject(AuthService);
    private readonly remoteSrv = inject(TablesRemoteDataService);
    private readonly dialog = inject(MtxDialog);
     private readonly router = inject(Router);
  postAdmStamp = signal<string>("");
  codPostoAdm= signal<string>("");

  
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


    async ngOnInit(): Promise<void> {
   let valor=this.route.snapshot.paramMap.get('postAdmStamp') ??"";
    let postAdmCod=await this.getPostoAdmin(valor);
    this.codPostoAdm.set(postAdmCod);
   this.postAdmStamp.set(valor);
    this.requery(valor);
  }



    getPostoAdmin(valor:string): Promise<string>{ 
        const usuario:Selects={
              chave: '',
              descricao: `select * from PostAdm where postAdmStamp='${valor}'`,
              ordem: ''
            };
            return this.remoteSrv.GenDt(usuario).pipe(
              map(res => res.length > 0 ? res[0].codPostoAdm : '')).toPromise();
      }

  requery(valor:string) {
      this.isLoading.set(true);
      const usuario = this.auth.obterSessao() as Usuario;
      usuario.inseriu = 'Localidade';
      let condicao = '';
      if (valor.length > 0) {
        condicao = ` postAdmStamp='${valor}' `;
      }
  
      const proc: Procura = {
        tabela: 'Localidade',
        campo: 'descricao',
        campo1: 'codLocalidade',
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


    columns: MtxGridColumn[] = [
    { header: 'Código', field: 'codLocalidade', type: 'number' },
    { header: 'Descrição', field: 'descricao' },

    {
      header: 'Acções',
      field: 'operation',
      minWidth: 180,
      width: '180px',
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
 

    search() {
      
    }


    AddNew(){
if (this.auth.isAutenticated() === false) {
      return;
    }

    const localidadeStamp = this.auth.Stamp();
    const proc: condicoesprocura = {
      tabela: 'Localidade',
      campo1: 'codLocalidade',
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

          const usr: Localidade = {
            localidadeStamp: localidadeStamp,
            codLocalidade: nume,
            descricao: '',
            codPostoAdm: this.codPostoAdm(),
            inseriu: 'inserindo',
            inseriuDataHora: this.auth.ConvertDate(new Date()),
            alterou: '',
            alterouDataHora: this.auth.ConvertDate(new Date()),
            postAdmStamp: this.postAdmStamp(),
          };

          const dialogRef = this.dialog.originalOpen(ModalLocalidComponent, {
            width: '600px',
            disableClose: true,
            autoFocus: false,
            enterAnimationDuration: '1000ms',
            exitAnimationDuration: '1000ms',
            data: { record: usr },
          });
          dialogRef.afterClosed().subscribe(() => {
            this.requery(this.postAdmStamp());
          });
          this.isLoading.set(false);
        } else {
          this.dialog.alert(`Ocorreu um erro ao tentar carregar o valor máximo!`);
        }
      });
   }

  edit(record: any) {
    // Lógica para editar
  }

  delete(record: any) {
    // Lógica para deletar
  }

  changeSelect(e: any){}

  getPage(e: any){

  }

  get params() {
    const p = Object.assign({}, this.query());
    p.page += 1;
    return p;
  }
}
