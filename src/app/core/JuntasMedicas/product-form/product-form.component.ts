import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, NgZone, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';
import { Proc2Component } from '@core/Formsfacturacao/proc2/proc2.component';
import { GenericoService } from 'app/InterfacesSigex/generic-service';
import { AuthService } from '@core/authentication';
import { selects } from 'app/classes/Procura';
import { St } from 'app/classes/Facturacao/Facturacao';
import { debounceTime, startWith } from 'rxjs';
import { PhotoCaptureComponent } from './photo-capture/photo-capture.component';

enum FormState {
  INSERT = 'insert',
  UPDATE = 'update',
  CANCEL = 'cancel'
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    TranslateModule,
    MtxButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MtxSelectModule,
    MatTabsModule,
    CommonModule,
    MtxGridModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductFormComponent {
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();



  // Adicione estas propriedades na classe:
productPhoto?: string;

// Adicione este método:
openPhotoCapture(): void {
  const dialogRef = this.dialog.open(PhotoCaptureComponent, {
    width: '700px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    disableClose: false,
    data: {
      existingPhoto: this.productPhoto
    }
  });

  dialogRef.afterClosed().subscribe((photoData: string) => {
    if (photoData) {
      this.productPhoto = photoData;
      this.productForm.patchValue({ imagem: photoData });
      this.auth.showSnackBar('Foto capturada com sucesso!');
    }
  });
}

removePhoto(): void {
  this.productPhoto = undefined;
  this.productForm.patchValue({ imagem: '' });
  this.auth.showSnackBar('Foto removida');
}
  productForm!: FormGroup;
  formState: FormState = FormState.CANCEL;
  isProductLoaded: boolean = false;

  // Form arrays for reactive form management
  stprecosDataSource: any[] = [];
  composicaoDataSource: any[] = [];
  localizacaoDataSource: any[] = [];
  stockDataSource: any[] = [];
  fornecedoresDataSource: any[] = [];

  // Selected row indices for each grid
  selectedStprecosIndex: number | null = null;
  selectedComposicaoIndex: number | null = null;
  selectedLocalizacaoIndex: number | null = null;
  selectedStockIndex: number | null = null;
  selectedFornecedorIndex: number | null = null;

  // Column definitions
  stprecosColumns: string[] = [
    'ivaInc',
    'precoVendaProduto',
    'precoVendaEmbalagem',
    'descEmbalagem',
    'centroCusto',
    'precoCompra',
    'moeda'
  ];

  composicaoColumns: string[] = [
    'referencia',
    'descricao',
    'quantidade',
    'preco',
    'servico',
    'total'
  ];

  localizacaoColumns: string[] = [
    'armazem',
    'endereco',
    'stock'
  ];

  stockColumns: string[] = [
    'armazem',
    'lote',
    'valide',
    'stock'
  ];

  fornecedorColumns: string[] = [
    'fornecedor',
    'contato',
    'email',
    'telefone',
    'status',
    'principal'
  ];

  private readonly auth = inject(AuthService);
  private readonly generico = inject(GenericoService);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.productForm = this.generateFormGroup();
    this.setFormState('cancel');
  }

  // FormArray Getters - seguindo padrão do frm-ft
  get stprecosFormArray(): FormArray {
    return this.productForm.get('stprecos') as FormArray;
  }

  get composicaoFormArray(): FormArray {
    return this.productForm.get('stcp') as FormArray;
  }

  get localizacaoFormArray(): FormArray {
    return this.productForm.get('starm') as FormArray;
  }

  get stockFormArray(): FormArray {
    return this.productForm.get('stl') as FormArray;
  }

  get fornecedoresFormArray(): FormArray {
    return this.productForm.get('stFnc') as FormArray;
  }

