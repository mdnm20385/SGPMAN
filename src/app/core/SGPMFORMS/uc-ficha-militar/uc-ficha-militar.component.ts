import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@core/authentication';
import { Proc2Component } from '@core/Formsfacturacao/proc2/proc2.component';
import { PhotoCaptureComponent } from '@core/JuntasMedicas/product-form/photo-capture/photo-capture.component';
import { condicoesprocura, selects } from 'app/classes/CampoSessoes';
import {
  MilAgre, MilConde, MilDoc, MilEmail,
  MilFor,
  MilLingua,
  MilSit,
  Telefone
} from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uc-ficha-militar',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, MatDividerModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatTabsModule, MatButtonModule, MatTableModule, ReactiveFormsModule,
    MatIcon, MatSelectModule, MatDatepickerModule, MatAutocompleteModule, MatTooltipModule,
    HttpClientModule,
  ],
  providers: [
    TablesRemoteDataService
  ],
  templateUrl: './uc-ficha-militar.component.html',
  styleUrl: './uc-ficha-militar.component.scss'
})
export class UcFichaMilitarComponent implements AfterViewInit {

  fichaForm: FormGroup;
  formState: 'cancel' | 'insert' | 'update' = 'cancel';
  formTitle: string = 'Ficha Militar';
  militarPhoto?: string; // Propriedade para armazenar a foto do militar
  displayTitle: string = this.formTitle;
  isEditing: boolean = false;
  isDocumentLoaded: boolean = false;
  editando: boolean = false;

  // Columns for different tables
  agreColumns: string[] = ['nome', 'grau', 'nascData', 'telefone', 'actions'];
  condeColumns: string[] = ['galardoa', 'especie', 'grauMedalha', 'dataGalardoacao', 'actions'];
  docColumns: string[] = ['tipoDocumento', 'numeroDoc', 'localemissao', 'dataemissao', 'actions'];
  emailColumns: string[] = ['email', 'actions'];
  emforColumns: string[] = ['curso', 'instituicao', 'dataInicio', 'dataTermino', 'actions'];
  especialColumns: string[] = ['especial', 'subEspecial', 'dataEspecial', 'actions'];
  forColumns: string[] = ['curso', 'instituicao', 'dataInicio', 'dataTermino', 'actions'];
  funcaoColumns: string[] = ['funcao', 'orgao', 'dataInicio', 'dataTermino', 'actions'];
  liceColumns: string[] = ['licenca', 'licencaData', 'dataTermino', 'duracao', 'actions'];
  linguaColumns: string[] = ['lingua', 'fala', 'leitura', 'escrita', 'materna', 'actions'];
  peEmergColumns: string[] = ['nome', 'grau', 'telefone', 'resBairro', 'actions'];
  promColumns: string[] = ['categoria', 'patente', 'tipoPromocao', 'dataOS', 'actions'];
  reaColumns: string[] = ['destino', 'dataOS', 'numOS', 'actions'];
  recoColumns: string[] = ['tipoDistincao', 'orgao', 'data', 'motivo', 'actions'];
  regColumns: string[] = ['regime', 'dataReg', 'numOS', 'actions'];
  retReaSalColumns: string[] = ['sal', 'retencaoData', 'reactivacaoData', 'actions'];
  saColumns: string[] = ['doencaSofre', 'datainicioDoenca', 'motivoDoenca', 'actions'];
  sitColumns: string[] = ['situacao', 'dataOS', 'numOS', 'actions'];
  sitCrimColumns: string[] = ['orgao', 'infraccao', 'numProcesso', 'pena', 'actions'];
  sitDiscColumns: string[] = ['orgao', 'infracao', 'medTomadas', 'dataInicioMedida', 'actions'];
  sitQPActivoColumns: string[] = ['situacaoQpAtivo', 'localFuncao', 'dataOS', 'actions'];
  telefoneColumns: string[] = ['numero', 'tipo', 'actions'];

  // Data sources
  agreDataSource: any[] = [];
  condeDataSource: any[] = [];
  docDataSource: any[] = [];
  emailDataSource: any[] = [];
  emforDataSource: any[] = [];
  especialDataSource: any[] = [];
  forDataSource: any[] = [];
  funcaoDataSource: any[] = [];
  liceDataSource: any[] = [];
  linguaDataSource: any[] = [];
  peEmergDataSource: any[] = [];
  promDataSource: any[] = [];
  reaDataSource: any[] = [];
  recoDataSource: any[] = [];
  regDataSource: any[] = [];
  retReaSalDataSource: any[] = [];
  saDataSource: any[] = [];
  sitDataSource: any[] = [];
  sitCrimDataSource: any[] = [];
  sitDiscDataSource: any[] = [];
  sitQPActivoDataSource: any[] = [];
  telefoneDataSource: any[] = [];

  // Selected indices
  selectedAgreIndex: number | null = null;
  selectedCondeIndex: number | null = null;
  selectedDocIndex: number | null = null;
  selectedEmailIndex: number | null = null;
  selectedEmforIndex: number | null = null;
  selectedEspecialIndex: number | null = null;
  selectedForIndex: number | null = null;
  selectedFuncaoIndex: number | null = null;
  selectedLiceIndex: number | null = null;
  selectedLinguaIndex: number | null = null;
  selectedPeEmergIndex: number | null = null;
  selectedPromIndex: number | null = null;
  selectedReaIndex: number | null = null;
  selectedRecoIndex: number | null = null;
  selectedRegIndex: number | null = null;
  selectedRetReaSalIndex: number | null = null;
  selectedSaIndex: number | null = null;
  selectedSitIndex: number | null = null;
  selectedSitCrimIndex: number | null = null;
  selectedSitDiscIndex: number | null = null;
  selectedSitQPActivoIndex: number | null = null;
  selectedTelefoneIndex: number | null = null;

  // Autocomplete options arrays
  situacaoOptions = ['Ativo', 'Licença', 'Missão', 'Formação', 'Reforma', 'Reserva', 'Disponibilidade', 'Suspenso', 'Transferido'];
  estCivilOptions: string[] = [];
  sexoOptions = ['Masculino', 'Feminino'];
  grupSangueOptions: string[] = [];
  tipoTelefoneOptions = ['Pessoal', 'Profissional', 'Emergência'];
  nivelLinguaOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
  habilitacoesOptions: string[] = [];
  linguaOptions: string[] = [];
  falaOptions: string[] = [];
  leituraOptions: string[] = [];
  escritaOptions: string[] = [];
  compreensaoOptions: string[] = [];
  regCasamentoOptions: string[] = [];
  tipoDocumentoOptions: string[] = [];
  centroInstrucaoOptions: string[] = [];
  designacaoCursoOptions: string[] = [];

  designacaoCursoOptionssssssssAniva: string[] = [];
  // Data from Busca table (by numTabela)
  selectGrupSangue: selects[] = [];
  selectHabilitacoes: selects[] = [];
  selectLinguaData: selects[] = [];
  selectFala: selects[] = [];
  selectLeitura: selects[] = [];
  selectEscrita: selects[] = [];
  selectCompreensao: selects[] = [];
  selectRegCasamento: selects[] = [];
  selectEstCivil: selects[] = [];
  selectTipoDocumento: selects[] = [];
  selectCentroInstrucao: selects[] = [];
  selectDesignacaoCurso: selects[] = [];

  // Location data from database
  selectProvincias: selects[] = [];
  selectDistritosNasc: selects[] = [];
  selectPostosNasc: selects[] = [];
  selectLocalidadesNasc: selects[] = [];

  selectDistritosRes: selects[] = [];
  selectPostosRes: selects[] = [];
  selectLocalidadesRes: selects[] = [];

  selectDistritosInc: selects[] = [];
  selectPostosInc: selects[] = [];
  selectLocalidadesInc: selects[] = [];

  // Arrays for autocomplete dropdowns
  provinciasOptions: string[] = [];

  // Dynamic arrays that will be populated based on selections
  nascDistritoOptions: string[] = [];
  nascPostoOptions: string[] = [];
  nascLocalidadeOptions: string[] = [];

  resDistritoOptions: string[] = [];
  resPostoOptions: string[] = [];
  resLocalidadeOptions: string[] = [];

  incDistritoOptions: string[] = [];
  incPostoOptions: string[] = [];
  incLocalidadeOptions: string[] = [];

  // Filtered observables for autocomplete
  filteredSituacao!: Observable<string[]>;
  filteredEstCivil!: Observable<string[]>;
  filteredSexo!: Observable<string[]>;
  filteredGrupSangue!: Observable<string[]>;
  filteredHabilitacoes!: Observable<string[]>;
  filteredTipoTelefone!: Observable<string[]>;
  filteredFala!: Observable<string[]>;
  filteredLeitura!: Observable<string[]>;
  filteredEscrita!: Observable<string[]>;

  // Location filtered observables
  filteredProvinciasNasc!: Observable<string[]>;
  filteredDistritosNasc!: Observable<string[]>;
  filteredPostosNasc!: Observable<string[]>;
  filteredLocalidadesNasc!: Observable<string[]>;

  filteredProvinciasRes!: Observable<string[]>;
  filteredDistritosRes!: Observable<string[]>;
  filteredPostosRes!: Observable<string[]>;
  filteredLocalidadesRes!: Observable<string[]>;

  filteredProvinciasInc!: Observable<string[]>;
  filteredDistritosInc!: Observable<string[]>;
  filteredPostosInc!: Observable<string[]>;
  filteredLocalidadesInc!: Observable<string[]>;

