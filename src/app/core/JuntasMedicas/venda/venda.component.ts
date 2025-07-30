import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { emit } from 'process';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@core';
import { Fact, Factl } from 'app/classes/Facturacao/Facturacao';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  servico: boolean;
  editando: boolean;
}

interface Cliente {
  id: number;
  nome: string;
}
interface Ccu {
  ccustamp: string;
  ccusto: string;
  codccu: string;
}
@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
    standalone: true,
  imports: [
    FormsModule,
    CommonModule,
     MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,MatIconModule ,
    //ProdutoGridComponent
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule ,
  MatTableModule ,
  MatButtonModule,

        MatOptionModule,

        MatDialogModule,
               MatCardModule,
              MatCheckboxModule,
              TranslateModule,
              MtxButtonModule,
              MatDividerModule,
              MtxSelectModule,
               MatTabsModule,
              MtxGridModule,
              MatRadioModule,

],
})

export class VendaComponent implements OnInit,AfterViewInit {
onClear() {
//
}
  vendaForm: FormGroup;
  produtoCtrl = new FormControl('');

    private readonly auth = inject(AuthService);
  clientes: Cliente[] = [
    { id: 1, nome: 'Cliente A'.toUpperCase() },
    { id: 2, nome: 'Cliente B'.toUpperCase() }
  ];
  ccu: Ccu[] = [
    { ccustamp: this.auth.Stamp(), ccusto: 'Xai-xai'.toUpperCase(),codccu:'ccu01'.toUpperCase() },
    { ccustamp: this.auth.Stamp(), ccusto: 'MATOLA',codccu:'2568' },
  ];

  produtosDisponiveis: Produto[] = [
    {
      id: 1, nome: 'Produto A'.toUpperCase(), preco: 10, quantidade: 1,
      servico: false,
      editando: false
    },
    {
      id: 2, nome: 'Produto B'.toUpperCase(), preco: 20, quantidade: 1,
      servico: false,
      editando: false
    },
    {
      id: 3, nome: 'Produto Serviço C'.toUpperCase(), preco: 30, quantidade: 1,
      servico: true,
      editando: false
    },
    {
      id: 4, nome: 'Produto Serviço D'.toUpperCase(), preco: 100, quantidade: 1,
      servico: true,
      editando: false
    }
  ];

  produtosFiltrados!: Observable<Produto[]>;

  produtoTemp: Produto = {
    id: 0, nome: '', preco: 0, quantidade: 1,
    servico: false,
    editando: false
  };
  produtoEditandoId: number | null = null;

  // produtosSelecionados: Produto[] = [];
  produtosSelecionados = new MatTableDataSource<Produto>();

  constructor(private fb: FormBuilder) {
    this.vendaForm = this.fb.group({
      clienteId: ['', Validators.required],
      dataVenda: [new Date(), Validators.required],
      centroCusto: ['', Validators.required],
      ccustamp: ['', Validators.required],
      codccu: ['', Validators.required],
      ccusto: ['', Validators.required],
    });
  }
  ngAfterViewInit(): void {


//     this.auth.getWithChildren<Fact>('Fact','876D20254MDN612489').subscribe({
// next: (data) => {
//          this.fact = data;

//         },


//       // next: (data) => this.fact = data,
//       error: (err) => console.error('Erro ao carregar a factura:', err)
//     });


//          console.log(this.fact);
  }
fact!:Fact;
  ngOnInit() {




    this.produtosFiltrados = this.produtoCtrl.valueChanges.pipe(
      startWith(''),
      map(valor => this._filtrarProdutos(valor || ''))
    );
  }
_filtrarProdutos(nome: string): Produto[] {
  const nomeLower = nome.toLowerCase();
  return this.produtosDisponiveis.filter(p => p.nome.toLowerCase().includes(nomeLower));
}
onsexoselect(ccustampSelecionado: any) {

  const centroCusto = this.ccu.find(c => c.ccustamp === ccustampSelecionado);
  this.vendaForm.patchValue({
ccustamp:centroCusto?.ccustamp,
codccu:centroCusto?.codccu,
centroCusto:centroCusto?.ccusto,
ccusto:centroCusto?.ccusto,
  });
}
onProdutoSelecionado(event: MatAutocompleteSelectedEvent) {
  const produtoSelecionado = this.produtosDisponiveis.find(p => p.nome === event.option.value);
  if (produtoSelecionado) {
    this.produtoTemp = { ...produtoSelecionado, quantidade: 1 };

    // Limpa o input para mostrar novamente a lista filtrada
    this.produtoCtrl.setValue(produtoSelecionado.nome, { emitEvent: false });
  }
}
 onselectPatChange(event: any): void {

  const produtoSelecionado = this.produtosDisponiveis.find(p => p.nome === event.nome);
  if (produtoSelecionado) {
    this.produtoTemp = { ...produtoSelecionado, quantidade: 1 };

    // Limpa o input para mostrar novamente a lista filtrada
    this.produtoCtrl.setValue(produtoSelecionado.nome, { emitEvent: false });
    this.produtoSelecionado = produtoSelecionado.nome;
  }
}

abrirAutocomplete() {
  // Reativa o filtro para mostrar a lista
  const currentValue = this.produtoCtrl.value;
  this.produtoCtrl.setValue(currentValue || '');
}
//   private _filtrarProdutos(valor: string): Produto[] {
//     const filtro = valor.toLowerCase();
//     return this.produtosDisponiveis.filter(p => p.nome.toLowerCase().includes(filtro));
//   }



//  onProdutoSelecionado(event: any) {
//     const nomeSelecionado = event.option.value;
//     const produto = this.produtosDisponiveis.find(p => p.nome === nomeSelecionado);
//     if (produto) {
//       this.produtoTemp = { ...produto, quantidade: 1 };
//       this.produtoCtrl.setValue(produto.nome, { emitEvent: false });
//     }
//   }



