// Removed duplicate and misplaced property declarations. All properties are declared inside the class below.


import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
  Email,
  Mil,
  MilAgre, MilConde, MilDoc, MilEmail,
  MilEspecial, MilFa, MilFor, MilFuncao, MilLingua,
  MilProm, MilReg,
  MilSit, MilSitCrim,
  MilSitDisc,
  MilSitQPActivo,
  Telefone
} from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ModalCondeMilitarComponent } from './modal-conde-militar/modal-conde-militar.component';

import { ModalAgregadoFamiliarComponent } from '../modal-agregado-familiar/modal-agregado-familiar.component';
import { ModalSaudeMilitarComponent } from '../modal-saude-militar/modal-saude-militar.component';
import { ModalDocumentoMilitarComponent } from './modal-documento-militar/modal-documento-militar.component';
import { ModalEmailMilitarComponent } from './modal-email-militar/modal-email-militar.component';
import { ModalEspecialMilitarComponent } from './modal-especial-militar/modal-especial-militar.component';
import { ModalForMilitarComponent } from './modal-for-militar/modal-for-militar.component';
import { ModalFuncaoMilitarComponent } from './modal-funcao-militar/modal-funcao-militar.component';
import { ModalLinguaMilitarComponent } from './modal-lingua-militar';
import { ModalMilfaComponent } from './modal-milfa/modal-milfa.component';
import { ModalPromMilitarComponent } from './modal-prom-militar/modal-prom-militar.component';
import { ModalRegMilitarComponent } from './modal-reg-militar/modal-reg-militar.component';
import { ModalSitCrimMilitarComponent } from './modal-sitcrim-militar/modal-sitcrim-militar.component';
import { ModalSitDiscMilitarComponent } from './modal-sitdisc-militar/modal-sitdisc-militar.component';
import { ModalSitQPActivoMilitarComponent } from './modal-sitqpactivo-militar/modal-sitqpactivo-militar.component';
import { ModalTelefoneMilitarComponent } from './modal-telefone-militar/modal-telefone-militar.component';
import { UcFichaMilitarModule } from './uc-ficha-militar.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@env/environment';

export function minLengthArray(min: number): ValidatorFn {
  return (c: AbstractControl) => {
    if (c instanceof FormArray) {
      return c.length >= min ? null : { minLengthArray: { valid: false } };
    }
    return null;
  };
}

@Component({
// Place these as class properties only
  selector: 'app-uc-ficha-militar',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatTooltipModule,
    HttpClientModule,
    UcFichaMilitarModule
  ],
  providers: [
    TablesRemoteDataService,
  ],
  templateUrl: './uc-ficha-militar.component.html',
  styleUrl: './uc-ficha-militar.component.scss'
})
export class UcFichaMilitarComponent implements OnInit, AfterViewInit {
  // Calcula idade a partir da data de nascimento
  // Seleciona registro de saúde
  selectSaude(index: number): void {
    this.selectedSaIndex = index;
  }
  selectObito(index: number): void {
    this.selectedObitoIndex = index;
  }
  // Edita registro de saúde