  // Form Array getters with safety checks
  get agreFormArray(): FormArray {
    return this.fichaForm?.get('milAgre') as FormArray || this.fb.array([]);
  }
  get condeFormArray(): FormArray {
    return this.fichaForm?.get('milConde') as FormArray || this.fb.array([]);
  }
  get docFormArray(): FormArray {
    return this.fichaForm?.get('milDoc') as FormArray || this.fb.array([]);
  }
  get emailFormArray(): FormArray {
    return this.fichaForm?.get('milEmail') as FormArray || this.fb.array([]);
  }
  get emforFormArray(): FormArray {
    return this.fichaForm?.get('milEmFor') as FormArray || this.fb.array([]);
  }
  get especialFormArray(): FormArray {
    return this.fichaForm?.get('milEspecial') as FormArray || this.fb.array([]);
  }
  get forFormArray(): FormArray {
    return this.fichaForm?.get('milFor') as FormArray || this.fb.array([]);
  }
  get funcaoFormArray(): FormArray {
    return this.fichaForm?.get('milFuncao') as FormArray || this.fb.array([]);
  }
  get liceFormArray(): FormArray {
    return this.fichaForm?.get('milLice') as FormArray || this.fb.array([]);
  }
  get linguaFormArray(): FormArray {
    return this.fichaForm?.get('milLingua') as FormArray || this.fb.array([]);
  }
  get peEmergFormArray(): FormArray {
    return this.fichaForm?.get('milPeEmerg') as FormArray || this.fb.array([]);
  }
  get promFormArray(): FormArray {
    return this.fichaForm?.get('milProm') as FormArray || this.fb.array([]);
  }
  get reaFormArray(): FormArray {
    return this.fichaForm?.get('milRea') as FormArray || this.fb.array([]);
  }
  get recoFormArray(): FormArray {
    return this.fichaForm?.get('milReco') as FormArray || this.fb.array([]);
  }
  get regFormArray(): FormArray {
    return this.fichaForm?.get('milReg') as FormArray || this.fb.array([]);
  }
  get retReaSalFormArray(): FormArray {
    return this.fichaForm?.get('milRetReaSal') as FormArray || this.fb.array([]);
  }
  get saFormArray(): FormArray {
    return this.fichaForm?.get('milSa') as FormArray || this.fb.array([]);
  }
  get sitFormArray(): FormArray {
    return this.fichaForm?.get('milSit') as FormArray || this.fb.array([]);
  }
  get sitCrimFormArray(): FormArray {
    return this.fichaForm?.get('milSitCrim') as FormArray || this.fb.array([]);
  }
  get sitDiscFormArray(): FormArray {
    return this.fichaForm?.get('milSitDisc') as FormArray || this.fb.array([]);
  }
  get sitQPActivoFormArray(): FormArray {
    return this.fichaForm?.get('milSitQPActivo') as FormArray || this.fb.array([]);
  }
  get telefoneFormArray(): FormArray {
    return this.fichaForm?.get('telefone') as FormArray || this.fb.array([]);
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private el: ElementRef,
    private renderer: Renderer2,
    private auth: AuthService,
    private remoteSrv: TablesRemoteDataService
  ) {
    this.fichaForm = this.generateFormGroup();

    // Load provinces from database
    this.loadProvincias();

    // Load data from Busca table by numTabela
    this.loadGrupSangue();           // numTabela = 5
    this.loadHabilitacoes();         // numTabela = 17
    this.loadLingua();               // numTabela = 8
    this.loadFala();                 // numTabela = 10
    this.loadLeitura();              // numTabela = 11
    this.loadEscrita();              // numTabela = 9
    this.loadCompreensao();          // numTabela = 12
    this.loadRegCasamento();         // numTabela = 4
    this.loadEstCivil();             // numTabela = 3
    this.loadTipoDocumento();        // numTabela = 13
    this.loadCentroInstrucao();      // numTabela = 6
    this.loadDesignacaoCurso();      // numTabela = 7

    // Initialize filtered observables for autocomplete
    this.initializeAutocompleteFilters();

    // Defer state setting to next tick to avoid assertion error
    setTimeout(() => {
      this.setFormState('cancel');
    }, 0);
  }

  ngAfterViewInit(): void {
    // Defer initialization to avoid assertion errors in development
    setTimeout(() => {
      this.ngZone.run(() => {
        this.updateAllDataSources();
        this.fichaForm.disable();
        this.isEditing = false;
        this.cdr.detectChanges();
      });
    }, 0);
  }

  initializeAutocompleteFilters(): void {
    // Initialize filtered observables for main form controls with null safety
    const situacaoControl = this.fichaForm.get('situacaoAtual');
    if (situacaoControl) {
      this.filteredSituacao = situacaoControl.valueChanges.pipe(
        startWith(situacaoControl.value || ''),
        map(value => this._filter(value || '', this.situacaoOptions))
      );
    }

    const estCivilControl = this.fichaForm.get('estCivil');
    if (estCivilControl) {
      this.filteredEstCivil = estCivilControl.valueChanges.pipe(
        startWith(estCivilControl.value || ''),
        map(value => this._filter(value || '', this.estCivilOptions))
      );
    }

    const sexoControl = this.fichaForm.get('sexo');
    if (sexoControl) {
      this.filteredSexo = sexoControl.valueChanges.pipe(
        startWith(sexoControl.value || ''),
        map(value => this._filter(value || '', this.sexoOptions))
      );
    }

    const grupSangueControl = this.fichaForm.get('grupSangue');
    if (grupSangueControl) {
      this.filteredGrupSangue = grupSangueControl.valueChanges.pipe(
        startWith(grupSangueControl.value || ''),
        map(value => this._filter(value || '', this.grupSangueOptions))
      );
    }

    const habilitacoesControl = this.fichaForm.get('habiLite');
    if (habilitacoesControl) {
      this.filteredHabilitacoes = habilitacoesControl.valueChanges.pipe(
        startWith(habilitacoesControl.value || ''),
        map(value => this._filter(value || '', this.habilitacoesOptions))
      );
    }

    // These will be handled per form array item - initialize with empty observables
    this.filteredTipoTelefone = new Observable();
    this.filteredFala = new Observable();
    this.filteredLeitura = new Observable();
    this.filteredEscrita = new Observable();

    // Initialize location filtered observables with null safety
    const nascProvControl = this.fichaForm.get('nascProv');
    if (nascProvControl) {
      this.filteredProvinciasNasc = nascProvControl.valueChanges.pipe(
        startWith(nascProvControl.value || ''),
        map(value => this._filter(value || '', this.provinciasOptions))
      );
    }

    const nascDistControl = this.fichaForm.get('nascDist');
    if (nascDistControl) {
      this.filteredDistritosNasc = nascDistControl.valueChanges.pipe(
        startWith(nascDistControl.value || ''),
        map(value => this._filter(value || '', this.nascDistritoOptions))
      );
    }

    const nascPostoControl = this.fichaForm.get('nascPosto');
    if (nascPostoControl) {
      this.filteredPostosNasc = nascPostoControl.valueChanges.pipe(
        startWith(nascPostoControl.value || ''),
        map(value => this._filter(value || '', this.nascPostoOptions))
      );
    }

    const nascLocalControl = this.fichaForm.get('nascLocal');
    if (nascLocalControl) {
      this.filteredLocalidadesNasc = nascLocalControl.valueChanges.pipe(
        startWith(nascLocalControl.value || ''),
        map(value => this._filter(value || '', this.nascLocalidadeOptions))
      );
    }

    const resProvControl = this.fichaForm.get('resProv');
    if (resProvControl) {
      this.filteredProvinciasRes = resProvControl.valueChanges.pipe(
        startWith(resProvControl.value || ''),
        map(value => this._filter(value || '', this.provinciasOptions))
      );
    }

    const resDistControl = this.fichaForm.get('resDist');
    if (resDistControl) {
      this.filteredDistritosRes = resDistControl.valueChanges.pipe(
        startWith(resDistControl.value || ''),
        map(value => this._filter(value || '', this.resDistritoOptions))
      );
    }

    const resPostoControl = this.fichaForm.get('resPosto');
    if (resPostoControl) {
      this.filteredPostosRes = resPostoControl.valueChanges.pipe(
        startWith(resPostoControl.value || ''),
        map(value => this._filter(value || '', this.resPostoOptions))
      );
    }

    const resLocalControl = this.fichaForm.get('resLocalidade');
    if (resLocalControl) {
      this.filteredLocalidadesRes = resLocalControl.valueChanges.pipe(
        startWith(resLocalControl.value || ''),
        map(value => this._filter(value || '', this.resLocalidadeOptions))
      );
    }

    // Initialize incorporation location filtered observables with null safety
    const incProvControl = this.fichaForm.get('incProv');
    if (incProvControl) {
      this.filteredProvinciasInc = incProvControl.valueChanges.pipe(
        startWith(incProvControl.value || ''),
        map(value => this._filter(value || '', this.provinciasOptions))
      );
    }

    const incDistControl = this.fichaForm.get('incDist');
    if (incDistControl) {
      this.filteredDistritosInc = incDistControl.valueChanges.pipe(
        startWith(incDistControl.value || ''),
        map(value => this._filter(value || '', this.incDistritoOptions))
      );
    }

    const incPostoControl = this.fichaForm.get('incPosto');
    if (incPostoControl) {
      this.filteredPostosInc = incPostoControl.valueChanges.pipe(
        startWith(incPostoControl.value || ''),
        map(value => this._filter(value || '', this.incPostoOptions))
      );
    }

    const incLocalControl = this.fichaForm.get('incLocal');
    if (incLocalControl) {
      this.filteredLocalidadesInc = incLocalControl.valueChanges.pipe(
        startWith(incLocalControl.value || ''),
        map(value => this._filter(value || '', this.incLocalidadeOptions))
      );
    }
  }