  // Form Group Generation - baseado no frm-ft
  generateFormGroup(): FormGroup {
    return this.fb.group({
      // Campos básicos do produto (interface St)
      ststamp: [''],
      referenc: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      unidade: [''],
      familia: [''],
      subfamilia: [''],
      marca: [''],
      modelo: [''],
      cor: [''],
      tamanho: [''],
      peso: [0],
      volume: [0],
      activo: [true],
      imagem: [''],
      obs: [''],
      codigoBarras: [''],
      local: [''],
      codigoProduto: [''],
      tipoArtigo: [''],
      natureza: [''],
      iva: [0],
      origem: [''],
      tipoProduto: [''],
      categoria: [''],
      localizacao: [''],
      codigoNCM: [''],
      aliquotaIPI: [0],
      classeFiscal: [''],
      contaContabilReceita: [''],
      contaContabilDespesa: [''],
      dataCriacao: [new Date()],
      dataModificacao: [new Date()],
      userCriacao: [''],
      userModificacao: [''],

      // FormArrays para dados relacionados
      stprecos: this.fb.array([]), // Preços
      stcp: this.fb.array([]), // Composição
      starm: this.fb.array([]), // Armazéns/Localização
      stl: this.fb.array([]), // Stock por lote
      stFnc: this.fb.array([]), // Fornecedores
      stRefFncCod: this.fb.array([]) // Códigos de barras por fornecedor
    });
  }

  // Form State Management - seguindo padrão do frm-ft
  setFormState(state: 'insert' | 'update' | 'cancel'): void {
    this.formState = state as FormState;

    if (state === 'cancel') {
      this.productForm.disable();
    } else {
      this.productForm.enable();
    }
  }

  canPerformActions(): boolean {
    return this.formState !== FormState.CANCEL;
  }

  getFormStateLabel(): string {
    switch (this.formState) {
      case FormState.INSERT:
        return 'INSERINDO';
      case FormState.UPDATE:
        return 'EDITANDO';
      case FormState.CANCEL:
        return 'VISUALIZANDO';
      default:
        return 'INDEFINIDO';
    }
  }

  // Modal/Search Methods
  openConfigModal(): void {
    this.auth.showSnackBar('Modal de configuração - A implementar');
  }

  searchProductModal(campos: string): void {
    const dialogRef = this.dialog.open(Proc2Component, {
      width: '900px',
      height: '800px',
      data: {
        title: 'Buscar Produto',
        url: 'st',
        campos,
        condicoes: '',
        marcarTodos: false,
        orderBy: 'referenc'
      }
    });

    dialogRef.afterClosed().subscribe((selectedProduct) => {
      if (selectedProduct && selectedProduct.length > 0) {
        const product = selectedProduct[0];

        // Preenche os campos principais
        this.productForm.patchValue({
          referenc: product.referenc,
          descricao: product.descricao,
          ststamp: product.ststamp
        });

        // Carrega dados completos do produto
        this.loadProductData(product.ststamp).then(() => {
          this.isProductLoaded = true;
          this.auth.showSnackBar('Produto selecionado com sucesso');
        });
      }
    });
  }

  // Busca de produto
  onSearchClick(campo:string): void {

 const proc = this.auth.InicializaProcura();
  proc.descricao = campo;
  proc.tabela = 'St';
  proc.campo = campo.split(',')[0];
  proc.campo1 = campo.split(',')[1];
  proc.camposseleccionados = campo;
  proc.referencia = '1=1';
  proc.alunoestamp = campo.split(',')[0];
  switch(proc.campo.toLowerCase()) {
    case `referenc`:
      proc.origem = 'Referência';
      proc.descricao = 'Descrição';
      break;
    case `descricao`:
      proc.descricao = 'Descrição';
      proc.origem = 'Referência';
      break;
    default:
      proc.origem = 'Código';
      proc.descricao = 'Descrição';
      break;
  }
  const dialogRef = this.dialog.open(Proc2Component, {
    width: '800px',
    data: proc,
  });

  dialogRef.afterClosed().subscribe((selectedFact) => {
    if (selectedFact) {
      this.auth.GetEntityWithChildren(selectedFact.Ststamp, 'St', `ststamp`).subscribe(
        (factWithChildren) => {
          if (factWithChildren) {
 const product = factWithChildren;
        // Reset e recria o formulário para garantir limpeza
        this.productForm = this.generateFormGroup();
       // loadRelatedData();

        // Carrega dados do produto
        this.loadProductData(product.ststamp).then(() => {
          // Atualiza estados
          this.isProductLoaded = true;
          this.setFormState('cancel');
          this.auth.showSnackBar('Produto carregado com sucesso');
        });

}
        },
        (error) => {
          console.error('Error fetching entity data:', error);
          this.isProductLoaded = false;
          this.auth.showSnackBar('Erro ao carregar dados do produto');
        }
      );
    }
  });

  }

