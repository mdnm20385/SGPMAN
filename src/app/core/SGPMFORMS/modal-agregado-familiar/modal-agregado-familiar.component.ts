import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MilAgre } from 'app/classes/SGPM/Models';
import { HeaderMilitarComponent } from '../heade/header-militar/header-militar.component';
import { condicoesprocura, selects } from 'app/classes/CampoSessoes';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';



@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    HeaderMilitarComponent,
    MatAutocompleteModule
],
providers: [
  {
    provide: TablesRemoteDataService,
    useClass: TablesRemoteDataService
  }
],
  selector: 'app-modal-agregado-familiar',
  templateUrl: './modal-agregado-familiar.component.html',
  styleUrls: ['./modal-agregado-familiar.component.scss'],
})
export class ModalAgregadoFamiliarComponent implements AfterViewInit {
  agreForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalAgregadoFamiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private remoteSrv: TablesRemoteDataService,
        private cdr: ChangeDetectorRef,
  ) {
    this.isEdit = data.isEdit;
    this.agreForm = this.fb.group({
      milAgreStamp: [data.agre?.milAgreStamp || ''],
      codMilAgre: [data.agre?.codMilAgre || null],
      nome: [data.agre?.nome || '', [Validators.required, Validators.maxLength(255)]],
      grau: [data.agre?.grau || '', [Validators.required, Validators.maxLength(100)]],
      nascData: [data.agre?.nascData || null, Validators.required],
      nascProv: [data.agre?.nascProv || ''],
      codNascProv: [data.agre?.codNascProv || null],
      resProv: [data.agre?.resProv || ''],
      codResProv: [data.agre?.codResProv || null],
      resDist: [data.agre?.resDist || ''],
      codResDist: [data.agre?.codResDist || null],
      resPosto: [data.agre?.resPosto || ''],
      codResPostAdm: [data.agre?.codResPostAdm || null],
      resLocal: [data.agre?.resLocal || ''],
      codResLocal: [data.agre?.codResLocal || null],
      resBairro: [data.agre?.resBairro || ''],
      telefone: [data.agre?.telefone || ''],
      obs: [data.agre?.obs || '', [Validators.maxLength(255)]],
      inseriu: [data.agre?.inseriu || ''],
      inseriuDataHora: [data.agre?.inseriuDataHora || new Date()],
      alterou: [data.agre?.alterou || ''],
      alterouDataHora: [data.agre?.alterouDataHora || new Date()],
      milStamp: [data.agre?.milStamp || ''],
    nimMilitar:  [this.data?.nimMilitar] ,
    nomeMilitar: [this.data?.nomeMilitar]
    });
        this.loadProvincias();
  }

  ngAfterViewInit(): void {
        this.Refresh();
  }
  Refresh(): void {
  this.loadProvincias();
  // Initialize filtered observables for autocomplete
  this.initializeAutocompleteFilters();
  this.cdr.detectChanges();
}
 // Método específico para limpar localizações com cascata
  clearLocationSelection(controlName: string, type: 'nasc' | 'res' | 'inc'): void {
    try {
      const control = this.agreForm.get(controlName);
      if (control) {
        control.setValue('', { emitEvent: false });
        control.markAsTouched();
        control.updateValueAndValidity();
     if (controlName.includes('Prov')) {
          // Clearing province - clear all dependents
          if (type === 'nasc') {
            this.nascDistritoOptions = [];
            this.nascPostoOptions = [];
            this.nascLocalidadeOptions = [];
                } else if (type === 'res') {
            this.resDistritoOptions = [];
            this.resPostoOptions = [];
            this.resLocalidadeOptions = [];
            this.agreForm.get('resDist')?.setValue('', { emitEvent: false });
            this.agreForm.get('resPosto')?.setValue('', { emitEvent: false });
            this.agreForm.get('resLocal')?.setValue('', { emitEvent: false });
          }
        } else if (controlName.includes('Dist')) {
          // Clearing district - clear posto and localidade
          if (type === 'res') {
            this.resPostoOptions = [];
            this.resLocalidadeOptions = [];
            this.agreForm.get('resPosto')?.setValue('', { emitEvent: false });
            this.agreForm.get('resLocal')?.setValue('', { emitEvent: false });
          } else if (type === 'inc') {
            this.incPostoOptions = [];
            this.incLocalidadeOptions = [];
            this.agreForm.get('incPosto')?.setValue('', { emitEvent: false });
            this.agreForm.get('incLocal')?.setValue('', { emitEvent: false });
          }
        } else if (controlName.includes('Posto')) {
          // Clearing posto - clear localidade
          if (type === 'nasc') {
            this.nascLocalidadeOptions = [];
            this.agreForm.get('nascLocal')?.setValue('', { emitEvent: false });
          } else if (type === 'res') {
            this.resLocalidadeOptions = [];
            this.agreForm.get('resLocal')?.setValue('', { emitEvent: false });
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

  initializeAutocompleteFilters(): void {
    const nascProvControl = this.agreForm.get('nascProv');
    if (nascProvControl) {
      this.filteredProvinciasNasc = nascProvControl.valueChanges.pipe(
        startWith(nascProvControl.value || ''),
        map(value => this._filter(value || '', this.provinciasOptions))
      );
    }
    const resProvControl = this.agreForm.get('resProv');
    if (resProvControl) {
      this.filteredProvinciasRes = resProvControl.valueChanges.pipe(
        startWith(resProvControl.value || ''),
        map(value => this._filter(value || '', this.provinciasOptions))
      );
    }
    const resDistControl = this.agreForm.get('resDist');
    if (resDistControl) {
      this.filteredDistritosRes = resDistControl.valueChanges.pipe(
        startWith(resDistControl.value || ''),
        map(value => this._filter(value || '', this.resDistritoOptions))
      );
    }
    const resPostoControl = this.agreForm.get('resPosto');
    if (resPostoControl) {
      this.filteredPostosRes = resPostoControl.valueChanges.pipe(
        startWith(resPostoControl.value || ''),
        map(value => this._filter(value || '', this.resPostoOptions))
      );
    }
    const resLocalControl = this.agreForm.get('resLocal');
    if (resLocalControl) {
      this.filteredLocalidadesRes = resLocalControl.valueChanges.pipe(
        startWith(resLocalControl.value || ''),
        map(value => this._filter(value || '', this.resLocalidadeOptions))
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
  // Métodos para limpar seleções
  clearSelection(controlName: string): void {
    try {
      const control = this.agreForm.get(controlName);
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
  // Método para reinicializar filtros específicos
  private reinitializeSpecificFilter(controlName: string): void {

  //
  }

  clearSelectionWithReset(controlName: string, autocomplete: any): void {
    // Centro Treino clear
    if (controlName === 'centroTreino') {
      this.agreForm.get('centroTreino')?.setValue('');
      if (autocomplete && autocomplete.isOpen) {
        autocomplete.closePanel();
      }
      return;
    }
    // Curso Treino clear
    if (controlName === 'cursoTreino') {
      this.agreForm.get('cursoTreino')?.setValue('');
      if (autocomplete && autocomplete.isOpen) {
        autocomplete.closePanel();
      }
      return;
    }
    // Especialidade clear
    if (controlName === 'adquirEspecial') {
      this.agreForm.get('adquirEspecial')?.setValue('');
      if (autocomplete && autocomplete.isOpen) {
        autocomplete.closePanel();
      }
      return;
    }
    // Generic clear with reset
    try {
      const control = this.agreForm.get(controlName);
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
      const control = this.agreForm.get(controlName);
      if (control) {
        if (controlName === 'ramo') {
         //
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

          if (type === 'res') {

            this.selectPostosRes = data.dados.selects;
            this.resPostoOptions = this.selectPostosRes.map(p => p.descricao);
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
  private reinitializeLocationFilter(controlName: string, type: 'nasc' | 'res' | 'inc'): void {
    let control: any;
    let options: string[] = [];

    switch (controlName) {
      case 'nascDist':
        control = this.agreForm.get('nascDist');
        options = this.nascDistritoOptions;
        if (control) {
          this.filteredDistritosNasc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'nascPosto':
        control = this.agreForm.get('nascPosto');
        options = this.nascPostoOptions;
        if (control) {
          this.filteredPostosNasc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'resDist':
        control = this.agreForm.get('resDist');
        options = this.resDistritoOptions;
        if (control) {
          this.filteredDistritosRes = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'resPosto':
        control = this.agreForm.get('resPosto');
        options = this.resPostoOptions;
        if (control) {
          this.filteredPostosRes = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'resLocalidade':
        control = this.agreForm.get('resLocalidade');
        options = this.resLocalidadeOptions;
        if (control) {
          this.filteredLocalidadesRes = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'incDist':
        control = this.agreForm.get('incDist');
        options = this.incDistritoOptions;
        if (control) {
          this.filteredDistritosInc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'incPosto':
        control = this.agreForm.get('incPosto');
        options = this.incPostoOptions;
        if (control) {
          this.filteredPostosInc = control.valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value || '', options))
          );
        }
        break;
      case 'incLocal':
        control = this.agreForm.get('incLocal');
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
  onProvinciaSelected(provincia: string,
     type: 'nasc' | 'res' | 'inc'): void {
    const selectedProvincia = this.selectProvincias.find(p => p.descricao === provincia);

    if (!selectedProvincia) return;

    // Clear dependent fields
    if (type === 'nasc') {
      this.nascDistritoOptions = [];
      this.nascPostoOptions = [];
      this.nascLocalidadeOptions = [];

    //  this.agreForm.get('nascDist')?.setValue('', { emitEvent: false });
        } else if (type === 'res') {

      this.resDistritoOptions = [];
      this.resPostoOptions = [];
      this.resLocalidadeOptions = [];
      this.agreForm.get('resDist')?.setValue('', { emitEvent: false });
      this.agreForm.get('resPosto')?.setValue('', { emitEvent: false });
      this.agreForm.get('resLocalidade')?.setValue('', { emitEvent: false });
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
    if (type === 'res') {
      this.resPostoOptions = [];
      this.resLocalidadeOptions = [];
      this.agreForm.get('resPosto')?.setValue('', { emitEvent: false });
      this.agreForm.get('resLocal')?.setValue('', { emitEvent: false });
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
      this.agreForm.get('nascLocal')?.setValue('', { emitEvent: false });
    } else if (type === 'res') {
      this.resLocalidadeOptions = [];
      this.agreForm.get('resLocalidade')?.setValue('', { emitEvent: false });
    } else if (type === 'inc') {
      this.incLocalidadeOptions = [];
      this.agreForm.get('incLocal')?.setValue('', { emitEvent: false });
    }

    // Load localidades for selected posto
    this.loadLocalidades(selectedPosto.chave, type);

    this.cdr.detectChanges();
  }
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
          const provinciasOptions =
          this.selectProvincias.map(p => p.descricao);
          this.provinciasOptions=  provinciasOptions;
          this.nascProvinciaOptions = provinciasOptions;
          this.resProvinciaOptions = provinciasOptions;
          this.incProvinciaOptions = provinciasOptions;
          this.initializeAutocompleteFilters(); //
          this.cdr.detectChanges();
        }
      },
      error: (e) => {
        console.error('Erro ao carregar províncias:', e);
      }
    });
  }
  salvar(): void {
    if (this.agreForm.valid) {
      this.dialogRef.close(this.agreForm.value);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
