import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Fact, Factl, Factprest, LineValues } from 'app/classes/Facturacao/Facturacao';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '@core/authentication';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-fact-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,


    MatDividerModule, MatCardModule,
        MatCheckboxModule,

        MatIcon, MatSelectModule,
            MatDatepickerModule,
  ],
  templateUrl: './fact-modal.component.html',
  styleUrls: ['./fact-modal.component.scss'],
})

export class FactModalComponent {
  factForm!: FormGroup;
gridColumns: string[] = [
   'ref', 'descricao', 'ivainc','quant', 'preco','servico',
   'descontol', 'txiva','subtotall'
];
  gridDataSourceFactLines: any[] = [];
  gridDataSourceFactPrest: any[] = [];
  gridDataSourceFactReg: any[] = [];
  gridDataSourceFormasp: any[] = [];

  selectedRowIndexFactLines: number =0;
  selectedRowIndexFactPrest: number | null = null;
  selectedRowIndexFactReg: number | null = null;
  selectedRowIndexFormasp: number | null = null;

  constructor(
    private fb: FormBuilder,
    private arrayManagementService: AuthService, // Injeta o serviço
    public dialogRef: MatDialogRef<FactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fact
  ) {
    this.initializeForm(data);
  }

  preco=0;
    private readonly auth = inject(AuthService);
@Output() menuClick = new EventEmitter<void>();
@Output() searchClick = new EventEmitter<string>();

searchText = '';

onMenuClick() {
  this.menuClick.emit();
}

onSearchClick() {
  this.searchClick.emit(this.searchText);
}
  // Inicializa o formulário com os dados da Fact
 initializeForm(fact: Fact): void {




  //  const data=new Date();
  //     const datavenc= this.auth.calcularProximoVencimento(data,1);
  //     this.factForm = this.fb.group({
  //       nomeCliente: [''],
  //       dataEmissao: [data],
  //       validade: [datavenc],
  //       numeroDocumento: [''],
  //       centroCusto: [''],
  //       moedaVenda: ['MZN'],
  //       moedaCambio: [''],
  //       taxaCambio: [''],
  //       numeroContrato: [''],
  //       valorDesconto: [''],
  //       tipoDesconto: [''],
  //       documentoAnulado: [false],
  //       condicoesPagamento: [''],
  //       refFornecedor: [''],
  //       subTotal: [''],
  //       descComercial: [''],
  //       descFinanceiro: [''],
  //       totalIVA: [''],
  //       total: [''],
  //       entregaDomicilio: [false],
  //       enviarEmail: [false],
  //       dataPartida: [data],
  //       dataEntrega: [data],
  //       localPartida: [''],
  //       localEntrega: [''],
  //       pessoaContacto: [''],
  //       telefone: [''],
  //       matriculaProduto: [''],
  //       email: [''],
  //       departamento: [''],
  //       motorista: [''],
  //       pais: [''],
  //       observacao: [''],
  //       numeroRequisicao: [''],
  //       numeroPrimeiraSegundaVia: [''],
  //       morada: [''],
  //       localidade: [''],
  //       nuit: [''],
  //       telefoneCliente: [''],
  //       emailCliente: [''],
  //       codigoProjecto: [''],
  //       nomeProjecto: [''],
  //       responsavelProjecto: [''],
  //       numeroNotaCredito: [''],
  //       dataNotaCredito: [data],
  //       valorNotaCredito: [''],
  //       motivoNotaCredito: [''],
  //       numeroMovimentoStock: [''],
  //       dataMovimentoStock: [data],
  //       produtoMovimentoStock: [''],
  //       quantidadeMovimentoStock: [''],
  //       tipoMovimentoStock: [''],
  //       observacaoMovimentoStock: [''],
  //       nomeCursoAcademia: [''],
  //       turmaAcademia: [''],
  //       anoLetivoAcademia: [''],
  //       numeroMatriculaAcademia: [''],
  //       dataMatriculaAcademia: [data],
  //       estadoAcademia: ['ativo'],
  //       observacoesAcademia: [''],
  //       numeroNotaDebito: [''],
  //       dataNotaDebito: [data],
  //       valorNotaDebito: [''],
  //       motivoNotaDebito: [''],
  //       observacoesNotaDebito: [''],
  //       statusAprovacao: ['pendente'],
  //       dataAprovacao: [data],
  //       usuarioAprovacao: [''],
  //       observacoesAprovacao: [''],
  //       anexos: this.fb.array([]),
  //       factl: this.fb.array([])
  //     });
  const data=new Date();
  this.factForm = this.fb.group({
    factstamp: [fact.factstamp, Validators.required],
    numdoc: [fact.numdoc, Validators.required],
    nome: [fact.nome, Validators.required],
    subtotal: [fact.subtotal, Validators.required],
    desconto: [fact.desconto, Validators.required],
   descontofin: [fact.descontofin, Validators.required],
    total: [fact.total, Validators.required],

      factl: this.fb.array([]),
      factprest: this.fb.array([]),
      factreg: this.fb.array([]),
      anexos:this.fb.array([]),
      formasp: this.fb.array([]),



     nomeCliente: [''],
        dataEmissao: [new Date()],
        validade: [this.auth.calcularProximoVencimento(new Date(),1)],
        numeroDocumento: [''],
        centroCusto: [''],
        moedaVenda: ['MZN'],
        moedaCambio: [''],
        taxaCambio: [''],
        numeroContrato: [''],
        valorDesconto: [''],
        tipoDesconto: [''],
        documentoAnulado: [false],
        condicoesPagamento: [''],
        refFornecedor: [''],
        subTotal: [''],
        descComercial: [''],
        descFinanceiro: [''],
        totalIVA: [''],
        entregaDomicilio: [false],
        enviarEmail: [false],
        dataPartida: [new Date()],
        dataEntrega: [new Date()],
        localPartida: [''],
        localEntrega: [''],
        pessoaContacto: [''],
        telefone: [''],
        matriculaProduto: [''],
        email: [''],
        departamento: [''],
        motorista: [''],
        pais: [''],
        observacao: [''],
        numeroRequisicao: [''],
        numeroPrimeiraSegundaVia: [''],
        morada: [''],
        localidade: [''],
        nuit: [''],
        telefoneCliente: [''],
        emailCliente: [''],
        codigoProjecto: [''],
        nomeProjecto: [''],
        responsavelProjecto: [''],
        numeroNotaCredito: [''],
        dataNotaCredito: [data],
        valorNotaCredito: [''],
        motivoNotaCredito: [''],
        numeroMovimentoStock: [''],
        dataMovimentoStock: [data],
        produtoMovimentoStock: [''],
        quantidadeMovimentoStock: [''],
        tipoMovimentoStock: [''],
        observacaoMovimentoStock: [''],
        nomeCursoAcademia: [''],
        turmaAcademia: [''],
        anoLetivoAcademia: [''],
        numeroMatriculaAcademia: [''],
        dataMatriculaAcademia: [data],
        estadoAcademia: ['ativo'],
        observacoesAcademia: [''],
        numeroNotaDebito: [''],
        dataNotaDebito: [data],
        valorNotaDebito: [''],
        motivoNotaDebito: [''],
        observacoesNotaDebito: [''],
        statusAprovacao: ['pendente'],
        dataAprovacao: [data],
        usuarioAprovacao: [''],
        observacoesAprovacao: [''],

    });
if (fact.factl.length > 0) {
  fact.factl.forEach((line: Factl) => {
     this.createFactLine(line);
   // this.factlFormArray.push(factLineFormGroup);
  });
}}

