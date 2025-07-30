import { SelectionModel } from '@angular/cdk/collections';
import { JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmailValidator, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { AuthService, Usuario } from '@core/authentication';
import { VerVisualizadorFicheirosComponent } from '@core/FormSigex/ver-visualizador-ficheiros/ver-visualizador-ficheiros.component';
import { environment } from '@env/environment';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared';
import { selects, condicoesprocura } from 'app/classes/CampoSessoes';
import { Processo, Unidade, SaidaProcesso } from 'app/classes/ClassesSIGEX';
import { ServicoGeral } from 'app/classes/interfacesBuscas/servico-geral';
import { Procura, Selects } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'app-frm-cadastrouser',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
     MatDialogModule,
     MatButtonModule,
  //   JsonPipe,
  //  RouterLink,
    FormsModule,
   ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MtxButtonModule,
   // BreadcrumbComponent,
    MatIconModule,
    MatDatepickerModule,
    MatOptionModule,
   MatSelectModule,
   //AsyncPipe,
   MatDividerModule,
   MtxSelectModule, MatTabsModule,
   CommonModule,
   MtxGridModule,
   MatRadioModule,
    MatSlideToggleModule
  ],
  providers: [TablesRemoteDataService],
  templateUrl: './frm-cadastrouser.component.html',
  styleUrl: './frm-cadastrouser.component.scss'
})
export class FrmCadastrouserComponent
implements OnInit,AfterViewInit{
  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef,
    private fbs: FormBuilder){
  }
   translatex = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  ngAfterViewInit(): void {
    this.Getorgao();
    this.GetEspecieParametrizacao();
    this.GetselectpatenteParametrizacao();
    this.FillControlos();
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  search() {
    this.query.page = 0;
  }
  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }
  columns: MtxGridColumn[] = [

    { header: 'Descrição do Ficheiro', field: 'Descricao',sortable: true,minWidth: 300 },
    { header: 'Data de criação', field: 'DataArquivo',sortable: true,minWidth: 120, type: 'date',
      pinned: 'right',
      typeParameter: {
        format: 'dd/MM/yyyy', // Specify your desired date format here
        locale: 'en-US' // Optionally, specify the locale
      }},
    {
      header: 'Ver anexo',
      field: 'operation',
      minWidth: 100,
      width: '100px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translatex.stream('table_kitchen_sink.edit'),
          click: record => this.edit(record),
        },
      ],
    },
  ];
busca(event: Event){
  const target = event.target as HTMLInputElement;
  const value = target.value.toLowerCase();
  this.listdestinatario = this.listdestinatarioGeral.filter(x =>{
    return x.descricao.toLowerCase().includes(value) || x.orgao.toLowerCase().includes(value) ;
  });

}

@ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;

columnsDestinatarios: MtxGridColumn[] = [];

