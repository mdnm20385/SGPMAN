import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, NgZone, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, FormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService, Usuario } from '@core/authentication';
import { CCu, Fact, Factl, Formasp, LineValues,
   Param,
   Tdoc} from
   'app/classes/Facturacao/Facturacao';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { Proc2Component } from '../proc2/proc2.component';
import { selects } from 'app/classes/Procura';
import { GenericoService } from 'app/InterfacesSigex/generic-service';
import { condicoesprocura, dmzview } from 'app/classes/CampoSessoes';
import moment from 'moment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-frm-ft',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule, MatDividerModule, MatCardModule, MatFormFieldModule,MatInputModule,
    MatCheckboxModule, MatTabsModule, MatButtonModule,MatTableModule,ReactiveFormsModule,
    MatIcon, MatSelectModule,MatDatepickerModule,MatAutocompleteModule,
  ],
  templateUrl: './frm-ft.component.html',
})
export class FrmFtComponent  implements AfterViewInit{
  frmFtForm: FormGroup;
  // Grid principal
gridColumns: string[] = [
   'ref', 'descricao', 'ivainc','quant', 'preco','servico',
    'txiva','valival','subtotall','totall'
];
  myControlCcu = new FormControl<string | selects>('');
  txivaOptions= new FormControl<string | selects>('');
  optionsCcu: selects[] = [];
  txivaOptionss: selects[] = [];
  filteredOptionsCcu!: Observable<selects[]>;
  filteredOptionstxiva!: Observable<selects[]>;
  gridDataSource: any[] = [];
  selectedGridIndex: number | null = null;
For:Formasp[]=[];
  // Tesouraria
  tesourariaColumns: string[] = [
    'titulo', 'numtitulo', 'contatesoura', 'dcheque', 'valor', 'moeda'
  ];
  tesourariaDataSource: any[] = [];
  selectedTesourariaIndex: number | null = null;
  // Anexos
  anexosColumns: string[] = ['documento', 'descricao', 'ficheiro'];
  anexossColumnss: string[] = ['documento', 'descricao', 'ficheiro'];
  anexosDataSource: any[] = [];
 factregDataSource: any[] = [];
 factpresDataSource: any[] = [];
  selectedAnexoIndex: number | null = null;
  Tdoc!:Tdoc;
  Ccu!:CCu;
  get anexosFormArray(): FormArray {
    return (< FormArray>this.frmFtForm.get('factanexo')) ;
  }
  get tesourariaFormArray(): FormArray {
    return  (< FormArray>this.frmFtForm.get('formasp'));
  }
  get factlFormArray(): FormArray {
    return (<FormArray>this.frmFtForm.get('factl'));
  }
  calcularProximoVencimento(dataBase: Date, mesesParaAdicionar: number): Date {
  const novaData = new Date(dataBase);
  const diaOriginal = novaData.getDate();
  novaData.setMonth(novaData.getMonth() + mesesParaAdicionar);
  // Corrige se o mês resultante tiver menos dias (ex: 31 para fevereiro)
  if (novaData.getDate() < diaOriginal) {
    novaData.setDate(0); // Vai para o último dia do mês anterior, que é o último do mês correto
  }
  return novaData;
}
  constructor(private fb: FormBuilder,
     private dialog: MatDialog, private cdr: ChangeDetectorRef,

      private ngZone: NgZone,
      private el: ElementRef, private renderer: Renderer2,
      ) {
    const data=new Date();
    const datavenc= this.calcularProximoVencimento(data,1);
const fact=this.auth.DoAddLine<Fact>();
      this.frmFtForm =this.generateFormGroupa();
       this.setFormState('cancel');
    }

    dmzview:dmzview[]=[];
async getParamd(): Promise<void> {
 this.Param =await this.auth.GetParamFromBd();
}