  // Métodos para criar os arrays
createFactLine(line?: Factl): FormGroup {
const linhas = this.auth.InicializadorLinhas();
  // Gera o objeto inicializado usando DoAddLine
  const facts = this.auth.DoAddLine<LineValues>(linhas);
if (line) {
 Object.keys(line).forEach((key) => {
  const value = (line as any)[key]; // Obtém o valor da propriedade
  // Verifica se a propriedade atual existe em `facts`
  if (key in facts) {
    facts[key] = value; // Seta o valor de `line` no `facts[key]`
  }
});
}  // Gera o FormGroup dinamicamente
  const formGroup = this.auth.generateFormGroupFromInterface(facts, this.fb);
  // Adiciona o FormGroup ao FormArray
  this.factlFormArray.push(formGroup);
  // Atualiza o DataSource
  this.gridDataSource = [...this.factlFormArray.controls];
  // Observa alterações nos valores do FormGroup com debounce
  formGroup.valueChanges.pipe(debounceTime(300)).subscribe(val => {
    const quant = parseFloat(String(val.quant)) || 0;
    const preco = parseFloat(String(val.preco)) || 0;
    const desconto = parseFloat(String(val.descontol)) || 0;
    let iva = parseFloat(String(val.txiva)) || 0;
    // Se o checkbox ivanc estiver marcado, zera o iva
    if (val.ivanc && iva !== 0) {
      formGroup.get('txiva')?.setValue(0, { emitEvent: false });
      iva = 0;
    }
    // Calcula o subtotal
    const precoTotal = quant * preco;
    const valorComDesconto = precoTotal * (1 - desconto / 100);
    const valorComIva = val.ivanc ? valorComDesconto : valorComDesconto * (1 + iva / 100);
    // Atualiza o subtotal da linha SEM disparar outro valueChanges
    formGroup.get('subtotall')?.setValue(valorComIva.toFixed(2), { emitEvent: false });

    // Recalcula os totais gerais
    this.auth.SetLinevaluesssssss(this.factlFormArray, this.factForm);
  });
  return formGroup;
}
  // Getters para os controles dos arrays
  get factlFormArray(): FormArray {
    return this.factForm.get('factl') as FormArray;
  }