isAllSelecteddmz() {
  const numSelected = this.selectiondmz.selected.length;
  const numRows = this.listdestinatario.length;

  return numSelected === numRows;
}
selectiondmz = new SelectionModel<any>(true, []);



  edit(value: any) {


    const trabalho=this.auth.InitializeTrabalho();
    trabalho.path= value.Descricao;
  const dialogRef = this.dialog.originalOpen(VerVisualizadorFicheirosComponent, {
         // width: '100%',
        //  height:'100%',
        width: '2000px',
      disableClose: true,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: trabalho,
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

FillControlos(){

  if(this.data.record.path1=='Novatosigex'){

    this.registerForm.patchValue(
      {
        paStamp: this.data.record.paStamp,
      codUsuario: this.data.record.codUsuario,
      nome:this.data.record.nome,
      login: this.data.record.login,
      senha: this.data.record.senha,
      priEntrada: this.data.record.priEntrada,
      activopa: this.data.record.activopa,
      inseriu: this.data.record.inseriu,
      inseriuDataHora: this.data.record.inseriuDataHora,
      alterou: this.data.record.alterou,
      alterouDataHora: this.data.record.alterouDataHora,
      tipoPerfil: this.data.record.tipoPerfil,
      edaSic: this.data.record.edaSic,
      direcao: this.data.record.direcao,
      departamento:this.data.record.departamento,
      orgaostamp: this.data.record.orgaostamp,
      departamentostamp: this.data.record.departamentostamp,
      direcaostamp:this.data.record.direcaostamp,
      verSitClass: this.data.record.verSitClass,
      pathPdf: this.data.record.pathPdf,
      sexo: this.data.record.sexo,
      orgao: this.data.record.orgao,
      path1: this.data.record.path1,
tdocAniva:this.data.record.tdocAniva,
departamento12:  this.data.record.departamento,
direcaoOrigem1: String(this.data.record.direcao).toUpperCase(),
orgaoOrigem1: String(this.data.record.orgao).toUpperCase(),
sexo12: String(this.data.record.sexo).toUpperCase(),
patentetegoria1: String(this.data.record.patentetegoria).toUpperCase(),
email: String(this.data.record.email).toUpperCase(),
medico: this.data.record.medico,
    }
  );
  return;
  }

  this.registerForm.patchValue(
    {
      paStamp: this.data.record.paStamp,
    codUsuario: this.data.record.codUsuario,
    nome:this.data.record.nome,
    login: this.data.record.login,
    senha: this.data.record.senha,
    priEntrada: this.data.record.priEntrada,
    activopa: this.data.record.activopa,
    inseriu: this.data.record.inseriu,
    inseriuDataHora: this.data.record.inseriuDataHora,
    alterou: this.data.record.alterou,
    alterouDataHora: this.data.record.alterouDataHora,
    tipoPerfil: this.data.record.tipoPerfil,
    edaSic: this.data.record.edaSic,
    direcao: this.data.record.direcao,
    departamento:this.data.record.departamento,
    orgaostamp: this.data.record.orgaostamp,
    departamentostamp: this.data.record.departamentostamp,
    direcaostamp:this.data.record.direcaostamp,
    verSitClass: this.data.record.verSitClass,
    pathPdf: this.data.record.pathPdf,
    sexo: this.data.record.sexo,
    orgao: this.data.record.orgao,
    path1: this.data.record.path1,
tdocAniva:this.data.record.tdocAniva,
departamento12:  this.data.record.departamento,
direcaoOrigem1: String(this.data.record.direcao).toUpperCase(),
orgaoOrigem1: String(this.data.record.orgao).toUpperCase(),
sexo12: String(this.data.record.sexo).toUpperCase(),
tipoPerfil12: String(this.data.record.tipoPerfil).toUpperCase(),

patentetegoria1: String(this.data.record.patentetegoria).toUpperCase(),
email: String(this.data.record.email).toUpperCase(),
medico: this.data.record.medico,
  }
);
this.isLoadingProcesso=true;
if(this.data.record.pathPdf.length>0){
  this.setUrl(this.data.record.pathPdf);
}
return;
  this.registerForm.patchValue(
    {
      paStamp: this.data.record.PaStamp,
      codUsuario: this.data.record.CodUsuario,
      nome:this.data.record.Nome,
      login: this.data.record.Login,
      senha: this.data.record.Senha,
      priEntrada: this.data.record.PriEntrada,
      activopa: this.data.record.Activopa,
      inseriu: this.data.record.Inseriu,
      inseriuDataHora: this.data.record.InseriuDataHora,
      alterou: this.data.record.Alterou,
      alterouDataHora: this.data.record.AlterouDataHora,
      tipoPerfil: this.data.record.TipoPerfil,
      edaSic: this.data.record.EdaSic,
      direcao: this.data.record.Direcao,
      departamento:this.data.record.Departamento,
      orgaostamp: this.data.record.Orgaostamp,
      departamentostamp: this.data.record.Departamentostamp,
      direcaostamp:this.data.record.Direcaostamp,
      verSitClass: this.data.record.VerSitClass,
      pathPdf: this.data.record.PathPdf,
      sexo: this.data.record.Sexo,
      orgao: this.data.record.Orgao,
      path1: '',
tdocAniva:this.data.record.TdocAniva,
departamento12:  this.data.record.Departamento,
direcaoOrigem1: String(this.data.record.Direcao).toUpperCase(),
orgaoOrigem1: String(this.data.record.Orgao).toUpperCase(),
sexo12: String(this.data.record.Sexo).toUpperCase(),
tipoPerfil12: String(this.data.record.TipoPerfil).toUpperCase(),
  }
);


}
imageUrl!: string;

cleanup() {
  this.safeUrl= null;
  this.registerForm.patchValue({path1:''});
}
safeUrl: SafeResourceUrl | null = null;
private _isLoading$ = new BehaviorSubject<boolean>(false);
path:string= `${environment.Apiurl}Proc2`;
get isLoading$() {
  return this._isLoading$.asObservable();
}
setUrl(fileName:string) {
  this._isLoading$.next(true);
  this.cleanups();
  this.safeUrl = this.bypassAndSanitize(`${this.path}/LeituraDeFicheiros?ficheiro=${fileName}`);
  setTimeout(() => {
    this._isLoading$.next(false);
  }, 150);
}

cleanups() {
  this.safeUrl = '';
}

bypassAndSanitize(url:string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}



updateUrl(url: string) {
  this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  onFileChange(event: Event) {
    this.cleanup();
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
          this.converterBase64(event);
      const reader = new FileReader();
      reader.onload = () => {
        this.updateUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }


  valida=false;
  ficheiro: string='';
  name='';
 converterBase64(event: Event){
  const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
    this.registerForm.patchValue({tdocAniva:file.name});
      const reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);

    }
 }
  _handleReaderLoaded(readerEvt:any) {
    const binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
    this.registerForm.patchValue({path1:this.base64textString});
   }
  private base64textString:string='';
    handleFileSelect(evt:any){

    }
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
    private readonly auth = inject(AuthService);
    private readonly _authservice = inject(ServicoGeral);
    private readonly remoteSrv = inject(TablesRemoteDataService);
  private _snackBar= inject(MatSnackBar);
  selectedestadoe = 'EM TRAMITAÇÃO';
  isSubmitting = false;
  registerForm = this.fb.nonNullable.group(
    {
      paStamp: [''],
      codUsuario: [0],
      nome: [''],
      login: [''],
      senha: [''],
      priEntrada: [''],
      activopa: [true],
      inseriu: [''],
      inseriuDataHora: [''],
      alterou: [''],
      alterouDataHora: [''],
      tipoPerfil: ['',Validators.required],
      edaSic: [false],
      direcao: [''],
      departamento:[''],
      orgaostamp: [''],
      departamentostamp: [''],
      direcaostamp: [''],
      verSitClass: [false],
      pathPdf: [''],
      sexo: ['',Validators.required],
      orgao: ['',Validators.required],
      path1: [''],
estadotramitat:[''],
tdocAniva:[''],
direcaoOrigem1:  [''],
orgaoOrigem1:  [''],
departamento12:  [''],
sexo12:['',Validators.required],
tipoPerfil12: [''],
medico:[false],
patentetegoria1: [''],
 email: ['', [ Validators.email]]
    }
  );
  translate: any;
  mostrarAlerta(mensagem: string, tipo: string) {
    this._snackBar.open(mensagem, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }



  multiSelectabledesti = true;
  rowSelectabledesti = true;
  hideRowSelectionCheckboxdesti = false;
  showToolbardesti = true;
  columnHideabledesti = true;
  columnSortabledesti = true;
  columnPinnabledesti = true;
  rowHoverdesti = false;
  rowStripeddesti = false;
  showPaginatordesti = true;
  expandabledesti = false;
  columnResizabledesti = true;
  isLoadingdesti= false;
  totalRecordsdest: number = 0;









  totalsrow?: number = 0;
  query = {
    q: '',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 10,
  };
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
  selectedRows: any[] = [];
  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return p;
  }
  changeSort(e: any) {

  }

  getNextPage(e: PageEvent) {

   //
  }
  isLoadingProcesso=false;
  list: any[] = [];total = 0;
  pageSize = 0;
  pageIndex=0;
  totalRecords: number = 0;
  pagenumber: number = 0;
  pagesize: number = 0;
  pagetotalrecord: number = 0;
processo!:Processo;
listdestinatario: any[] = [];
listdestinatarioGeral: any[] = [];
  ngOnInit(): void {




  }

  Salvar(){
    if(this.registerForm.get('path1')!.value==='Novatosigex'){
      this.registerForm.patchValue({
        path1:'',
        tdocAniva:'',
        pathPdf:''
      });
    }
const entrda:Usuario={
  paStamp: this.registerForm.get('paStamp')!.value,
  codUsuario: this.registerForm.get('codUsuario')!.value,
  nome: this.registerForm.get('nome')!.value,
  login: this.registerForm.get('login')!.value,
  senha: this.registerForm.get('senha')!.value,
  priEntrada: this.registerForm.get('priEntrada')!.value,
  activopa: this.registerForm.get('activopa')!.value,
  inseriu: this.registerForm.get('inseriu')!.value,
  inseriuDataHora: this.registerForm.get('inseriuDataHora')!.value,
  alterou: this.registerForm.get('alterou')!.value,
  alterouDataHora: this.registerForm.get('alterouDataHora')!.value,
  tipoPerfil: this.registerForm.get('tipoPerfil')!.value,
  edaSic: this.registerForm.get('edaSic')!.value,
  sexo: this.registerForm.get('sexo')!.value,
  orgao: this.registerForm.get('orgao')!.value,
  direcao: this.registerForm.get('direcao')!.value,
  departamento: this.registerForm.get('departamento')!.value,
  orgaostamp: this.registerForm.get('orgaostamp')!.value,
  departamentostamp: this.registerForm.get('departamentostamp')!.value,
  direcaostamp: this.registerForm.get('direcaostamp')!.value,
  verSitClass: this.registerForm.get('verSitClass')!.value,
  pathPdf: this.registerForm.get('pathPdf')!.value,
  tdocAniva: this.registerForm.get('tdocAniva')!.value,
  path1: this.registerForm.get('path1')!.value,
  passwordexperaem: '',
  email: this.registerForm.get('email')!.value,
  medico: this.registerForm.get('medico')!.value,
  patentetegoria: this.registerForm.get('patentetegoria1')!.value,
  usuarioMenu: [],
};

this.auth
      .InserirUser(entrda)
      .pipe()
      .subscribe({
        next: (data) => {
          if(data.sucesso==true){
            this.dialog.alert(`Dados inseridos com sucesso!`);
            this.dialogRef.close();
          }else{
            this.dialog.alert(`Operação não executada! código do erro` +data.mensagem);
          }
        },
        error: (errorRes: HttpErrorResponse) => {
          this.isSubmitting = false;
          this.dialog.alert(`Operação não executada! código do erro` +errorRes.status);
        },
      });
  }

Seleccionartodos= false;
  selectorgaoprocede: selects[] = [];
  selectdirecoesproced: selects[] = [];
  selectperfil: selects[] = [];
  selectpatentetegoria1: selects[] = [];
  selectorgaos: selects[] = [];
  selectdirecoes: selects[] = [];
  loading = false;
  selectedorgao = null;
  selectedorgaoCustom = null;
  selectedorgaoCustomPromise = null;
  selectesexo: selects[] = [];
  EstadoTramitacao: selects[] = [];
  GrauConfidencialidade: selects[] = [];
  GrauUrgencia: selects[] = [];
  isLoading = false;
   Getorgao(){
    const se:condicoesprocura={
      tabela:'orgao',
      campo1: 'descricao',
      campo2:'orgaoStamp',
       condicao:'vazio',

       campochave:'orgaoStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectorgaoprocede= this.selectorgaos=data.dados.selects ;
      this.isLoading = false;

        }
      },
      error: (e) => {

      }
    });
  }

  GetEspecieParametrizacao():void{
    const se:condicoesprocura={
      tabela:'Busca',
      campo1: 'descricao',
      campo2:'numTabela',
       condicao:`vazio`,
       campochave:'BuscaStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          const busca=data.dados.selects;
           this.selectesexo = busca.filter(person => person.ordem =='53' );
            this.selectperfil = busca.filter(person => person.ordem ==='45');
        }
      },
      error: (e) => {

      }
    });
  }



  GetselectpatenteParametrizacao():void{
    const se:condicoesprocura={
      tabela:'pat',
      campo1: 'descricao',
      campo2:'ramo',
       condicao:`vazio`,
       campochave:'patStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          const busca=data.dados.selects;
           // this.selectpatentetegoria1 = busca.filter(person => person.ordem ==='45');
            this.selectpatentetegoria1 = busca.filter(person => person.descricao !=='');
        }
      },
      error: (e) => {

      }
    });
  }
  selectedCompanyCustom = null;
  ClearDirecoes(): void {
    this.selectdirecoes= [];
    this.registerForm.get('direcaoOrigem1')?.setValue('');
    this.selectdirecoesproced= [];
    this.registerForm.get('departamento12')?.setValue('');
    this.registerForm.patchValue({
      direcao:'',
      direcaostamp: '',
      departamentostamp:'',
      departamento:'',
    });
  }
  ClearDepartamento(): void {
    this.selectdirecoesproced= [];
    this.registerForm.get('departamento12')?.setValue('');
    this.registerForm.patchValue({
      departamentostamp:'',
      departamento:'',
    });
  }
  Onsexochenge(event: any): void {

    this.registerForm.patchValue({
      sexo:event.descricao,
    });
  }

  onSelectorgaoChange(event: any): void {
    this.selectdirecoes= [];
    this.registerForm.get('direcaoOrigem1')?.setValue('');
    this.registerForm.patchValue({
      orgaostamp:event.chave,
      orgao:event.descricao,
      direcao:'',
      direcaostamp: '',
      departamentostamp:'',
      departamento:'',
    });
    const se:condicoesprocura={
      tabela:'unidade',
      campo1: 'descricao',
      campo2:'unidadeStamp',
       condicao:`orgaoStamp='${event.chave}'`,
       campochave:'unidadeStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectdirecoes=data.dados.selects ;
        }
      },
      error: (e) => {

      }
    });
  }

  onDirecaoChange(event: any): void {
    this.registerForm.patchValue({
      direcao:event.descricao,
      direcaostamp: event.chave,
      departamentostamp:'',
      departamento:'',
    });
    this.registerForm.get('departamento12')?.setValue('');
    const se:condicoesprocura={
      tabela:'subunidade',
      campo1: 'descricao',
      campo2:'subunidadeStamp',
       condicao:`unidadeStamp='${event.chave}'`,
       campochave:'subunidadeStamp'
    };
    this.remoteSrv
    .getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectdirecoesproced=data.dados.selects ;
        }
      },
      error: (e) => {

      }
    });
  }
  ClearDirecoesrocede(): void {
    this.selectdirecoesproced= [];
    this.registerForm.get('departamento12')?.setValue('');
    this.registerForm.patchValue({
      direcao:'',
      direcaostamp: '',
      departamentostamp:'',
      departamento:'',
    });
  }
  onselectDepartamento(event: any): void {
    this.registerForm.patchValue({
      departamento:event.descricao,
      departamentostamp: event.chave,
    });

  }

  onselectPerfil(event: any): void {
    this.registerForm.patchValue({
      tipoPerfil:event.descricao,
    });
  }
  onselectpatentecategoria(event: any): void {
    this.registerForm.patchValue({
      patentetegoria1:event.descricao,
    });
  }

  onEstadotramitacaChange(event: any): void {
    this.registerForm.patchValue({
      //estado:event.descricao,
    });
  }
  ongrauClassifiChange(event: any): void {
    this.registerForm.patchValue({
      //grauClassifi:event.descricao,
    });
  }
   onnvlUrgenciaChange(event: any): void {
    this.registerForm.patchValue({
     // nvlUrgencia:event.descricao,
    });
  }

}