 async OnSelecttipodo(value:selects): Promise<void>{
      const se:selects={
        chave: 'tdoc',
        descricao:`${this.auth.querryTdoc()}`,
        ordem: `where tdocstamp='${value.chave}'`
      };
     await this.SetTipoDoc(se);
  }
  editando:boolean=true;
  async resetForm() {
        this.frmFtForm.reset();
          if(this.Tdoc!==null && this.Tdoc!==undefined){
              this.visibilidadeFormasp = this.Tdoc.movtz === true;
    this.ngZone.run(() => {
      this.formTitle = this.Tdoc.descricao;
    });
    this.frmFtForm.patchValue({
      numdoc: this.Tdoc.numdoc,
      nomedoc: this.Tdoc.descricao,
      codmovcc: this.Tdoc.codmovcc,
      descmovcc: this.Tdoc.descmovcc,
      sigla: this.Tdoc.sigla,
      codmovtz: this.Tdoc.codmovtz,
      descmovtz: this.Tdoc.descmovtz,
    });
    const ano = moment().format('YYYY');
    if (!this.editando) {
      const itemFact: selects = {
        chave: 'fact',
        descricao: `${this.auth.querryMaxFtFccDiRcl('numero')}`,
        ordem: `where isnumeric(numero) = 1 and tdocstamp='${this.Tdoc.tdocstamp}' and year(Data)='${ano}'`
      };
      const factData = await this.generico.MetodoGenerico(itemFact.chave,
        itemFact.descricao, itemFact.ordem).toPromise();
      if (factData && factData.sucesso) {
        this.frmFtForm.patchValue({
          numero: factData.dados[0].numero
        });
      }
    }
          }
       }
       isFormDisabled() {
        return this.frmFtForm.disabled; // Check if the form is disabled
      }
Reiniciar(): void {
  this.factlFormArray.clear();
  this.tesourariaFormArray.clear();
  // this.dataListaturma = new MatTableDataSource(this.listaFactl);
  this.resetForm();
  // await this.MetodoInicializacao();
  this.frmFtForm.patchValue({
    data: new Date('2030-05-01'),
    dataven: new Date(),
    moeda: 'MZN',
    moeda2: '',
    datapartida: new Date(),
    dataentrega: new Date(),
    ldata: new Date(),
  });
}
            visibilidadeFormasp:boolean=false;

async SetTipoDoc(item: selects): Promise<void> {
  // Reset completo do formulário e estado
  this.resetFormToInitialState();

  // Busca os dados do tipo de documento
  const data = await this.generico
    .MetodoGenerico(item.chave, item.descricao, item.ordem)
    .toPromise();

  if (data && data.sucesso) {
    this.Tdoc = data.dados[0];
    this.visibilidadeFormasp = this.Tdoc.movtz === true;

    this.ngZone.run(() => {
      this.formTitle = this.Tdoc.descricao;
    });

    // Preenche apenas os dados básicos do tipo de documento
    this.frmFtForm.patchValue({
      tdocstamp: this.Tdoc.tdocstamp,
      numdoc: this.Tdoc.numdoc,
      nomedoc: this.Tdoc.descricao,
      codmovcc: this.Tdoc.codmovcc,
      descmovcc: this.Tdoc.descmovcc,
      sigla: this.Tdoc.sigla,
      codmovtz: this.Tdoc.codmovtz,
      descmovtz: this.Tdoc.descmovtz,
      movtz: this.Tdoc.movtz,
      movstk: this.Tdoc.movstk,
      movcc: this.Tdoc.movcc,
      nc: this.Tdoc.nc,
      nd: this.Tdoc.nd,
      ft: this.Tdoc.ft,
      vd: this.Tdoc.vd,
      // Dados padrão para novo documento
      data: new Date(),
      dataven: new Date(),
      dataAprovacao: new Date(),
      moeda: 'MZN',
      moeda2: '',
      datapartida: new Date(),
      dataentrega: new Date(),
      ldata: new Date(),
      // Valores zerados
      subtotal: 0,
      perdesc: 0,
      perdescfin: 0,
      desconto: 0,
      descontofin: 0,
      mDescontofin: 0,
      totaliva: 0,
      total: 0,
      msubtotal: 0,
      mdesconto: 0,
      mtotaliva: 0,
      mtotal: 0,
      cambiousd: 0,
      cambfixo: false,
      anulado: false
    });

    // Se não está editando um documento existente, busca o próximo número
    if (!this.editando) {
      const ano = moment().format('YYYY');
      const itemFact: selects = {
        chave: 'fact',
        descricao: `${this.auth.querryMaxFtFccDiRcl('numero')}`,
        ordem: `where tdocstamp='${this.Tdoc.tdocstamp}' and year(Data)='${ano}'`
      };

      try {
        const factData = await this.generico.MetodoGenerico(itemFact.chave,
          itemFact.descricao, itemFact.ordem).toPromise();
        if (factData && factData.sucesso && factData.dados.length > 0) {
          this.frmFtForm.patchValue({
            numero: factData.dados[0].numero
          });
        }
      } catch (error) {
        console.error('Erro ao buscar próximo número:', error);
        // Define um número padrão em caso de erro
        // this.frmFtForm.patchValue({
        //   numero: '1'
        // });
      }
    }
    // Força o formulário para o estado 'cancel' (modo padrão)
    this.setFormState('cancel');
    // Atualiza os datasources das tabelas
    this.gridDataSource = [...this.factlFormArray.controls];
    this.tesourariaDataSource = [...this.tesourariaFormArray.controls];
    this.anexosDataSource = [...this.anexosFormArray.controls];
    // Reseta índices selecionados
    this.selectedGridIndex = null;
    this.selectedTesourariaIndex = null;
    this.selectedAnexoIndex = null;
    // Reseta flags de controle
    this.isDocumentLoaded = false;
    this.editando = false;
    // Força a detecção de mudanças
    this.cdr.detectChanges();
    // Mostra mensagem de sucesso
   // this.auth.showSnackBar(`Tipo de documento alterado para: ${this.Tdoc.descricao}`);
  } else {
    // Em caso de erro, mantém o estado cancel
    this.setFormState('cancel');
   // this.auth.showSnackBar('Erro ao carregar tipo de documento');
  }
}




// async SetTipoDoc(item: selects): Promise<void> {
//   this.Reiniciar();
//   const data = await this.generico
//     .MetodoGenerico(item.chave, item.descricao, item.ordem)
//     .toPromise();
//   if (data && data.sucesso) {
//     this.Tdoc = data.dados[0];
//     this.visibilidadeFormasp = this.Tdoc.movtz === true;
//     this.ngZone.run(() => {
//       this.formTitle = this.Tdoc.descricao;
//     });
//     this.frmFtForm.patchValue({
//       numdoc: this.Tdoc.numdoc,
//       nomedoc: this.Tdoc.descricao,
//       codmovcc: this.Tdoc.codmovcc,
//       descmovcc: this.Tdoc.descmovcc,
//       sigla: this.Tdoc.sigla,
//       codmovtz: this.Tdoc.codmovtz,
//       descmovtz: this.Tdoc.descmovtz,
//     });
//     const ano = moment().format('YYYY');
//     if (!this.editando) {
//       const itemFact: selects = {
//         chave: 'fact',
//         descricao: `${this.auth.querryMaxFtFccDiRcl('numero')}`,
//         ordem: `where isnumeric(numero) = 1 and tdocstamp='${this.Tdoc.tdocstamp}' and year(Data)='${ano}'`
//       };
//       const factData = await this.generico.MetodoGenerico(itemFact.chave,
//         itemFact.descricao, itemFact.ordem).toPromise();
//       if (factData && factData.sucesso) {
//         this.frmFtForm.patchValue({
//           numero: factData.dados[0].numero
//         });
//       }
//     }
//     // Don't automatically disable the form here - let the state management handle it
//     // Only disable if we're in cancel state
//     if (this.formState === 'cancel') {
//       this.frmFtForm.disable();
//       this.isEditing = false;
//     }
//   }
// }
  onSelectMoedas(value:selects,index:number) {
    this.frmFtForm.patchValue({
      Moeda: value.descricao,
    });
  }

async GetTabIva(): Promise<void> {
  const se: selects = {
    chave: 'Auxiliar',
    descricao: `codigo,descricao,padrao`,
    ordem: 'where tabela = 5'
  };
  await this.SetTabIva(se);
}
Tabiva:any;

settabiva(item:any,index:number){
         this.factlFormArray.controls[index].patchValue(
              {
                tabiva: item.codigo,
                txiva: item.descricao,
              }
            );

       const arui=this.factlFormArray.controls[index].value;
        const dr=  this.generico.TotaisLinhas(arui,Boolean(arui.ivainc),this.Param) as Factl;
       this.factlFormArray.controls[index].patchValue(
              {
                preco: dr.preco,
                mpreco: dr.mpreco,
                tabiva: dr.tabiva,
                txiva: dr.txiva,
                valival: dr.valival,
                mvalival: dr.mvalival,
                perdesc: dr.perdesc,
                descontol: dr.descontol,
                mdescontol: dr.mdescontol,
                subtotall: dr.subtotall,
                msubtotall: dr.msubtotall,
                totall: dr.totall,
                mtotall: dr.mtotall,
              }
            );
             this.Somar();
}

async SetTabIva(item: selects): Promise<void> {
  const data = await this.generico.MetodoGenerico(item.chave,
    item.descricao, item.ordem).toPromise();
  if (data !== undefined && data !== null && data.sucesso === true) {
this.txivaOptionss= data.dados;
const filteredArray = data.dados.filter((item: any) => Boolean(item.padrao) === true);
if(filteredArray.length>0){
this.Tabiva = filteredArray[0];
}else{
  this.Tabiva = data.dados[0];
}

this.filteredOptionstxiva = this.txivaOptions.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.descricao;
        return name ? this.auth._filter(name, this.txivaOptionss) : this.txivaOptionss.slice();
      }),
    );
  }
}

async GetTipoDocMat(): Promise<void> {
  const se: selects = {
    chave: 'Tdoc',
    descricao: `${this.auth.querryTdoc()}`,
    ordem: 'where Defa=1'
  };
  await this.SetTipoDoc(se);
}

  async ngAfterViewInit(): Promise<void> {
   await this.getParamd();
   await this.GetTipoDocMat();
  await this.ccu();
  await this.GetTabIva();
   // Mantém o formulário desabilitado após a inicialização
 this.frmFtForm.disable();
 this.isEditing = false;
this.cdr.detectChanges();

  }