  editSaude(index: number): void {
  const saude = this.saFormArray.at(index)?.value;
  if (!saude) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Registro de saúde não encontrado.'
    });
    return;
  }
  const dialogRef = this.dialog.open(ModalSaudeMilitarComponent, {
    width: '800px',
    data: {
      saude,
      milStamp: this.fichaForm.get('milStamp')?.value || '',
      isEdit: true, ...this.getMilitarInfo()
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.saFormArray.at(index).patchValue(result);
      this.selectedSaIndex = index;
    }
  });
}
  editMilfa(index: number): void {


  const fa = this.milFaFormArray.at(index)?.value;
  if (!fa  ) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Registro de óbito não encontrado.'
    });
    return;
  }
  const dialogRef = this.dialog.open(ModalMilfaComponent, {
    width: '800px',
    data: {
     fa,
      milStamp: this.fichaForm.get('milStamp')?.value || '',
      isEdit: true, ...this.getMilitarInfo()
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.milFaFormArray.at(index).patchValue(result);
      this.selectedObitoIndex = index;
    }
  });
}
 removerObito(index: number): void {
    this.removerItem('milFa', index, 'selectedObitoIndex');
  }
  ngOnInit(): void {
    // Subscribe to treino date changes for duration calculation
    this.fichaForm.get('inicioTreino')?.valueChanges.subscribe(() => this.updateDuracaoTreino());
    this.fichaForm.get('terminoTreino')?.valueChanges.subscribe(() => this.updateDuracaoTreino());
    this.loadRamos();
  }
  ramoDisplay(ramo: any): string {
    return ramo && ramo.descricao ? ramo.descricao : '';
  }
  centroTreinoOptions: string[] = [];
  cursoTreinoOptions: string[] = [];
  filteredCentroTreino!: Observable<string[]>;
  filteredCursoTreino!: Observable<string[]>;
  updateDuracaoTreino(): void {
    const inicio = this.fichaForm.get('inicioTreino')?.value;
    const termino = this.fichaForm.get('terminoTreino')?.value;
    if (inicio && termino) {
      const start = new Date(inicio);
      const end = new Date(termino);
      const diffMs = end.getTime() - start.getTime();
      if (diffMs > 0) {
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffMonths / 12);
        let duracao = '';
        if (diffYears > 0) duracao += `${diffYears} ano(s) `;
        if (diffMonths % 12 > 0) duracao += `${diffMonths % 12} mês(es) `;
        if (diffDays % 30 > 0) duracao += `${diffDays % 30} dia(s)`;
        this.fichaForm.get('duracaoTreino')?.setValue(duracao.trim());
      } else {
        this.fichaForm.get('duracaoTreino')?.setValue('');
      }
    } else {
      this.fichaForm.get('duracaoTreino')?.setValue('');
    }
  }

  filteredEspecialidade!: Observable<string[]>;

  fichaForm: FormGroup;
  formState: 'cancel' | 'insert' | 'update' = 'cancel';
  formTitle: string = 'Ficha Militar';
 // militarPhoto?: string; // Propriedade para armazenar a foto do militar

 militarPhoto: SafeResourceUrl | null = null;imageUrl!: string;


  displayTitle: string = this.formTitle;
  isEditing: boolean = false;
  isDocumentLoaded: boolean = false;
  editando: boolean = false;

  // Columns for different tables
  agreColumns: string[] = ['nome', 'grau', 'nascData', 'telefone', 'actions'];
  condeColumns: string[] = ['galardoa', 'especie', 'grauMedalha', 'dataGalardoacao', 'actions'];
  docColumns: string[] = ['tipoDocumento', 'numeroDoc', 'localemissao', 'dataemissao', 'datavalid', 'actions'];
  emailColumns: string[] = ['email', 'actions'];
  emforColumns: string[] = ['curso', 'instituicao', 'dataInicio', 'dataTermino', 'actions'];
  especialColumns: string[] = ['especial', 'subEspecial', 'dataEspecial', 'actions'];
  forColumns: string[] = ['curso', 'instituicao', 'dataInicio', 'dataTermino', 'actions'];
  funcaoColumns: string[] = ['funcao', 'orgao','unidade', 'dataInicio', 'dataTermino', 'obs', 'actions'];
  liceColumns: string[] = ['licenca', 'licencaData', 'dataTermino', 'duracao', 'actions'];
  linguaColumns: string[] = ['lingua', 'fala', 'leitura', 'escrita', 'materna', 'actions'];
  peEmergColumns: string[] = ['nome', 'grau', 'telefone', 'resBairro', 'actions'];
  promColumns: string[] = ['categoria', 'patente', 'tipoPromocao', 'dataOS', 'actions'];
  reaColumns: string[] = ['destino', 'dataOS', 'numOS', 'actions'];
  // recoColumns: string[] = ['tipoDistincao', 'orgao', 'data', 'motivo', 'actions']; // Tabela não implementada ainda
  regColumns: string[] = ['regime', 'dataReg', 'numOS', 'actions'];
  retReaSalColumns: string[] = ['sal', 'retencaoData', 'reactivacaoData', 'actions'];
  saColumns: string[] = ['doencaSofre', 'datainicioDoenca', 'motivoDoenca', 'actions'];
  sitColumns: string[] = ['situacao', 'dataOS', 'numOS', 'actions'];
  sitCrimColumns: string[] = ['orgao', 'infraccao', 'numProcesso', 'pena', 'actions'];
  sitDiscColumns: string[] = ['orgao', 'infracao', 'medTomadas', 'dataInicioMedida', 'actions'];
  sitQPActivoColumns: string[] = ['dataInicio', 'dataTermino', 'motivo', 'actions'];
  telefoneColumns: string[] = ['telefone1', 'actions'];
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
  MilfaDataSource: any[] = [];

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

  selectedObitoIndex: number | null = null;

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
  localEmissaoOptions: string[] = [];
  centroInstrucaoOptions: string[] = [];
  designacaoCursoOptions: string[] = [];
  nacionalidadesOptions: string[] = [];

  // Country options for different contexts
  paisesNascOptions: string[] = [];
  paisesResOptions: string[] = [];
  paisesIncOptions: string[] = [];

  // Propriedades para dados de localização já existem no componente

  // Location data
  provinciasNasc: string[] = [];
  distritosNasc: string[] = [];
  postosNasc: string[] = [];
  locaisNasc: string[] = [];

  provinciasRes: string[] = [];
  distritosRes: string[] = [];
  postosRes: string[] = [];
  locaisRes: string[] = [];

  // Data from Busca table (by numTabela)
  allBuscaData: selects[] = []; // Cache completo dos dados da tabela Busca
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
  selectNacionalidades: selects[] = [];
  selectRamos: selects[] = [];

  // Location data from database
  selectPaises: selects[] = [];  // Adicionamos a lista de países
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
  provinciasOptions: string[] = []; // Lista geral de províncias

  // Opções específicas por tipo (nasc/res/inc)
  nascProvinciaOptions: string[] = [];
  resProvinciaOptions: string[] = [];
  incProvinciaOptions: string[] = [];

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
  filteredNacionalidades!: Observable<string[]>;
  filteredRamos!: Observable<any[]>;

  // Country filtered observables
  filteredPaisesNasc!: Observable<string[]>;
  filteredPaisesRes!: Observable<string[]>;
  filteredPaisesInc!: Observable<string[]>;

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

  get milFaFormArray(): FormArray {
    return this.fichaForm?.get('milFa') as FormArray || this.fb.array([]);
  }
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private auth: AuthService,
    private remoteSrv: TablesRemoteDataService,
    private sanitizer: DomSanitizer
  ) {
    this.fichaForm = this.generateFormGroup();

    // Load provinces from database
    this.loadProvincias();

    // Load all Busca table data once for better performance
    // This replaces multiple individual API calls with parallel requests
    this.loadAllBuscaData();

    // Load country data
    this.loadPaises();               // Carregar países para campos de país
    this.loadNacionalidades();       // Carregar nacionalidades da tabela país

    // Initialize filtered observables for autocomplete
    this.initializeAutocompleteFilters();

    // Defer state setting to next tick to avoid assertion error
    setTimeout(() => {
      this.setFormState('cancel');
    }, 0);
  }

  /**
   * Recarrega todos os dados do formulário
   */
  reloadFormData(): void {
   // Load provinces from database
    this.loadProvincias();

    // Load all Busca table data once for better performance
    // This replaces multiple individual API calls with parallel requests
    this.loadAllBuscaData();

    // Load country data
    this.loadPaises();               // Carregar países para campos de país
    this.loadNacionalidades();       // Carregar nacionalidades da tabela país

    // Initialize filtered observables for autocomplete
    this.initializeAutocompleteFilters();

  }

  /**
   * Inicializa todos os campos de data no formulário com o formato ISO
   */
  initializeDateFieldsWithISOFormat(): void {
    // Usar a data atual para novas fichas, ou a data atual apenas para formato em atualizações
    const hojeStr = this.formatDateToISO(new Date()); // Formato YYYY-MM-DD

    // Lista de campos de data no formulário principal
    const dateFields = [
      'nascData', 'dataCasamento', 'incData', 'inicioTreino', 'terminoTreino',
      'inseriuDataHora', 'alterouDataHora'
    ];

    // Inicializa os campos de data com formato ISO
    dateFields.forEach(field => {
      const control = this.fichaForm.get(field);
      if (control) {
        // Se for um novo registro, definir com a data atual
        // Se for atualização e o campo já tiver valor, converter para formato ISO
        if (this.formState === 'insert') {
          control.setValue(hojeStr);
        } else if (control.value) {
          // Converte qualquer data existente para formato ISO
          try {
            control.setValue(this.formatDateToISO(control.value));
          } catch (e) {
            console.warn(`Erro ao converter data para campo ${field}:`, e);
          }
        }
      }
    });

    // Inicializa campos de data em grupos aninhados
    const milFaGroup = this.fichaForm.get('milFa');
    if (milFaGroup) {
      const milFaDateFields = ['falecData', 'enterroData'];
      milFaDateFields.forEach(field => {
        const control = this.fichaForm.get(`milFa.${field}`);
        if (control) {
          if (this.formState === 'insert') {
            control.setValue(hojeStr);
          } else if (control.value) {
            try {
              control.setValue(this.formatDateToISO(control.value));
            } catch (e) {
              console.warn(`Erro ao converter data para campo milFa.${field}:`, e);
            }
          }
        }
      });
    }
  }

  ngAfterViewInit(): void {
    // Defer initialization to avoid assertion errors in development
    setTimeout(() => {
      this.ngZone.run(() => {
        this.updateAllDataSources();
        this.fichaForm.disable();
        this.fichaForm.get('procBi')?.enable();
        this.isEditing = false;
        this.cdr.detectChanges();
      });
    }, 0);
  }

  initializeAutocompleteFilters(): void {
    // Centro Treino autocomplete (Busca numTabela=6)
    const centroTreinoControl = this.fichaForm.get('centroTreino');
    if (centroTreinoControl) {
      this.filteredCentroTreino = centroTreinoControl.valueChanges.pipe(
        startWith(centroTreinoControl.value || ''),
        switchMap((value: string) => {
          const se = {
            tabela: 'Busca',
            campo1: 'descricao',
            campo2: 'codBusca',
            condicao: 'numTabela=6',
            campochave: 'descricao'
          };
          return this.remoteSrv.getSelection(se).pipe(
            map((response: any) => {
              if (response?.sucesso && response?.dados?.selects) {
                return response.dados.selects
                  .map((item: any) => item.descricao)
                  .filter((nome: string) => nome && typeof nome === 'string' && nome.trim() !== '');
              }
              return [];
            }),
            map((options: string[]) => this._filter(value || '', options))
          );
        })
      );
    }

    // Curso Treino autocomplete (Busca numTabela=7)
    const cursoTreinoControl = this.fichaForm.get('cursoTreino');
    if (cursoTreinoControl) {
      this.filteredCursoTreino = cursoTreinoControl.valueChanges.pipe(
        startWith(cursoTreinoControl.value || ''),
        switchMap((value: string) => {
          const se = {
            tabela: 'Busca',
            campo1: 'descricao',
            campo2: 'codBusca',
            condicao: 'numTabela=7',
            campochave: 'descricao'
          };
          return this.remoteSrv.getSelection(se).pipe(
            map((response: any) => {
              if (response?.sucesso && response?.dados?.selects) {
                return response.dados.selects
                  .map((item: any) => item.descricao)
                  .filter((nome: string) => nome && typeof nome === 'string' && nome.trim() !== '');
              }
              return [];
            }),
            map((options: string[]) => this._filter(value || '', options))
          );
        })
      );
    }
    // Especialidade autocomplete depends on ramo
    const especialidadeControl = this.fichaForm.get('adquirEspecial');
    const ramoControl = this.fichaForm.get('ramo');
    if (especialidadeControl && ramoControl) {
      this.filteredEspecialidade = especialidadeControl.valueChanges.pipe(
        startWith(especialidadeControl.value || ''),
        switchMap((value: string) => {
          const ramoValue = ramoControl.value;
          if (!ramoValue) {
            return of([]);
          }
          // Fetch especialidade options from tabela especial filtered by ramo
          const se = {
            tabela: 'Especial',
            campo1: 'descricao',
            campo2: 'codEspecial',
            condicao: `ramo='${ramoValue}'`,
            campochave: 'descricao'
          };
          return this.remoteSrv.getSelection(se).pipe(
            map((response: any) => {
              if (response?.sucesso && response?.dados?.selects) {
                return response.dados.selects
                  .map((item: any) => item.descricao)
                  .filter((nome: string) => nome && typeof nome === 'string' && nome.trim() !== '');
              }
              return [];
            }),
            map((options: string[]) => this._filter(value || '', options))
          );
        })
      );
    }
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

    const nacionalControl = this.fichaForm.get('nacional');
    if (nacionalControl) {
      this.filteredNacionalidades = nacionalControl.valueChanges.pipe(
        startWith(nacionalControl.value || ''),
        map(value => this._filter(value || '', this.nacionalidadesOptions))
      );
    }

    // ramoControl already declared above for especialidade
    if (ramoControl) {
      this.filteredRamos = ramoControl.valueChanges.pipe(
        startWith(ramoControl.value || ''),
  map(value => (this.selectRamos || []).filter((r: any) => r.descricao.toLowerCase().includes((value || '').toLowerCase())))
      );
    }

    // These will be handled per form array item - initialize with empty observables
    this.filteredTipoTelefone = new Observable();
    this.filteredFala = new Observable();
    this.filteredLeitura = new Observable();
    this.filteredEscrita = new Observable();
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
    try {
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
      } else {
        console.warn('Controle não encontrado para limpeza:', controlName);
      }
    } catch (error) {
      console.warn('Erro ao limpar seleção:', error);
    }
  }

  clearSelectionWithReset(controlName: string, autocomplete: any): void {
    // Centro Treino clear
    if (controlName === 'centroTreino') {
      this.fichaForm.get('centroTreino')?.setValue('');
      if (autocomplete && autocomplete.isOpen) {
        autocomplete.closePanel();
      }
      return;
    }
    // Curso Treino clear
    if (controlName === 'cursoTreino') {
      this.fichaForm.get('cursoTreino')?.setValue('');
      if (autocomplete && autocomplete.isOpen) {
        autocomplete.closePanel();
      }
      return;
    }
    // Especialidade clear
    if (controlName === 'adquirEspecial') {
      this.fichaForm.get('adquirEspecial')?.setValue('');
      if (autocomplete && autocomplete.isOpen) {
        autocomplete.closePanel();
      }
      return;
    }
    // Generic clear with reset
    try {
      const control = this.fichaForm.get(controlName);
      if (control) {
        control.setValue('', { emitEvent: true });
        control.markAsTouched();
        control.updateValueAndValidity();
        if (autocomplete && autocomplete.isOpen) {
          autocomplete.closePanel();
        }
        this.reinitializeSpecificFilter(controlName);
        this.cdr.detectChanges();
        setTimeout(() => {
          if (autocomplete && !autocomplete.isOpen) {
            autocomplete.openPanel();
          }
        }, 100);
      } else {
        console.warn('Controle não encontrado para reset:', controlName);
      }
    } catch (error) {
      console.warn('Erro ao limpar seleção com reset:', error);
    }
  }

  // Método específico para limpar localizações com cascata
  clearLocationSelection(controlName: string, type: 'nasc' | 'res' | 'inc'): void {
    try {
      const control = this.fichaForm.get(controlName);
      if (control) {
        control.setValue('', { emitEvent: false });
        control.markAsTouched();
        control.updateValueAndValidity();

        // Clear dependent fields based on which field is being cleared
        if (controlName.includes('Pais')) {
          // Clearing country - clear all dependents including province
          if (type === 'nasc') {
            this.nascProvinciaOptions = [];
            this.nascDistritoOptions = [];
            this.nascPostoOptions = [];
            this.nascLocalidadeOptions = [];
            this.fichaForm.get('nascProv')?.setValue('', { emitEvent: false });
            this.fichaForm.get('nascDist')?.setValue('', { emitEvent: false });
            this.fichaForm.get('nascPosto')?.setValue('', { emitEvent: false });
            this.fichaForm.get('nascLocal')?.setValue('', { emitEvent: false });
          } else if (type === 'res') {
            this.resProvinciaOptions = [];
            this.resDistritoOptions = [];
            this.resPostoOptions = [];
            this.resLocalidadeOptions = [];
            this.fichaForm.get('resProv')?.setValue('', { emitEvent: false });
            this.fichaForm.get('resDist')?.setValue('', { emitEvent: false });
            this.fichaForm.get('resPosto')?.setValue('', { emitEvent: false });
            this.fichaForm.get('resLocalidade')?.setValue('', { emitEvent: false });
          } else if (type === 'inc') {
            this.incProvinciaOptions = [];
            this.incDistritoOptions = [];
            this.incPostoOptions = [];
            this.incLocalidadeOptions = [];
            this.fichaForm.get('incProv')?.setValue('', { emitEvent: false });
            this.fichaForm.get('incDist')?.setValue('', { emitEvent: false });
            this.fichaForm.get('incPosto')?.setValue('', { emitEvent: false });
            this.fichaForm.get('incLocal')?.setValue('', { emitEvent: false });
          }
        } else if (controlName.includes('Prov')) {
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
      } else {
        console.warn('Controle não encontrado para limpeza de localização:', controlName);
      }
    } catch (error) {
      console.warn('Erro ao limpar seleção de localização:', error);
    }
  }

  // Função para display no autocomplete
  displayFunction = (value: string): string => {
    return value || '';
  };

  // Método chamado quando uma opção é selecionada
  onOptionSelected(controlName: string, event: any): void {
    try {
      if (!event || !event.option || event.option.value === undefined) {
        console.warn('Evento de seleção inválido:', event);
        return;
      }
      const control = this.fichaForm.get(controlName);
      if (control) {
        if (controlName === 'ramo') {
          const ramoObj = this.selectRamos.find(r => r.descricao === event.option.value);
          control.setValue(ramoObj || event.option.value);
          // Chama atualização das especialidades imediatamente
          this.updateEspecialidadesByRamo(ramoObj || event.option.value);
        } else {
          control.setValue(event.option.value || '');
        }
        control.markAsTouched();
        control.updateValueAndValidity();
        this.cdr.detectChanges();
      } else {
        console.warn('Controle não encontrado:', controlName);
      }
    } catch (error) {
      console.warn('Erro ao processar seleção de opção:', error);
    }
  }

  // Atualiza especialidades filtrando pelo ramo selecionado
  updateEspecialidadesByRamo(ramo: any): void {
    const especialidadeControl = this.fichaForm.get('adquirEspecial');
    if (especialidadeControl) {
      let ramoValue = ramo;
      if (ramoValue && typeof ramoValue === 'object' && ramoValue.descricao) {
        ramoValue = ramoValue.descricao;
      }
      this.filteredEspecialidade = especialidadeControl.valueChanges.pipe(
        startWith(especialidadeControl.value || ''),
        switchMap((value: string) => {
          if (!ramoValue) {
            return of([]);
          }
          const se = {
            tabela: 'Especial',
            campo1: 'descricao',
            campo2: 'codEspecial',
            condicao: `ramo='${ramoValue}'`,
            campochave: 'descricao'
          };
          return this.remoteSrv.getSelection(se).pipe(
            map((response: any) => {
              if (response?.sucesso && response?.dados?.selects) {
                return response.dados.selects
                  .map((item: any) => item.descricao)
                  .filter((nome: string) => nome && typeof nome === 'string' && nome.trim() !== '');
              }
              return [];
            }),
            map((options: string[]) => this._filter(value || '', options))
          );
        })
      );
    }
  }

  clearArrayControlSelection(arrayName: string, index: number, controlName: string): void {
    try {
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
        } else {
          console.warn('Controle não encontrado no array:', controlName);
        }
      } else {
        console.warn('Array ou índice inválido:', arrayName, index);
      }
    } catch (error) {
      console.warn('Erro ao limpar seleção do array:', error);
    }
  }

  // Método específico para limpar campos de autocomplete na tabela de documentos
  clearDocumentFieldWithReset(index: number, fieldName: string, autocomplete: any): void {
    const control = this.docFormArray.at(index).get(fieldName);
    if (control) {
      // Limpa o valor
      control.setValue('', { emitEvent: true });
      control.markAsTouched();
      control.updateValueAndValidity();

      // Fecha o painel do autocomplete se estiver aberto
      if (autocomplete && autocomplete.isOpen) {
        autocomplete.closePanel();
      }

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

  clearNacionalidade(): void {
    this.clearSelection('nacional');
  }

  clearRamo(): void {
    this.clearSelection('ramo');
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
          // Nota: Adicionar filteredRegCasamento às propriedades da classe se necessário
        }
        break;
      }
      case 'nacional':
        this.filteredNacionalidades = this.fichaForm.get('nacional')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.nacionalidadesOptions))
        );
        break;
      case 'ramo':
        this.filteredRamos = this.fichaForm.get('ramo')!.valueChanges.pipe(
          startWith(''),
    map(value => (this.selectRamos || []).filter((r: any) => r.descricao.toLowerCase().includes((value || '').toLowerCase())))
        );
        break;
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

  getFilteredLocalEmissao(control: any): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      map((value: string) => this._filter(value || '', this.localEmissaoOptions))
    );
  }

  // Métodos para carregar dados das tabelas
  loadTipoDocumentoFromBusca(): void {
    if (this.tipoDocumentoOptions.length > 0) {
      // Already loaded
      return;
    }

    const se: condicoesprocura = {
      tabela: 'busca',
      campo1: 'descricao',
      campo2: 'codBusca',
      condicao: 'numTabela=13',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (response: any) => {
        if (response?.sucesso && response?.dados?.selects) {
          const tipos = response.dados.selects
            .map((item: any) => item.descricao)
            .filter((nome: string) => nome && typeof nome === 'string' && nome.trim() !== '');

          if (tipos.length > 0) {
            this.tipoDocumentoOptions = tipos;
          } else {
            this.tipoDocumentoOptions = ['Bilhete de Identidade', 'Passaporte', 'Carta de Condução'];
          }
        } else {
          this.tipoDocumentoOptions = ['Bilhete de Identidade', 'Passaporte', 'Carta de Condução'];
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar tipos de documento:', error);
        this.tipoDocumentoOptions = ['Bilhete de Identidade', 'Passaporte', 'Carta de Condução'];
      }
    });
  }

  loadLocalEmissaoFromProvincia(): void {
    const se: condicoesprocura = {
      tabela: 'Provincia',
      campo1: 'descricao',
      campo2: 'provinciaStamp',
      condicao: '1=1',
      campochave: 'provinciaStamp'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (response: any) => {
        if (response?.sucesso && response?.dados?.selects) {
          this.localEmissaoOptions = response.dados.selects
            .map((item: any) => item.descricao)
            .filter((provincia: any) => provincia);
        } else {
          // Fallback para valores padrão se não houver dados
          this.localEmissaoOptions = ['Luanda', 'Benguela', 'Huambo', 'Lobito', 'Namibe',
                                      'Malanje', 'Sumbe', 'Uige', 'Soyo', 'Cabinda'];
        }
      },
      error: (error: any) => {
        console.error('❌ Erro ao carregar províncias:', error);
        // Fallback para valores padrão em caso de erro
        this.localEmissaoOptions = ['Luanda', 'Benguela', 'Huambo', 'Lobito', 'Namibe',
                                    'Malanje', 'Sumbe', 'Uige', 'Soyo', 'Cabinda'];
      }
    });
  }  // Método para obter opções filtradas excluindo seleções de outros campos similares
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
  loadAllBuscaData(): void {
    const startTime = performance.now(); // Medir performance

    // Array com todas as consultas necessárias
    const queries = [
      { numTabela: 3, target: 'estCivil' },
      { numTabela: 4, target: 'regCasamento' },
      { numTabela: 5, target: 'grupSangue' },
      { numTabela: 6, target: 'centroInstrucao' },
      { numTabela: 7, target: 'designacaoCurso' },
      { numTabela: 8, target: 'lingua' },
      { numTabela: 9, target: 'escrita' },
      { numTabela: 10, target: 'fala' },
      { numTabela: 11, target: 'leitura' },
      { numTabela: 12, target: 'compreensao' },
      { numTabela: 17, target: 'habilitacoes' }
    ];

    console.log(`🚀 [PERFORMANCE] Iniciando carregamento paralelo de ${queries.length} tabelas Busca...`);

    // Criar observables para cada consulta
    const observables = queries.map(query => {
      const se: condicoesprocura = {
        tabela: 'busca',
        campo1: 'descricao',
        campo2: 'codBusca',
        condicao: `numTabela=${query.numTabela}`,
        campochave: 'descricao'
      };

      return this.remoteSrv.getSelection(se).pipe(
        map(data => ({
          target: query.target,
          numTabela: query.numTabela,
          success: data.sucesso,
          data: data.sucesso ? data.dados.selects : []
        })),
        catchError((error: any) => {
          console.error(`❌ Erro ao carregar ${query.target} (numTabela=${query.numTabela}):`, error);
          return of({
            target: query.target,
            numTabela: query.numTabela,
            success: false,
            data: []
          });
        })
      );
    });

    // Executar todas as consultas em paralelo
    forkJoin(observables).subscribe({
      next: (results: any[]) => {
        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`⚡ [PERFORMANCE] Carregamento concluído em ${duration.toFixed(2)}ms`);

        // Processar os resultados
        let successCount = 0;
        let errorCount = 0;

        results.forEach((result: any) => {
          if (result.success && result.data.length > 0) {
            this.processBuscaResult(result.target, result.data);
            successCount++;
          } else {
            this.loadDefaultForTarget(result.target);
            errorCount++;
          }
        });

       // Reinicializar todos os filtros
        this.reinitializeAllBuscaFilters();
      },
      error: (error: any) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        this.loadDefaultBuscaValues();
      }
    });
  }

  /**
   * Processa o resultado de uma consulta específica da tabela Busca
   */
  private processBuscaResult(target: string, data: selects[]): void {
    switch (target) {
      case 'estCivil':
        this.selectEstCivil = data;
        this.estCivilOptions = data.map(e => e.descricao);
        break;
      case 'regCasamento':
        this.selectRegCasamento = data;
        this.regCasamentoOptions = data.map(r => r.descricao);
        break;
      case 'grupSangue':
        this.selectGrupSangue = data;
        this.grupSangueOptions = data.map(g => g.descricao);
        break;
      case 'centroInstrucao':
        this.selectCentroInstrucao = data;
        this.centroInstrucaoOptions = data.map(c => c.descricao);
        break;
      case 'designacaoCurso':
        this.selectDesignacaoCurso = data;
        this.designacaoCursoOptions = data.map(d => d.descricao);
        break;
      case 'lingua':
        this.selectLinguaData = data;
        this.linguaOptions = data.map(l => l.descricao);
        break;
      case 'escrita':
        this.selectEscrita = data;
        this.escritaOptions = data.map(e => e.descricao);
        break;
      case 'fala':
        this.selectFala = data;
        this.falaOptions = data.map(f => f.descricao);
        break;
      case 'leitura':
        this.selectLeitura = data;
        this.leituraOptions = data.map(l => l.descricao);
        break;
      case 'compreensao':
        this.selectCompreensao = data;
        this.compreensaoOptions = data.map(c => c.descricao);
        break;
      // case 'tipoDocumento' - Removido: agora usa loadTipoDocumentoFromBusca()
      // case 'nacionalidades' - Removido: agora usa loadNacionalidades() diretamente da tabela país

      case 'ramos':
        this.selectRamos = data;
  this.selectRamos = data;
        break;
      case 'habilitacoes':
        this.selectHabilitacoes = data;
        this.habilitacoesOptions = data.map(h => h.descricao);
        break;
    }
  }

  /**
   * Carrega valores padrão para um target específico em caso de erro
   */
  private loadDefaultForTarget(target: string): void {
    switch (target) {
      case 'estCivil':
        this.estCivilOptions = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União de Facto'];
        break;
      case 'regCasamento':
        this.regCasamentoOptions = ['Civil', 'Religioso', 'Civil e Religioso'];
        break;
      case 'grupSangue':
        this.grupSangueOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        break;
      case 'centroInstrucao':
        this.centroInstrucaoOptions = ['Centro de Formação 1', 'Centro de Formação 2'];
        break;
      case 'designacaoCurso':
        this.designacaoCursoOptions = ['Curso 1', 'Curso 2'];
        break;
      case 'lingua':
        this.linguaOptions = ['Português', 'Inglês', 'Francês', 'Espanhol'];
        break;
      case 'escrita':
        this.escritaOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
        break;
      case 'fala':
        this.falaOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
        break;
      case 'leitura':
        this.leituraOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
        break;
      case 'compreensao':
        this.compreensaoOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
        break;
      case 'tipoDocumento':
        this.loadTipoDocumentoFromBusca();
        break;
      case 'localEmissao':
        this.loadLocalEmissaoFromProvincia();
        break;
      // case 'nacionalidades' - Removido: agora usa loadNacionalidades() diretamente da tabela país
      case 'ramos':
        this.selectRamos = [
          { descricao: 'Exército', chave: 'Exército', ordem: '1' },
          { descricao: 'Marinha', chave: 'Marinha', ordem: '2' },
          { descricao: 'Força Aérea', chave: 'Força Aérea', ordem: '3' }
        ];
        break;
      case 'habilitacoes':
        this.habilitacoesOptions = [
          '1ª Classe', '2ª Classe', '3ª Classe', '4ª Classe', '5ª Classe', '6ª Classe', '7ª Classe',
          'Ensino Básico (7º ano)', 'Ensino Básico (8º ano)', 'Ensino Básico (9º ano)',
          'Ensino Secundário (10º ano)', 'Ensino Secundário (11º ano)', 'Ensino Secundário (12º ano)',
          'Curso Técnico', 'Curso Profissional', 'Bacharelato', 'Licenciatura', 'Pós-Graduação', 'Mestrado', 'Doutoramento', 'Sem escolaridade'
        ];
        break;
    }
  }

  /**
   * Carrega valores padrão em caso de erro na API
   */
  private loadDefaultBuscaValues(): void {
    // Grupo Sanguíneo
    this.grupSangueOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    // Habilitações Literárias
    this.habilitacoesOptions = [
      '1ª Classe', '2ª Classe', '3ª Classe', '4ª Classe', '5ª Classe', '6ª Classe', '7ª Classe',
      'Ensino Básico (7º ano)', 'Ensino Básico (8º ano)', 'Ensino Básico (9º ano)',
      'Ensino Secundário (10º ano)', 'Ensino Secundário (11º ano)', 'Ensino Secundário (12º ano)',
      'Curso Técnico', 'Curso Profissional', 'Bacharelato', 'Licenciatura', 'Pós-Graduação', 'Mestrado', 'Doutoramento', 'Sem escolaridade'
    ];

    // Estado Civil
    this.estCivilOptions = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União de Facto'];

    // Outras opções com valores básicos
    this.linguaOptions = ['Português', 'Inglês', 'Francês', 'Espanhol'];
    this.falaOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
    this.leituraOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
    this.escritaOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
    this.compreensaoOptions = ['Básico', 'Intermediário', 'Avançado', 'Nativo'];
    this.regCasamentoOptions = ['Civil', 'Religioso', 'Civil e Religioso'];
    this.tipoDocumentoOptions = ['Bilhete de Identidade', 'Passaporte', 'Carta de Condução'];

    // Reinicializar filtros
    this.reinitializeAllBuscaFilters();
  }

  /**
   * Reinicializa todos os filtros relacionados com dados da tabela Busca
   */
  private reinitializeAllBuscaFilters(): void {
    const buscaFields = [
      'grupSangue', 'habiLite', 'estCivil', 'regCasamento', 'tipoDocumento',
      'lingua', 'fala', 'leitura', 'escrita', 'compreensao',
      'centroInstrucao', 'designacaoCurso', 'nacionalidade',
    ];

    buscaFields.forEach(field => {
      this.reinitializeSpecificFilter(field);
    });
  }

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
          const provinciasOptions = this.selectProvincias.map(p => p.descricao);

          // Lista geral
          this.provinciasOptions = provinciasOptions;

          // Listas específicas
          this.nascProvinciaOptions = provinciasOptions;
          this.resProvinciaOptions = provinciasOptions;
          this.incProvinciaOptions = provinciasOptions;
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

          // Reinicializa o filtro das habilitações após o carregamento
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

        // Reinicializa o filtro das habilitações mesmo com valores padrão
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

  loadNacionalidades(): void {
    // Carregar nacionalidades da tabela pais
    const se: condicoesprocura = {
      tabela: 'pais',
      campo1: 'nacional',
      campo2: 'paisStamp',
      condicao: '1=1',
      campochave: 'paisStamp'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectNacionalidades = data.dados.selects;
          this.nacionalidadesOptions = this.selectNacionalidades.map(n => n.descricao);
          this.reinitializeSpecificFilter('nacional');
        }
      },
      error: (e) => {
        console.error('Erro ao carregar nacionalidades:', e);
        this.nacionalidadesOptions = ['Moçambicana', 'Portuguesa', 'Brasileira', 'Sul-africana'];
        this.reinitializeSpecificFilter('nacional');
      }
    });
  }

  loadRamos(): void {
    const se: condicoesprocura = {
      tabela: 'ramo',
      campo1: 'descricao',
      campo2: 'codramo',
      condicao: '1=1',
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectRamos = data.dados.selects;
          // selectRamos already holds the correct array
          this.reinitializeSpecificFilter('ramo');
        }
      },
      error: (e) => {
        console.error('Erro ao carregar ramos militares:', e);
        this.selectRamos = [
          { descricao: 'Exército', chave: 'Exército', ordem: '1' },
          { descricao: 'Marinha', chave: 'Marinha', ordem: '2' },
          { descricao: 'Força Aérea', chave: 'Força Aérea', ordem: '3' }
        ];
        this.reinitializeSpecificFilter('ramo');
      }
    });
  }

  loadPaises(): void {
    // Carregar países da base de dados
    const se: condicoesprocura = {
      tabela: 'pais',
      campo1: 'descricao',
      campo2: 'codPais',
      condicao: '1=1',
      campochave: 'paisStamp'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectPaises = data.dados.selects; // Armazenamos os objetos completos
          const paisesOptions = this.selectPaises.map(p => p.descricao);
          // Use the same options for all country contexts
          this.paisesNascOptions = paisesOptions;
          this.paisesResOptions = paisesOptions;
          this.paisesIncOptions = paisesOptions;
        }
      },
      error: (e) => {
        console.error('Erro ao carregar países:', e);
        const defaultPaises = ['Moçambique', 'Portugal', 'Brasil', 'África do Sul'];
        this.paisesNascOptions = defaultPaises;
        this.paisesResOptions = defaultPaises;
        this.paisesIncOptions = defaultPaises;
      }
    });
  }

  loadProvinciasForPais(paisStamp: string, type: 'nasc' | 'res' | 'inc'): void {
    // Carregamos as províncias para o país com base no paisStamp
    if (paisStamp) {
      // Reutilizamos a lista geral de províncias
      if (this.selectProvincias.length === 0) {
        // Se ainda não temos províncias carregadas, carregamos primeiro
        const se: condicoesprocura = {
          tabela: 'Provincia',
          campo1: 'descricao',
          campo2: 'provinciaStamp',
          condicao: `paisStamp='${paisStamp}'`,
          campochave: 'provinciaStamp'
        };

        this.remoteSrv.getSelection(se).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this.selectProvincias = data.dados.selects;
              const provinciasOptions = this.selectProvincias.map(p => p.descricao);

              // Atribuímos às opções específicas do tipo
              if (type === 'nasc') {
                this.nascProvinciaOptions = provinciasOptions;
              } else if (type === 'res') {
                this.resProvinciaOptions = provinciasOptions;
              } else if (type === 'inc') {
                this.incProvinciaOptions = provinciasOptions;
              }

              // Atualizamos também a lista geral
              this.provinciasOptions = provinciasOptions;

              this.cdr.detectChanges();
            }
          },
          error: (e) => {
            console.error('Erro ao carregar províncias:', e);
          }
        });
      } else {
        // Já temos províncias carregadas, só precisamos atribuir às opções específicas
        const provinciasOptions = this.selectProvincias.map(p => p.descricao);

        if (type === 'nasc') {
          this.nascProvinciaOptions = provinciasOptions;
        } else if (type === 'res') {
          this.resProvinciaOptions = provinciasOptions;
        } else if (type === 'inc') {
          this.incProvinciaOptions = provinciasOptions;
        }

        this.cdr.detectChanges();
      }
    }
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
      tabela: 'PostAdm',
      campo1: 'descricao',
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

  onPaisSelected(pais: string, type: 'nasc' | 'res' | 'inc'): void {
    // Quando um país é selecionado, carregamos as províncias desse país usando paisStamp
    // Primeiro, encontramos o objeto país correspondente à descrição selecionada
    const selectedPais = this.selectPaises.find(p => p.descricao === pais);

    // Clear dependent fields
    if (type === 'nasc') {
      this.fichaForm.get('nascProv')?.setValue('', { emitEvent: false });
      this.fichaForm.get('nascDist')?.setValue('', { emitEvent: false });
      this.fichaForm.get('nascPosto')?.setValue('', { emitEvent: false });
      this.fichaForm.get('nascLocal')?.setValue('', { emitEvent: false });

      // Limpar as opções
      this.nascProvinciaOptions = [];
      this.nascDistritoOptions = [];
      this.nascPostoOptions = [];
      this.nascLocalidadeOptions = [];

      // Carregamos as províncias se encontrarmos o paisStamp
      if (selectedPais) {
        this.loadProvinciasForPais(selectedPais.chave, type);
      }
    } else if (type === 'res') {
      this.fichaForm.get('resProv')?.setValue('', { emitEvent: false });
      this.fichaForm.get('resDist')?.setValue('', { emitEvent: false });
      this.fichaForm.get('resPosto')?.setValue('', { emitEvent: false });
      this.fichaForm.get('resLocalidade')?.setValue('', { emitEvent: false });

      // Limpar as opções
      this.resProvinciaOptions = [];
      this.resDistritoOptions = [];
      this.resPostoOptions = [];
      this.resLocalidadeOptions = [];

      // Carregamos as províncias se encontrarmos o paisStamp
      if (selectedPais) {
        this.loadProvinciasForPais(selectedPais.chave, type);
      }
    } else if (type === 'inc') {
      this.fichaForm.get('incProv')?.setValue('', { emitEvent: false });
      this.fichaForm.get('incDist')?.setValue('', { emitEvent: false });
      this.fichaForm.get('incPosto')?.setValue('', { emitEvent: false });
      this.fichaForm.get('incLocal')?.setValue('', { emitEvent: false });

      // Limpar as opções
      this.incProvinciaOptions = [];
      this.incDistritoOptions = [];
      this.incPostoOptions = [];
      this.incLocalidadeOptions = [];

      // Carregamos as províncias se encontrarmos o paisStamp
      if (selectedPais) {
        this.loadProvinciasForPais(selectedPais.chave, type);
      }
    }

    this.cdr.detectChanges();
  }

  hasDataFuturaError(control: any): boolean {
    if (!control || !control.value) return false;
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    return inputDate > currentDate;
  }

  selectFuncao(index: number): void {
    this.selectedFuncaoIndex = index;
  }
  selectSitCrim(index: number): void {
      this.selectedSitCrimIndex = index;
    }
    selectSitDisc(index: number): void {
      this.selectedSitDiscIndex = index;
    }
  generateFormGroup(): FormGroup {
    return this.fb.group({
      // Basic military information
      milStamp: [''],
      nome: ['', Validators.required],
      nim: [0],
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
      procBi: [''],
      // Residence information
      resPais: [''],
      codResPais: [0],
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
      milDoc: this.fb.array([], minLengthArray(1)),
      milEmail: this.fb.array([]),
      milEmFor: this.fb.array([]),
      milEspecial: this.fb.array([]),
      milFa: this.fb.array([]),
      // milFa: this.fb.group({
      //   milStamp: [''],
      //   codMilFa: [0],
      //   falecData: [''],
      //   falecLocal: [''],
      //   circunstancias: [''],
      //   enterroData: [''],
      //   enterroLocal: [''],
      //   numCampa: [''],
      //   numCertObito: [''],
      //   obs: [''],
      //   inseriu: [''],
      //   inseriuDataHora: [new Date()],
      //   alterou: [''],
      //   alterouDataHora: [new Date()]
      // }),
      milFor: this.fb.array([]),
      milFot: this.fb.array([]),
      milFuncao: this.fb.array([], minLengthArray(1)),
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
      pathbase64:[''],
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
        this.fichaForm.get('procBi')?.enable();
            }
            this.isEditing = false;
            break;
          case 'insert':
            if (this.fichaForm) {
              this.fichaForm.enable();

        this.fichaForm.get('procBi')?.disable();
              // Inicializa campos de data com formato ISO para novas inserções
              this.initializeDateFieldsWithISOFormat();
              this.fichaForm.patchValue({ nascData: new Date(`1900-01-01`).toISOString() });
            }
            this.isEditing = true;
            break;
          case 'update':
            if (this.fichaForm) {
              this.fichaForm.enable();
               this.fichaForm.get('procBi')?.disable();
              // Formata datas existentes para ISO
              this.initializeDateFieldsWithISOFormat();
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

  // Métodos de visibilidade dos botões
  isNewButtonVisible(): boolean {
    return this.formState === 'cancel';
  }

  isEditButtonVisible(): boolean {
    return this.formState === 'cancel' && this.fichaForm.get('nome')?.value;
  }

  isCancelButtonVisible(): boolean {
    return this.formState === 'insert' || this.formState === 'update';
  }

  isSaveButtonVisible(): boolean {
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
    this.fichaForm.get('milStamp')?.setValue(this.auth.Stamp());
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
    const dataIncorporacao = this.fichaForm.get('incData')?.value;
    if (!dataIncorporacao) {
      Swal.fire({
        icon: 'warning',
        title: 'Data de incorporação obrigatória',
        text: 'Indique a data de incorporação antes de salvar a ficha militar.'
      });
      return;
    }
    const dataIncorp = new Date(dataIncorporacao);
    // Função para verificar se alguma tabela filha tem data maior que a de incorporação
    const tabelasFilhas = [
      { arr: this.funcaoFormArray, campo: 'dataInicio', nome: 'Função' },
      { arr: this.forFormArray, campo: 'dataInicio', nome: 'Formação' },
      { arr: this.emforFormArray, campo: 'dataInicio', nome: 'Formação Militar' },
      { arr: this.saFormArray, campo: 'datainicioDoenca', nome: 'Saúde' },
      { arr: this.sitDiscFormArray, campo: 'dataInicioMedida', nome: 'Situação Disciplinar' },
      { arr: this.sitQPActivoFormArray, campo: 'dataInicio', nome: 'Situação QP Ativo' }
    ];
    for (const tabela of tabelasFilhas) {
      for (let i = 0; i < tabela.arr.length; i++) {
        const data = tabela.arr.at(i)?.get(tabela.campo)?.value;
        if (data) {
          const dataFilha = new Date(data);
          if (dataFilha > dataIncorp) {
            Swal.fire({
              icon: 'warning',
              title: 'Data inválida',
              text: `A tabela filha "${tabela.nome}" possui data maior que a data de incorporação.`
            });
            return;
          }
        }
      }
    }
    // Para documentos, a data mínima é a data de nascimento
    const nascDataDoc = this.fichaForm.get('nascData')?.value;
    if (this.docFormArray.length > 0 && nascDataDoc) {
      for (let i = 0; i < this.docFormArray.length; i++) {
        const dataEmissao = this.docFormArray.at(i)?.get('dataemissao')?.value;
        if (dataEmissao) {
          const dataDoc = new Date(dataEmissao);
          const dataNasc = new Date(nascDataDoc);
          if (dataDoc < dataNasc) {
            Swal.fire({
              icon: 'warning',
              title: 'Data de documento inválida',
              text: 'A data de emissão do documento não pode ser anterior à data de nascimento.'
            });
            return;
          }
        }
      }
    }
    const nascData = this.fichaForm.get('nascData')?.value;
    if (!nascData) {
      Swal.fire({
        icon: 'warning',
        title: 'Ano de nascimento obrigatório',
        text: 'Indique o ano de nascimento antes de salvar a ficha militar.'
      });
      return;
    }
    const idade = this.calcularIdade(nascData);
    if (idade < 18) {
      Swal.fire({
        icon: 'warning',
        title: 'Idade mínima não atingida',
        text: 'O militar deve ter pelo menos 18 anos para salvar a ficha militar.'
      });
      return;
    }
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
   delete formData.procBi;
      // Monta o objeto com os dados do formulário para enviar à API
      const objeto = {
        tipo: 'Mil', // Nome da entidade no backend
        ...formData, // Inclui todos os dados do formulário
        // Adiciona metadata de controle
        inseriu: this.auth.obterSessao()?.nome || '',
        inseriuDataHora: new Date(),
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
  }

  onSubmit(): void {
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
      nome:'Maria Aniva José',
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
    this.milFaFormArray.clear();
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
          this.funcaoDataSource = this.funcaoFormArray.controls.map(control => control.value);
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
          this.MilfaDataSource = [...this.milFaFormArray.controls];
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
    this.selectedObitoIndex = null;
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

  /**
   * Inicializa campos de data em um FormGroup com formato ISO
   * @param group FormGroup contendo campos de data
   * @param dateFieldNames Lista de nomes dos campos de data
   */
  initializeDateFields(group: FormGroup, dateFieldNames: string[]): void {
    const hoje = this.formatDateToISO(new Date());

    dateFieldNames.forEach(fieldName => {
      const control = group.get(fieldName);
      if (control) {
        // Se o campo estiver vazio, usa a data atual, senão formata para ISO
        if (!control.value && this.formState === 'insert') {
          control.setValue(hoje);
        } else if (control.value) {
          try {
            control.setValue(this.formatDateToISO(control.value));
          } catch (e) {
            console.warn(`Erro ao converter data para campo ${fieldName}:`, e);
          }
        }
      }
    });

  }

  // Array management methods
  addToFormArray(arrayName: string, formGroup: FormGroup): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        // Inicializa campos de data no formGroup antes de adicioná-lo ao array
        const dateFieldMap: Record<string, string[]> = {
          milAgre: ['nascData'],
          milConde: ['dataGalardoacao'],
          milDoc: ['dataemissao', 'datavalid'],
          milEmFor: ['dataInicio', 'dataTermino'],
          milEspecial: ['dataEspecial'],
          milFor: ['dataInicio', 'dataTermino'],
          milFuncao: ['dataInicio', 'dataTermino'],
          milLice: ['licencaData', 'dataTermino'],
          milProm: ['dataOS'],
          milRea: ['dataOS'],
          milReg: ['dataReg'],
          milRetReaSal: ['retencaoData', 'reactivacaoData'],
          milSa: ['datainicioDoenca']
        };

        // Se o array tem campos de data, inicializa-os
        if (dateFieldMap[arrayName]) {
          this.initializeDateFields(formGroup, dateFieldMap[arrayName]);
        }

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
            (this as any)[dataSourceName] = formArray.controls.map(control => control.value);
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
    const nascData = this.fichaForm.get('nascData')?.value;
    if (!nascData) {
      Swal.fire({
        icon: 'warning',
        title: 'Ano de nascimento obrigatório',
        text: 'Indique o ano de nascimento antes de adicionar agregados.'
      });
      return;
    }
    const idade = this.calcularIdade(nascData);
    if (idade < 18) {
      Swal.fire({
        icon: 'warning',
        title: 'Idade mínima não atingida',
        text: 'O militar deve ter pelo menos 18 anos para adicionar agregados.'
      });
      return;
    }
  const dialogRef = this.dialog.open(ModalAgregadoFamiliarComponent, {
    width: '800px',
    data: {
      agre: {},
      isEdit: false, ...this.getMilitarInfo()
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.addToFormArray('milAgre', this.fb.group(result));
      this.selectedAgreIndex = this.agreFormArray.length - 1;
    }
  });
}

  adicionarCondecoracoes(): void {
    const condeGroup = this.fb.group({
      milCondeStamp: [this.auth.Stamp()],
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

    const nascData = this.fichaForm.get('nascData')?.value;
    if (!nascData) {
      Swal.fire({
        icon: 'warning',
        title: 'Ano de nascimento obrigatório',
        text: 'Indique o ano de nascimento antes de adicionar documentos.'
      });
      return;
    }
    const idade = this.calcularIdade(nascData);
    if (idade < 18) {
      Swal.fire({
        icon: 'warning',
        title: 'Idade mínima não atingida',
        text: 'O militar deve ter pelo menos 18 anos para adicionar documentos.'
      });
      return;
    }

    // Ensure document types are loaded
    if (this.tipoDocumentoOptions.length === 0) {
      this.loadTipoDocumentoFromBusca();
    }
    const dialogRef = this.dialog.open(ModalDocumentoMilitarComponent, {
      width: '800px',
      disableClose: true,
      data: {
        milStamp: this.fichaForm.get('milStamp')?.value || '',
        tipoDocumentoOptions: this.tipoDocumentoOptions,
        isEdit:false,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });
    dialogRef.afterClosed().subscribe((result:MilDoc) => {
      if (result) {
        //result.dataemissao = ;
       // result.datavalid = this.formatDateToISO(result.datavalid);
        //result.inseriuDataHora = new Date().toISOString();
const docGroup = this.fb.group({
  tipoDocumento: [result.tipoDocumento],
  numeroDoc: [result.numeroDoc],
  localemissao: [result.localemissao],
  dataemissao: [result.dataemissao],
  datavalid: [result.datavalid],
  milDocStamp: [result.milDocStamp],
  codMilDoc: [result.codMilDoc],
  milStamp: [result.milStamp],
  inseriu: [result.inseriu],
  inseriuDataHora: [result.inseriuDataHora]
});


        this.addToFormArray('milDoc', docGroup);
        this.selectedDocIndex = this.docFormArray.length - 1;
        this.cdr.detectChanges();
      }
    });
  }

  editarDocumento(index: number): void {

    const milStamp = this.fichaForm.get('nome')?.value;
    if (!milStamp) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'O campo nome é obrigatório para editar documentos.'
      });
      return;
    }
    // Ensure document types are loaded
    if (this.tipoDocumentoOptions.length === 0) {
      this.loadTipoDocumentoFromBusca();
    }
    const documento = this.docFormArray.at(index)?.value;
    if (!documento) {
      console.error('Document not found at index:', index);
      return;
    }
    const dialogRef = this.dialog.open(ModalDocumentoMilitarComponent, {
      width: '800px',
      disableClose: true,
      data: {
        documento,
        milStamp: this.fichaForm.get('milStamp')?.value || '',
        tipoDocumentoOptions: this.tipoDocumentoOptions,
        isEdit:true,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.dataemissao = this.formatDateToISO(result.dataemissao);
        result.datavalid = this.formatDateToISO(result.datavalid);
        result.alterouDataHora = new Date().toISOString();
        this.docFormArray.at(index).patchValue(result);
        this.updateDataSource('milDoc');
      }
    });
  }

  adicionarEmail(): void {
    const nascData = this.fichaForm.get('nascData')?.value;
    const incData = this.fichaForm.get('incData')?.value;
    if (!nascData) {
      Swal.fire({
        icon: 'warning',
        title: 'Ano de nascimento obrigatório',
        text: 'Indique o ano de nascimento antes de adicionar email.'
      });
      return;
    }
    const idade = this.calcularIdade(nascData);
    if (idade < 18) {
      Swal.fire({
        icon: 'warning',
        title: 'Idade mínima não atingida',
        text: 'O militar deve ter pelo menos 18 anos para adicionar email.'
      });
      return;
    }
    if (!incData) {
      Swal.fire({
        icon: 'warning',
        title: 'Data de incorporação obrigatória',
        text: 'Indique a data de incorporação antes de adicionar email.'
      });
      return;
    }
    const email: Email = {
      emailStamp: this.auth.Stamp(),
      email1: '',
      milStamp: this.fichaForm.get('milStamp')?.value
    };
    const dialogRef = this.dialog.open(ModalEmailMilitarComponent, {
      width: '500px',
      data: {
        email,
        isEditing: false, ...this.getMilitarInfo()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const emailGroup = this.fb.group({
          emailStamp: [this.auth.Stamp()],
          email: [result.email],
          inseriu: [result.inseriu],
          inseriuDataHora: [new Date()],
          alterou: [''],
          alterouDataHora: [new Date()],
          milStamp: [this.fichaForm.get('milStamp')?.value || '']
        });
        this.addToFormArray('milEmail', emailGroup);
        this.selectedEmailIndex = this.emailFormArray.length - 1;
        this.cdr.markForCheck();
      }
    });

  }

  adicionarTelefone(): void {
    const nascData = this.fichaForm.get('nascData')?.value;
    const incData = this.fichaForm.get('incData')?.value;
    if (!nascData) {
      Swal.fire({
        icon: 'warning',
        title: 'Ano de nascimento obrigatório',
        text: 'Indique o ano de nascimento antes de adicionar telefone.'
      });
      return;
    }
    const idade = this.calcularIdade(nascData);
    if (idade < 18) {
      Swal.fire({
        icon: 'warning',
        title: 'Idade mínima não atingida',
        text: 'O militar deve ter pelo menos 18 anos para adicionar telefone.'
      });
      return;
    }
    if (!incData) {
      Swal.fire({
        icon: 'warning',
        title: 'Data de incorporação obrigatória',
        text: 'Indique a data de incorporação antes de adicionar telefone.'
      });
      return;
    }
    const telefone: Telefone = {
      telefoneStamp: this.auth.Stamp(),
      telefone1: 0,
      tipo: '',
      milStamp: this.fichaForm.get('milStamp')?.value
    };
    const dialogRef = this.dialog.open(ModalTelefoneMilitarComponent, {
      width: '500px',
      data: {
        telefone,
        isEditing: false, ...this.getMilitarInfo()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const telefoneGroup = this.fb.group({
          telefoneStamp: [this.auth.Stamp()],
          telefone1: [result.telefone1, Validators.required],
         // tipo: [result.tipo, Validators.required],
          inseriu: [''],
          inseriuDataHora: [new Date()],
          alterou: [''],
          alterouDataHora: [new Date()],
          milStamp: [this.fichaForm.get('milStamp')?.value || '']
        });
        this.addToFormArray('telefone', telefoneGroup);
        this.selectedTelefoneIndex = this.telefoneFormArray.length - 1;
        this.cdr.markForCheck();
      }
    });
  }

  // Add methods for other arrays (similar pattern)
  addFormacao(): void {

      if (!this.isEditing && !this.formState) {
      return;
    }
     const milfor:MilFor={
      milForStamp: this.auth.Stamp(),
        milStamp: this.fichaForm.get('milStamp')?.value,
    };
    const dialogRef = this.dialog.open(ModalForMilitarComponent, {
      width: '800px',
      disableClose: true,
      autoFocus: false,
      data: {
        for: { ...milfor },
        isEdit:false,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilFor) => {
      if (result) {
        // Criar novo FormGroup e adicionar ao FormArray
        const promGroup = this.fb.group({
           tipoFormacao: [result.tipoFormacao ],
      curso: [result.curso ],
      dataInicio: [result.dataInicio ],
      dataTermino: [result.dataTermino ],
      nivel: [result.nivel ],
      duracao: [result.duracao ],
      tipoInstituicao: [result.tipoInstituicao ],
      instituicao: [result.instituicao ],
      codPais: [result.codPais ],
      pais: [result.pais ],
      obs: [result.obs ],
      milForStamp: [result.milForStamp ],
      codMilFor: [result.codMilFor ],
      milStamp: [result.milStamp ],
      inseriu: [result.inseriu ],
      inseriuDataHora: [result.inseriuDataHora ],
      alterou: [result.alterou ],
      alterouDataHora: [result.alterouDataHora ],

        });

        this.addToFormArray('milFor', promGroup);
        this.selectedForIndex = this.forFormArray.length - 1;
        this.cdr.detectChanges();
        this.auth.showSnackBar('Formação adicionada com sucesso!');
      }
    });
    // const forGroup = this.fb.group({
    //   milForStamp: [this.auth.Stamp()],
    //   codMilFor: [0],
    //   tipoFormacao: [false],
    //   curso: ['', Validators.required],
    //   dataInicio: [''],
    //   dataTermino: [''],
    //   nivel: [''],
    //   duracao: [''],
    //   tipoInstituicao: [false],
    //   instituicao: [''],
    //   codPais: [0],
    //   pais: [''],
    //   codProvincia: [0],
    //   provincia: [''],
    //   codDistrito: [0],
    //   distrito: [''],
    //   codPostoAdm: [0],
    //   postoAdm: [''],
    //   codLocalidade: [0],
    //   localidade: [''],
    //   obs: [''],
    //   inseriu: [''],
    //   inseriuDataHora: [new Date()],
    //   alterou: [''],
    //   alterouDataHora: [new Date()],
    //   milStamp: ['']
    // });

    // this.addToFormArray('milFor', forGroup);
    // this.selectedForIndex = this.forFormArray.length - 1;
  }

  calcularIdade(nascData: any): number {
    if (!nascData) return 0;
    const dataNasc = new Date(nascData);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const m = hoje.getMonth() - dataNasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }
    return idade;
  }

  adicionarLingua(): void {
    const nascData = this.fichaForm.get('nascData')?.value;
    if (!nascData) {
      Swal.fire({
        icon: 'warning',
        title: 'Ano de nascimento obrigatório',
        text: 'Indique o ano de nascimento antes de adicionar línguas.'
      });
      return;
    }
    const idade = this.calcularIdade(nascData);
    if (idade < 18) {
      Swal.fire({
        icon: 'warning',
        title: 'Idade mínima não atingida',
        text: 'O militar deve ter pelo menos 18 anos para adicionar línguas.'
      });
      return;
    }
    const lingua:MilLingua={
      milLinguaStamp:this.auth.Stamp(),
      milStamp:this.fichaForm?.get(`milStamp`)?.value
    };
    const dialogRef = this.dialog.open(ModalLinguaMilitarComponent, {
      width: '800px',
      data: {...lingua,...this.getMilitarInfo(),isEdit:false},
    });
    dialogRef.afterClosed().subscribe(results => {
      if (results) {
        const result=results as MilLingua;
        const linguaGroup = this.fb.group({
          milLinguaStamp: [this.auth.Stamp()],
          codMilLingua: [0],
          lingua: [result.lingua, Validators.required],
          fala: [result.fala],
          leitura: [result.leitura],
          escrita: [result.escrita],
          compreensao: [result.compreensao],
          materna: [result.materna],
          inseriu: [''],
          inseriuDataHora: [new Date()],
          alterou: [''],
          alterouDataHora: [new Date()],
          milStamp: ['']
        });
        this.addToFormArray('milLingua', linguaGroup);
        this.selectedLinguaIndex = this.linguaFormArray.length - 1;
        this.cdr.markForCheck();
      }
    });
  }

  adicionarSituacao(): void {
    const sitGroup = this.fb.group({
      milSitStamp: [this.auth.Stamp()],
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
  removerFuncao(index: number): void {
    this.removerItem('milFuncao', index, 'selectedFuncaoIndex');
  }
 removerSaude(index: number): void {
    this.removerItem('milSa', index, 'selectedSaIndex');
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

  // Edit methods for various entities
  editFuncao(index: number): void {
    if (!this.canPerformActions()) {
      return;
    }

    if (index >= 0 && index < this.funcaoDataSource.length) {
      this.selectedFuncaoIndex = index;
      const funcao = this.funcaoDataSource[index];

      const dialogRef = this.dialog.open(ModalFuncaoMilitarComponent, {
        width: '800px',
        data: {
          funcao: {...funcao},
          isEditing: true, ...this.getMilitarInfo()
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.funcaoDataSource[index] = result;
          // Update form array with new value
          this.funcaoFormArray.at(index).patchValue(result);
          this.cdr.markForCheck();
        }
        this.selectedFuncaoIndex = null;
      });
    }
  }


editAgregado(index: number): void {
  const agre = this.agreFormArray.at(index)?.value as MilAgre;
  if (!agre) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Registro de agregado não encontrado.'
    });
    return;
  }
  const dialogRef = this.dialog.open(ModalAgregadoFamiliarComponent, {
    width: '800px',
    data: {
      agre,
      isEdit: true, ...this.getMilitarInfo()
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.agreFormArray.at(index).patchValue(result);
      this.selectedAgreIndex = index;
    }
  });
}

  editCondecoracoes(index: number): void {
    if (!this.canPerformActions()) {
      return;
    }

    if (index >= 0 && index < this.condeDataSource.length) {
      this.selectedCondeIndex = index;
      const condecoracao = this.condeDataSource[index];

      const dialogRef = this.dialog.open(ModalCondeMilitarComponent, {
        width: '800px',
        data: {
          condecoracao: {...condecoracao},
          isEditing: true, ...this.getMilitarInfo()
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.condeDataSource[index] = result;
          // Update form array with new value
          this.condeFormArray.at(index).patchValue(result);
          this.cdr.markForCheck();
        }
        this.selectedCondeIndex = null;
      });
    }
  }

  editEmail(index: number): void {
    if (!this.canPerformActions()) {
      return;
    }

 if (index >= 0 && index < this.emailDataSource.length) {
      this.selectedEmailIndex = index;
      const email = this.emailDataSource[index];
      const dialogRef = this.dialog.open(ModalEmailMilitarComponent, {
        width: '800px',
        data: {
          email: {...email},
          isEditing: true, ...this.getMilitarInfo()
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.emailDataSource[index] = result;
          // Update form array with new value
          this.emailFormArray.at(index).patchValue(result);
          this.cdr.markForCheck();
        }
        this.selectedEmailIndex = null;
      });
    }
  }

  editTelefone(index: number): void {
    if (!this.canPerformActions()) {
      return;
    }
    if (index >= 0 && index < this.telefoneDataSource.length) {
      this.selectedTelefoneIndex = index;
      const telefone = this.telefoneDataSource[index];
      const dialogRef = this.dialog.open(ModalTelefoneMilitarComponent, {
        width: '800px',
        data: {
          telefone: {...telefone},
          isEditing: true, ...this.getMilitarInfo()
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.telefoneDataSource[index] = result;
          // Update form array with new value
          this.telefoneFormArray.at(index).patchValue(result);
          this.cdr.markForCheck();
        }
        this.selectedTelefoneIndex = null;
      });
    }

  }

  editFormacao(index: number): void {
    if (!this.canPerformActions()) {
      return;
    }

    if (index >= 0 && index < this.forDataSource.length) {
      this.selectedForIndex = index;
      const formacao = this.forDataSource[index];

      const dialogRef = this.dialog.open(ModalForMilitarComponent, {
        width: '800px',
        data: {
          for: {...formacao},
          isEditing: true, ...this.getMilitarInfo()
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.forDataSource[index] = result;
          // Update form array with new value
          this.forFormArray.at(index).patchValue(result);
          this.cdr.markForCheck();
        }
        this.selectedForIndex = null;
      });
    }
  }

  editLingua(index: number): void {
    if (!this.canPerformActions()) {
      return;
    }

    if (index >= 0 && index < this.linguaDataSource.length) {
      this.selectedLinguaIndex = index;
      const lingua = this.linguaDataSource[index];

      const dialogRef = this.dialog.open(ModalLinguaMilitarComponent, {
      width: '800px',
      data: {...lingua,...this.getMilitarInfo(),isEdit:true},
      disableClose:true
    });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedLingua = {
            ...lingua,
            ...result
          };
          this.linguaDataSource[index] = updatedLingua;
          // Update form array with new value
          this.linguaFormArray.at(index).patchValue(updatedLingua);
          this.cdr.markForCheck();
        }
        this.selectedLinguaIndex = null;
      });
    }
  }

  editSituacao(index: number): void {
    if (!this.canPerformActions()) {
      return;
    }

    if (index >= 0 && index < this.sitDataSource.length) {
      this.selectedSitIndex = index;
      const situacao = this.sitDataSource[index];

      Swal.fire({
        title: 'Editar Situação',
        html:
          `<div class="form-group">
            <label for="situacao">Situação:</label>
            <select id="situacao" class="swal2-input">
              ${this.situacaoOptions.map(option =>
                `<option value="${option}" ${situacao.situacao === option ? 'selected' : ''}>${option}</option>`
              ).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="dataOS">Data OS:</label>
            <input id="dataOS" type="date" class="swal2-input" value="${this.formatDateForInput(situacao.dataOS)}">
          </div>
          <div class="form-group">
            <label for="numOS">Número OS:</label>
            <input id="numOS" type="text" class="swal2-input" value="${situacao.numOS || ''}">
          </div>`,
        focusConfirm: false,
        preConfirm: () => {
          const situacaoValue = (document.getElementById('situacao') as HTMLSelectElement).value;
          const dataOS = (document.getElementById('dataOS') as HTMLInputElement).value;
          const numOS = (document.getElementById('numOS') as HTMLInputElement).value;

          if (!dataOS) {
            Swal.showValidationMessage('Por favor insira a data da OS');
            return false;
          }

          return { situacao: situacaoValue, dataOS: new Date(dataOS), numOS };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const typedValue = result.value as { situacao: string, dataOS: Date, numOS: string };
          const updatedSituacao = {
            ...situacao,
            ...typedValue
          };
          this.sitDataSource[index] = updatedSituacao;
          // Update form array with new value
          this.sitFormArray.at(index).patchValue(updatedSituacao);
          this.cdr.markForCheck();
        }
        this.selectedSitIndex = null;
      });
    }
  }

  // Helper function to format Date for date input
  private formatDateForInput(date: Date | string): string {
    if (!date) return '';

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Additional array methods for remaining entities
  adicionarEmergencia(): void {
    const emergGroup = this.fb.group({
      milPeEmergStamp: [this.auth.Stamp()],
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
      milPromStamp: [this.auth.Stamp()],
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
      milStamp: [this.auth.Stamp()],
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

  adicionarSaude1222(): void {
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
adicionarSaude(): void {
    const nascData = this.fichaForm.get('nascData')?.value;
    if (!nascData) {
      Swal.fire({
        icon: 'warning',
        title: 'Ano de nascimento obrigatório',
        text: 'Indique o ano de nascimento antes de adicionar registros de saúde.'
      });
      return;
    }
    const idade = this.calcularIdade(nascData);
    if (idade < 18) {
      Swal.fire({
        icon: 'warning',
        title: 'Idade mínima não atingida',
        text: 'O militar deve ter pelo menos 18 anos para adicionar registros de saúde.'
      });
      return;
    }

  const dialogRef = this.dialog.open(ModalSaudeMilitarComponent, {
    width: '800px',
    data: {
      saude: {milStamp: this.fichaForm.get('milStamp')?.value || ''},
      milStamp: this.fichaForm.get('milStamp')?.value || '',
      isEdit: false, ...this.getMilitarInfo()
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.addToFormArray('milSa', this.fb.group(result));
      this.selectedSaIndex = this.saFormArray.length - 1;
    }
  });
}

adicionarobito(): void {

if(this.milFaFormArray.length > 0){
 Swal.fire({icon: 'error',title: 'Erro',
  text: 'o militar já foi declarado como óbito.'
    });
    return;
}
const fa:MilFa={
milStamp:this.fichaForm.get('milStamp')?.value,
};
  const dialogRef = this.dialog.open(ModalMilfaComponent, {
    width: '800px',
    data: {
      fa,
      milStamp: this.fichaForm.get('milStamp')?.value || '',
      isEdit: false, ...this.getMilitarInfo()
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.addToFormArray('milFa', this.fb.group(result));
      this.selectedObitoIndex = this.milFaFormArray.length - 1;
    }
  });
}


  adicionarSituacaoDisciplinar(): void {
    const sitDiscGroup = this.fb.group({
      milSitDiscStamp: [this.auth.Stamp()],
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
      milSitQPActivoStamp: [this.auth.Stamp()],
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
      milEspecialStamp: [this.auth.Stamp()],
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
      milEmForStamp: [this.auth.Stamp()],
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
    const nascData = this.fichaForm.get('nascData')?.value;
    if (!nascData) {
      Swal.fire({
        icon: 'warning',
        title: 'Ano de nascimento obrigatório',
        text: 'Indique o ano de nascimento antes de adicionar funções.'
      });
      return;
    }
    const idade = this.calcularIdade(nascData);
    if (idade < 18) {
      Swal.fire({
        icon: 'warning',
        title: 'Idade mínima não atingida',
        text: 'O militar deve ter pelo menos 18 anos para adicionar funções.'
      });
      return;
    }


const funcao:MilFuncao={
milStamp: this.fichaForm?.get('milStamp')?.value || '',
milFuncaoStamp: this.auth.Stamp(),
codMilFuncao: 0,
funcao: '',
numOS: '',
dataOS: '',
dataInicio: '',
dataTermino: '',
obs: '',
orgao: '',
unidade: '',
subunidade: '',
subunidade1: '',
subunidade2: '',
inseriu: '',
inseriuDataHora: new Date(),
alterou: '',
alterouDataHora: new Date()
};
    const dialogRef = this.dialog.open(ModalFuncaoMilitarComponent, {
      width: '800px',
      maxWidth: '90vw',
       data: {
          funcao: {...funcao},
          isEditing: false, ...this.getMilitarInfo()
        }, // Novo registro
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((resultado: MilFuncao) => {
      if (resultado) {
        // Criar FormGroup com os dados do modal
        const funcaoGroup = this.fb.group({
          milFuncaoStamp: [resultado.milFuncaoStamp || ''],
          milStamp: [resultado.milStamp || ''],
          codMilFuncao: [resultado.codMilFuncao || 0],
          funcao: [resultado.funcao || '', Validators.required],
          numOS: [resultado.numOS || ''],
          dataOS: [resultado.dataOS || ''],
          dataInicio: [resultado.dataInicio || ''],
          dataTermino: [resultado.dataTermino || ''],
          obs: [resultado.obs || ''],
          orgao: [resultado.orgao || ''],
          unidade: [resultado.unidade || ''],
          subunidade: [resultado.subunidade || ''],
          subunidade1: [resultado.subunidade1 || ''],
          subunidade2: [resultado.subunidade2 || ''],
          orgaoStamp: [resultado.orgaoStamp || ''],
          unidadeStamp: [resultado.unidadeStamp || ''],
          subunidadeStamp: [resultado.subunidadeStamp || ''],
          subunidade1Stamp: [resultado.subunidade1Stamp || ''],
          subunidade2Stamp: [resultado.subunidade2Stamp || ''],
          inseriu: [resultado.inseriu || ''],
          inseriuDataHora: [resultado.inseriuDataHora || new Date()],
          alterou: [resultado.alterou || ''],
          alterouDataHora: [resultado.alterouDataHora || new Date()]
        });

        this.addToFormArray('milFuncao', funcaoGroup);
        this.selectedFuncaoIndex = this.funcaoFormArray.length - 1;

        // Atualizar data source
        this.funcaoDataSource = this.funcaoFormArray.controls.map(control => control.value);

        Swal.fire('Sucesso!', 'Função militar adicionada com sucesso.', 'success');
      }
    });
  }

  editarFuncao(index: number): void {
    const funcaoAtual = this.funcaoFormArray.at(index).value;

    const dialogRef = this.dialog.open(ModalFuncaoMilitarComponent, {
      width: '800px',
      maxWidth: '90vw',
       data: {
          funcao: {...funcaoAtual},
          isEditing: true, ...this.getMilitarInfo()
        }, // Passa os dados existentes para edição
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((resultado: MilFuncao) => {
      if (resultado) {
        // Atualizar o FormGroup existente com os dados editados
        this.funcaoFormArray.at(index).patchValue({
          milFuncaoStamp: resultado.milFuncaoStamp || funcaoAtual.milFuncaoStamp,
          milStamp: resultado.milStamp || funcaoAtual.milStamp,
          codMilFuncao: resultado.codMilFuncao || funcaoAtual.codMilFuncao,
          funcao: resultado.funcao || funcaoAtual.funcao,
          numOS: resultado.numOS || funcaoAtual.numOS,
          dataOS: resultado.dataOS || funcaoAtual.dataOS,
          dataInicio: resultado.dataInicio || funcaoAtual.dataInicio,
          dataTermino: resultado.dataTermino || funcaoAtual.dataTermino,
          obs: resultado.obs || funcaoAtual.obs,
          orgao: resultado.orgao || funcaoAtual.orgao,
          unidade: resultado.unidade || funcaoAtual.unidade,
          subunidade: resultado.subunidade || funcaoAtual.subunidade,
          subunidade1: resultado.subunidade1 || funcaoAtual.subunidade1,
          subunidade2: resultado.subunidade2 || funcaoAtual.subunidade2,
          orgaoStamp: resultado.orgaoStamp || funcaoAtual.orgaoStamp,
          unidadeStamp: resultado.unidadeStamp || funcaoAtual.unidadeStamp,
          subunidadeStamp: resultado.subunidadeStamp || funcaoAtual.subunidadeStamp,
          subunidade1Stamp: resultado.subunidade1Stamp || funcaoAtual.subunidade1Stamp,
          subunidade2Stamp: resultado.subunidade2Stamp || funcaoAtual.subunidade2Stamp,
          alterou: resultado.alterou || funcaoAtual.alterou,
          alterouDataHora: new Date()
        });
        // Atualizar data source
        this.funcaoDataSource = this.funcaoFormArray.controls.map(control => control.value);

        Swal.fire('Sucesso!', 'Função militar editada com sucesso.', 'success');
      }
    });
  }

  adicionarLicenca(): void {
    const liceGroup = this.fb.group({
      milLiceStamp: [this.auth.Stamp()],
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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
      data: proc, ...this.getMilitarInfo()
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

  // Search and helper methods
  onSearchClick(): void {
    // Implementation for search functionality
  }

  onSearchGenericClick(
    campos: string,
    tabela: string,
    condicao: string,
    mapeamento: any
  ): void {
    const proc = this.auth.InicializaProcura();
    proc.descricao = campos;
    proc.tabela = tabela;
    proc.campo = campos.split(',')[0];
    proc.campo1 = campos.split(',')[1];
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
    // Implementation for export functionality
  }

  importarFichaMilitar(): void {
    // Implementation for import functionality
  }

  // Print methods
  imprimirFicha(): void {
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
        proc.descricao = 'NOME';
        break;
      case 'nome':
        proc.descricao = 'NIM';
        proc.origem = 'NOME';
        break;
      default:
        proc.origem = 'CÓDIGO';
        proc.descricao = 'DESCRIÇÃO';
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
onMilitarBiSearchClick(campo: string) {
  const bi = this.fichaForm.get('procBi')?.value;
  if (!bi) return;
  const proc = this.auth.InicializaProcura();
    proc.descricao = `numeroDoc,nome,milstamp`;
    proc.tabela = 'vBi';
    proc.campo = `numeroDoc`;
    proc.campo1 = `nome`;
    proc.camposseleccionados = `numeroDoc,nome,milstamp`;
    proc.referencia = bi;
    proc.alunoestamp = 'nome asc';
    proc.origem = 'BI';
    proc.descricao = 'Nome';
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
  //this.fichaForm.get('procBi')?.setValue('');
}
  // Método auxiliar para converter string de data para formato ISO string
  private convertToDate(dateStr: string | null): string | null {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      // Retorna a data no formato ISO (YYYY-MM-DD)
      return this.formatDateToISO(date);
    } catch (e) {
      console.warn('Erro ao converter data:', e);
      return null;
    }
  }


safeUrl: SafeResourceUrl | null = null;


cleanup() {
  this.militarPhoto =this.safeUrl= null;
 this.fichaForm.patchValue({ pathbase64: '' });
}

private _isLoading$ = new BehaviorSubject<boolean>(false);
path:string= `${environment.Apiurl}Proc2`;
get isLoading$() {
  return this._isLoading$.asObservable();
}

setUrl(fileName:string) {
  if(fileName.length<=0){
    return;
  }
  this._isLoading$.next(true);
  this.cleanups();
  this.militarPhoto =this.safeUrl = this.bypassAndSanitize(`${this.path}/LeituraDeFicheiros?ficheiro=${fileName}`);



  setTimeout(() => {
    this._isLoading$.next(false);
  }, 150);
}

cleanups() {
 this.militarPhoto= this.safeUrl = '';
 this.fichaForm.patchValue({ pathbase64: '' });
}

bypassAndSanitize(url:string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

updateUrl(url: string) {
 this.militarPhoto=  this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  // Método auxiliar para carregar dados do militar no formulário
  private loadMilitarData(militar: any): void {
    try {


      this.isDocumentLoaded = true;
      // Carregar dados principais do militar
      this.fichaForm.patchValue({
        // Dados pessoais
        milStamp: militar.milStamp,
        nim: militar.nim,
        nome: militar.nome,
        sexo: militar.sexo,
        estCivil: militar.estCivil,
        conjuge: militar.conjuge,
        dataCasamento: this.convertToDate(militar.dataCasamento),
        nascData: this.convertToDate(militar.nascData),
        numFilhos: militar.numFilhos,
        pai: militar.pai,
        mae: militar.mae,
        habiLite: militar.habiLite,
        nacional: militar.nacional,
        ramo: militar.ramo,
        grupSangue: militar.grupSangue,

        // Local de Nascimento
        nascPais: militar.nascPais,
        nascProv: militar.nascProv,
        nascDist: militar.nascDist,
        nascPosto: militar.nascPosto,
        nascLocal: militar.nascLocal,
        nascPov: militar.nascPov,

        // Residência
        resPais: militar.resPais,
        resProv: militar.resProv,
        resDist: militar.resDist,
        resPosto: militar.resPosto,
        resLocalidade: militar.resLocalidade,
        resBairro: militar.resBairro,
        resQuarteirao: militar.resQuarteirao,
        resAvenida: militar.resAvenida,
        numCasa: militar.numCasa,

        // Incorporação
        incPais: militar.incPais,
        incProv: militar.incProv,
        incDist: militar.incDist,
        incPosto: militar.incPosto,
        incLocal: militar.incLocal,
        incData: this.convertToDate(militar.incData),

        // Treino
        inicioTreino: this.convertToDate(militar.inicioTreino),
        terminoTreino: this.convertToDate(militar.terminoTreino),

        // Datas de Controle
        inseriuDataHora: this.convertToDate(militar.inseriuDataHora),
        alterouDataHora: this.convertToDate(militar.alterouDataHora),
        duracaoTreino: militar.duracaoTreino,
        centroTreino: militar.centroTreino,
        cursoTreino: militar.cursoTreino,
        adquirEspecial: militar.adquirEspecial,

        // Dados Médicos
        milMed: {
          altura: militar.milMed?.altura,
          peso: militar.milMed?.peso,
          braco: militar.milMed?.braco,
          cabeca: militar.milMed?.cabeca,
          pescoco: militar.milMed?.pescoco,
          peito: militar.milMed?.peito,
          cintura: militar.milMed?.cintura,
          ancas: militar.milMed?.ancas,
          entrepernas: militar.milMed?.entrepernas,
          calcado: militar.milMed?.calcado,
          ombros: militar.milMed?.ombros
        },

        // Dados Salariais
        milSalario: {
          uCerimonial: militar.milSalario?.uCerimonial,
          saudeMilitar: militar.milSalario?.saudeMilitar,
          recebePatente: militar.milSalario?.recebePatente,
          recebeSqtc: militar.milSalario?.recebeSqtc,
          escalao: militar.milSalario?.escalao,
          sQTC: militar.milSalario?.sQTC,
          nivelSalarial: militar.milSalario?.nivelSalarial,
          nomeBanco: militar.milSalario?.nomeBanco,
          nrConta: militar.milSalario?.nrConta,
          nib: militar.milSalario?.nib,
          obs: militar.milSalario?.obs
        }
      });

      // Inicializa campos de data com formato ISO após carregar o registro
      this.initializeDateFieldsWithISOFormat();

      // Carregar foto se existir
      if (militar.alterou) {
      this.setUrl(militar.alterou ?? '');
      }

      // Limpar e carregar arrays de dados relacionados
      // Documentos
      this.docFormArray.clear();
      if (militar.milDoc && militar.milDoc.length > 0) {
        militar.milDoc.forEach((doc: MilDoc) => {


const docGroup = this.fb.group({
  tipoDocumento: [doc.tipoDocumento],
  numeroDoc: [doc.numeroDoc],
  localemissao: [doc.localemissao],
  dataemissao: [doc.dataemissao],
  datavalid: [doc.datavalid],
  milDocStamp: [doc.milDocStamp],
  codMilDoc: [doc.codMilDoc],
  milStamp: [doc.milStamp],
  inseriu: [doc.inseriu],
  inseriuDataHora: [doc.inseriuDataHora]
});
        this.addToFormArray('milDoc', docGroup);
      });

      }

      // Funções Militares
      this.funcaoFormArray.clear();
      if (militar.milFuncao && militar.milFuncao.length > 0) {
        militar.milFuncao.forEach((funcao: MilFuncao) => {

const docGroup =    this.fb.group({
            milFuncaoStamp: [funcao.milFuncaoStamp],
            milStamp: [funcao.milStamp],
            codMilFuncao: [funcao.codMilFuncao],
            funcao: [funcao.funcao],
            numOS: [funcao.numOS],
            dataOS: [funcao.dataOS],
            dataInicio: [funcao.dataInicio],
            dataTermino: [funcao.dataTermino],
            obs: [funcao.obs],
            inseriu: [funcao.inseriu],
            inseriuDataHora: [funcao.inseriuDataHora],
            alterou: [funcao.alterou],
            alterouDataHora: [funcao.alterouDataHora],
            orgao: [funcao.orgao],
            unidade: [funcao.unidade],
            subunidade: [funcao.subunidade],
            subunidade1: [funcao.subunidade1],
            subunidade2: [funcao.subunidade2],
            orgaoStamp: [funcao.orgaoStamp],
            unidadeStamp: [funcao.unidadeStamp],
            subunidadeStamp: [funcao.subunidadeStamp],
            subunidade1Stamp: [funcao.subunidade1Stamp],
            subunidade2Stamp: [funcao.subunidade2Stamp]
          });
        this.addToFormArray('milFuncao', docGroup);
        });
        // this.funcaoDataSource = this.funcaoFormArray.controls.
        // map(control => control.value);
      }

      // Agregados Familiares
      this.agreFormArray.clear();
      if (militar.milAgre && militar.milAgre.length > 0) {
        militar.milAgre.forEach((agre: MilAgre) => {

          const formgroup=  this.fb.group({
              milAgreStamp: [agre.milAgreStamp],
              codMilAgre: [agre.codMilAgre],
              nome: [agre.nome],
              grau: [agre.grau],
              nascData: [agre.nascData],
              nascProv: [agre.nascProv],
              codNascProv: [agre.codNascProv],
              resProv: [agre.resProv],
              codResProv: [agre.codResProv],
              resDist: [agre.resDist],
              codResDist: [agre.codResDist],
              resPosto: [agre.resPosto],
              codResPostAdm: [agre.codResPostAdm],
              resLocal: [agre.resLocal],
              codResLocal: [agre.codResLocal],
              resBairro: [agre.resBairro],
              telefone: [agre.telefone],
              obs: [agre.obs],
              inseriu: [agre.inseriu],
              inseriuDataHora: [agre.inseriuDataHora],
              alterou: [agre.alterou],
              alterouDataHora: [agre.alterouDataHora],
              milStamp: [agre.milStamp]
            });
        this.addToFormArray('milAgre', formgroup);
        });
      }


      // Condecorações
      this.condeFormArray.clear();
      if (militar.milConde && militar.milConde.length > 0) {
        militar.milConde.forEach((conde: MilConde) => {


          const formgroup=   this.fb.group({
            milCondeStamp: [conde.milCondeStamp],
            codMilConde: [conde.codMilConde],
            galardoa: [conde.galardoa],
            especie: [conde.especie],
            grauMedalha: [conde.grauMedalha],
            dataGalardoacao: [conde.dataGalardoacao],
            obs: [conde.obs],
            inseriu: [conde.inseriu],
            inseriuDataHora: [conde.inseriuDataHora],
            alterou: [conde.alterou],
            alterouDataHora: [conde.alterouDataHora],
            milStamp: [conde.milStamp]
          });
        this.addToFormArray('milConde', formgroup);
        });
      }

      // Emails
      this.emailFormArray.clear();
      if (militar.milEmail && militar.milEmail.length > 0) {
        militar.milEmail.forEach((email: MilEmail) => {
          const formgroup=  this.fb.group({
            milStamp: [email.milStamp],
            emailStamp: [email.emailStamp],
            email: [email.email],
            inseriu: [email.inseriu],
            inseriuDataHora: [email.inseriuDataHora],
            alterou: [email.alterou],
            alterouDataHora: [email.alterouDataHora]
          });
        this.addToFormArray('milEmail', formgroup);
        });
      }

      // Telefones
      this.telefoneFormArray.clear();
      if (militar.telefone && militar.telefone.length > 0) {
        militar.telefone.forEach((tel: Telefone) => {
const formgroup=   this.fb.group({
            telefoneStamp: [tel.telefoneStamp],
            codTelefone: [tel.codTelefone],
            telefone1: [tel.telefone1],
            tipo: [tel.tipo],
            milPeEmergStamp: [tel.milPeEmergStamp],
            inseriu: [tel.inseriu],
            inseriuDataHora: [tel.inseriuDataHora],
            alterou: [tel.alterou],
            alterouDataHora: [tel.alterouDataHora],
            milStamp: [tel.milStamp]
          });
        this.addToFormArray('telefone', formgroup);
        });
      }

      // Situações
      this.sitFormArray.clear();
      if (militar.milSit && militar.milSit.length > 0) {
        militar.milSit.forEach((sit: MilSit) => {

const formgroup=    this.fb.group({
            milSitStamp: [sit.milSitStamp],
            codMilSit: [sit.codMilSit],
            situacao: [sit.situacao],
            numOS: [sit.numOS],
            dataOS: [sit.dataOS],
            obs: [sit.obs],
            inseriu: [sit.inseriu],
            inseriuDataHora: [sit.inseriuDataHora],
            alterou: [sit.alterou],
            alterouDataHora: [sit.alterouDataHora],
            milStamp: [sit.milStamp]
          });
        this.addToFormArray('milSit', formgroup);
        });
      }


 // Linguas
      this.linguaFormArray.clear();
      if (militar.milLingua && militar.milLingua.length > 0) {
        militar.milLingua.forEach((fa: MilLingua) => {
const result=fa;
        const linguaGroup = this.fb.group({
          milLinguaStamp: [result.lingua],
          codMilLingua: [result.codMilLingua],
          lingua: [result.lingua],
          fala: [result.fala],
          leitura: [result.leitura],
          escrita: [result.escrita],
          compreensao: [result.compreensao],
          materna: [result.materna],
          inseriu: [result.inseriu],
          inseriuDataHora: [result.inseriuDataHora],
          alterou: [result.alterou],
          alterouDataHora: [result.alterouDataHora],
          milStamp: [result.milStamp]
        });
        this.addToFormArray('milLingua', linguaGroup);

        });
      }





 // Promoções
      this.promFormArray.clear();
      if (militar.milProm && militar.milProm.length > 0) {
        militar.milProm.forEach((fa: MilProm) => {
          const result = fa;
          const promGroup = this.fb.group({
          milPromStamp: [result.milPromStamp],
          codMilProm: [result.codMilProm],
          categoria: [result.categoria],
          patente: [result.patente],
          tipoPromocao: [result.tipoPromocao],
          dataOS: [result.dataOS],
          numOS: [result.numOS],
          obs: [result.obs],
          inseriu: [result.inseriu],
          inseriuDataHora: [result.inseriuDataHora ],
          alterou: [result.alterou],
          alterouDataHora: [result.alterouDataHora],
          patStamp: [result.patStamp],
          milStamp: [result.milStamp]
        });
        this.addToFormArray('milProm', promGroup);
        });
      }


  // Óbito
      this.milFaFormArray.clear();
      if (militar.milFa && militar.milFa.length > 0) {
        militar.milFa.forEach((fa: MilFa) => {
const formgroup=     this.fb.group({
             milStamp: [fa.milStamp],
                  codMilFa: [fa.codMilFa ],
                  falecData: [this.formatDateISO(fa.falecData) ],
                  falecLocal: [fa.falecLocal ],
                  circunstancias: [fa.circunstancias ],
                  enterroData: [this.formatDateISO(fa.enterroData)],
                  enterroLocal: [fa.enterroLocal ],
                  numCampa: [fa.numCampa],
                  numCertObito: [fa.numCertObito],
                  obs: [fa.obs],
            inseriu: [fa.inseriu],
            inseriuDataHora: [fa.inseriuDataHora],
            alterou: [fa.alterou],
            alterouDataHora: [fa.alterouDataHora],
          });
        this.addToFormArray('milFa', formgroup);
        });
      }

      this.cdr.detectChanges();
    this.setFormState('update');
    this.displayTitle = 'Editando Ficha Militar';
      this.isDocumentLoaded = true;
     } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Swal.fire('Erro!', 'Erro ao processar dados do militar.', 'error');
    }
  }
formatDateISO(date: any): string {
    if (!date) return '';
    // Se já for string ISO, retorna
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}/)) return date;
    // Se for Date, converte
    if (date instanceof Date) return date.toISOString().slice(0, 10);
    // Se for objeto datepicker, converte
    if (date && date.year && date.month && date.day) {
      const d = new Date(date.year, date.month - 1, date.day);
      return d.toISOString().slice(0, 10);
    }
    return '';
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
        this.safeUrl=this.militarPhoto = photoData;
        // Adiciona a foto ao formulário se houver um campo específico para isso
         this.fichaForm.patchValue({pathbase64: photoData });
        this.auth.showSnackBar('Foto capturada com sucesso!');
        this.cdr.detectChanges();
      }
    });
  }

  private formatDateToISO(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  }

  private addYearsToDate(date: string | Date, years: number): string {
    if (!date) return '';
    const d = new Date(date);
    d.setFullYear(d.getFullYear() + years);
    return this.formatDateToISO(d);
  }

  removePhoto(): void {
    this.cleanups();
    //this.militarPhoto = undefined;
    // Remove a foto do formulário se houver um campo específico para isso
     this.fichaForm.patchValue({ alterou: '' });
    this.auth.showSnackBar('Foto removida');
    this.cdr.detectChanges();
  }

  // MilConde Methods
  addConde(): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    const cond:MilConde={
      milCondeStamp: this.auth.Stamp(),
        milStamp: this.fichaForm.get('milStamp')?.value,
    };
    const dialogRef = this.dialog.open(ModalCondeMilitarComponent, {
      width: '800px',
      data: {
        conde: { ...cond },
       sEditing: false, ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilConde) => {
      if (result) {
        // Add the new conde to the data source
        this.condeDataSource = [...this.condeDataSource, result];
        this.cdr.detectChanges();
        this.auth.showSnackBar('Condecoração adicionada com sucesso!');
      }
    });
  }

  editConde(conde: MilConde): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    const dialogRef = this.dialog.open(ModalCondeMilitarComponent, {
      width: '800px',
      data: {
        conde: { ...conde },
        milStamp: this.fichaForm.get('milStamp')?.value,
        sEditing:true,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilConde) => {
      if (result) {
        const index = this.condeDataSource.findIndex(d => d.milCondeStamp === conde.milCondeStamp);
        if (index !== -1) {
          this.condeDataSource[index] = result;
          this.condeDataSource = [...this.condeDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Condecoração atualizada com sucesso!');
        }
      }
    });
  }

  deleteConde(conde: MilConde): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.condeDataSource.findIndex(d => d.milCondeStamp === conde.milCondeStamp);
        if (index !== -1) {
          this.condeDataSource.splice(index, 1);
          this.condeDataSource = [...this.condeDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Condecoração excluída com sucesso!');
        }
      }
    });
  }
get milMedForm(): FormGroup {
  return this.fichaForm.get('milMed') as FormGroup;
}

get milfaForm(): FormGroup {
  return this.fichaForm.get('milfa') as FormGroup;
}
  // MilProm Methods
  addProm(): void {
    if (!this.isEditing && !this.formState) {
      return;
    }
     const milprom:MilProm={
      milPromStamp: this.auth.Stamp(),
        milStamp: this.fichaForm.get('milStamp')?.value,
    };
    const dialogRef = this.dialog.open(ModalPromMilitarComponent, {
      width: '800px',
      disableClose: true,
      autoFocus: false,
      data: {
        prom: { ...milprom },
        isEdit:false,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilProm) => {
      if (result) {
        // Criar novo FormGroup e adicionar ao FormArray
        const promGroup = this.fb.group({
          milPromStamp: [result.milPromStamp],
          codMilProm: [result.codMilProm],
          categoria: [result.categoria, Validators.required],
          patente: [result.patente, Validators.required],
          tipoPromocao: [result.tipoPromocao],
          dataOS: [result.dataOS],
          numOS: [result.numOS],
          obs: [result.obs],
          inseriu: [result.inseriu],
          inseriuDataHora: [result.inseriuDataHora || new Date()],
          alterou: [result.alterou],
          alterouDataHora: [result.alterouDataHora],
          patStamp: [result.patStamp],
          milStamp: [result.milStamp]
        });

        this.addToFormArray('milProm', promGroup);
        this.selectedPromIndex = this.promFormArray.length - 1;
        this.cdr.detectChanges();
        this.auth.showSnackBar('Promoção adicionada com sucesso!');
      }
    });
  }

  editProm(prom: any): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    // Converter FormGroup para objeto MilProm para passar para o modal
    const promObj: MilProm = {
      milPromStamp: prom.get('milPromStamp').value,
      codMilProm: prom.get('codMilProm').value,
      categoria: prom.get('categoria').value,
      patente: prom.get('patente').value,
      tipoPromocao: prom.get('tipoPromocao').value,
      dataOS: prom.get('dataOS').value,
      numOS: prom.get('numOS').value,
      obs: prom.get('obs').value,
      inseriu: prom.get('inseriu').value,
      inseriuDataHora: prom.get('inseriuDataHora').value,
      alterou: prom.get('alterou').value,
      alterouDataHora: prom.get('alterouDataHora').value,
      patStamp: prom.get('patStamp').value,
      milStamp: prom.get('milStamp').value
    };

    const dialogRef = this.dialog.open(ModalPromMilitarComponent, {
      width: '800px',
      disableClose: true,
      autoFocus: false,
      data: {
        prom: promObj,
        milStamp: this.fichaForm.get('milStamp')?.value,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilProm) => {
      if (result) {
        const index = this.promFormArray.controls.findIndex(
          c => c.get('milPromStamp')?.value === promObj.milPromStamp
        );

        if (index !== -1) {
          // Atualizar o FormGroup no FormArray
          const updatedGroup = this.fb.group({
            milPromStamp: [result.milPromStamp],
            codMilProm: [result.codMilProm],
            categoria: [result.categoria, Validators.required],
            patente: [result.patente, Validators.required],
            tipoPromocao: [result.tipoPromocao],
            dataOS: [result.dataOS],
            numOS: [result.numOS],
            obs: [result.obs],
            inseriu: [result.inseriu],
            inseriuDataHora: [result.inseriuDataHora || new Date()],
            alterou: [result.alterou || ''],
            alterouDataHora: [result.alterouDataHora || new Date()],
            patStamp: [result.patStamp],
            milStamp: [result.milStamp]
          });

          this.promFormArray.setControl(index, updatedGroup);
          this.updateDataSource('milProm');
          this.cdr.detectChanges();
          this.auth.showSnackBar('Promoção atualizada com sucesso!');
        }
      }
    });
  }

  deleteProm(prom: any): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.promFormArray.controls.findIndex(
          c => c.get('milPromStamp')?.value === prom.get('milPromStamp')?.value
        );

        if (index !== -1) {
          this.promFormArray.removeAt(index);
          this.updateDataSource('milProm');
          this.cdr.detectChanges();
          this.auth.showSnackBar('Promoção excluída com sucesso!');
        }
      }
    });
  }

  // MilFor Methods
  addFor(): void {
    if (!this.isEditing && !this.formState) {
      return;
    }
 const milprom:MilFor={
      milForStamp: this.auth.Stamp(),
        milStamp: this.fichaForm.get('milStamp')?.value,
    };
//  data: {
//           funcao: {...funcao},
//           isEditing: false, ...this.getMilitarInfo()
//         },

    const dialogRef = this.dialog.open(ModalForMilitarComponent, {
      width: '800px',
      data: {
          for: {...milprom},
          isEditing: false,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilFor) => {
      if (result) {
        this.forDataSource = [...this.forDataSource, result];
        this.cdr.detectChanges();
        this.auth.showSnackBar('Formação adicionada com sucesso!');
      }
    });
  }

  editFor(formacao: MilFor): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    const dialogRef = this.dialog.open(ModalForMilitarComponent, {
      width: '800px',
      data: {
          for: {...formacao},
          isEditing: false,
        milStamp: this.fichaForm.get('milStamp')?.value,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilFor) => {
      if (result) {
        const index = this.forDataSource.findIndex(d => d.milForStamp === formacao.milForStamp);
        if (index !== -1) {
          this.forDataSource[index] = result;
          this.forDataSource = [...this.forDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Formação atualizada com sucesso!');
        }
      }
    });
  }

  deleteFor(formacao: MilFor): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.forDataSource.findIndex(d => d.milForStamp === formacao.milForStamp);
        if (index !== -1) {
          this.forDataSource.splice(index, 1);
          this.forDataSource = [...this.forDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Formação excluída com sucesso!');
        }
      }
    });
  }

  // MilSitCrim Methods
  addSitCrim(): void {
    if (!this.isEditing && !this.formState) {
      return;
    }
const milprom:MilSitCrim={
      milSitCrimStamp: this.auth.Stamp(),
        milStamp: this.fichaForm.get('milStamp')?.value,
    };
//  data: {
//           funcao: {...funcao},
//           isEditing: false, ...this.getMilitarInfo()
//         },
    const dialogRef = this.dialog.open(ModalSitCrimMilitarComponent, {
      width: '800px',
      data: {
        sitCrim: { ...milprom },
        isEdit:false,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilSitCrim) => {
      if (result) {
        this.sitCrimDataSource = [...this.sitCrimDataSource, result];
        this.cdr.detectChanges();
        this.auth.showSnackBar('Situação Criminal adicionada com sucesso!');
      }
    });
  }

  editSitCrim(sitCrim: MilSitCrim): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    const dialogRef = this.dialog.open(ModalSitCrimMilitarComponent, {
      width: '800px',
      data: {
        sitCrim: { ...sitCrim },
        milStamp: this.fichaForm.get('milStamp')?.value,
        isEdit:true,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilSitCrim) => {
      if (result) {
        const index = this.sitCrimDataSource.findIndex(
          d => d.milSitCrimStamp === sitCrim.milSitCrimStamp
        );
        if (index !== -1) {
          this.sitCrimDataSource[index] = result;
          this.sitCrimDataSource = [...this.sitCrimDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Situação Criminal atualizada com sucesso!');
        }
      }
    });
  }

  deleteSitCrim(sitCrim: MilSitCrim): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.sitCrimDataSource.findIndex(
          d => d.milSitCrimStamp === sitCrim.milSitCrimStamp
        );
        if (index !== -1) {
          this.sitCrimDataSource.splice(index, 1);
          this.sitCrimDataSource = [...this.sitCrimDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Situação Criminal excluída com sucesso!');
        }
      }
    });
  }

  // MilSitDisc Methods
  addSitDisc(): void {
    if (!this.isEditing && !this.formState) {
      return;
    }
const milprom:MilSitDisc={
      milSitDiscStamp: this.auth.Stamp(),
        milStamp: this.fichaForm.get('milStamp')?.value,
    };
//  data: {
//           funcao: {...funcao},
//           isEditing: false, ...this.getMilitarInfo()
//         },
    const dialogRef = this.dialog.open(ModalSitDiscMilitarComponent, {
      width: '800px',
      data: {
        sitDisc: { ...milprom },
        isEdit:false,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilSitDisc) => {
      if (result) {
        this.sitDiscDataSource = [...this.sitDiscDataSource, result];
        this.cdr.detectChanges();
        this.auth.showSnackBar('Situação Disciplinar adicionada com sucesso!');
      }
    });
  }

  editSitDisc(sitDisc: MilSitDisc): void {
    if (!this.isEditing && !this.formState) {
      return;
    }
    const dialogRef = this.dialog.open(ModalSitDiscMilitarComponent, {
      width: '800px',
      data: {
        sitDisc: { ...sitDisc },
        milStamp: this.fichaForm.get('milStamp')?.value,
        isEdit:true,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilSitDisc) => {
      if (result) {
        const index = this.sitDiscDataSource.findIndex(
          d => d.milSitDiscStamp === sitDisc.milSitDiscStamp
        );
        if (index !== -1) {
          this.sitDiscDataSource[index] = result;
          this.sitDiscDataSource = [...this.sitDiscDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Situação Disciplinar atualizada com sucesso!');
        }
      }
    });
  }

  deleteSitDisc(sitDisc: MilSitDisc): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.sitDiscDataSource.findIndex(
          d => d.milSitDiscStamp === sitDisc.milSitDiscStamp
        );
        if (index !== -1) {
          this.sitDiscDataSource.splice(index, 1);
          this.sitDiscDataSource = [...this.sitDiscDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Situação Disciplinar excluída com sucesso!');
        }
      }
    });
  }

  // MilSitQPActivo Methods
  addSitQPActivo(): void {
    if (!this.isEditing && !this.formState) {
      return;
    }
const milprom:MilSitQPActivo={
      milSitQPActivoStamp: this.auth.Stamp(),
        milStamp: this.fichaForm.get('milStamp')?.value,
    };
    const dialogRef = this.dialog.open(ModalSitQPActivoMilitarComponent, {
      width: '800px',
      data: {
        milSitQPActivo: { ...milprom },
        isEdit:false,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilSitQPActivo) => {
      if (result) {
        this.sitQPActivoDataSource = [...this.sitQPActivoDataSource, result];
        this.cdr.detectChanges();
        this.auth.showSnackBar('Situação QP Ativo adicionada com sucesso!');
      }
    });
  }

  editSitQPActivo(sitQPActivo: MilSitQPActivo): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    const dialogRef = this.dialog.open(ModalSitQPActivoMilitarComponent, {
      width: '800px',
      data: {
        sitQPActivo: { ...sitQPActivo },
        milStamp: this.fichaForm.get('milStamp')?.value,
        isEdit:true,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilSitQPActivo) => {
      if (result) {
        const index = this.sitQPActivoDataSource.findIndex(
          d => d.milSitQPActivoStamp === sitQPActivo.milSitQPActivoStamp
        );
        if (index !== -1) {
          this.sitQPActivoDataSource[index] = result;
          this.sitQPActivoDataSource = [...this.sitQPActivoDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Situação QP Ativo atualizada com sucesso!');
        }
      }
    });
  }

  deleteSitQPActivo(sitQPActivo: MilSitQPActivo): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.sitQPActivoDataSource.findIndex(
          d => d.milSitQPActivoStamp === sitQPActivo.milSitQPActivoStamp
        );
        if (index !== -1) {
          this.sitQPActivoDataSource.splice(index, 1);
          this.sitQPActivoDataSource = [...this.sitQPActivoDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Situação QP Ativo excluída com sucesso!');
        }
      }
    });
  }

  // MilReg Methods
  addReg(): void {
    if (!this.isEditing && !this.formState) {
      return;
    }
const milprom:MilReg={
      milRegStamp: this.auth.Stamp(),
        milStamp: this.fichaForm.get('milStamp')?.value,
    };
    const dialogRef = this.dialog.open(ModalRegMilitarComponent, {
      width: '800px',
      disableClose: true,
      autoFocus: false,
      data: {
        reg: { ...milprom },
        isEdit:false,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });
    dialogRef.afterClosed().subscribe((result: MilReg) => {
      if (result) {
        // Criar novo FormGroup e adicionar ao FormArray
        const regGroup = this.fb.group({
          milRegStamp: [result.milRegStamp],
          regime: [result.regime, Validators.required],
          dataReg: [result.dataReg, Validators.required],
          numOS: [result.numOS, Validators.required],
          obs: [result.obs],
          regStamp: [result.regStamp],
          inseriu: [result.inseriu],
          inseriuDataHora: [result.inseriuDataHora || new Date()],
          alterou: [result.alterou],
          alterouDataHora: [result.alterouDataHora],
          milStamp: [result.milStamp]
        });

        this.addToFormArray('milReg', regGroup);
        this.cdr.detectChanges();
        this.auth.showSnackBar('Registro adicionado com sucesso!');
      }
    });
  }

  editReg(reg: any): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    // Converter FormGroup para objeto MilReg para passar para o modal
    const regObj: MilReg = {
      milRegStamp: reg.get('milRegStamp')?.value,
      codReg: reg.get('codReg')?.value,
      dataReg: reg.get('dataReg')?.value,
      numOS: reg.get('numOS')?.value,
      regime: reg.get('regime')?.value,
      obs: reg.get('obs')?.value,
      inseriu: reg.get('inseriu')?.value,
      inseriuDataHora: reg.get('inseriuDataHora')?.value,
      alterou: reg.get('alterou')?.value,
      alterouDataHora: reg.get('alterouDataHora')?.value,
      regStamp: reg.get('regStamp')?.value,
      milStamp: reg.get('milStamp')?.value
    };

    const dialogRef = this.dialog.open(ModalRegMilitarComponent, {
      width: '800px',
      disableClose: true,
      autoFocus: false,
      data: {
        reg: regObj,
        milStamp: this.fichaForm.get('milStamp')?.value,
        isEdit:true,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilReg) => {
      if (result) {
        const index = this.regFormArray.controls.findIndex(
          c => c.get('milRegStamp')?.value === regObj.milRegStamp
        );

        if (index !== -1) {
          // Atualizar o FormGroup no FormArray
          const updatedGroup = this.fb.group({
            milRegStamp: [result.milRegStamp],
            codReg: [result.codReg],
            regime: [result.regime, Validators.required],
            dataReg: [result.dataReg, Validators.required],
            numOS: [result.numOS, Validators.required],
            obs: [result.obs],
            regStamp: [result.regStamp],
            inseriu: [result.inseriu],
            inseriuDataHora: [result.inseriuDataHora || new Date()],
            alterou: [result.alterou || ''],
            alterouDataHora: [result.alterouDataHora || new Date()],
            milStamp: [result.milStamp]
          });

          this.regFormArray.setControl(index, updatedGroup);
          this.updateDataSource('milReg');
          this.cdr.detectChanges();
          this.auth.showSnackBar('Registro atualizado com sucesso!');
        }
      }
    });
  }

  deleteReg(reg: any): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.regFormArray.controls.findIndex(
          c => c.get('milRegStamp')?.value === reg.get('milRegStamp')?.value
        );

        if (index !== -1) {
          this.regFormArray.removeAt(index);
          this.updateDataSource('milReg');
          this.cdr.detectChanges();
          this.auth.showSnackBar('Registro excluído com sucesso!');
        }
      }
    });
  }

  // MilEspecial Methods
  addEspecial(): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