  adicionarProduto() {

    if (!this.produtoTemp.nome || this.produtoTemp.quantidade <= 0) {
      this.dialog.alert('Escolha um produto válido e quantidade maior que zero.');
      return;
    }
const data = this.produtosSelecionados.data;
this.produtoTemp.editando=false;
const existente = data.find(p => p.id === this.produtoTemp.id);

if (existente) {
  existente.quantidade += this.produtoTemp.quantidade;
} else {
  data.push({ ...this.produtoTemp });
}

this.produtosSelecionados.data = [...data]; // força atualização da tabela
this.limparProdutoTemp();
  }

  editarProduto(produto: Produto) {
    produto.editando=true;
    this.produtoTemp = { ...produto };
    this.produtoEditandoId = produto.id;
    this.produtoCtrl.setValue(produto.nome, { emitEvent: false });
 this.produtoSelecionado=produto.nome;
  }

  salvarEdicaoProduto() {
  if (this.produtoEditandoId === null) return;
const data = this.produtosSelecionados.data;
const index = data.findIndex(p => p.id === this.produtoEditandoId);
if (index >= 0) {
  data[index] = { ...this.produtoTemp };
  this.produtosSelecionados.data = [...data];
}
 this.produtosSelecionados.data.forEach(p => p.editando = false);
  // Atualiza a tabela, se necessário
  this.produtosSelecionados._updateChangeSubscription(); // Se data
this.limparProdutoTemp();
  }

  cancelarEdicao() {
    this.limparProdutoTemp();
 this.produtosSelecionados.data.forEach(p => p.editando = false);
  // Atualiza a tabela, se necessário
  this.produtosSelecionados._updateChangeSubscription(); // Se data
  }