Param!:Param;
  generateFormGroupa(): FormGroup {
    return this.fb.group({
      factstamp: [''],
      numdoc: [0],
      tdocstamp: [''],
      sigla: [''],
      numero: [''],
      data: [new Date()],
      dataven: [new Date()],
      dataAprovacao: [new Date()],
      no: [''],
      nome: [''],
      morada: [''],
      telefone: [''],
      fax: [''],
      nuit: [0],
      email: [''],
      moeda: [''],
      subtotal: [0],
      perdesc: [0],
      perdescfin: [0],
      desconto: [0],
      descontofin: [0],
      mDescontofin: [0],
      totaliva: [0],
      total: [0],
      msubtotal: [0],
      mdesconto: [0],
      mtotaliva: [0],
      mtotal: [0],
      codvend: [0],
      vendedor: [''],
      cambiousd: [0],
      cambfixo: [false],
      anulado: [false],
      codInterno: [''],
      movtz: [false],
      movstk: [false],
      codmovstk: [0],
      movcc: [false],
      codmovcc: [0],
      nomedoc: [''],
      descmovcc: [''],
      descmovstk: [''],
      numinterno: [''],
      ccusto: [''],
      obs: [''],
      oristamp: [''],
      aprovado: [false],
      adjudicado: [false],
      origem: [''],
      coment: [''],
      codarm: [0],
      codturno: [0],
      turno: [''],
      mesa: [''],
      fechada: [false],
      isiva: [false],
      clivainc: [false],
      campo1: [''],
      campo2: [''],
      tipodoc: [0],
      no2: [0],
      nome2: [''],
      morada2: [''],
      localidade2: [''],
      nomecomerc: [''],
      integra: [false],
      noDiario: [0],
      diario: [''],
      nDocCont: [0],
      descDocCont: [''],
      contabilizado: [false],
      reserva: [false],
      lant: [0],
      lact: [0],
      lreal: [0],
      ldata: [new Date()],
      tipoentida: [''],
      zona: [''],
      ncont: [''],
      codzona: [0],
      fleitura: [''],
      ncontador: [''],
      moeda2: [''],
      pjno: [0],
      pjnome: [''],
      pjstamp: [''],
      estabno: [0],
      estabnome: [''],
      codisiva: [0],
      motivoisiva: [''],
      numcaixa: [0],
      datcaixa: [new Date()],
      codsec: [0],
      descsector: [''],
      posto: [0],
      fechado: [false],
      entrega: [false],
      localentrega: [''],
      localpartida: [''],
      datapartida: [new Date()],
      requisicao: [''],
      dataentrega: [new Date()],
      pais: [''],
      departamento: [''],
      cell: [''],
      mail: [''],
      estado: [''],
      matricula: [''],
      pcontacto: [''],
      regularizado: [false],
      valRegularizado: [0],
      liquidofactura: [0],
      vendido: [false],
      segundaVia: [false],
      nrFactura: [''],
      motivoanula: [''],
      nrdocanuala: [''],
      clstamp: [''],
      codCondPagamento: [0],
      descCondPagamento: [''],
      ccustamp: [''],
      usrstamp: [''],
      nc: [false],
      nd: [false],
      ft: [false],
      vd: [false],
      factl: this.fb.array([]), // FormArray para Factl[]
      factprest: this.fb.array([]), // FormArray para Factprest[]
      factreg: this.fb.array([]), // FormArray para Factreg[]
      formasp: this.fb.array([]), // FormArray para Formasp[]
      fcc: this.fb.array([]), // FormArray para Cc[]
      factanexo: this.fb.array([]), // FormArray para Factanexo[]
      motorista: [''],
      cursostamp: [''],
      desccurso: [''],
      turmastamp: [''],
      descturma: [''],
      anosem: [''],
      etapa: [''],
      inscricao: [false],
      entidadebanc: [''],
      referencia: [''],
      multa: [false],
      pos: [false],
      caixastamp: [''],
      caixalstamp: [''],
      matriculaAluno: [false],
    });
  }

  get factregFormArray(): FormArray {
    return this.frmFtForm.get('factreg') as FormArray;
  }
  get factprestFormArray(): FormArray {
    return this.frmFtForm.get('factprest') as FormArray;
  }
  // ----------- Métodos para Grid Principal -----------
 selectRowss<T>(formArray: FormArray,
  index: number): T | null {
    this.selectedGridIndex = index; // Armazena o índice da linha selecionada
    const selectedRow = formArray.at(index).value; // Obtém os valores da linha selecionada

    return selectedRow as T;
  }
subtotal:number=0;
   iva:number=0;
   desconto:number=0;
   descComercial:number=0;
   descFinanceiro:number=0;
   totalIVA:number=0;
   total:number=0;



hiden:boolean=true;
      adicionarfacttl(): void {

        // if(this.frmFtForm.value.clstamp==typeof(undefined)){
        // Swal.fire('Não permitido!', 'Indique o cliente ou aluno!', 'error');
        //   return;
        // }
        //if(this.frmFtForm.value.clstamp.length==typeof(undefined)){
       // Swal.fire('Não permitido!', 'Indique o cliente ou aluno!', 'error');
        //   return;
        // }
        // if(this.frmFtForm.value.clstamp.length==0){
         // Swal.fire('Não permitido!', 'Indique o cliente ou aluno!', 'error');
        //   return;
        // }

        const filteredArray = this.txivaOptionss.
        filter((item: any) => Boolean(item.padrao) === true);
if(filteredArray.length>0){
this.Tabiva = filteredArray[0];
}else{
  this.Tabiva = this.txivaOptionss[0];
}
const linhastamp=this.auth.Stamp();
let qtd=1;
if(this.Tdoc.nc==true){
  qtd=-1;
}

        const factlGroup = this.fb.group({
          factlstamp: linhastamp,
          factstamp: this.auth.Stamp(),
          ststamp: '',
          entidadestamp: '',
          numdoc:  Number(0),
          sigla: '',
          ref: '',
          descricao: '',
          quant: qtd,
          unidade: '',
          armazem:  Number(0),
          preco:  Number(0),
          mpreco:  Number(0),
          tabiva:  this.Tabiva.codigo,
          txiva:  this.Tabiva.descricao,
          valival:  Number(0),
          mvalival:  Number(0),
          ivainc: false,
          activo: false,
          perdesc:  Number(0),
          descontol:  Number(0),
          mdescontol:  Number(0),
          subtotall:  Number(0),
          msubtotall:  Number(0),
          totall:  Number(0),
          mtotall:  Number(0),
          status: false,
          lote: '',
          servico: false,
          oristampl: '',
          dispon:  Number(0),
          qttOrig:  Number(0),
          nmovstk: false,
          oristamp: '',
          tit: false,
          ordem:  Number(0),
          stkprod: false,
          lineAnulado: false,
          titstamp: '',
          contatz:  Number(0),
          pack:  Number(0),
          cpoc:  Number(0),
          cpoo:  Number(0),
          composto: false,
          usalote: false,
          descarm: '',
          refornec: '',
          usaquant2: false,
          quant2:  Number(0),
          morada: '',
          telefone: '',
          entrega: false,
          dataentrega: this.auth.ConvertDate(new Date()),
          pcontacto: '',
          email: '',
          pais: '',
          guias: '',
          contrato: '',
          gasoleo: false,
          cambiousd:  Number(0),
          moeda: '',
          moeda2: '',
          ccusto: '',
          codccu: '',
          obs: '',
          armazemstamp: '',
        });

        this.factlFormArray.push(factlGroup);
if(this.factlFormArray.length>=1){


  const i=this.factlFormArray.length-1;
  const langArr = (<FormArray>this.frmFtForm.get('factl'));
  langArr.controls[i].patchValue({
   ststamp:'',
   ref :'',
   descricao :'',
        });


      //   if(this.Tdoc.movtz==true){
      //  if(this.tesourariaFormArray.length==0){
      //         //this.adicionarFp();
      //  }
      //   }
}
//this.getSummary();
  this.gridDataSource = [...this.factlFormArray.controls];
this.Somar();
  //  const index = this.factlFormArray.controls.findIndex(
  //   control => control.get('descricao')?.value === 'TOTAIS'
  // );

  // if (index >= 0) {
  //   const totaisRow = this.factlFormArray.at(index) as FormGroup;
  //   // Desabilita todos os controles da linha
  //   Object.keys(totaisRow.controls).forEach(controlName => {
  //     totaisRow.get(controlName)?.disable();
  //   });
  // }

      }