const milprom:MilEspecial={
      milEspecialStamp: this.auth.Stamp(),
        milStamp: this.fichaForm.get('milStamp')?.value,
    };
    const dialogRef = this.dialog.open(ModalEspecialMilitarComponent, {
      width: '800px',
      data: {
        especial: { ...milprom },
        isEdit:false,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilEspecial) => {
      if (result) {
        this.especialDataSource = [...this.especialDataSource, result];
        this.cdr.detectChanges();
        this.auth.showSnackBar('Especialidade adicionada com sucesso!');
      }
    });
  }

  editEspecial(especial: MilEspecial): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    const dialogRef = this.dialog.open(ModalEspecialMilitarComponent, {
      width: '800px',
      data: {
        especial: { ...especial },
        milStamp: this.fichaForm.get('milStamp')?.value,
        isEdit:true,
        ...this.getMilitarInfo() // Adiciona nome e nim do militar
      }
    });

    dialogRef.afterClosed().subscribe((result: MilEspecial) => {
      if (result) {
        const index = this.especialDataSource.findIndex(
          d => d.milEspecialStamp === especial.milEspecialStamp
        );
        if (index !== -1) {
          this.especialDataSource[index] = result;
          this.especialDataSource = [...this.especialDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Especialidade atualizada com sucesso!');
        }
      }
    });
  }

  deleteEspecial(especial: MilEspecial): void {
    if (!this.isEditing && !this.formState) {
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.especialDataSource.findIndex(
          d => d.milEspecialStamp === especial.milEspecialStamp
        );
        if (index !== -1) {
          this.especialDataSource.splice(index, 1);
          this.especialDataSource = [...this.especialDataSource];
          this.cdr.detectChanges();
          this.auth.showSnackBar('Especialidade excluída com sucesso!');
        }
      }
    });
  }

  // Helper para pegar nome e nim do militar
  getMilitarInfo() {
    return {
      nomeMilitar: this.fichaForm?.get('nome')?.value ,
      nimMilitar: this.fichaForm?.get('nim')?.value
    };
  }
}