  removerProduto(id: number) {
    const data = this.produtosSelecionados.data.filter(p => p.id !== id);
this.produtosSelecionados.data = data;
  }
private readonly dialog = inject(MtxDialog);
  limparProdutoTemp() {
    this.produtoTemp = { id: 0, nome: '', preco: 0, quantidade: 1,servico:false,editando:false };
    this.produtoEditandoId = null;
    this.produtoCtrl.setValue('', { emitEvent: false });
     this.produtoSelecionado = ''; // Limpa o mtx-select
  }
produtoSelecionado='';
  finalizarPedido() {

 this.salvarExemplo();
 return;

    if (this.vendaForm.invalid || this.produtosSelecionados.data.length === 0) {
      this.dialog.alert('Preencha os dados da venda e adicione ao menos um produto.');
      return;
    }

   const venda = {
  ...this.vendaForm.value,
  produtos: this.produtosSelecionados.data
};


    console.log('Venda registrada:', venda);
    this.dialog.alert('Pedido finalizado! Veja console.');
  }
 salvarExemplo() {
  const data= new Date();
  const stamppai=this.auth.Stamp();
  const factla:Factl={
    factlstamp: stamppai,
    factstamp: stamppai,
    ststamp: 'dfdfdfdf',
    entidadestamp: '',
    numdoc: 0,
    sigla: 'dfdfdfdf',
    ref: 'dfdfdfdf',
    descricao: '',
    quant: 0,
    unidade: '',
    armazem: 0,
    preco: 0,
    mpreco: 0,
    tabiva: 0,
    txiva: 0,
    valival: 0,
    mvalival: 0,
    ivainc: false,
    activo: false,
    perdesc: 0,
    descontol: 0,
    mdescontol: 0,
    subtotall: 0,
    msubtotall: 0,
    totall: 0,
    mtotall: 0,
    status: false,
    lotevalid: data,
    lotelimft: data,
    usalote: false,
    lote: '',
    obs: '',
    servico: false,
    oristampl: '',
    dispon: 0,
    qttOrig: 0,
    nmovstk: false,
    oristamp: '',
    tit: false,
    ordem: 0,
    stkprod: false,
    lineAnulado: false,
    titstamp: '',
    contatz: 0,
    pack: 0,
    cpoc: 0,
    cpoo: 0,
    composto: false,
    descarm: '',
    refornec: '',
    usaquant2: false,
    quant2: 0,
    morada: '',
    telefone: '',
    entrega: false,
    dataentrega: data,
    pcontacto: '',
    email: '',
    pais: '',
    guias: '',
    contrato: '',
    gasoleo: false,
    cambiousd: 0,
    moeda: '',
    moeda2: '',
    ccusto: '',
    codccu: '',
    armazemstamp: '',
    codigobarras: '',
    stRefFncCodstamp: '',
    campomultiuso: '',
    precoPromo: 0,
  };
const factl:Factl[]=[];
factl.push(factla);
    const exemplo :Fact={
      factstamp: stamppai,
      numdoc: 0,
      tdocstamp: 'Aniva',
      sigla: 'Aniva',
      numero: 'Aniva',
       data,
      dataven: data,
      dataAprovacao: data,
      no: 'Aniva',
      nome: 'Aniva',
      morada: 'Aniva',
      telefone: '',
      fax: '',
      nuit: 0,
      email: '',
      moeda: '',
      subtotal: 1562,
      perdesc: 1562,
      perdescfin: 1562,
      desconto: 1562,
      descontofin: 1562,
      mDescontofin: 1562,
      totaliva: 1562,
      total: 1562,
      msubtotal: 1562,
      mdesconto: 0,
      mtotaliva: 0,
      mtotal: 0,
      codvend: 0,
      vendedor: '',
      cambiousd: 0,
      cambfixo: false,
      anulado: false,
      codInterno: '',
      movtz: false,
      movstk: false,
      codmovstk: 0,
      movcc: false,
      codmovcc: 0,
      nomedoc: '',
      descmovcc: '',
      descmovstk: '',
      numinterno: '',
      ccusto: '',
      obs: '',
      oristamp: '',
      aprovado: false,
      adjudicado: false,
      origem: '',
      coment: '',
      codarm: 0,
      codturno: 0,
      turno: '',
      mesa: '',
      fechada: false,
      isiva: false,
      clivainc: false,
      campo1: '',
      campo2: '',
      tipodoc: 0,
      no2: 0,
      nome2: '',
      morada2: '',
      localidade2: '',
      nomecomerc: '',
      integra: false,
      noDiario: 0,
      diario: '',
      nDocCont: 0,
      descDocCont: '',
      contabilizado: false,
      reserva: false,
      lant: 0,
      lact: 0,
      lreal: 0,
      ldata: data,
      tipoentida: '',
      zona: '',
      ncont: '',
      codzona: 0,
      fleitura: '',
      ncontador: '',
      moeda2: '',
      pjno: 0,
      pjnome: '',
      pjstamp: '',
      estabno: 0,
      estabnome: '',
      codisiva: 0,
      motivoisiva: '',
      numcaixa: 0,
      datcaixa: data,
      codsec: 0,
      descsector: '',
      posto: 0,
      fechado: false,
      entrega: false,
      localentrega: '',
      localpartida: '',
      datapartida: data,
      requisicao: '',
      dataentrega: data,
      pais: '',
      departamento: '',
      cell: '',
      mail: '',
      estado: '',
      matricula: '',
      pcontacto: '',
      regularizado: false,
      valRegularizado: 0,
      liquidofactura: 0,
      vendido: false,
      segundaVia: false,
      nrFactura: '',
      motivoanula: '',
      nrdocanuala: '',
      clstamp: '',
      codCondPagamento: 0,
      descCondPagamento: '',
      ccustamp: '',
      usrstamp: '',
      nc: false,
      nd: false,
      ft: false,
      vd: false,
      factl,
      factprest: [],
      factreg: [],
      formasp: [],
      fcc: [],
      factanexo: [],
      motorista: '',
      cursostamp: '',
      desccurso: '',
      turmastamp: '',
      descturma: '',
      anosem: '',
      etapa: '',
      inscricao: false,
      entidadebanc: '',
      referencia: '',
      multa: false,
      pos: false,
      caixastamp: '',
      caixalstamp: '',
      matriculaAluno: false
    };

    this.auth.inserirOuAtualizar('Fact', exemplo).subscribe({
      next: (res) => console.log('Salvo com sucesso:', res),
      error: (err) => console.error('Erro:', err)
    });
  }
     onRowClick(p: Produto): void {
    this.editarProduto(p);
  }
  displayedColumns: string[] = ['nome', 'preco', 'quantidade', 'total', 'acoes'];
  get totalGeral(): number {
  return this.produtosSelecionados.data.reduce((acc, p) => acc + p.preco * p.quantidade, 0);
}

get totalQuantidade(): number {
  return this.produtosSelecionados.data.reduce((acc, p) => acc + p.quantidade, 0);
}

salvarEdicao() {
   // Depois, seta editando = false para todos os produtos (ou só para esse, se preferir)
  this.produtosSelecionados.data.forEach(p => p.editando = false);

  // Atualiza a tabela, se necessário
  this.produtosSelecionados._updateChangeSubscription(); // Se data

  // Atualiza a referência do array para disparar a detecção de mudanças
  this.produtosSelecionados.data = [...this.produtosSelecionados.data];
this. limparProdutoTemp();

}

}