Somar()
{

  const ft=this.factlFormArray;
        const total=ft.value.reduce((prev: number, next:
          { totall: number  ; }) => prev + +next.totall, 0);
        const sutotal=ft.value.reduce((prev: number, next:
          { subtotall: number  ; }) => prev + +next.subtotall, 0);
        const desconto=ft.value.reduce((prev: number, next:
          { descontol: number  ; }) => prev + +next.descontol, 0);
        const iva=ft.value.reduce(
          (prev: number, next: { valival: number  ; }) => prev + +next.valival, 0);

        this.frmFtForm.patchValue({
          total,
          subtotal:sutotal,
          totaliva:iva,
          desconto,
        });
}

      getSummary() {
    this.removerlinhadeTotais();
        const ft=this.factlFormArray;
        const total=ft.value.reduce((prev: number, next:
          { totall: number  ; }) => prev + +next.totall, 0);
        const sutotal=ft.value.reduce((prev: number, next:
          { subtotall: number  ; }) => prev + +next.subtotall, 0);
        const desconto=ft.value.reduce((prev: number, next:
          { descontol: number  ; }) => prev + +next.descontol, 0);
        const iva=ft.value.reduce(
          (prev: number, next: { valival: number  ; }) => prev + +next.valival, 0);

           const factlGroup = this.fb.group({
            factlstamp: '',
            factstamp: '',
            ststamp: '',
            entidadestamp: '',
            numdoc:  Number(0),
            sigla: '',
            ref: '',
            descricao: 'TOTAIS',
            quant:  Number(0),
            unidade: '',
            armazem:  Number(0),
            preco:  Number(0),
            mpreco:  Number(0),
            tabiva:  Number(0),
            txiva:  Number(0),
            valival: iva,
            mvalival:  Number(0),
            ivainc: false,
            activo: false,
            perdesc:  Number(0),
            descontol: desconto,
            mdescontol:  Number(0),
            subtotall: sutotal,
            msubtotall:  Number(0),
            totall: total,
            mtotall:  Number(0),
            status: false,
            lote: '',
            servico: false,
            oristampl: '',
            dispon:  Number(0),
            qttOrig:  Number(0),
            nmovstk: false,
            oristamp: '',
            tit: false,
            ordem:  Number(0),
            stkprod: false,
            lineAnulado: false,
            titstamp: '',
            contatz:  Number(0),
            pack:  Number(0),
            cpoc:  Number(0),
            cpoo:  Number(0),
            composto: false,
            usalote: false,
            descarm: '',
            refornec: '',
            usaquant2: false,
            quant2:  Number(0),
            morada: '',
            telefone: '',
            entrega: false,
            dataentrega: '',
            pcontacto: '',
            email: '',
            pais: '',
            guias: '',
            contrato: '',
            gasoleo: false,
            cambiousd:  Number(0),
            moeda: '',
            moeda2: '',
            ccusto: '',
            codccu: '',
            obs: '',
            armazemstamp: '',
        });
        this.factlFormArray.push(factlGroup);
        this.frmFtForm.patchValue({
          total,
          subtotal:sutotal,
          totaliva:iva,
          desconto,
        });

        const index= this.factlFormArray.controls.findIndex(control => control.get('descricao')?.value ==='TOTAIS' );
        if(index>0){
        const item = this.factlFormArray.at(index) as FormGroup;
        //const item = this.factlFormArray.at(index) as FormGroup;
    item.get('ref')?.disable();
    item.get('descricao')?.disable();
    item.get('quant')?.disable();
    item.get('preco')?.disable();
    item.get('servico')?.disable();

    this.setOpacity(index, 'ref');
    this.setOpacity(index, 'descricao');
    this.setOpacity(index, 'quant');
    this.setOpacity(index, 'preco');
    this.setOpacity(index, 'servico');

    this.isQuantityZero(index);
  }

  }
 addGridRow() {
  const linhas = this.auth.InicializadorLinhas();
  // Gera o objeto inicializado usando DoAddLine
  const facts = this.auth.DoAddLine<LineValues>(linhas);
  facts.txiva = 16;
  facts.quant = 1;
  // Gera o FormGroup dinamicamente
  const formGroup = this.auth.generateFormGroupFromInterface(facts, this.fb);
  // Adiciona o FormGroup ao FormArray
  this.factlFormArray.push(formGroup);
  // Atualiza o DataSource
  this.gridDataSource = [...this.factlFormArray.controls];
  // Observa alterações nos valores do FormGroup com debounce

  formGroup.valueChanges.pipe(
  startWith(formGroup.value), // Garante que o cálculo seja executado com o valor inicial
  debounceTime(300) // Adiciona um atraso para evitar cálculos excessivos
).subscribe(val => {
  // Call the totaisLinhas method to handle all calculations
  this.auth.totaisLinhas(formGroup.value, formGroup.value.ivainc, 'factl');
  // Recalcula os totais gerais
  this.auth.SetLinevaluesssssss(this.factlFormArray, this.frmFtForm, 'factl');
});
  // formGroup.valueChanges.pipe(debounceTime(300)).subscribe(val => {
  // // Call the totaisLinhas method to handle all calculations
  //   this.auth.totaisLinhas(formGroup.value, formGroup.value.txiva,'factl');
  //   // Recalcula os totais gerais
  //   this.auth.SetLinevaluesssssss(this.factlFormArray, this.frmFtForm,'factl');
  // });
}

  preco=0;
    private readonly auth = inject(AuthService);
    private readonly generico = inject(GenericoService);
@Output() menuClick = new EventEmitter<void>();
@Output() searchClick = new EventEmitter<string>();

searchText = '';
editMode: boolean = false; // Inicialize conforme necessário

  toggleEditMode(): void {
    this.editMode = !this.editMode; // Alterna entre os modos
  }
onMenuClick() {
  this.menuClick.emit();
}

  // Add Input property for the title
 @Input() formTitle: string = 'Indica o tipo de documento de Faturação';

// get displayTitle(): string {
//   return this.formTitle || 'Indica o tipo de documento de Faturação';

isDocumentLoaded: boolean = false;
  // Form state management
  formState: 'insert' | 'update' | 'cancel' = 'cancel';
  isEditing: boolean = false;
    // Dynamic title getter
  get displayTitle(): string {
    return this.formTitle;
  }
  // ...existing code...
  // Add method to open modal
  openConfigModal(): void {
    const campo=`Descricao,Sigla,Tdocstamp`;
const proc=this.auth.InicializaProcura();
proc.descricao=campo;
proc.tabela= 'Tdoc';
  proc.campo=campo.split(',')[0];
  proc.campo1=campo.split(',')[1];
  proc.camposseleccionados= campo;
  proc.referencia=`Descricao<>''`;
  proc.alunoestamp='Descricao';
  proc.origem='Descrição';
  proc.descricao='Código';
   const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc, // Passe dados adicionais, se necessário
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngZone.run(async () => {
        this.formTitle = result.Descricao;
         const se:selects={
        chave: 'tdoc',
        descricao:this.auth.querryTdoc(),
        ordem: `where tdocstamp='${result.Tdocstamp}'`
      };
       await this.SetTipoDoc(se);
      });
      }
    });
  }