  // Carregamento de dados do produto
  private async loadProductData(ststamp: string): Promise<void> {
    try {
      // Busca dados completos do produto
      const productQuery: selects = {
        chave: 'st',
        descricao: '*',
        ordem: `where ststamp='${ststamp}'`
      };

      const productData = await this.generico.MetodoGenerico(
        productQuery.chave,
        productQuery.descricao,
        productQuery.ordem
      ).toPromise();

      if (productData && productData.sucesso && productData.dados.length > 0) {
        const product = productData.dados[0];
        // Preenche dados básicos
        this.productForm.patchValue(product);

        // Carrega dados relacionados
        await this.loadRelatedData(ststamp);
      }
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      this.auth.showSnackBar('Erro ao carregar dados do produto');
    }
  }

  // Carregamento de dados relacionados
  private async loadRelatedData(ststamp: string): Promise<void> {
    try {
      // Carregar preços
      await this.loadStprecos(ststamp);

      // Carregar composição
      await this.loadComposicao(ststamp);

      // Carregar armazéns
      await this.loadArmazens(ststamp);

      // Carregar stock por lote
      await this.loadStockLotes(ststamp);

      // Carregar fornecedores
      await this.loadFornecedores(ststamp);

    } catch (error) {
      console.error('Erro ao carregar dados relacionados:', error);
    }
  }

  // Métodos de carregamento específicos
  private async loadStprecos(ststamp: string): Promise<void> {
    const query: selects = {
      chave: 'stprecos',
      descricao: '*',
      ordem: `where ststamp='${ststamp}'`
    };

    const data = await this.generico.MetodoGenerico(query.chave,
      query.descricao, query.ordem).toPromise();
    if (data && data.sucesso) {
      this.stprecosFormArray.clear();
      data.dados.forEach((preco: any) => {
        const formGroup = this.createStprecosFormGroup(preco);
        this.stprecosFormArray.push(formGroup);
      });
      this.stprecosDataSource = [...this.stprecosFormArray.controls];
    }
  }

  private async loadComposicao(ststamp: string): Promise<void> {
    const query: selects = {
      chave: 'stcp',
      descricao: '*',
      ordem: `where ststamp='${ststamp}'`
    };

    const data = await this.generico.MetodoGenerico(query.chave,
       query.descricao, query.ordem).toPromise();

    if (data && data.sucesso) {
      this.composicaoFormArray.clear();
      data.dados.forEach((comp: any) => {
        const formGroup = this.createComposicaoFormGroup(comp);
        this.composicaoFormArray.push(formGroup);
      });
      this.composicaoDataSource = [...this.composicaoFormArray.controls];
    }
  }

  private async loadArmazens(ststamp: string): Promise<void> {
    const query: selects = {
      chave: 'starm',
      descricao: '*',
      ordem: `where ststamp='${ststamp}'`
    };

    const data = await this.generico.MetodoGenerico(query.chave,
       query.descricao, query.ordem).toPromise();

    if (data && data.sucesso) {
      this.localizacaoFormArray.clear();
      data.dados.forEach((arm: any) => {
        const formGroup = this.createLocalizacaoFormGroup(arm);
        this.localizacaoFormArray.push(formGroup);
      });
      this.localizacaoDataSource = [...this.localizacaoFormArray.controls];
    }
  }

  private async loadStockLotes(ststamp: string): Promise<void> {
    const query: selects = {
      chave: 'stl',
      descricao: '*',
      ordem: `where ststamp='${ststamp}'`
    };

    const data = await this.generico.MetodoGenerico(query.chave,
      query.descricao, query.ordem).toPromise();

    if (data && data.sucesso) {
      this.stockFormArray.clear();
      data.dados.forEach((stl: any) => {
        const formGroup = this.createStockFormGroup(stl);
        this.stockFormArray.push(formGroup);
      });
      this.stockDataSource = [...this.stockFormArray.controls];
    }
  }

  private async loadFornecedores(ststamp: string): Promise<void> {
    const query: selects = {
      chave: 'stFnc',
      descricao: '*',
      ordem: `where ststamp='${ststamp}'`
    };

    const data = await this.generico.MetodoGenerico(query.chave,
       query.descricao, query.ordem).toPromise();

    if (data && data.sucesso) {
      this.fornecedoresFormArray.clear();
      data.dados.forEach((fnc: any) => {
        const formGroup = this.createFornecedorFormGroup(fnc);
        this.fornecedoresFormArray.push(formGroup);
      });
      this.fornecedoresDataSource = [...this.fornecedoresFormArray.controls];
    }
  }