  private _filter(value: string, options: string[], excludeValue?: string): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => {
      const matchesFilter = option.toLowerCase().includes(filterValue);
      const isNotSelected = !excludeValue || option !== excludeValue;
      return matchesFilter && isNotSelected;
    });
  }

  private _filterWithCurrentValue(
    value: string,
    options: string[],
    currentValue?: string
  ): string[] {
    const filterValue = value.toLowerCase();
    // Se o valor atual for igual ao que está sendo digitado, não excluir
    const shouldExclude = currentValue && currentValue !== value;
    return options.filter(option => {
      const matchesFilter = option.toLowerCase().includes(filterValue);
      const isNotSelected = !shouldExclude || option !== currentValue;
      return matchesFilter && isNotSelected;
    });
  }

  // Método para filtrar excluindo valores já selecionados em outros campos similares
  private _filterExcludingSelected(
    value: string,
    options: string[],
    arrayName: string,
    controlName: string,
    currentIndex?: number
  ): string[] {
    const filterValue = value.toLowerCase();
    const formArray = this.fichaForm.get(arrayName) as FormArray;
    const selectedValues: string[] = [];

    if (formArray) {
      for (let i = 0; i < formArray.length; i++) {
        if (currentIndex !== undefined && i === currentIndex) continue;
        const controlValue = formArray.at(i).get(controlName)?.value;
        if (controlValue && controlValue.trim()) {
          selectedValues.push(controlValue);
        }
      }
    }

    return options.filter(option => {
      const matchesFilter = option.toLowerCase().includes(filterValue);
      const isNotSelected = !selectedValues.includes(option);
      return matchesFilter && isNotSelected;
    });
  }

  // Métodos para limpar seleções
  clearSelection(controlName: string): void {
    const control = this.fichaForm.get(controlName);
    if (control) {
      // Limpa o valor e força a atualização completa
      control.setValue('', { emitEvent: true });
      control.markAsTouched();
      control.updateValueAndValidity();

      // Força o reinicios da filtragem para o campo específico
      this.reinitializeSpecificFilter(controlName);

      // Força a detecção de mudanças
      this.cdr.detectChanges();
    }
  }

  clearSelectionWithReset(controlName: string, autocomplete: any): void {
    const control = this.fichaForm.get(controlName);
    if (control) {
      // Limpa o valor
      control.setValue('', { emitEvent: true });
      control.markAsTouched();
      control.updateValueAndValidity();

      // Fecha o painel do autocomplete se estiver aberto
      if (autocomplete && autocomplete.isOpen) {
        autocomplete.closePanel();
      }

      // Reinicializa o filtro específico
      this.reinitializeSpecificFilter(controlName);

      // Força a detecção de mudanças
      this.cdr.detectChanges();

      // Reabre o painel para mostrar todas as opções
      setTimeout(() => {
        if (autocomplete && !autocomplete.isOpen) {
          autocomplete.openPanel();
        }
      }, 100);
    }
  }

  // Método específico para limpar localizações com cascata
  clearLocationSelection(controlName: string, type: 'nasc' | 'res' | 'inc'): void {
    const control = this.fichaForm.get(controlName);
    if (control) {
      control.setValue('', { emitEvent: false });
      control.markAsTouched();
      control.updateValueAndValidity();

      // Clear dependent fields based on which field is being cleared
      if (controlName.includes('Prov')) {
        // Clearing province - clear all dependents
        if (type === 'nasc') {
          this.nascDistritoOptions = [];
          this.nascPostoOptions = [];
          this.nascLocalidadeOptions = [];
          this.fichaForm.get('nascDist')?.setValue('', { emitEvent: false });
          this.fichaForm.get('nascPosto')?.setValue('', { emitEvent: false });
          this.fichaForm.get('nascLocal')?.setValue('', { emitEvent: false });
        } else if (type === 'res') {
          this.resDistritoOptions = [];
          this.resPostoOptions = [];
          this.resLocalidadeOptions = [];
          this.fichaForm.get('resDist')?.setValue('', { emitEvent: false });
          this.fichaForm.get('resPosto')?.setValue('', { emitEvent: false });
          this.fichaForm.get('resLocalidade')?.setValue('', { emitEvent: false });
        } else if (type === 'inc') {
          this.incDistritoOptions = [];
          this.incPostoOptions = [];
          this.incLocalidadeOptions = [];
          this.fichaForm.get('incDist')?.setValue('', { emitEvent: false });
          this.fichaForm.get('incPosto')?.setValue('', { emitEvent: false });
          this.fichaForm.get('incLocal')?.setValue('', { emitEvent: false });
        }
      } else if (controlName.includes('Dist')) {
        // Clearing district - clear posto and localidade
        if (type === 'nasc') {
          this.nascPostoOptions = [];
          this.nascLocalidadeOptions = [];
          this.fichaForm.get('nascPosto')?.setValue('', { emitEvent: false });
          this.fichaForm.get('nascLocal')?.setValue('', { emitEvent: false });
        } else if (type === 'res') {
          this.resPostoOptions = [];
          this.resLocalidadeOptions = [];
          this.fichaForm.get('resPosto')?.setValue('', { emitEvent: false });
          this.fichaForm.get('resLocalidade')?.setValue('', { emitEvent: false });
        } else if (type === 'inc') {
          this.incPostoOptions = [];
          this.incLocalidadeOptions = [];
          this.fichaForm.get('incPosto')?.setValue('', { emitEvent: false });
          this.fichaForm.get('incLocal')?.setValue('', { emitEvent: false });
        }
      } else if (controlName.includes('Posto')) {
        // Clearing posto - clear localidade
        if (type === 'nasc') {
          this.nascLocalidadeOptions = [];
          this.fichaForm.get('nascLocal')?.setValue('', { emitEvent: false });
        } else if (type === 'res') {
          this.resLocalidadeOptions = [];
          this.fichaForm.get('resLocalidade')?.setValue('', { emitEvent: false });
        } else if (type === 'inc') {
          this.incLocalidadeOptions = [];
          this.fichaForm.get('incLocal')?.setValue('', { emitEvent: false });
        }
      }

      this.cdr.detectChanges();
    }
  }

  // Função para display no autocomplete
  displayFunction = (value: string): string => {
    return value || '';
  };

  // Método chamado quando uma opção é selecionada
  onOptionSelected(controlName: string, event: any): void {
    const control = this.fichaForm.get(controlName);
    if (control) {
      control.setValue(event.option.value);
      control.markAsTouched();
    }
  }

  clearArrayControlSelection(arrayName: string, index: number, controlName: string): void {
    const formArray = this.fichaForm.get(arrayName) as FormArray;
    if (formArray && formArray.at(index)) {
      const control = formArray.at(index).get(controlName);
      if (control) {
        // Limpa o valor e força a atualização completa
        control.setValue('', { emitEvent: true });
        control.markAsTouched();
        control.updateValueAndValidity();

        // Força a detecção de mudanças
        this.cdr.detectChanges();
      }
    }
  }

  // Método para reinicializar filtros específicos
  private reinitializeSpecificFilter(controlName: string): void {
    switch (controlName) {
      case 'situacaoAtual':
        this.filteredSituacao = this.fichaForm.get('situacaoAtual')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.situacaoOptions))
        );
        break;
      case 'estCivil':
        this.filteredEstCivil = this.fichaForm.get('estCivil')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.estCivilOptions))
        );
        break;
      case 'sexo':
        this.filteredSexo = this.fichaForm.get('sexo')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.sexoOptions))
        );
        break;
      case 'grupSangue':
        this.filteredGrupSangue = this.fichaForm.get('grupSangue')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.grupSangueOptions))
        );
        break;
      case 'habiLite':
        this.filteredHabilitacoes = this.fichaForm.get('habiLite')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.habilitacoesOptions))
        );
        break;
      case 'regCasamento': {
        const regCasamentoControl = this.fichaForm.get('regCasamento');
        if (regCasamentoControl) {
          // Criar um observable para regCasamento se não existir
          const regCasamentoObservable = regCasamentoControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '', this.regCasamentoOptions))
          );
          // Nota: Adicionar filteredRegCasamento às propriedades da classe se necessário
        }
        break;
      }
    }
  }

  // Method to get filtered options for FormArray controls
  getFilteredTipoTelefone(control: any): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filter(value || '', this.tipoTelefoneOptions))
    );
  }

  getFilteredNivelLingua(control: any): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filter(value || '', this.nivelLinguaOptions))
    );
  }

  // Métodos para filtrar dados da tabela Busca
  getFilteredFala(control: any): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filter(value || '', this.falaOptions))
    );
  }

  getFilteredLeitura(control: any): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filter(value || '', this.leituraOptions))
    );
  }

  getFilteredEscrita(control: any): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filter(value || '', this.escritaOptions))
    );
  }

  getFilteredCompreensao(control: any): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filter(value || '', this.compreensaoOptions))
    );
  }

  getFilteredLingua(control: any): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filter(value || '', this.linguaOptions))
    );
  }

  getFilteredTipoDocumento(control: any): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filter(value || '', this.tipoDocumentoOptions))
    );
  }

  // Método para obter opções filtradas excluindo seleções de outros campos similares
  getFilteredTipoTelefoneExcluding(control: any, index: number): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filterExcludingSelected(
        value || '',
        this.tipoTelefoneOptions,
        'telefones',
        'tipo',
        index
      ))
    );
  }

  getFilteredNivelLinguaExcluding(
    control: any,
    index: number,
    controlName: string
  ): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filterExcludingSelected(
        value || '',
        this.nivelLinguaOptions,
        'linguas',
        controlName,
        index
      ))
    );
  }

  // Methods for loading data from database
  loadProvincias(): void {

    //provinciaStamp,descricao,codProv
    const se: condicoesprocura = {
      tabela: 'Provincia',
      campo1: 'descricao',
      campo2: 'provinciaStamp',
      condicao: '1=1',
      campochave: 'provinciaStamp'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectProvincias = data.dados.selects;
          this.provinciasOptions = this.selectProvincias.map(p => p.descricao);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar províncias:', e);
      }
    });
  }

  loadHabilitacoes(): void {
    // Carregar habilitações literárias da base de dados
    // Usa o mesmo padrão implementado para carregar províncias, distritos, etc.
    // codBusca,descricao
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=17',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectHabilitacoes = data.dados.selects;
          this.habilitacoesOptions = this.selectHabilitacoes.map(h => h.descricao);

          // Reinicializar o filtro das habilitações após o carregamento
          this.reinitializeSpecificFilter('habiLite');
        }
      },
      error: (e) => {
        console.error('Erro ao carregar habilitações literárias:', e);
        // Em caso de erro, usar valores padrão
        this.habilitacoesOptions = [
          '1ª Classe',
          '2ª Classe',
          '3ª Classe',
          '4ª Classe',
          '5ª Classe',
          '6ª Classe',
          '7ª Classe',
          'Ensino Básico (7º ano)',
          'Ensino Básico (8º ano)',
          'Ensino Básico (9º ano)',
          'Ensino Secundário (10º ano)',
          'Ensino Secundário (11º ano)',
          'Ensino Secundário (12º ano)',
          'Curso Técnico',
          'Curso Profissional',
          'Bacharelato',
          'Licenciatura',
          'Pós-Graduação',
          'Mestrado',
          'Doutoramento',
          'Sem escolaridade'
        ];

        // Reinicializar o filtro das habilitações mesmo com valores padrão
        this.reinitializeSpecificFilter('habiLite');
      }
    });
  }

  loadGrupSangue(): void {
    // Carregar grupo sanguíneo da base de dados (numTabela = 5)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=5',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectGrupSangue = data.dados.selects;
          this.grupSangueOptions = this.selectGrupSangue.map(g => g.descricao);
          this.reinitializeSpecificFilter('grupSangue');
        }
      },
      error: (e) => {
        console.error('Erro ao carregar grupo sanguíneo:', e);
        this.grupSangueOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        this.reinitializeSpecificFilter('grupSangue');
      }
    });
  }

  loadLingua(): void {
    // Carregar línguas da base de dados (numTabela = 8)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=8',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectLinguaData = data.dados.selects;
          this.linguaOptions = this.selectLinguaData.map(l => l.descricao);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar línguas:', e);
        this.linguaOptions = [];
      }
    });
  }

  loadFala(): void {
    // Carregar níveis de fala da base de dados (numTabela = 10)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=10',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectFala = data.dados.selects;
          this.falaOptions = this.selectFala.map(f => f.descricao);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar níveis de fala:', e);
        this.falaOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
      }
    });
  }

  loadLeitura(): void {
    // Carregar níveis de leitura da base de dados (numTabela = 11)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=11',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectLeitura = data.dados.selects;
          this.leituraOptions = this.selectLeitura.map(l => l.descricao);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar níveis de leitura:', e);
        this.leituraOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
      }
    });
  }

  loadEscrita(): void {
    // Carregar níveis de escrita da base de dados (numTabela = 9)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=9',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectEscrita = data.dados.selects;
          this.escritaOptions = this.selectEscrita.map(e => e.descricao);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar níveis de escrita:', e);
        this.escritaOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
      }
    });
  }

  loadCompreensao(): void {
    // Carregar níveis de compreensão da base de dados (numTabela = 12)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=12',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectCompreensao = data.dados.selects;
          this.compreensaoOptions = this.selectCompreensao.map(c => c.descricao);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar níveis de compreensão:', e);
        this.compreensaoOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
      }
    });
  }

  loadRegCasamento(): void {
    // Carregar regimes de casamento da base de dados (numTabela = 4)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=4',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectRegCasamento = data.dados.selects;
          this.regCasamentoOptions = this.selectRegCasamento.map(r => r.descricao);
          this.reinitializeSpecificFilter('regCasamento');
        }
      },
      error: (e) => {
        console.error('Erro ao carregar regimes de casamento:', e);
        this.regCasamentoOptions = [];
        this.reinitializeSpecificFilter('regCasamento');
      }
    });
  }

  loadEstCivil(): void {
    // Carregar estados civis da base de dados (numTabela = 3)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=3',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectEstCivil = data.dados.selects;
          this.estCivilOptions = this.selectEstCivil.map(e => e.descricao);
          this.reinitializeSpecificFilter('estCivil');
        }
      },
      error: (e) => {
        console.error('Erro ao carregar estados civis:', e);
        this.estCivilOptions = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União de Facto'];
        this.reinitializeSpecificFilter('estCivil');
      }
    });
  }

  loadTipoDocumento(): void {
    // Carregar tipos de documento da base de dados (numTabela = 13)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=13',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectTipoDocumento = data.dados.selects;
          this.tipoDocumentoOptions = this.selectTipoDocumento.map(t => t.descricao);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar tipos de documento:', e);
        this.tipoDocumentoOptions = [];
      }
    });
  }

  loadCentroInstrucao(): void {
    // Carregar centros de instrução da base de dados (numTabela = 6)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=6',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectCentroInstrucao = data.dados.selects;
          this.centroInstrucaoOptions = this.selectCentroInstrucao.map(c => c.descricao);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar centros de instrução:', e);
        this.centroInstrucaoOptions = [];
      }
    });
  }

  loadDesignacaoCurso(): void {
    // Carregar designações de curso da base de dados (numTabela = 7)
    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=7',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectDesignacaoCurso = data.dados.selects;
          this.designacaoCursoOptions = this.selectDesignacaoCurso.map(d => d.descricao);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar designações de curso:', e);
        this.designacaoCursoOptions = [];
      }
    });
  }

  loadDistritos(provinciaStamp: string, type: 'nasc' | 'res' | 'inc'): void {
    const se: condicoesprocura = {
      tabela: 'distrito',
      campo1: 'descricao',
      campo2: 'distritoStamp',
      condicao: `provinciaStamp='${provinciaStamp}'`,
      campochave: 'distritoStamp'
    };
    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          if (type === 'nasc') {
            this.selectDistritosNasc = data.dados.selects;
            this.nascDistritoOptions = this.selectDistritosNasc.map(d => d.descricao);
          } else if (type === 'res') {
            this.selectDistritosRes = data.dados.selects;
            this.resDistritoOptions = this.selectDistritosRes.map(d => d.descricao);
          } else if (type === 'inc') {
            this.selectDistritosInc = data.dados.selects;
            this.incDistritoOptions = this.selectDistritosInc.map(d => d.descricao);
          }
          this.reinitializeLocationFilter(`${type}Dist`, type);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar distritos:', e);
      }
    });
  }

  loadPostos(distritoStamp: string, type: 'nasc' | 'res' | 'inc'): void {
    const se: condicoesprocura = {
      tabela: 'posto',
      campo1: 'nome',
      campo2: 'postAdmStamp',
      condicao: `distritoStamp='${distritoStamp}'`,
      campochave: 'postAdmStamp'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          if (type === 'nasc') {
            this.selectPostosNasc = data.dados.selects;
            this.nascPostoOptions = this.selectPostosNasc.map(p => p.descricao);
          } else if (type === 'res') {
            this.selectPostosRes = data.dados.selects;
            this.resPostoOptions = this.selectPostosRes.map(p => p.descricao);
          } else if (type === 'inc') {
            this.selectPostosInc = data.dados.selects;
            this.incPostoOptions = this.selectPostosInc.map(p => p.descricao);
          }
          this.reinitializeLocationFilter(`${type}Posto`, type);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar postos:', e);
      }
    });
  }

  loadLocalidades(postAdmStamp: string, type: 'nasc' | 'res' | 'inc'): void {
    //codLocalidade,descricao
    const se: condicoesprocura = {
      tabela: 'localidade',
      campo1: 'descricao',
      campo2: 'codLocalidade',
      condicao: `postAdmStamp='${postAdmStamp}'`,
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          if (type === 'nasc') {
            this.selectLocalidadesNasc = data.dados.selects;
            this.nascLocalidadeOptions = this.selectLocalidadesNasc.map(l => l.descricao);
          } else if (type === 'res') {
            this.selectLocalidadesRes = data.dados.selects;
            this.resLocalidadeOptions = this.selectLocalidadesRes.map(l => l.descricao);
          } else if (type === 'inc') {
            this.selectLocalidadesInc = data.dados.selects;
            this.incLocalidadeOptions = this.selectLocalidadesInc.map(l => l.descricao);
          }
          const controlName = type === 'res' ? 'resLocalidade' : `${type}Local`;
          this.reinitializeLocationFilter(controlName, type);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar localidades:', e);
      }
    });
  }

  // Event handlers for location autocomplete
  onProvinciaAutocompleteSelected(event: any, type: 'nasc' | 'res' | 'inc'): void {
    this.onProvinciaSelected(event.option.value, type);
  }

  onDistritoAutocompleteSelected(event: any, type: 'nasc' | 'res' | 'inc'): void {
    this.onDistritoSelected(event.option.value, type);
  }

  onPostoAutocompleteSelected(event: any, type: 'nasc' | 'res' | 'inc'): void {
    this.onPostoSelected(event.option.value, type);
  }

  // Methods for cascading location searches
  onProvinciaSelected(provincia: string, type: 'nasc' | 'res' | 'inc'): void {
    const selectedProvincia = this.selectProvincias.find(p => p.descricao === provincia);
    if (!selectedProvincia) return;

    // Clear dependent fields
    if (type === 'nasc') {
      this.nascDistritoOptions = [];
      this.nascPostoOptions = [];
      this.nascLocalidadeOptions = [];

      this.fichaForm.get('nascDist')?.setValue('', { emitEvent: false });
      this.fichaForm.get('nascPosto')?.setValue('', { emitEvent: false });
      this.fichaForm.get('nascLocal')?.setValue('', { emitEvent: false });
    } else if (type === 'res') {
      this.resDistritoOptions = [];
      this.resPostoOptions = [];
      this.resLocalidadeOptions = [];

      this.fichaForm.get('resDist')?.setValue('', { emitEvent: false });
      this.fichaForm.get('resPosto')?.setValue('', { emitEvent: false });
      this.fichaForm.get('resLocalidade')?.setValue('', { emitEvent: false });
    } else if (type === 'inc') {
      this.incDistritoOptions = [];
      this.incPostoOptions = [];
      this.incLocalidadeOptions = [];

      this.fichaForm.get('incDist')?.setValue('', { emitEvent: false });
      this.fichaForm.get('incPosto')?.setValue('', { emitEvent: false });
      this.fichaForm.get('incLocal')?.setValue('', { emitEvent: false });
    }

    // Load districts for selected province
    this.loadDistritos(selectedProvincia.chave, type);

    this.cdr.detectChanges();
  }

  onDistritoSelected(distrito: string, type: 'nasc' | 'res' | 'inc'): void {
    let selectDistritos: selects[] = [];
    if (type === 'nasc') {
      selectDistritos = this.selectDistritosNasc;
    } else if (type === 'res') {
      selectDistritos = this.selectDistritosRes;
    } else if (type === 'inc') {
      selectDistritos = this.selectDistritosInc;
    }

    const selectedDistrito = selectDistritos.find(d => d.descricao === distrito);
    if (!selectedDistrito) return;

    // Clear dependent fields
    if (type === 'nasc') {
      this.nascPostoOptions = [];
      this.nascLocalidadeOptions = [];

      this.fichaForm.get('nascPosto')?.setValue('', { emitEvent: false });
      this.fichaForm.get('nascLocal')?.setValue('', { emitEvent: false });
    } else if (type === 'res') {
      this.resPostoOptions = [];
      this.resLocalidadeOptions = [];

      this.fichaForm.get('resPosto')?.setValue('', { emitEvent: false });
      this.fichaForm.get('resLocalidade')?.setValue('', { emitEvent: false });
    } else if (type === 'inc') {
      this.incPostoOptions = [];
      this.incLocalidadeOptions = [];

      this.fichaForm.get('incPosto')?.setValue('', { emitEvent: false });
      this.fichaForm.get('incLocal')?.setValue('', { emitEvent: false });
    }

    // Load postos for selected distrito
    this.loadPostos(selectedDistrito.chave, type);

    this.cdr.detectChanges();
  }

  onPostoSelected(posto: string, type: 'nasc' | 'res' | 'inc'): void {
    let selectPostos: selects[] = [];
    if (type === 'nasc') {
      selectPostos = this.selectPostosNasc;
    } else if (type === 'res') {
      selectPostos = this.selectPostosRes;
    } else if (type === 'inc') {
      selectPostos = this.selectPostosInc;
    }

    const selectedPosto = selectPostos.find(p => p.descricao === posto);
    if (!selectedPosto) return;

    // Clear dependent fields
    if (type === 'nasc') {
      this.nascLocalidadeOptions = [];
      this.fichaForm.get('nascLocal')?.setValue('', { emitEvent: false });
    } else if (type === 'res') {
      this.resLocalidadeOptions = [];
      this.fichaForm.get('resLocalidade')?.setValue('', { emitEvent: false });
    } else if (type === 'inc') {
      this.incLocalidadeOptions = [];
      this.fichaForm.get('incLocal')?.setValue('', { emitEvent: false });
    }

    // Load localidades for selected posto
    this.loadLocalidades(selectedPosto.chave, type);

    this.cdr.detectChanges();
  }

  private reinitializeLocationFilter(controlName: string, type: 'nasc' | 'res' | 'inc'): void {
    let control: any;
    let options: string[] = [];

    switch (controlName) {
      case 'nascDist':
        control = this.fichaForm.get('nascDist');
        options = this.nascDistritoOptions;
        if (control) {
          this.filteredDistritosNasc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'nascPosto':
        control = this.fichaForm.get('nascPosto');
        options = this.nascPostoOptions;
        if (control) {
          this.filteredPostosNasc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'nascLocal':
        control = this.fichaForm.get('nascLocal');
        options = this.nascLocalidadeOptions;
        if (control) {
          this.filteredLocalidadesNasc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'resDist':
        control = this.fichaForm.get('resDist');
        options = this.resDistritoOptions;
        if (control) {
          this.filteredDistritosRes = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'resPosto':
        control = this.fichaForm.get('resPosto');
        options = this.resPostoOptions;
        if (control) {
          this.filteredPostosRes = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'resLocalidade':
        control = this.fichaForm.get('resLocalidade');
        options = this.resLocalidadeOptions;
        if (control) {
          this.filteredLocalidadesRes = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'incDist':
        control = this.fichaForm.get('incDist');
        options = this.incDistritoOptions;
        if (control) {
          this.filteredDistritosInc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'incPosto':
        control = this.fichaForm.get('incPosto');
        options = this.incPostoOptions;
        if (control) {
          this.filteredPostosInc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'incLocal':
        control = this.fichaForm.get('incLocal');
        options = this.incLocalidadeOptions;
        if (control) {
          this.filteredLocalidadesInc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
    }
  }

  generateFormGroup(): FormGroup {
    return this.fb.group({
      // Basic military information
      milStamp: [''],
      nome: ['', Validators.required],
      nim: [0, [Validators.required, Validators.min(1)]],
      situacaoAtual: ['Ativo'], // Nova situação militar atual
      nascData: [''],
      sexo: [''],
      grupSangue: [''],
      nacional: [''],
      nascPais: [''],
      nascProv: [''],
      codNascProv: [0],
      nascDist: [''],
      codNascDist: [0],
      nascPosto: [''],
      codNascPostAdm: [0],
      nascLocal: [''],
      codNascLocalidade: [0],
      nascPov: [''],
      pai: [''],
      mae: [''],
      estCivil: [''],
      regCasamento: [''],
      dataCasamento: [''],
      conjuge: [''],
      numFilhos: [0],
      habiLite: [''],

      // Residence information
      resProv: [''],
      codResProv: [0],
      resDist: [''],
      codResDist: [0],
      resPosto: [''],
      codResPostAdm: [0],
      resLocalidade: [''],
      codResLocal: [0],
      resBairro: [''],
      resQuarteirao: [''],
      resAvenida: [''],
      numCasa: [''],

      // Military branch and incorporation
      ramo: [''],
      codRamo: [0],
      incPais: [''],
      incProv: [''],
      codIncProv: [0],
      incDist: [''],
      codIncDist: [0],
      incPosto: [''],
      codIncPostAdm: [0],
      incLocal: [''],
      codIncLocalidade: [0],
      incData: [''],

      // Training information
      inicioTreino: [''],
      terminoTreino: [''],
      duracaoTreino: [''],
      centroTreino: [''],
      cursoTreino: [''],
      adquirEspecial: [''],

      // Timestamps
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],

      // Related data arrays
      email: this.fb.array([]),
      fornecimento: this.fb.array([]),
      milAgre: this.fb.array([]),
      milConde: this.fb.array([]),
      milDoc: this.fb.array([]),
      milEmail: this.fb.array([]),
      milEmFor: this.fb.array([]),
      milEspecial: this.fb.array([]),
      milFa: this.fb.group({
        milStamp: [''],
        codMilFa: [0],
        falecData: [''],
        falecLocal: [''],
        circunstancias: [''],
        enterroData: [''],
        enterroLocal: [''],
        numCampa: [''],
        numCertObito: [''],
        obs: [''],
        inseriu: [''],
        inseriuDataHora: [new Date()],
        alterou: [''],
        alterouDataHora: [new Date()]
      }),
      milFor: this.fb.array([]),
      milFot: this.fb.array([]),
      milFuncao: this.fb.array([]),
      milIDigital: this.fb.group({
        milStamp: [''],
        caminhoPolegarE: [''],
        polegarE: [null],
        caminhoIndicadorE: [''],
        indicadorE: [null],
        caminhoPolegarD: [''],
        polegarD: [null],
        caminhoIndicadorD: [''],
        indicadorD: [null],
        inseriu: [''],
        inseriuDataHora: [new Date()],
        alterou: [''],
        alterouDataHora: [new Date()]
      }),
      milLice: this.fb.array([]),
      milLingua: this.fb.array([]),
      milMed: this.fb.group({
        milStamp: [''],
        codMil: [0],
        altura: [0],
        braco: [0],
        cabeca: [0],
        pescoco: [0],
        peito: [0],
        cintura: [0],
        ancas: [0],
        entrepernas: [0],
        calcado: [0],
        peso: [0],
        ombros: [0],
        inseriu: [''],
        inseriuDataHora: [new Date()],
        alterou: [''],
        alterouDataHora: [new Date()]
      }),
      milPeEmerg: this.fb.array([]),
      milProm: this.fb.array([]),
      milRea: this.fb.array([]),
      milReco: this.fb.array([]),
      milReg: this.fb.array([]),
      milRetReaSal: this.fb.array([]),
      milSa: this.fb.array([]),
      milSalario: this.fb.group({
        milStamp: [''],
        uCerimonial: [false],
        saudeMilitar: [false],
        recebePatente: [false],
        recebeSqtc: [false],
        escalao: [''],
        sQTC: [''],
        nivelSalarial: [''],
        nomeBanco: [''],
        nrConta: [''],
        nib: [''],
        obs: [''],
        inseriu: [''],
        inseriuDataHora: [new Date()],
        alterou: [''],
        alterouDataHora: [new Date()]
      }),
      milSit: this.fb.array([]),
      milSitCrim: this.fb.array([]),
      milSitDisc: this.fb.array([]),
      milSitQPActivo: this.fb.array([]),
      telefone: this.fb.array([])
    });
  }

  // Form state management
  setFormState(state: 'cancel' | 'insert' | 'update'): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.formState = state;

        switch (state) {
          case 'cancel':
            if (this.fichaForm) {
              this.fichaForm.disable();
            }
            this.isEditing = false;
            break;
          case 'insert':
          case 'update':
            if (this.fichaForm) {
              this.fichaForm.enable();
            }
            this.isEditing = true;
            break;
        }
        this.cdr.detectChanges();
      });
    }, 0);
  }

  canPerformActions(): boolean {
    return this.formState === 'insert' || this.formState === 'update';
  }

  getFormStateLabel(): string {
    switch (this.formState) {
      case 'cancel': return 'Visualização';
      case 'insert': return 'Inserindo';
      case 'update': return 'Editando';
      default: return '';
    }
  }

  // Button actions
  onNew(): void {
    this.resetForm();
    this.setFormState('insert');
    this.displayTitle = 'Nova Ficha Militar';
  }

  onEdit(): void {
    if (!this.isDocumentLoaded) {
      Swal.fire('Atenção!', 'Primeiro carregue uma ficha militar para editar.', 'warning');
      return;
    }
    this.setFormState('update');
    this.displayTitle = 'Editando Ficha Militar';
  }

  onCancel(): void {
    this.setFormState('cancel');
    this.displayTitle = this.formTitle;
    if (this.isDocumentLoaded) {
      // Restore original data if needed
    } else {
      this.resetForm();
    }
  }

  onSave(): void {
    if (!this.validarFormulario()) {
      return;
    }

    // Verifica se existe pelo menos um documento
    if (this.docFormArray.length === 0) {
      Swal.fire('Atenção!', 'É obrigatório adicionar pelo menos um documento antes de salvar a ficha militar.', 'warning');
      return;
    }

    // Verifica se existe pelo menos uma função
    if (this.funcaoFormArray.length === 0) {
      Swal.fire('Atenção!', 'É obrigatório adicionar pelo menos uma função antes de salvar a ficha militar.', 'warning');
      return;
    }

    if (this.fichaForm.valid) {
      const formData = this.fichaForm.value;
      //console.log('Saving military record:', formData);

      // Monta o objeto com os dados do formulário para enviar à API
      const objeto = {
        tipo: 'Mil', // Nome da entidade no backend
        ...formData, // Inclui todos os dados do formulário
        // Adiciona metadata de controle
        inseriu: this.auth.obterSessao()?.nome || '',
        inseriuDataHora: new Date(),
        alterou: this.auth.obterSessao()?.nome || '',
        alterouDataHora: new Date()
      };

      this.auth.saveWithChildren(objeto).subscribe({
        next: (result) => {
          if (result.success) {
            Swal.fire('Sucesso!', 'Ficha militar salva com sucesso!', 'success');
            this.setFormState('cancel');
            this.isDocumentLoaded = true;
            this.displayTitle = this.formTitle;
          } else {
            Swal.fire('Erro!', result.message || 'Erro ao salvar dados', 'error');
          }
        },
        error: (error) => {
          console.error('Erro ao salvar:', error);
          Swal.fire('Erro!', 'Erro interno do servidor. Tente novamente.', 'error');
        }
      });
    } else {
      Swal.fire('Erro!', 'Por favor, preencha todos os campos obrigatórios.', 'error');
      this.markFormGroupTouched();
    }
  }  onSubmit(): void {
    this.onSave();
  }

  resetForm(): void {
    this.fichaForm.reset();
    this.clearAllFormArrays();
    this.updateAllDataSources();
    this.resetSelectedIndices();
    this.isDocumentLoaded = false;
    this.editando = false;

    // Set default values
    this.fichaForm.patchValue({
      nascData: null,
      incData: null,
      inicioTreino: null,
      terminoTreino: null,
      dataCasamento: null,
      inseriuDataHora: new Date(),
      alterouDataHora: new Date()
    });
  }

  private clearAllFormArrays(): void {
    this.agreFormArray.clear();
    this.condeFormArray.clear();
    this.docFormArray.clear();
    this.emailFormArray.clear();
    this.emforFormArray.clear();
    this.especialFormArray.clear();
    this.forFormArray.clear();
    this.funcaoFormArray.clear();
    this.liceFormArray.clear();
    this.linguaFormArray.clear();
    this.peEmergFormArray.clear();
    this.promFormArray.clear();
    this.reaFormArray.clear();
    this.recoFormArray.clear();
    this.regFormArray.clear();
    this.retReaSalFormArray.clear();
    this.saFormArray.clear();
    this.sitFormArray.clear();
    this.sitCrimFormArray.clear();
    this.sitDiscFormArray.clear();
    this.sitQPActivoFormArray.clear();
    this.telefoneFormArray.clear();
  }

  private updateAllDataSources(): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        try {
          this.agreDataSource = [...this.agreFormArray.controls];
          this.condeDataSource = [...this.condeFormArray.controls];
          this.docDataSource = [...this.docFormArray.controls];
          this.emailDataSource = [...this.emailFormArray.controls];
          this.emforDataSource = [...this.emforFormArray.controls];
          this.especialDataSource = [...this.especialFormArray.controls];
          this.forDataSource = [...this.forFormArray.controls];
          this.funcaoDataSource = [...this.funcaoFormArray.controls];
          this.liceDataSource = [...this.liceFormArray.controls];
          this.linguaDataSource = [...this.linguaFormArray.controls];
          this.peEmergDataSource = [...this.peEmergFormArray.controls];
          this.promDataSource = [...this.promFormArray.controls];
          this.reaDataSource = [...this.reaFormArray.controls];
          this.recoDataSource = [...this.recoFormArray.controls];
          this.regDataSource = [...this.regFormArray.controls];
          this.retReaSalDataSource = [...this.retReaSalFormArray.controls];
          this.saDataSource = [...this.saFormArray.controls];
          this.sitDataSource = [...this.sitFormArray.controls];
          this.sitCrimDataSource = [...this.sitCrimFormArray.controls];
          this.sitDiscDataSource = [...this.sitDiscFormArray.controls];
          this.sitQPActivoDataSource = [...this.sitQPActivoFormArray.controls];
          this.telefoneDataSource = [...this.telefoneFormArray.controls];
          this.cdr.markForCheck();
        } catch (error) {
          console.warn('Error updating data sources:', error);
        }
      });
    }, 0);
  }

  private resetSelectedIndices(): void {
    this.selectedAgreIndex = null;
    this.selectedCondeIndex = null;
    this.selectedDocIndex = null;
    this.selectedEmailIndex = null;
    this.selectedEmforIndex = null;
    this.selectedEspecialIndex = null;
    this.selectedForIndex = null;
    this.selectedFuncaoIndex = null;
    this.selectedLiceIndex = null;
    this.selectedLinguaIndex = null;
    this.selectedPeEmergIndex = null;
    this.selectedPromIndex = null;
    this.selectedReaIndex = null;
    this.selectedRecoIndex = null;
    this.selectedRegIndex = null;
    this.selectedRetReaSalIndex = null;
    this.selectedSaIndex = null;
    this.selectedSitIndex = null;
    this.selectedSitCrimIndex = null;
    this.selectedSitDiscIndex = null;
    this.selectedSitQPActivoIndex = null;
    this.selectedTelefoneIndex = null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.fichaForm.controls).forEach(key => {
      const control = this.fichaForm.get(key);
      if (control) {
        control.markAsTouched();
        if (control instanceof FormArray) {
          control.controls.forEach(arrayControl => {
            if (arrayControl instanceof FormGroup) {
              Object.keys(arrayControl.controls).forEach(arrayKey => {
                arrayControl.get(arrayKey)?.markAsTouched();
              });
            }
          });
        }
      }
    });
  }

  // Generic methods for array operations
  selectRow<T>(formArray: FormArray, index: number, selectedIndexProperty: string): T | null {
    (this as any)[selectedIndexProperty] = index;
    const selectedRow = formArray.at(index).value;
    return selectedRow as T;
  }

  // Array management methods
  addToFormArray(arrayName: string, formGroup: FormGroup): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        const formArray = this.fichaForm.get(arrayName) as FormArray;
        if (formArray) {
          formArray.push(formGroup);
          this.updateDataSource(arrayName);
          this.cdr.detectChanges();
        }
      });
    }, 0);
  }

  removeFromFormArray(arrayName: string, index: number): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        const formArray = this.fichaForm.get(arrayName) as FormArray;
        if (formArray && index >= 0 && index < formArray.length) {
          formArray.removeAt(index);
          this.updateDataSource(arrayName);
          this.cdr.detectChanges();
        }
      });
    }, 0);
  }

  private updateDataSource(arrayName: string): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        const formArray = this.fichaForm.get(arrayName) as FormArray;
        if (formArray) {
          const dataSourceName = this.getDataSourceName(arrayName);
          if (dataSourceName) {
            (this as any)[dataSourceName] = [...formArray.controls];
            this.cdr.markForCheck();
          }
        }
      });
    }, 0);
  }

  private getDataSourceName(arrayName: string): string {
    const mapping: { [key: string]: string } = {
      milAgre: 'agreDataSource',
      milConde: 'condeDataSource',
      milDoc: 'docDataSource',
      milEmail: 'emailDataSource',
      milEmFor: 'emforDataSource',
      milEspecial: 'especialDataSource',
      milFor: 'forDataSource',
      milFuncao: 'funcaoDataSource',
      milLice: 'liceDataSource',
      milLingua: 'linguaDataSource',
      milPeEmerg: 'peEmergDataSource',
      milProm: 'promDataSource',
      milRea: 'reaDataSource',
      milReco: 'recoDataSource',
      milReg: 'regDataSource',
      milRetReaSal: 'retReaSalDataSource',
      milSa: 'saDataSource',
      milSit: 'sitDataSource',
      milSitCrim: 'sitCrimDataSource',
      milSitDisc: 'sitDiscDataSource',
      milSitQPActivo: 'sitQPActivoDataSource',
      telefone: 'telefoneDataSource'
    };
    return mapping[arrayName] || `${arrayName}DataSource`;
  }

  // Specific add methods for each array type
  adicionarAgregado(): void {
    const agreGroup = this.fb.group({
      milAgreStamp: [''],
      codMilAgre: [0],
      nome: ['', Validators.required],
      grau: [''],
      nascData: [''],
      nascProv: [''],
      codNascProv: [0],
      resProv: [''],
      codResProv: [0],
      resDist: [''],
      codResDist: [0],
      resPosto: [''],
      codResPostAdm: [0],
      resLocal: [''],
      codResLocal: [0],
      resBairro: [''],
      telefone: [0],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milAgre', agreGroup);
    this.selectedAgreIndex = this.agreFormArray.length - 1;
  }

  adicionarCondecoracoes(): void {
    const condeGroup = this.fb.group({
      milCondeStamp: [''],
      codMilConde: [0],
      galardoa: ['', Validators.required],
      especie: [''],
      grauMedalha: [''],
      dataGalardoacao: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milConde', condeGroup);
    this.selectedCondeIndex = this.condeFormArray.length - 1;
  }

  adicionarDocumento(): void {
    const docGroup = this.fb.group({
      milDocStamp: [''],
      codMilDoc: [0],
      tipoDocumento: ['', Validators.required],
      numeroDoc: ['', Validators.required],
      localemissao: [''],
      dataemissao: [''],
      datavalid: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milDoc', docGroup);
    this.selectedDocIndex = this.docFormArray.length - 1;
  }

  adicionarEmail(): void {
    const emailGroup = this.fb.group({
      milStamp: [''],
      emailStamp: [''],
      email: ['', [Validators.required, Validators.email]],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()]
    });

    this.addToFormArray('milEmail', emailGroup);
    this.selectedEmailIndex = this.emailFormArray.length - 1;
  }

  adicionarTelefone(): void {
    const telefoneGroup = this.fb.group({
      telefoneStamp: [''],
      numero: ['', Validators.required],
      tipo: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()]
    });

    this.addToFormArray('telefone', telefoneGroup);
    this.selectedTelefoneIndex = this.telefoneFormArray.length - 1;
  }

  // Add methods for other arrays (similar pattern)
  adicionarFormacao(): void {
    const forGroup = this.fb.group({
      milForStamp: [''],
      codMilFor: [0],
      tipoFormacao: [false],
      curso: ['', Validators.required],
      dataInicio: [''],
      dataTermino: [''],
      nivel: [''],
      duracao: [''],
      tipoInstituicao: [false],
      instituicao: [''],
      codPais: [0],
      pais: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milFor', forGroup);
    this.selectedForIndex = this.forFormArray.length - 1;
  }

  adicionarLingua(): void {
    const linguaGroup = this.fb.group({
      milLinguaStamp: [''],
      codMilLingua: [0],
      lingua: ['', Validators.required],
      fala: [''],
      leitura: [''],
      escrita: [''],
      compreensao: [''],
      materna: [false],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milLingua', linguaGroup);
    this.selectedLinguaIndex = this.linguaFormArray.length - 1;
  }

  adicionarSituacao(): void {
    const sitGroup = this.fb.group({
      milSitStamp: [''],
      codMilSit: [0],
      situacao: ['', Validators.required],
      numOS: [''],
      dataOS: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milSit', sitGroup);
    this.selectedSitIndex = this.sitFormArray.length - 1;
  }

  // Remove methods - Generic method to avoid repetition
  removerItem(arrayName: string, index: number, selectedIndexProperty: string): void {
    this.removeFromFormArray(arrayName, index);
    (this as any)[selectedIndexProperty] = null;
  }

  // Specific remove methods using generic method
  removerAgregado(index: number): void {
    this.removerItem('milAgre', index, 'selectedAgreIndex');
  }

  removerCondecoracoes(index: number): void {
    this.removerItem('milConde', index, 'selectedCondeIndex');
  }

  removerDocumento(index: number): void {
    this.removerItem('milDoc', index, 'selectedDocIndex');
  }

  removerEmail(index: number): void {
    this.removerItem('milEmail', index, 'selectedEmailIndex');
  }

  removerTelefone(index: number): void {
    this.removerItem('telefone', index, 'selectedTelefoneIndex');
  }

  removerFormacao(index: number): void {
    this.removerItem('milFor', index, 'selectedForIndex');
  }

  removerLingua(index: number): void {
    this.removerItem('milLingua', index, 'selectedLinguaIndex');
  }

  removerSituacao(index: number): void {
    this.removerItem('milSit', index, 'selectedSitIndex');
  }

  removerEmergencia(index: number): void {
    this.removerItem('milPeEmerg', index, 'selectedPeEmergIndex');
  }

  removerPromocao(index: number): void {
    this.removerItem('milProm', index, 'selectedPromIndex');
  }

  removerReactivacao(index: number): void {
    this.removerItem('milRea', index, 'selectedReaIndex');
  }

  removerReconhecimento(index: number): void {
    this.removerItem('milReco', index, 'selectedRecoIndex');
  }

  removerRegime(index: number): void {
    this.removerItem('milReg', index, 'selectedRegIndex');
  }

  removerRetencaoSalario(index: number): void {
    this.removerItem('milRetReaSal', index, 'selectedRetReaSalIndex');
  }

  removerSaude(index: number): void {
    this.removerItem('milSa', index, 'selectedSaIndex');
  }

  removerSituacaoCriminal(index: number): void {
    this.removerItem('milSitCrim', index, 'selectedSitCrimIndex');
  }

  removerSituacaoDisciplinar(index: number): void {
    this.removerItem('milSitDisc', index, 'selectedSitDiscIndex');
  }

  removerSituacaoQPActivo(index: number): void {
    this.removerItem('milSitQPActivo', index, 'selectedSitQPActivoIndex');
  }

  removerEspecialidade(index: number): void {
    this.removerItem('milEspecial', index, 'selectedEspecialIndex');
  }

  removerFormacaoMilitar(index: number): void {
    this.removerItem('milEmFor', index, 'selectedEmforIndex');
  }

  removerFuncao(index: number): void {
    this.removerItem('milFuncao', index, 'selectedFuncaoIndex');
  }

  removerLicenca(index: number): void {
    this.removerItem('milLice', index, 'selectedLiceIndex');
  }

  // Select methods
  selectAgregado(index: number): void {
    this.selectRow<MilAgre>(this.agreFormArray, index, 'selectedAgreIndex');
  }

  selectCondecoracoes(index: number): void {
    this.selectRow<MilConde>(this.condeFormArray, index, 'selectedCondeIndex');
  }

  selectDocumento(index: number): void {
    this.selectRow<MilDoc>(this.docFormArray, index, 'selectedDocIndex');
  }

  selectEmail(index: number): void {
    this.selectRow<MilEmail>(this.emailFormArray, index, 'selectedEmailIndex');
  }

  selectTelefone(index: number): void {
    this.selectRow<Telefone>(this.telefoneFormArray, index, 'selectedTelefoneIndex');
  }

  selectFormacao(index: number): void {
    this.selectRow<MilFor>(this.forFormArray, index, 'selectedForIndex');
  }

  selectLingua(index: number): void {
    this.selectRow<MilLingua>(this.linguaFormArray, index, 'selectedLinguaIndex');
  }

  selectSituacao(index: number): void {
    this.selectRow<MilSit>(this.sitFormArray, index, 'selectedSitIndex');
  }

  // Additional array methods for remaining entities
  adicionarEmergencia(): void {
    const emergGroup = this.fb.group({
      milPeEmergStamp: [''],
      codMilPeEmerg: [0],
      nome: ['', Validators.required],
      grau: [''],
      nascProv: [''],
      codNascProv: [0],
      resProv: [''],
      codResProv: [0],
      resDist: [''],
      codResDist: [0],
      resPosto: [''],
      codResPostAdm: [0],
      resLocal: [''],
      codResLocal: [0],
      resBairro: [''],
      resAvenida: [''],
      resQuarteirao: [''],
      numCasa: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milPeEmerg', emergGroup);
    this.selectedPeEmergIndex = this.peEmergFormArray.length - 1;
  }

  adicionarPromocao(): void {
    const promGroup = this.fb.group({
      milPromStamp: [''],
      codMilProm: [0],
      categoria: ['', Validators.required],
      patente: ['', Validators.required],
      tipoPromocao: [''],
      dataOS: [''],
      numOS: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      patStamp: [''],
      milStamp: ['']
    });

    this.addToFormArray('milProm', promGroup);
    this.selectedPromIndex = this.promFormArray.length - 1;
  }

  adicionarReactivacao(): void {
    const reaGroup = this.fb.group({
      milStamp: [''],
      codMilRea: [0],
      numOS: [''],
      dataOS: [''],
      destino: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()]
    });

    this.addToFormArray('milRea', reaGroup);
    this.selectedReaIndex = this.reaFormArray.length - 1;
  }

  adicionarReconhecimento(): void {
    const recoGroup = this.fb.group({
      milRecoStamp: [''],
      codMilReco: [0],
      tipoDistincao: ['', Validators.required],
      concessaoDoc: [''],
      orgao: [''],
      data: [''],
      motivo: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milReco', recoGroup);
    this.selectedRecoIndex = this.recoFormArray.length - 1;
  }

  adicionarRegime(): void {
    const regGroup = this.fb.group({
      milRegStamp: [''],
      codReg: [0],
      dataReg: [''],
      numOS: [''],
      regime: ['', Validators.required],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      regStamp: [''],
      milStamp: ['']
    });

    this.addToFormArray('milReg', regGroup);
    this.selectedRegIndex = this.regFormArray.length - 1;
  }

  adicionarRetencaoSalario(): void {
    const retSalGroup = this.fb.group({
      milRetReaSalStamp: [''],
      codMilRetReaSal: [0],
      sal: [''],
      unidadeSalario: [''],
      retencaoData: [''],
      reactivacaoData: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milRetReaSal', retSalGroup);
    this.selectedRetReaSalIndex = this.retReaSalFormArray.length - 1;
  }

  adicionarSaude(): void {
    const saGroup = this.fb.group({
      milSaStamp: [''],
      codMilSa: [0],
      doencaSofre: [''],
      doencaSofrida: [''],
      cirurgiaSofrida: [''],
      motivoDoenca: [''],
      datainicioDoenca: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milSa', saGroup);
    this.selectedSaIndex = this.saFormArray.length - 1;
  }

  adicionarSituacaoCriminal(): void {
    const sitCrimGroup = this.fb.group({
      milSitCrimStamp: [''],
      codMilSitCrim: [0],
      orgao: [''],
      infraccao: [''],
      numProcesso: [''],
      processodata: [''],
      pena: [''],
      detencaoData: [''],
      condenacaoData: [''],
      localPrisao: [''],
      solturaData: [''],
      numDocSoltura: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milSitCrim', sitCrimGroup);
    this.selectedSitCrimIndex = this.sitCrimFormArray.length - 1;
  }

  adicionarSituacaoDisciplinar(): void {
    const sitDiscGroup = this.fb.group({
      milSitDiscStamp: [''],
      codMilSitDisc: [0],
      orgao: [''],
      numOS: [''],
      infracao: [''],
      numProcesso: [''],
      dataProcesso: [''],
      medTomadas: [''],
      dataInicioMedida: [''],
      dataTerminoMedida: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milSitDisc', sitDiscGroup);
    this.selectedSitDiscIndex = this.sitDiscFormArray.length - 1;
  }

  adicionarSituacaoQPActivo(): void {
    const sitQPGroup = this.fb.group({
      milSitQPActivoStamp: [''],
      codMilSitQPActivo: [0],
      situacaoQpAtivo: [''],
      numOS: [''],
      dataOS: [''],
      localFuncao: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milSitQPActivo', sitQPGroup);
    this.selectedSitQPActivoIndex = this.sitQPActivoFormArray.length - 1;
  }

  adicionarEspecialidade(): void {
    const especialGroup = this.fb.group({
      milEspecialStamp: [''],
      codMilEspecial: [0],
      codRamo: [0],
      ramo: [''],
      codEspecial: [0],
      especial: ['', Validators.required],
      codSubEspecial: [0],
      subEspecial: [''],
      dataEspecial: [''],
      numOS: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      especialStamp: [''],
      milStamp: ['']
    });

    this.addToFormArray('milEspecial', especialGroup);
    this.selectedEspecialIndex = this.especialFormArray.length - 1;
  }

  adicionarFormacaoMilitar(): void {
    const emforGroup = this.fb.group({
      milEmForStamp: [''],
      codMilEmFor: [0],
      tipo: [false],
      curso: ['', Validators.required],
      adquirEspecial: [''],
      custos: [''],
      anoFrequentar: [''],
      dataInicio: [''],
      dataTermino: [''],
      duracao: [''],
      duracaoNormal: [''],
      nivel: [''],
      nivelAtingir: [''],
      tipoInstituicao: [false],
      instituicao: [''],
      obs: [''],
      codPpais: [0],
      pais: [''],
      codProvincia: [0],
      provincia: [''],
      codDistrito: [0],
      distrito: [''],
      codPostoAdm: [0],
      postoAdm: [''],
      codLocalidade: [0],
      localidade: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      milStamp: ['']
    });

    this.addToFormArray('milEmFor', emforGroup);
    this.selectedEmforIndex = this.emforFormArray.length - 1;
  }

  adicionarFuncao(): void {
    const funcaoGroup = this.fb.group({
      milFuncaoStamp: [''],
      milStamp: [''],
      codMilFuncao: [0],
      funcao: ['', Validators.required],
      numOS: [''],
      dataOS: [''],
      dataInicio: [''],
      dataTermino: [''],
      obs: [''],
      orgao: [''],
      unidade: [''],
      subunidade: [''],
      subunidade1: [''],
      subunidade2: [''],
      orgaoStamp: [''],
      unidadeStamp: [''],
      subunidadeStamp: [''],
      subunidade1Stamp: [''],
      subunidade2Stamp: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()]
    });

    this.addToFormArray('milFuncao', funcaoGroup);
    this.selectedFuncaoIndex = this.funcaoFormArray.length - 1;
  }

  adicionarLicenca(): void {
    const liceGroup = this.fb.group({
      milLiceStamp: [''],
      codMilLice: [0],
      licenca: ['', Validators.required],
      licencaData: [''],
      dataTermino: [''],
      duracao: [''],
      obs: [''],
      inseriu: [''],
      inseriuDataHora: [new Date()],
      alterou: [''],
      alterouDataHora: [new Date()],
      licencaStamp: [''],
      milStamp: ['']
    });

    this.addToFormArray('milLice', liceGroup);
    this.selectedLiceIndex = this.liceFormArray.length - 1;
  }

  // Métodos de pesquisa para nacionalidade
  searchNacionalidade(): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'pais,descricao';
    proc.tabela = 'pais';
    proc.campo = 'pais';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'pais,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'pais asc';
    proc.origem = 'País';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.fichaForm.patchValue({
          nacional: resultado.pais || resultado.descricao
        });
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para ramo
  searchRamo(): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'ramo,descricao';
    proc.tabela = 'ramo';
    proc.campo = 'ramo';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'ramo,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'ramo asc';
    proc.origem = 'Ramo';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.fichaForm.patchValue({
          ramo: resultado.ramo || resultado.descricao
        });
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para banco
  searchBanco(): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'banco,descricao';
    proc.tabela = 'banco';
    proc.campo = 'banco';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'banco,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'banco asc';
    proc.origem = 'Banco';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.fichaForm.get('milSalario')?.patchValue({
          nomeBanco: resultado.banco || resultado.descricao
        });
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para grau de parentesco
  searchGrauParentesco(index: number): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'grauparentesco,descricao';
    proc.tabela = 'grauparentesco';
    proc.campo = 'grauparentesco';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'grauparentesco,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'grauparentesco asc';
    proc.origem = 'Grau de Parentesco';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const agreFormGroup = this.agreFormArray.at(index);
        agreFormGroup.patchValue({
          grau: resultado.grauparentesco || resultado.descricao
        });
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para país
  searchPais(fieldName: string): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'pais,descricao';
    proc.tabela = 'pais';
    proc.campo = 'pais';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'pais,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'pais asc';
    proc.origem = 'País';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const patchValue: any = {};
        patchValue[fieldName] = resultado.pais || resultado.descricao;
        this.fichaForm.patchValue(patchValue);
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para província
  searchProvincia(fieldName: string): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'provincia,descricao';
    proc.tabela = 'provincia';
    proc.campo = 'provincia';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'provincia,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'provincia asc';
    proc.origem = 'Província';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const patchValue: any = {};
        patchValue[fieldName] = resultado.provincia || resultado.descricao;
        this.fichaForm.patchValue(patchValue);
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para distrito
  searchDistrito(fieldName: string): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'distrito,descricao';
    proc.tabela = 'distrito';
    proc.campo = 'distrito';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'distrito,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'distrito asc';
    proc.origem = 'Distrito';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const patchValue: any = {};
        patchValue[fieldName] = resultado.distrito || resultado.descricao;
        this.fichaForm.patchValue(patchValue);
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para posto administrativo
  searchPostoAdministrativo(fieldName: string): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'postoadministrativo,descricao';
    proc.tabela = 'postoadministrativo';
    proc.campo = 'postoadministrativo';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'postoadministrativo,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'postoadministrativo asc';
    proc.origem = 'Posto';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const patchValue: any = {};
        patchValue[fieldName] = resultado.postoadministrativo || resultado.descricao;
        this.fichaForm.patchValue(patchValue);
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para localidade
  searchLocalidade(fieldName: string): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'localidade,descricao';
    proc.tabela = 'localidade';
    proc.campo = 'localidade';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'localidade,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'localidade asc';
    proc.origem = 'Localidade';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const patchValue: any = {};
        patchValue[fieldName] = resultado.localidade || resultado.descricao;
        this.fichaForm.patchValue(patchValue);
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para centro de treino
  searchCentroTreino(): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'centro,descricao';
    proc.tabela = 'centro';
    proc.campo = 'centro';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'centro,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'centro asc';
    proc.origem = 'Centro';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.fichaForm.patchValue({
          centroTreino: resultado.centro || resultado.descricao
        });
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para curso
  searchCurso(fieldName: string): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'curso,descricao';
    proc.tabela = 'curso';
    proc.campo = 'curso';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'curso,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'curso asc';
    proc.origem = 'Curso';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const patchValue: any = {};
        patchValue[fieldName] = resultado.curso || resultado.descricao;
        this.fichaForm.patchValue(patchValue);
        this.cdr.detectChanges();
      }
    });
  }

  // Métodos de pesquisa para especialidade
  searchEspecialidade(fieldName: string): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'especialidade,descricao';
    proc.tabela = 'especialidade';
    proc.campo = 'especialidade';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'especialidade,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'especialidade asc';
    proc.origem = 'Especialidade';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const patchValue: any = {};
        patchValue[fieldName] = resultado.especialidade || resultado.descricao;
        this.fichaForm.patchValue(patchValue);
        this.cdr.detectChanges();
      }
    });
  }

  // Specific search methods for documents
  searchTipoDocumento(index: number): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'tipodocumento,descricao';
    proc.tabela = 'tipodocumento';
    proc.campo = 'tipodocumento';
    proc.campo1 = 'descricao';
    proc.camposseleccionados = 'tipodocumento,descricao';
    proc.referencia = '';
    proc.alunoestamp = 'tipodocumento asc';
    proc.origem = 'Tipo';
    proc.descricao = 'Descrição';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const docControl = this.docFormArray.at(index);
        docControl.patchValue({
          tipoDocumento: resultado.tipodocumento || resultado.descricao || resultado.codigo
        });
        this.cdr.detectChanges();
      }
    });
  }

  searchLocalEmissao(index: number): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = 'provincia,distrito';
    proc.tabela = 'provincia';
    proc.campo = 'provincia';
    proc.campo1 = 'distrito';
    proc.camposseleccionados = 'provincia,distrito';
    proc.referencia = '';
    proc.alunoestamp = 'provincia asc';
    proc.origem = 'Província';
    proc.descricao = 'Distrito';

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const docControl = this.docFormArray.at(index);
        docControl.patchValue({
          localemissao: resultado.provincia || resultado.distrito || resultado.descricao
        });
        this.cdr.detectChanges();
      }
    });
  }

  // Search and helper methods
  onSearchClick(campos: string): void {
    // Implementation for search functionality
    console.log('Searching with fields:', campos);
  }

  onSearchGenericClick(
    campos: string,
    tabela: string,
    titulos: string,
    condicao: string,
    mapeamento: any
  ): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = campos;
    proc.tabela = tabela;
    proc.campo = campos.split(',')[0];
    proc.campo1 = campos.split(',')[1] || '';
    proc.camposseleccionados = campos;
    proc.referencia = condicao;
    proc.alunoestamp = `${proc.campo} asc`;

    // Define origem e descrição baseado na tabela
    switch(tabela.toLowerCase()) {
      case 'tipodocumento':
        proc.origem = 'Tipo';
        proc.descricao = 'Descrição';
        break;
      case 'provincia':
        proc.origem = 'Província';
        proc.descricao = 'Distrito';
        break;
      default:
        proc.origem = 'Código';
        proc.descricao = 'Descrição';
        break;
    }

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado && mapeamento) {
        // Aqui você pode implementar a lógica específica para preencher os campos
        // baseado no resultado e no mapeamento fornecido
        console.log('Resultado da pesquisa:', resultado);
        console.log('Mapeamento:', mapeamento);

        // Exemplo de como usar - você pode personalizar conforme necessário
        if (tabela === 'tipodocumento' && this.selectedDocIndex !== null) {
          const docControl = this.docFormArray.at(this.selectedDocIndex);
          docControl.patchValue({
            tipoDocumento: resultado[mapeamento.tipoDocumento] || resultado.tipodocumento
          });
        } else if (tabela === 'provincia' && this.selectedDocIndex !== null) {
          const docControl = this.docFormArray.at(this.selectedDocIndex);
          docControl.patchValue({
            localemissao: resultado[mapeamento.provincia] || resultado.provincia
          });
        }
      }
    });
  }

  // Import/Export methods
  exportarFichaMilitar(): void {
    const dadosExportacao = this.fichaForm.value;
    console.log('Exporting military record:', dadosExportacao);
    // Implementation for export functionality
  }

  importarFichaMilitar(file: File): void {
    console.log('Importing military record from file:', file);
    // Implementation for import functionality
  }

  // Print methods
  imprimirFicha(): void {
    console.log('Printing military record');
    // Implementation for print functionality
  }

  // Validation methods
  validarNIM(): boolean {
    const nim = this.fichaForm.get('nim')?.value;
    if (!nim || nim <= 0) {
      Swal.fire('Erro!', 'NIM deve ser um número válido maior que zero.', 'error');
      return false;
    }
    return true;
  }

  validarNome(): boolean {
    const nome = this.fichaForm.get('nome')?.value;
    if (!nome || nome.trim().length < 3) {
      Swal.fire('Erro!', 'Nome deve ter pelo menos 3 caracteres.', 'error');
      return false;
    }
    return true;
  }

  validarFormulario(): boolean {
    if (!this.validarNIM() || !this.validarNome()) {
      return false;
    }

    // Additional validations can be added here
    return true;
  }

  // Método para procurar militar por NIM ou Nome - similar ao getestudante do FrmFt
  getMilitar(campo: string): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = campo;
    proc.tabela = 'mil';
    proc.campo = campo.split(',')[0];
    proc.campo1 = campo.split(',')[1];
    proc.camposseleccionados = campo;
    proc.referencia = '';
    proc.alunoestamp = `${proc.campo} asc`;

    switch(proc.campo.toLowerCase()) {
      case 'nome':
        proc.origem = 'Nome';
        proc.descricao = 'NIM';
        break;
      case 'nim':
        proc.origem = 'NIM';
        proc.descricao = 'Nome';
        break;
      default:
        proc.origem = 'Código';
        proc.descricao = 'Nome';
        break;
    }

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        // Preenche os campos com os dados do militar selecionado
        this.fichaForm.patchValue({
          nim: resultado.nim,
          nome: resultado.nome
        });

        // Busca dados completos do militar
        this.auth.GetEntityWithChildren(resultado.milstamp, 'Mil', 'milstamp').subscribe(
          (militar: any) => {
            if (militar) {
              this.loadMilitarData(militar);
            }
          },
          (error: any) => {
            console.error('Erro ao carregar dados do militar:', error);
            Swal.fire('Erro!', 'Erro ao carregar dados completos do militar.', 'error');
          }
        );
      }
    });
  }

  // Método para procurar na lista geral - similar ao onSearchClick do FrmFt
  onMilitarSearchClick(campo: string): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = campo;
    proc.tabela = 'mil';
    proc.campo = campo.split(',')[0];
    proc.campo1 = campo.split(',')[1];
    proc.camposseleccionados = campo;
    proc.referencia = '';
    proc.alunoestamp = 'nome asc';

    switch(proc.campo.toLowerCase()) {
      case 'nim':
        proc.origem = 'NIM';
        proc.descricao = 'Nome';
        break;
      case 'nome':
        proc.descricao = 'NIM';
        proc.origem = 'Nome';
        break;
      default:
        proc.origem = 'Código';
        proc.descricao = 'Descrição';
        break;
    }

    const dialogRef = this.dialog.open(Proc2Component, {
      width: '800px',
      data: proc
    });

    dialogRef.afterClosed().subscribe((selectedMilitar) => {
      if (selectedMilitar) {
        // Carrega os dados completos do militar selecionado
        this.auth.GetEntityWithChildren(selectedMilitar.milstamp, 'Mil', 'milstamp').subscribe(
          (militar: any) => {
            if (militar) {
              this.loadMilitarData(militar);
            }
          },
          (error: any) => {
            console.error('Erro ao carregar militar:', error);
            Swal.fire('Erro!', 'Erro ao carregar dados do militar.', 'error');
          }
        );
      }
    });
  }

  // Método auxiliar para carregar dados do militar no formulário
  private loadMilitarData(militar: any): void {
    try {
      this.fichaForm.patchValue({
        nim: militar.nim,
        nome: militar.nome,
        situacaoAtual: militar.situacaoAtual || 'Ativo', // Carrega situação ou define como Ativo por padrão
        bi: militar.bi,
        datanascimento: militar.datanascimento ? new Date(militar.datanascimento) : null,
        estadocivil: militar.estadocivil,
        pai: militar.pai,
        mae: militar.mae,
        naturalidade: militar.naturalidade,
        nacionalidade: militar.nacionalidade,
        religiao: militar.religiao,
        profissao: militar.profissao,
        habilitacoes: militar.habilitacoes,
        nivelacademico: militar.nivelacademico,
        observacoes: militar.observacoes,
        telefone: militar.telefone,
        telemovel: militar.telemovel,
        email: militar.email,
        skype: militar.skype,
        facebook: militar.facebook,
        endereco: militar.endereco,
        cidade: militar.cidade,
        provincia: militar.provincia,
        codigopostal: militar.codigopostal,
        pais: militar.pais,
        gruposanguineo: militar.gruposanguineo,
        altura: militar.altura,
        peso: militar.peso,
        doencascronicas: militar.doencascronicas,
        alergias: militar.alergias,
        limitacoesfisicas: militar.limitacoesfisicas
      });

      // Carrega arrays relacionados se existirem
      if (militar.milCartoes) {
        this.loadArrayData('cartoes', militar.milCartoes);
      }
      if (militar.milCursos) {
        this.loadArrayData('cursos', militar.milCursos);
      }
      // ... outros arrays podem ser carregados aqui

      Swal.fire('Sucesso!', 'Dados do militar carregados com sucesso.', 'success');
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Swal.fire('Erro!', 'Erro ao processar dados do militar.', 'error');
    }
  }

  // Método auxiliar para carregar dados de arrays
  private loadArrayData(arrayName: string, data: any[]): void {
    const formArray = this.fichaForm.get(arrayName) as FormArray;
    formArray.clear();

    data.forEach(item => {
      const group = this.fb.group(item);
      formArray.push(group);
    });
  }

  // Métodos para captura de foto
  openPhotoCapture(): void {
    const dialogRef = this.dialog.open(PhotoCaptureComponent, {
      width: '700px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: false,
      data: {
        existingPhoto: this.militarPhoto
      }
    });

    dialogRef.afterClosed().subscribe((photoData: string) => {
      if (photoData) {
        this.militarPhoto = photoData;
        // Adiciona a foto ao formulário se houver um campo específico para isso
        // this.fichaForm.patchValue({ foto: photoData });
        this.auth.showSnackBar('Foto capturada com sucesso!');
        this.cdr.detectChanges();
      }
    });
  }

  removePhoto(): void {
    this.militarPhoto = undefined;
    // Remove a foto do formulário se houver um campo específico para isso
    // this.fichaForm.patchValue({ foto: '' });
    this.auth.showSnackBar('Foto removida');
    this.cdr.detectChanges();
  }
}