onSearchClick(campo:string) {
const proc=this.auth.InicializaProcura();
proc.descricao=campo;
proc.tabela= 'fact';
  proc.campo=campo.split(',')[0];
  proc.campo1=campo.split(',')[1];
  proc.camposseleccionados= campo;
  proc.referencia='year(data)=2025';
  proc.alunoestamp='Data desc';
  switch(proc.campo.toLowerCase()){
case `numero`:
  proc.origem='Número';
  proc.descricao='Nome';
  break;
  case `nome`:
  proc.descricao='Número';
  proc.origem='Nome';
  break;
  default:
  proc.origem='Código';
  proc.descricao='Descrição';
    break;
  }
   const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc, // Passe dados adicionais, se necessário
    });
    dialogRef.afterClosed().subscribe((selectedFact) => {
      if (selectedFact) {

this.auth.GetEntityWithChildren(selectedFact.Factstamp, 'Fact',`factstamp`).subscribe(

  (factWithChildren) => {

    this.isDocumentLoaded = true;
    this.isEditing=this.editMode=true;
    // Preenche o formulário dinamicamente com os dados retornados
    if (factWithChildren) {
  Object.keys(factWithChildren).forEach((key) => {
    const typedKey = key as keyof typeof factWithChildren; // Converte para uma chave válida
    const value = factWithChildren[typedKey]; // Acessa a propriedade de forma segura

    if (Array.isArray(value)) {
      // Se for um array, cria um FormArray
      const formArray = this.fb.array(
        value.map(item => this.fb.group(item)) // Cria um FormGroup para cada item do array
      );
      this.frmFtForm.setControl(typedKey as string, formArray); // Adiciona o FormArray ao FormGroup
    } else {
      // Caso contrário, usa patchValue para valores simples
      this.frmFtForm.patchValue({ [typedKey]: value });
    }
  });
}
    this.gridDataSource = [...this.factlFormArray.controls];
   // this.anexosDataSource = [...this.anexosFormArray.controls];
    //this.tesourariaDataSource = [...this.tesourariaFormArray.controls];
    //this.factpresDataSource = [...this.factprestFormArray.controls];
    //this.factregDataSource = [...this.factregFormArray.controls];
   this.frmFtForm.disable();
  },
  (error) => {
    console.error('Error fetching entity data:', error);
    this.isDocumentLoaded = false;
  }
);      }
    });
}


onSearchGenericClick(campo: string, tabela: string,
  descricaocolunas: string = 'Descrição,Código',
  condicao: string = '',
  formMappings: { [key: string]: string } = {},
): void {
  const proc = this.auth.InicializaProcura();
  proc.descricao = campo;
  proc.tabela = tabela;
  proc.campo = campo.split(',')[0];
  proc.campo1 = campo.split(',')[1];
  proc.camposseleccionados = campo;
  proc.referencia = condicao;
  proc.alunoestamp = `${proc.campo} desc`;
  proc.descricao = descricaocolunas.split(',')[0];
  proc.origem = descricaocolunas.split(',')[1];

  const dialogRef = this.dialog.open(Proc2Component, {
    width: '800px',
    data: proc
  });

  dialogRef.afterClosed().subscribe((selectedFact) => {
    if (selectedFact && formMappings) {
      // Usar o método genérico para setar os valores
      this.setFormValuesFromSelection(selectedFact, formMappings);
     if (proc.campo?.toUpperCase()==='MOEDA')
 {
  if (this.frmFtForm.get('moeda')!.value.toUpperCase()
    !='MZN'){
  const txcambio=this.generico.ExecCambio(this.frmFtForm.get('moeda')!.value);

  this.frmFtForm.patchValue(
    {moeda2:'MZN',
    cambiousd:txcambio
  });
  }
       //  TaxaCambio = SQL.ExecCambio(ucMoeda.tb1.Text.Trim());
    //  tbTaxaCambio.tb1.Text = TaxaCambio.ToString();
    //  MoedaCambio.tb1.Text = Pbl.MoedaBase;

    }
    }
  });
}
setFormValuesFromSelection(selectedData: any, mappings: { [sourceField: string]: string }): void {
  const valuesToSet: { [key: string]: any } = {};

  Object.keys(mappings).forEach(sourceField => {
    const targetControl = mappings[sourceField];
    if (selectedData[sourceField] !== undefined) {
      valuesToSet[targetControl] = selectedData[sourceField];
    }
  });

  this.frmFtForm.patchValue(valuesToSet);
}



  deleteGridRow() {
    if (this.selectedGridIndex !== null) {
      if (confirm('Deseja realmente remover este anexo?')) {
        this.factlFormArray.removeAt(this.selectedGridIndex);
        this.selectedGridIndex = null;
        this.gridDataSource = [...this.factlFormArray.controls];
      }
    }
  }


  selectGridRow(index: number) {
    this.selectedGridIndex = index;
  }

  // ----------- Métodos para Tesouraria -----------

  addTesouraria() {
  //  Adiciona o FormGroup ao FormArray
   this.auth.addTesouraria(this.fb,this.tesourariaFormArray);
  // Atualiza o DataSource
  this.tesourariaDataSource = [...this.tesourariaFormArray.controls];
  }


  deleteTesouraria() {
    if (this.selectedTesourariaIndex !== null) {
      if (confirm('Deseja realmente remover este item?')) {
        this.tesourariaDataSource =
         this.tesourariaDataSource.filter((_item, idx) => {
           return idx
             !== this.selectedTesourariaIndex;
         });
        this.selectedTesourariaIndex = null;
      }
    }
  }

  selectTesouraria(index: number) {
    this.selectedTesourariaIndex = index;
  }

  // ----------- Métodos para Anexos -----------

  addAnexo() {
    const group = this.fb.group({
      documento: ['', Validators.required],
      descricao: [''],
      ficheiro: [null],
      ficheiroNome: [''],
    });
    this.anexosFormArray.push(group);
    this.anexosDataSource = [...this.anexosFormArray.controls];
  }

  deleteAnexo() {
    if (this.selectedAnexoIndex !== null) {
      if (confirm('Deseja realmente remover este anexo?')) {
        this.anexosFormArray.removeAt(this.selectedAnexoIndex);
        this.selectedAnexoIndex = null;
        this.anexosDataSource = [...this.anexosFormArray.controls];
      }
    }
  }

  selectAnexo(index: number) {
    this.selectedAnexoIndex = index;
  }

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const group = this.anexosFormArray.at(index) as FormGroup;
      group.get('ficheiro')?.setValue(file);
      group.get('ficheiroNome')?.setValue(file.name);
    }
  }


 onSubmit() {
    if (this.frmFtForm.valid) {
      // Envie os dados para o backend
      this.frmFtForm.reset();
      this.anexosFormArray.clear();
      this.factlFormArray.clear();
    this.gridDataSource = [];
    this.tesourariaDataSource = [];
    this.tesourariaDataSource= [];
      this.frmFtForm.disable();
    this.editMode= this.isEditing =false;
    }
  }
  setFormState(state: 'insert' | 'update' | 'cancel'): void {
    this.formState = state;
    switch (state) {
      case 'insert':
        this.frmFtForm.enable();
        this.isEditing = true;
        this.editando = false; // New record
        break;

      case 'update':
        this.frmFtForm.enable();
        this.isEditing = true;
        this.editando = true; // Existing record
        break;
      case 'cancel':
        this.frmFtForm.disable();
        this.isEditing = false;
        this.editando = false;
        this.resetFormToInitialState();
        break;
    }
    // Trigger change detection
    this.cdr.markForCheck();
  }

  /**
   * Handles cancel action with proper state management
   */
  onCancel(): void {
    // Show confirmation dialog if form has changes
    if (this.formState !== 'cancel' && this.frmFtForm.dirty) {
      Swal.fire({
        title: 'Cancelar alterações?',
        text: 'Todas as alterações não salvas serão perdidas.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, cancelar',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
          this.setFormState('cancel');
        }
      });
    } else {
      // No changes or already in cancel state
      this.setFormState('cancel');
    }
  }

  /**
   * Handles edit action
   */
onEdit(): void {
  if (this.Tdoc && this.isDocumentLoaded) {
    this.setFormState('update');
  } else if (!this.Tdoc) {
    // No document type selected, open config modal first
    this.openConfigModal();
  } else {
    // Document type selected but no document loaded
    Swal.fire({
      title: 'Nenhum documento carregado',
      text: 'Por favor, use a pesquisa para carregar um documento antes de editar.',
      icon: 'warning'
    });
  }
}

  /**
   * Handles new record action
   */
  onNew(): void {
    if (this.Tdoc) {
      this.setFormState('insert');
      this.Reiniciar(); // Reset form with new data
    } else {
      // No document type selected, open config modal first
      this.openConfigModal();
    }
  }

/**
 * Método melhorado para reset completo do formulário
 */