  get factprestFormArray(): FormArray {
    return this.factForm.get('factprest') as FormArray;
  }

  get factregFormArray(): FormArray {
    return this.factForm.get('factreg') as FormArray;
  }

  get formaspFormArray(): FormArray {
    return this.factForm.get('formasp') as FormArray;
  }
  selectGridRow(index: number) {
     this.selectedGridIndex= this.selectedRowIndexFactLines = index;

  }

subtotal:number=0;
   iva:number=0;
   desconto:number=0;
   descComercial:number=0;
   descFinanceiro:number=0;
   totalIVA:number=0;
   total:number=0;

  deleteGridRow() {
    if (this.selectedGridIndex !== null) {
      if (confirm('Deseja realmente remover este anexo?')) {
        this.factlFormArray.removeAt(this.selectedGridIndex);
        this.selectedGridIndex = null;
        this.gridDataSource = [...this.factlFormArray.controls];
      }
    }
  }
  gridDataSource: any[] = [];
  selectedGridIndex: number | null = null;
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
  formGroup.valueChanges.pipe(debounceTime(300)).subscribe(val => {
    const quant = parseFloat(String(val.quant)) || 0;
    const preco = parseFloat(String(val.preco)) || 0;
    const desconto = parseFloat(String(val.descontol)) || 0;
    let iva = parseFloat(String(val.txiva)) || 0;
    // Se o checkbox ivanc estiver marcado, zera o iva
    if (val.ivanc && iva !== 0) {
      formGroup.get('txiva')?.setValue(0, { emitEvent: false });
      iva = 0;
    }

    // Calcula o subtotal
    const precoTotal = quant * preco;
    const valorComDesconto = precoTotal * (1 - desconto / 100);
    const valorComIva = val.ivanc ? valorComDesconto : valorComDesconto * (1 + iva / 100);

    // Atualiza o subtotal da linha SEM disparar outro valueChanges
    formGroup.get('subtotall')?.setValue(valorComIva.toFixed(2), { emitEvent: false });

    // Recalcula os totais gerais
    this.auth.SetLinevaluesssssss(this.factlFormArray, this.factForm);
  });
}
  // Métodos para remover itens dos arrays usando o serviço
  removeSelectedLine(): void {
    this.gridDataSourceFactLines = this.arrayManagementService.removeSelectedRow(
      this.selectedRowIndexFactLines,
      this.factlFormArray,
      this.gridDataSourceFactLines
    );
    this.selectedRowIndexFactLines = 0;
  }

  removeSelectedPrest(): void {
    this.gridDataSourceFactPrest = this.arrayManagementService.removeSelectedRow(
      this.selectedRowIndexFactPrest,
      this.factprestFormArray,
      this.gridDataSourceFactPrest
    );
    this.selectedRowIndexFactPrest = null;
  }

  removeSelectedReg(): void {
    this.gridDataSourceFactReg = this.arrayManagementService.removeSelectedRow(
      this.selectedRowIndexFactReg,
      this.factregFormArray,
      this.gridDataSourceFactReg
    );
    this.selectedRowIndexFactReg = null;
  }

  removeSelectedFormasp(): void {
    this.gridDataSourceFormasp = this.arrayManagementService.removeSelectedRow(
      this.selectedRowIndexFormasp,
      this.formaspFormArray,
      this.gridDataSourceFormasp
    );
    this.selectedRowIndexFormasp = null;
  }

  // Métodos para selecionar uma linha
  selectRow(index: number): void {
    this.selectedRowIndexFactLines = index;
  }

  selectPrest(index: number): void {
    this.selectedRowIndexFactPrest = index;
  }

  selectReg(index: number): void {
    this.selectedRowIndexFactReg = index;
  }

  selectFormasp(index: number): void {
    this.selectedRowIndexFormasp = index;
  }

  // Fecha o modal
  close(): void {
    this.dialogRef.close();
  }



  // Métodos para adicionar itens aos arrays
  addFactLine(): void {
    const formGroup = this.fb.group({
      factlstamp: ['', Validators.required],
      descricao: ['', Validators.required],
      quant: [0, Validators.required],
      preco: [0, Validators.required],
      subtotall: [0, Validators.required],
    });

    this.factlFormArray.push(formGroup);
    this.gridDataSourceFactLines = [...this.factlFormArray.controls];
  }

  addFactPrest(): void {
    const formGroup = this.fb.group({
      factpreststamp: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: [0, Validators.required],
    });

    this.factprestFormArray.push(formGroup);
    this.gridDataSourceFactPrest = [...this.factprestFormArray.controls];
  }

  addFactReg(): void {
    const formGroup = this.fb.group({
      factregstamp: ['', Validators.required],
      descricao: ['', Validators.required],
      valorreg: [0, Validators.required],
    });

    this.factregFormArray.push(formGroup);
    this.gridDataSourceFactReg = [...this.factregFormArray.controls];
  }

  addFormasp(): void {
    const formGroup = this.fb.group({
      formaspstamp: ['', Validators.required],
      titulo: ['', Validators.required],
      valor: [0, Validators.required],
    });

    this.formaspFormArray.push(formGroup);
    this.gridDataSourceFormasp = [...this.formaspFormArray.controls];
  }





    // ----------- Métodos para Tesouraria -----------

  addTesouraria() {
    const novo = {
      tipoMovimento: '',
      numeroCheque: '',
      conta: '',
      data: new Date(),
      valor: 0,
      moeda: ''
    };
    this.tesourariaDataSource = [...this.tesourariaDataSource, novo];
  }

  editTesouraria() {
    // Implemente a lógica de edição conforme necessário
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

  // Tesouraria
  tesourariaColumns: string[] = [
    'tipoMovimento', 'numeroCheque', 'conta', 'data', 'valor', 'moeda'
  ];
  tesourariaDataSource: any[] = [];
  selectedTesourariaIndex: number | null = null;

  // Anexos
  anexosColumns: string[] = ['documento', 'descricao', 'ficheiro'];
  anexosDataSource: any[] = [];
  selectedAnexoIndex: number | null = null;

  get anexosFormArray(): FormArray {
    return this.factForm.get('anexos') as FormArray;
  }
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

}