  // Factory methods para FormGroups - seguindo padrão do frm-ft
  private createStprecosFormGroup(data: any = {}): FormGroup {
    const group = this.fb.group({
      stprecosstamp: [data.stprecosstamp || this.auth.Stamp()],
      ststamp: [data.ststamp || ''],
      ivaInc: [data.ivaInc || false],
      precoVendaProduto: [data.precoVendaProduto || 0],
      precoVendaEmbalagem: [data.precoVendaEmbalagem || 0],
      descEmbalagem: [data.descEmbalagem || 0],
      centroCusto: [data.centroCusto || ''],
      precoCompra: [data.precoCompra || 0],
      moeda: [data.moeda || 'MZN']
    });

    // Observa mudanças com debounce
    group.valueChanges.pipe(
      startWith(group.value),
      debounceTime(300)
    ).subscribe(val => {
      // Aqui pode implementar cálculos automáticos se necessário
    });

    return group;
  }

  private createComposicaoFormGroup(data: any = {}): FormGroup {
    const group = this.fb.group({
      stcpstamp: [data.stcpstamp || this.auth.Stamp()],
      ststamp: [data.ststamp || ''],
      referencia: [data.referencia || '', Validators.required],
      descricao: [data.descricao || ''],
      quantidade: [data.quantidade || 1],
      preco: [data.preco || 0],
      servico: [data.servico || false],
      total: [data.total || 0]
    });

    // Observa mudanças para calcular total
    group.valueChanges.pipe(
      startWith(group.value),
      debounceTime(300)
    ).subscribe(val => {
      const total = (val.quantidade || 0) * (val.preco || 0);
      if (val.total !== total) {
        group.patchValue({ total }, { emitEvent: false });
      }
    });

    return group;
  }

  private createLocalizacaoFormGroup(data: any = {}): FormGroup {
    return this.fb.group({
      starmstamp: [data.starmstamp || this.auth.Stamp()],
      ststamp: [data.ststamp || ''],
      armazem: [data.armazem || ''],
      endereco: [data.endereco || ''],
      stock: [data.stock || 0]
    });
  }

  private createStockFormGroup(data: any = {}): FormGroup {
    return this.fb.group({
      stlstamp: [data.stlstamp || this.auth.Stamp()],
      ststamp: [data.ststamp || ''],
      armazem: [data.armazem || ''],
      lote: [data.lote || ''],
      valide: [data.valide ? new Date(data.valide) : new Date()],
      stock: [data.stock || 0]
    });
  }

  private createFornecedorFormGroup(data: any = {}): FormGroup {
    return this.fb.group({
      stFncstamp: [data.stFncstamp || this.auth.Stamp()],
      ststamp: [data.ststamp || ''],
      fornecedor: [data.fornecedor || ''],
      contato: [data.contato || ''],
      email: [data.email || ''],
      telefone: [data.telefone || ''],
      status: [data.status || 'ativo'],
      principal: [data.principal || false],
      ultimaAtualizacao: [data.ultimaAtualizacao ? new Date(data.ultimaAtualizacao) : new Date()]
    });
  }

  // Métodos para STPRECOS - seguindo padrão do frm-ft
  addStprecos(): void {
    const formGroup = this.createStprecosFormGroup();
    this.stprecosFormArray.push(formGroup);
    this.stprecosDataSource = [...this.stprecosFormArray.controls];
  }

  deleteStprecos(): void {
    if (this.selectedStprecosIndex !== null) {
      if (confirm('Deseja realmente remover este preço?')) {
        this.stprecosFormArray.removeAt(this.selectedStprecosIndex);
        this.selectedStprecosIndex = null;
        this.stprecosDataSource = [...this.stprecosFormArray.controls];
      }
    }
  }

  selectStprecosRow(index: number): void {
    this.selectedStprecosIndex = index;
  }

  // Métodos para COMPOSIÇÃO
  addComposicao(): void {
    const formGroup = this.createComposicaoFormGroup();
    this.composicaoFormArray.push(formGroup);
    this.composicaoDataSource = [...this.composicaoFormArray.controls];
  }