private resetFormToInitialState(): void {
  // Para todas as operações em andamento
  this.selectedGridIndex = null;
  this.selectedTesourariaIndex = null;
  this.selectedAnexoIndex = null;
  // Limpa todos os FormArrays
  this.factlFormArray.clear();
  this.tesourariaFormArray.clear();
  this.anexosFormArray.clear();
  this.factregFormArray.clear();
  this.factprestFormArray.clear();
  // Reseta o formulário principal
  this.frmFtForm.reset();
  // Limpa os datasources
  this.gridDataSource = [];
  this.tesourariaDataSource = [];
  this.anexosDataSource = [];
  this.factregDataSource = [];
  this.factpresDataSource = [];
  // Reseta flags de controle
  this.isDocumentLoaded = false;
  this.isEditing = false;
  this.editando = false;
  this.visibilidadeFormasp = false;
  // Limpa objetos relacionados
  this.Tdoc = {} as Tdoc;
  this.Cl = null;
  this.Ccu = {} as CCu;
  // Reseta controles de autocomplete
  this.myControlCcu.setValue('');
  this.txivaOptions.setValue('');
}


  /**
   * Checks if the form can perform actions based on current state
   */
  canPerformActions(): boolean {
    return this.formState !== 'cancel' && this.isEditing;
  }

  /**
   * Gets the current form state for UI display
   */
  getFormStateLabel(): string {
    switch (this.formState) {
      case 'insert':
        return 'Novo';
      case 'update':
        return 'Editando';
      case 'cancel':
        return 'Cancelado';
      default:
        return '';
    }
  }


// onCancel() {
//   if (this.isEditing) {
//     this.frmFtForm.reset();
//     this.anexosFormArray.clear();
//       this.factlFormArray.clear();
//     this.selectedAnexoIndex = null;
//     this.selectedGridIndex = null;
//     this.selectedTesourariaIndex = null;
//     this.gridDataSource = [];
//     this.tesourariaDataSource = [];
//     this.tesourariaDataSource= [];
//     this.frmFtForm.disable(); // Desabilita o form
//     this.editMode= this.isEditing =false;
//   } else {
//     this.frmFtForm.enable();  // Reativa o form para novo registro
//     this.editMode= this.isEditing =true;
//   }
//  //this.editMode= this.isEditing = !this.isEditing; // Alterna o estado
// }
indice:number=0;




  setOpacity(index: number, controlName: string) {
    const element = document.getElementById(`${controlName}-${index}`);
    if (element) {
      this.renderer.setStyle(element, 'display', 'none');
    }

      }
      isQuantityZero(index: number): boolean {

        const item = this.factlFormArray.at(index) as FormGroup;

        const quantity = item.get('descricao')?.value;
        return quantity == 'TOTAIS';
      }



      getprodu(orige:string,i:number) {

      this.openProductModal(i,orige);

      }

private _filter(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();
    const fffh=list.filter(option => option.descricao.toLowerCase().includes(filterValue));

     return fffh;
   }

   async ccu(): Promise<void> {
  const se: condicoesprocura = {
    tabela: 'ccu',
    campo1: 'descricao',
    campo2: 'Codccu',
    condicao: 'vazio',
    campochave: `ccustamp`,
  };

  try {
    const data = await this.auth.getselectionPost17(se).toPromise();
    if (data && data.sucesso) {
      this.optionsCcu = data.dados.selects;
      this.filteredOptionsCcu = this.myControlCcu.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this.auth._filter(name, this.optionsCcu) : this.optionsCcu.slice();
        }),
      );

      const seSelects: selects = {
        chave: 'ccu',
        descricao: ` top 1 *`,
        ordem: `where descricao<>''`
      };

      await this.Setccu(seSelects);
    }
  } catch (e) {
    console.error('Erro ao carregar opções:', e);
  }
}
        onKeyPressdesref($event: Event,number: number) {
const dr:Factl={
  factlstamp: '',
  factstamp: '',
  ststamp: '',
  entidadestamp: '',
  numdoc: Number(0),
  sigla: '',
  ref: '',
  descricao: '',
  quant: Number(0),
  unidade: '',
  armazem: Number(0),
  preco: Number(0),
  mpreco: Number(0),
  tabiva: Number(0),
  txiva: Number(0),
  valival: Number(0),
  mvalival: Number(0),
  ivainc: false,
  activo: false,
  perdesc: Number(0),
  descontol: Number(0),
  mdescontol: Number(0),
  subtotall: Number(0),
  msubtotall: Number(0),
  totall: Number(0),
  mtotall: Number(0),
  status: false,
  lote: '',
  servico: true,
  oristampl: '',
  dispon: Number(0),
  qttOrig: Number(0),
  nmovstk: false,
  oristamp: '',
  tit: false,
  ordem: Number(0),
  stkprod: false,
  lineAnulado: false,
  titstamp: '',
  contatz: Number(0),
  pack: Number(0),
  cpoc: Number(0),
  cpoo: Number(0),
  composto: false,
  usalote: false,
  descarm: '',
  refornec: '',
  usaquant2: false,
  quant2: Number(0),
  morada: '',
  telefone: '',
  entrega: false,
  dataentrega: new Date(),
  pcontacto: '',
  email: '',
  pais: '',
  guias: '',
  contrato: '',
  gasoleo: false,
  cambiousd: Number(0),
  moeda: '',
  moeda2: '',
  ccusto: '',
  codccu: '',
  obs: '',
  armazemstamp: '',
  lotevalid: new Date(),
  lotelimft: new Date(),
  codigobarras: '',
  stRefFncCodstamp: '',
  campomultiuso: '',
  precoPromo: 0
};

const id=($event.target as HTMLInputElement).id.replace(`-${number}`,'').toString().toLowerCase();
switch(id){
case 'ref': {
    dr.ref=($event.target as HTMLInputElement).value;
    dr.descricao=($event.target as HTMLInputElement).value;
    const servicos : any =
    document.getElementById('descricao-'+number) as HTMLInputElement | null;
    dr.descricao=servicos.value;
    break;
}
case 'descricao': {
  dr.descricao=($event.target as HTMLInputElement).value;

  const servico : any = document.getElementById('ref-'+number) as HTMLInputElement | null;
  dr.ref=servico.value;
  break;
}

}

const langArr = this.factlFormArray;
        langArr.controls[number].patchValue(
          {
             ref: dr.ref,
             descricao: dr.descricao,
             servico: dr.servico,
             ststamp: dr.ststamp,
          }
        );


       }
async Setccu(item: selects): Promise<void> {
  const data = await this.generico.MetodoGenerico(item.chave,
     item.descricao, item.ordem).toPromise();
  if (data && data.sucesso) {
    this.Ccu = data.dados[0];
    this.myControlCcu.setValue(this.Ccu.descricao);

    this.frmFtForm.patchValue({
      ccusto: this.Ccu.descricao,
      ccustamp: this.Ccu.ccustamp
    });
  }
}
         removerlinhadeTotais(){
        const index= this.factlFormArray.controls.
        findIndex(control => control.get('descricao')?.value ==='TOTAIS' );
        if(index>0){
    this.factlFormArray.removeAt(index);
  }
      }
      onKeyPress(_$event: any,number: number) {
      //this.removerlinhadeTotais();
        //const langArr = this.factlFormArray;
        const langArr = (<FormArray>this.frmFtForm.get('factl'));
        const arui=langArr.controls[number].value;
if(this.Tdoc.nc==true){
  if(arui.quant>0 ) {
    arui.quant=Number(arui.quant)*Number(-1);
  }
}

        const dr=  this.generico.TotaisLinhas(arui,Boolean(arui.ivainc),this.Param) as Factl;
            langArr.controls[number].patchValue(
              {
                factlstamp: dr.factlstamp,
                factstamp: dr.factstamp,
               ststamp: dr.ststamp,
               entidadestamp: dr.entidadestamp,
                numdoc: dr.numdoc,
                sigla: dr.sigla,
                 ref: dr.ref,
                 descricao: dr.descricao,
                 quant: dr.quant,
                unidade: dr.unidade,
                armazem: dr.armazem,
                 preco: dr.preco,
                mpreco: dr.mpreco,
                tabiva: dr.tabiva,
                txiva: dr.txiva,
                valival: dr.valival,
                mvalival: dr.mvalival,
                ivainc: dr.ivainc,
                activo: dr.activo,
                perdesc: dr.perdesc,
                descontol: dr.descontol,
                mdescontol: dr.mdescontol,
                subtotall: dr.subtotall,
                msubtotall: dr.msubtotall,
                 totall: dr.totall,
                mtotall: dr.mtotall,
                status: dr.status,
                lote: dr.lote,
                 servico: dr.servico,
                oristampl: dr.oristampl,
                dispon: dr.dispon,
                qttOrig: dr.qttOrig,
                nmovstk: dr.nmovstk,
                oristamp: dr.oristamp,
                tit: dr.tit,
                ordem: dr.ordem,
                stkprod: dr.stkprod,
                lineAnulado: dr.lineAnulado,
                titstamp: dr.titstamp,
                contatz: dr.contatz,
                pack: dr.pack,
                cpoc: dr.cpoc,
                cpoo: dr.cpoo,
                composto: dr.composto,
                usalote: dr.usalote,
                descarm: dr.descarm,
                refornec: dr.refornec,
                usaquant2: dr.usaquant2,
                quant2: dr.quant2,
                morada: dr.morada,
                telefone: dr.telefone,
                entrega: dr.entrega,
                dataentrega: dr.dataentrega,
                pcontacto: dr.pcontacto,
                email: dr.email,
                pais: dr.pais,
                guias: dr.guias,
                contrato: dr.contrato,
                gasoleo: dr.gasoleo,
                cambiousd: dr.cambiousd,
                moeda: dr.moeda,
                moeda2: dr.moeda2,
                ccusto: dr.ccusto,
                codccu: dr.codccu,
                obs: dr.obs,
                armazemstamp: dr.armazemstamp,
              }
            );
             this.Somar();//getSummary();
          }

onTxivaInputChange($event: Event, index: number) {
  const input = $event.target as HTMLInputElement;
  let value = parseFloat(input.value);

  // Validação para garantir que o valor esteja entre 0 e 99
  if (isNaN(value)) {
    value = 0;
  } else if (value < 0) {
    value = 0;
  } else if (value > 99) {
    value = 99;
  }

  // Arredonda para 2 casas decimais se necessário
  value = Math.round(value * 100) / 100;

  // Atualiza o valor no input se foi alterado
  if (parseFloat(input.value) !== value) {
    input.value = value.toString();
    // Atualiza o FormControl também
    this.factlFormArray.at(index).get('txiva')?.setValue(value);
  }

  // Chama o método existente para recalcular os totais
  this.onKeyPress($event, index);
}

Cl:any;


      getestudante(campo:string)
      {
const proc=this.auth.InicializaProcura();
proc.descricao=campo;
proc.tabela= 'cl';
  proc.campo=campo.split(',')[0];
  proc.campo1=campo.split(',')[1];
  proc.camposseleccionados= campo;
  proc.referencia='';
  proc.alunoestamp=`${proc.campo} asc`;
  switch(proc.campo.toLowerCase()){
case `descricao`:
  proc.origem='Nome';
  proc.descricao='Código';
  break;
  default:
  proc.origem='Código';
  proc.descricao='Nome';
    break;
  }

 const dialogRef = this.dialog.open(Proc2Component, {
    width: '800px',
    data: proc, // Dados adicionais para o modal
  });

dialogRef.afterClosed().subscribe((resultado) => {
    if (resultado) {
  const set:selects={
    chave: resultado.clstamp,
    descricao: resultado.clstamp,
    ordem: resultado.clstamp
  };
  this.factlFormArray.clear();
       this.onSelectAluno(set);

    }
  });

      }
      onSelectAluno(value:selects) {
      const item:selects={
        chave: 'cl',
        descricao:`${this.auth.QuerryclFact()}`,
        ordem: `where clstamp='${value.chave}'`
      };
      this.generico.MetodoGenerico(item.chave, item.descricao, item.ordem).subscribe({
            next: (data) => {
              if (data.sucesso) {

                  const aluno = data.dados[1];
                  if(data.dados[1].moeda==''){
                    aluno.col19='MZN';
                  }
                  this.Cl=aluno;
                  this.frmFtForm.patchValue({
                    desccurso:aluno.curso,
                    cursostamp :aluno.codcurso,
                    clstamp :aluno.clstamp,
                    no :aluno.no,
                    nome :aluno.nome,
                    email :aluno.email,
                    gradestamp :aluno.gradestamp,
                    descGrade :aluno.descgrelha,
                    nivelac :aluno.col5,
                    ccusto :aluno.ccusto,
                    ccustamp :aluno.ccustostamp,
                  nuit: aluno.nuit,
                  morada: aluno.morada,
                  localidade: aluno.localidade,
                  moeda: aluno.col19,
                  estabnome: aluno.faculdade,
                  cambiousd:  Number(0),
                  descturma:aluno.turma,
                  turmastamp: aluno.turmastampunion,
                  entidadebanc: aluno.entidadebanc
                  });
                }
               // this.isSpinnerDisplayed=false;
            },
            error: (e) => {
              //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
            }
          });


        }
        isCheckboxDisabled=true;