  deleteComposicao(): void {
    if (this.selectedComposicaoIndex !== null) {
      if (confirm('Deseja realmente remover esta composição?')) {
        this.composicaoFormArray.removeAt(this.selectedComposicaoIndex);
        this.selectedComposicaoIndex = null;
        this.composicaoDataSource = [...this.composicaoFormArray.controls];
      }
    }
  }

  selectComposicaoRow(index: number): void {
    this.selectedComposicaoIndex = index;
  }

  // Métodos para LOCALIZAÇÃO
  addLocalizacao(): void {
    const formGroup = this.createLocalizacaoFormGroup();
    this.localizacaoFormArray.push(formGroup);
    this.localizacaoDataSource = [...this.localizacaoFormArray.controls];
  }

  deleteLocalizacao(): void {
    if (this.selectedLocalizacaoIndex !== null) {
      if (confirm('Deseja realmente remover esta localização?')) {
        this.localizacaoFormArray.removeAt(this.selectedLocalizacaoIndex);
        this.selectedLocalizacaoIndex = null;
        this.localizacaoDataSource = [...this.localizacaoFormArray.controls];
      }
    }
  }

  selectLocalizacaoRow(index: number): void {
    this.selectedLocalizacaoIndex = index;
  }

  // Métodos para STOCK
  addStock(): void {
    const formGroup = this.createStockFormGroup();
    this.stockFormArray.push(formGroup);
    this.stockDataSource = [...this.stockFormArray.controls];
  }

  deleteStock(): void {
    if (this.selectedStockIndex !== null) {
      if (confirm('Deseja realmente remover este stock?')) {
        this.stockFormArray.removeAt(this.selectedStockIndex);
        this.selectedStockIndex = null;
        this.stockDataSource = [...this.stockFormArray.controls];
      }
    }
  }

  selectStockRow(index: number): void {
    this.selectedStockIndex = index;
  }

  // Métodos para FORNECEDORES
  addFornecedor(): void {
    const formGroup = this.createFornecedorFormGroup();
    this.fornecedoresFormArray.push(formGroup);
    this.fornecedoresDataSource = [...this.fornecedoresFormArray.controls];
  }

  deleteFornecedor(): void {
    if (this.selectedFornecedorIndex !== null) {
      if (confirm('Deseja realmente remover este fornecedor?')) {
        this.fornecedoresFormArray.removeAt(this.selectedFornecedorIndex);
        this.selectedFornecedorIndex = null;
        this.fornecedoresDataSource = [...this.fornecedoresFormArray.controls];
      }
    }
  }

  selectFornecedorRow(index: number): void {
    this.selectedFornecedorIndex = index;
  }

  // Form Actions - seguindo padrão do frm-ft
  onEditClick(): void {
    if (this.isProductLoaded) {
      this.setFormState('update');
      this.auth.showSnackBar('Modo de edição ativado');
    } else {
      this.auth.showSnackBar('Busque um produto primeiro');
    }
  }

  onNewClick(): void {
    // Reset completo do formulário
    this.productForm = this.generateFormGroup();
    this.clearAllDataSources();
    this.setFormState('insert');
    this.isProductLoaded = false;
    this.auth.showSnackBar('Novo produto iniciado');
  }

  onCancelClick(): void {
    if (this.formState === FormState.INSERT) {
      // Se estava inserindo, limpa o formulário
      this.productForm = this.generateFormGroup();
      this.clearAllDataSources();
      this.isProductLoaded = false;
    }

    this.setFormState('cancel');
    this.cancel.emit();
    this.auth.showSnackBar('Operação cancelada');
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.value
      };

      this.save.emit(formData);
      this.auth.showSnackBar('Produto salvo com sucesso!');
      this.setFormState('cancel');
      this.isProductLoaded = true;
    } else {
      this.auth.showSnackBar('Preencha todos os campos obrigatórios');
      this.markFormGroupTouched();
    }
  }

  // Utility Methods
  private clearAllDataSources(): void {
    this.stprecosDataSource = [];
    this.composicaoDataSource = [];
    this.localizacaoDataSource = [];
    this.stockDataSource = [];
    this.fornecedoresDataSource = [];

    // Reset selected indices
    this.selectedStprecosIndex = null;
    this.selectedComposicaoIndex = null;
    this.selectedLocalizacaoIndex = null;
    this.selectedStockIndex = null;
    this.selectedFornecedorIndex = null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }


}