openProductModal(index: number,campo:string): void {

this.indice=index;
  const proc=this.auth.InicializaProcura();
proc.descricao=campo;
proc.tabela= 'st';
  proc.campo=campo.split(',')[0];
  proc.campo1=campo.split(',')[1];
  proc.camposseleccionados= campo;
  proc.referencia='';
  proc.alunoestamp=`${proc.campo} asc`;
  switch(proc.campo.toLowerCase()){
case `descricao`:
  proc.origem='Descrição';
  proc.descricao='Referência';
  break;
  default:
  proc.origem='Referência';
  proc.descricao='Descrição';
    break;
  }

 const dialogRef = this.dialog.open(Proc2Component, {
    width: '800px',
    data: proc, // Dados adicionais para o modal
  });

dialogRef.afterClosed().subscribe((selectedFact) => {
    if (selectedFact) {
      this.auth.getStSingle(selectedFact.ststamp).subscribe(
        (factWithChildren) => {
          if (factWithChildren) {


        //this.removerlinhadeTotais();
         const langArr = (<FormArray>this.frmFtForm.get('factl'));
            langArr.controls[index].patchValue({
          ststamp:factWithChildren.ststamp,
          ref :factWithChildren.referenc,
          descricao :factWithChildren.descricao,
               });

                const se:selects={
                chave: 'st left join stprecos stp on st.ststamp=stp.ststamp',
                descricao: ` top 1 st.*,stp.Preco,stp.PrecoCompra,stp.Ccustamp,stp.Moeda,stp.Ivainc`,
                ordem: `where st.ststamp='${factWithChildren.ststamp}'`
              };
              const factl:Factl={
                factlstamp: '',
                factstamp: '',
                ststamp: '',
                entidadestamp: '',
                numdoc: Number(0),
                sigla: '',
                ref: '',
                descricao: '',
                quant: Number(0),
                unidade: '',
                armazem: Number(0),
                preco: Number(0),
                mpreco: Number(0),
                tabiva: Number(0),
                txiva: Number(0),
                valival: Number(0),
                mvalival: Number(0),
                ivainc: false,
                activo: false,
                perdesc: Number(0),
                descontol: Number(0),
                mdescontol: Number(0),
                subtotall: Number(0),
                msubtotall: Number(0),
                totall: Number(0),
                mtotall: Number(0),
                status: false,
                lote: '',
                servico: false,
                oristampl: '',
                dispon: Number(0),
                qttOrig: Number(0),
                nmovstk: false,
                oristamp: '',
                tit: false,
                ordem: Number(0),
                stkprod: false,
                lineAnulado: false,
                titstamp: '',
                contatz: Number(0),
                pack: Number(0),
                cpoc: Number(0),
                cpoo: Number(0),
                composto: false,
                usalote: false,
                descarm: '',
                refornec: '',
                usaquant2: false,
                quant2: Number(0),
                morada: '',
                telefone: '',
                entrega: false,
                dataentrega: new Date(),
                pcontacto: '',
                email: '',
                pais: '',
                guias: '',
                contrato: '',
                gasoleo: false,
                cambiousd: Number(0),
                moeda: '',
                moeda2: '',
                ccusto: '',
                codccu: '',
                obs: '',
                armazemstamp: '',
                lotevalid: new Date(),
                lotelimft:  new Date(),
                codigobarras: '',
                stRefFncCodstamp: '',
                campomultiuso: '',
                precoPromo: 0
              };
               this.generico.MetodoGenerico(se.chave, se.descricao, se.ordem).subscribe({
                next: (data) => {
                  if (data.sucesso) {
                   const datas= data.dados[0];

                  let dr= this.generico.SetLineValues(datas,
                    false, false, this.frmFtForm.value.moeda,
                    this.frmFtForm.value.moeda2,
                    '',factl,'factl',this.Tdoc,this.Param);

                    // try
                    // {
                    //     if (Boolean(this.Cl.col23)==true)
                    //     {
                    //       const setr:selects={
                    //         chave: ' Clst',
                    //         descricao: ` top 1  Preco`,
                    //         ordem: `where referenc='${dr.ref}'`
                    //       };
                    //       this.generico.
                    //       MetodoGenerico(setr.chave, setr.descricao, setr.ordem).subscribe({
                    //         next: (data) => {
                    //           if (data.sucesso) {
                    //             dr.preco = data.dados[0].preco;
                    //           }
                    //         }
                    //       });
                    //     }
                    // }
                    // catch
                    // {
                    //     //throw;
                    // }
                    // if (this.Cl != null && this.Cl!=undefined)
                    //   {
                    //       if (Boolean(this.Cl.col24)==true)
                    //       {
                    //         //Lança a percentagem de desconto definida na ficha do cliente;
                    //           dr.perdesc = Number(this.Cl.col25);
                    //       }
                    //       if (Boolean(this.Cl.col26)==true)
                    //       {
                    //           //Quando o cliente está insento do IVA...
                    //           dr.tabiva = 0;
                    //           dr.txiva = 0;
                    //       }
                    //       if (Boolean(this.Cl.col26)==true)
                    //       {
                    //         dr.ivainc= true;
                    //       }
                    //   }

                      dr= this.generico.TotaisLinhas(dr,false,this.Param);
                   langArr.controls[index].patchValue({
                    factlstamp: dr.factlstamp,
                    factstamp: dr.factstamp,
                    ststamp: dr.ststamp,
                    entidadestamp: dr.entidadestamp,
                    numdoc: dr.numdoc,
                    sigla: dr.sigla,
                    ref: dr.ref,
                    descricao: dr.descricao,
                    quant: dr.quant,
                    unidade: dr.unidade,
                    armazem: dr.armazem,
                    preco: dr.preco,
                    mpreco: dr.mpreco,
                    tabiva: dr.tabiva,
                    txiva: dr.txiva,
                    valival: dr.valival,
                    mvalival: dr.mvalival,
                    ivainc: dr.ivainc,
                    activo: dr.activo,
                    perdesc: dr.perdesc,
                    descontol: dr.descontol,
                    mdescontol: dr.mdescontol,
                    subtotall: dr.subtotall,
                    msubtotall: dr.msubtotall,
                    totall: dr.totall,
                    mtotall: dr.mtotall,
                    status: dr.status,
                    lote: dr.lote,
                    servico: dr.servico,
                    oristampl: dr.oristampl,
                    dispon: dr.dispon,
                    qttOrig: dr.qttOrig,
                    nmovstk: dr.nmovstk,
                    oristamp: dr.oristamp,
                    tit: dr.tit,
                    ordem: dr.tit,
                    stkprod: dr.stkprod,
                    lineAnulado: dr.lineAnulado,
                    titstamp: dr.titstamp,
                    contatz: dr.contatz,
                    pack: dr.pack,
                    cpoc: dr.cpoc,
                    cpoo: dr.cpoo,
                    composto: dr.composto,
                    usalote: dr.usalote,
                    descarm: dr.descarm,
                    refornec: dr.refornec,
                    usaquant2: dr.usaquant2,
                    quant2: dr.quant2,
                    morada: dr.morada,
                    telefone: dr.telefone,
                    entrega: dr.entrega,
                    dataentrega: dr.dataentrega,
                    pcontacto: dr.pcontacto,
                    email: dr.email,
                    pais: dr.pais,
                    guias: dr.guias,
                    contrato: dr.contrato,
                    gasoleo: dr.gasoleo,
                    cambiousd: dr.cambiousd,
                    moeda: dr.moeda,
                    moeda2: dr.moeda2,
                    ccusto: dr.ccusto,
                    codccu: dr.codccu,
                    obs: dr.obs,
                    armazemstamp: dr.armazemstamp,
                         });

                         this.Somar();
// this.getSummary();


                  }
                }
              });
            // Garante que a detecção de mudanças seja acionada
            this.cdr.markForCheck();
          }

          // Atualiza o DataSource
          //this.gridDataSource = [...this.factlFormArray.controls];
        },
        (error) => {
          console.error('Error fetching entity data:', error);
        }
      );
    }
  });
  }

  getTipoMovimento(index: number,campo:string) {

this.indice=index;
  const proc=this.auth.InicializaProcura();
proc.descricao=campo;
proc.tabela= 'Fpagam';
  proc.campo=campo.split(',')[0];
  proc.campo1=campo.split(',')[1];
  proc.camposseleccionados= campo;
  proc.referencia='';
  proc.alunoestamp=`convert(decimal,${proc.campo1})`;
  proc.origem='Tipo de movimento';
  proc.descricao='Referência';
  proc.marcar=true;
 const dialogRef = this.dialog.open(Proc2Component, {
    width: '800px',
    data: proc,
  });
dialogRef.afterClosed().subscribe((selectedFact) => {
    if (selectedFact) {
  const langArr = this.tesourariaFormArray;
        langArr.controls[index].patchValue(
          {
             titulo: selectedFact.descricao,
          }
        );

    }
  });
  }

  // Método para buscar conta de tesouraria
  getContaTesouraria(index: number,campo:string) {
this.indice=index;
  const proc=this.auth.InicializaProcura();
proc.descricao=campo;
proc.tabela= 'GetCont';
  proc.campo=campo.split(',')[0];
  proc.campo1=campo.split(',')[1];
  proc.camposseleccionados= campo;
  proc.referencia='';
  proc.marcar=true;
  proc.alunoestamp=`${proc.campo} asc`;
  proc.origem='Conta';
  proc.descricao='Banco';
 const dialogRef = this.dialog.open(Proc2Component, {
    width: '800px',
    data: proc,
  });
dialogRef.afterClosed().subscribe((selectedFact) => {
    if (selectedFact) {
  const langArr = this.tesourariaFormArray;
        langArr.controls[index].patchValue(
          {
             codtz: Number(selectedFact.codigo),
             contatesoura: String(selectedFact.contas).replace('.00',''),
             banco: selectedFact.sigla,
             contasstamp: selectedFact.contasstamp,
          }
        );

    }
  });
  }
}
