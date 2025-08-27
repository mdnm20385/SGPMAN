import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@core/authentication';
import { HeaderMilitarComponent } from '@core/SGPMFORMS/heade/header-militar/header-militar.component';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { condicoesprocura, selects } from 'app/classes/CampoSessoes';
import { MilFuncao } from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

// Validador customizado para data não superior à data atual
function dataMaximaHoje(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // Se não há valor, não valida
    }

    const dataInformada = new Date(control.value);
    const hoje = new Date();
    hoje.setHours(23, 59, 59, 999); // Define para o final do dia atual

    if (dataInformada > hoje) {
      return { dataFutura: { value: control.value } };
    }

    return null;
  };
}

@Component({
  selector: 'app-modal-funcao-militar',
  templateUrl: './modal-funcao-militar.component.html',
  styleUrls: ['./modal-funcao-militar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTooltipModule,
    MtxSelectModule,
    HeaderMilitarComponent,
],
  providers: [TablesRemoteDataService]
})
export class ModalFuncaoMilitarComponent implements OnInit, AfterViewInit {
  funcaoForm: FormGroup;
  isSubmitting = false;

  // Dados para os selects em cascata
  selectOrgaos: selects[] = [];
  selectUnidades: selects[] = [];
  selectSubunidades: selects[] = [];
  selectSubunidades1: selects[] = [];
  selectSubunidades2: selects[] = [];
  selectFuncoes: selects[] = [];

  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalFuncaoMilitarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService,
    private remoteSrv: TablesRemoteDataService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {

    this.isEdit = data.isEditing;
    this.funcaoForm = this.createForm();
  }

ngAfterViewInit(): void {

   try {
      // Inicializar arrays vazios para evitar erros
      this.selectOrgaos = [];
      this.selectUnidades = [];
      this.selectSubunidades = [];
      this.selectSubunidades1 = [];
      this.selectSubunidades2 = [];
      this.selectFuncoes = [];
      this.loadOrgaos();
      if (this.data) {
        this.populateForm(this.data.funcao);
      }
    } catch (error) {
      console.error('Erro na inicialização do componente:', error);
      this.showError('Erro ao inicializar o formulário');
    }
  this.cd.detectChanges();
}
  ngOnInit(): void {

  }
reloadFormData(){
   this.loadOrgaos();
}
  private createForm(): FormGroup {
    const today = new Date().toISOString().split('T')[0];
    const defaultDate = '1900-01-01';
    return this.fb.group({
      milFuncaoStamp: [this.data?.funcao.milFuncaoStamp],
      milStamp: [this.data?.funcao.milStamp],
      codMilFuncao: [0],
      funcao: [''],
      numOS: [''],
      dataOS: [defaultDate],
      dataInicio: [today, [Validators.required, dataMaximaHoje()]],
      dataTermino: [defaultDate],
      obs: [''],
      orgao: ['', [Validators.required]],
      unidade: ['', [Validators.required]],
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
      alterouDataHora: [new Date()],
      nimMilitar: [ this.data?.nimMilitar || ''],
      nomeMilitar: [ this.data?.nomeMilitar || ''],
    });
  }

  isEdit: boolean = false;
  private populateForm(funcao: MilFuncao): void {

    const defaultDate = '1900-01-01';
    // Format the dates to ISO string if they exist
    const formattedFuncao = {
      ...funcao,
      dataOS: funcao.dataOS ? new Date(funcao.dataOS).toISOString().split('T')[0] : defaultDate,
      dataInicio: funcao.dataInicio ? new Date(funcao.dataInicio).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      dataTermino: funcao.dataTermino ? new Date(funcao.dataTermino).toISOString().split('T')[0] : defaultDate
    };

    // 1. Patch órgão e orgaoStamp primeiro
this.funcaoForm.get('orgao')?.setValue(formattedFuncao.orgao ?? '');
this.funcaoForm.get('orgaoStamp')?.setValue(formattedFuncao.orgaoStamp ?? '');

// 2. Carregue as unidades e, após o carregamento, patch unidade e unidadeStamp
if (funcao.orgaoStamp) {
  this.loadUnidades(funcao.orgaoStamp);
  setTimeout(() => {
    this.funcaoForm.get('unidade')?.setValue(formattedFuncao.unidade ?? '');
    this.funcaoForm.get('unidadeStamp')?.setValue(formattedFuncao.unidadeStamp ?? '');
    // 3. Carregue subunidades e patch subunidade e subunidadeStamp
    if (funcao.unidadeStamp) {
      this.loadSubunidades(funcao.unidadeStamp);
      setTimeout(() => {
        this.funcaoForm.get('subunidade')?.setValue(formattedFuncao.subunidade ?? '');
        this.funcaoForm.get('subunidadeStamp')?.setValue(formattedFuncao.subunidadeStamp ?? '');
        // 4. Carregue subunidades1 e patch subunidade1 e subunidade1Stamp
        if (funcao.subunidadeStamp) {
          this.loadSubunidades1(funcao.subunidadeStamp);
          setTimeout(() => {
            this.funcaoForm.get('subunidade1')?.setValue(formattedFuncao.subunidade1 ?? '');
            this.funcaoForm.get('subunidade1Stamp')?.setValue(formattedFuncao.subunidade1Stamp ?? '');
            // 5. Carregue subunidades2 e patch subunidade2 e subunidade2Stamp
            if (funcao.subunidade1Stamp) {
              this.loadSubunidades2(funcao.subunidade1Stamp);
              setTimeout(() => {
                this.funcaoForm.get('subunidade2')?.setValue(formattedFuncao.subunidade2 ?? '');
                this.funcaoForm.get('subunidade2Stamp')?.setValue(formattedFuncao.subunidade2Stamp ?? '');
              }, 200);
            }
          }, 200);
        }
      }, 200);
    }
  }, 200);
}
// Patch os demais campos normalmente
Object.keys(this.funcaoForm.controls).forEach(key => {
  if (!['orgao', 'orgaoStamp', 'unidade', 'unidadeStamp', 'subunidade', 'subunidadeStamp', 'subunidade1', 'subunidade1Stamp', 'subunidade2', 'subunidade2Stamp'].includes(key)) {
    if (Object.prototype.hasOwnProperty.call(formattedFuncao, key)) {
      this.funcaoForm.get(key)?.setValue((formattedFuncao as any)[key] ?? '');
    }
  }
});
this.cd.detectChanges();
  }

  // Carregar Órgãos
  loadOrgaos(): void {
    this.loading = true;
    const condicao: condicoesprocura = {
      tabela: 'orgao',
      campo1: 'descricao',
      campo2: 'codOrgao',
      condicao: '',
      campochave: 'orgaoStamp'
    };

    this.remoteSrv.getSelection(condicao).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectOrgaos = data.dados.selects;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showError('Erro ao carregar órgãos');
      }
    });
  }

  // This empty block is intentionally removed

  // Carregar Unidades baseadas no Órgão selecionado
  loadUnidades(orgaoStamp: string): void {
    this.clearDependentSelections('unidade');

    if (!orgaoStamp || orgaoStamp.trim() === '') {
      return;
    }

    this.loading = true;
    const condicao: condicoesprocura = {
      tabela: 'unidade',
      campo1: 'descricao',
      campo2: 'codunidade',
      condicao: `orgaoStamp='${orgaoStamp}'`,
      campochave: 'unidadeStamp'
    };

    this.remoteSrv.getSelection(condicao).subscribe({
      next: (data) => {
        if (data && data.sucesso && data.dados && data.dados.selects) {
          this.selectUnidades = data.dados.selects;
        } else {
          this.selectUnidades = [];
        }
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.selectUnidades = [];
        console.warn('Erro ao carregar unidades:', error);
        this.showError('Erro ao carregar unidades');
      }
    });
  }

  // Carregar Subunidades baseadas na Unidade selecionada
  loadSubunidades(unidadeStamp: string): void {
    this.clearDependentSelections('subunidade');

    if (!unidadeStamp) return;

    this.loading = true;
    const condicao: condicoesprocura = {
      tabela: 'Subunidade',
      campo1: 'descricao',
      campo2: 'codSubunidade',
      condicao: `unidadeStamp='${unidadeStamp}'`,
      campochave: 'SubunidadeStamp'
    };

    this.remoteSrv.getSelection(condicao).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectSubunidades = data.dados.selects;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showError('Erro ao carregar subunidades');
      }
    });
  }

  // Carregar Subunidades1 baseadas na Subunidade selecionada
  loadSubunidades1(subunidadeStamp: string): void {
    this.clearDependentSelections('subunidade1');

    if (!subunidadeStamp) return;

    this.loading = true;
    const condicao: condicoesprocura = {
      tabela: 'Subunidade1',
      campo1: 'descricao',
      campo2: 'codSubunidade1',
      condicao: `subunidadeStamp='${subunidadeStamp}'`,
      campochave: 'subunidade1Stamp'
    };

    this.remoteSrv.getSelection(condicao).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectSubunidades1 = data.dados.selects;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showError('Erro ao carregar subunidades1');
      }
    });
  }

  // Carregar Subunidades2 baseadas na Subunidade1 selecionada
  loadSubunidades2(subunidade1Stamp: string): void {
    this.clearDependentSelections('subunidade2');

    if (!subunidade1Stamp) return;

    this.loading = true;
    const condicao: condicoesprocura = {
      tabela: 'Subunidade2',
      campo1: 'descricao',
      campo2: 'codSubunidade2',
      condicao: `subunidade1Stamp='${subunidade1Stamp}'`,
      campochave: 'descricao'
    };

    this.remoteSrv.getSelection(condicao).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.selectSubunidades2 = data.dados.selects;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showError('Erro ao carregar subunidades2');
      }
    });
  }

  // Event handlers para mudanças em cascata
  onOrgaoChange(event: any): void {
    if (!event) {
      return;
    }

    try {
      this.funcaoForm.patchValue({
        orgao: event.descricao || '',
        orgaoStamp: event.chave || ''
      });

      if (event.chave) {
        this.loadUnidades(event.chave);
      }
    } catch (error) {
      console.warn('Erro ao processar mudança de órgão:', error);
    }
  }

  onUnidadeChange(event: any): void {
    if (!event) {
      return;
    }

    try {
      this.funcaoForm.patchValue({
        unidade: event.descricao || '',
        unidadeStamp: event.chave || ''
      });

      if (event.chave) {
        this.loadSubunidades(event.chave);
      }
    } catch (error) {
      console.warn('Erro ao processar mudança de unidade:', error);
    }
  }

  onSubunidadeChange(event: any): void {
    if (!event) {
      return;
    }

    try {
      this.funcaoForm.patchValue({
        subunidade: event.descricao || '',
        subunidadeStamp: event.chave || ''
      });

      if (event.chave) {
        this.loadSubunidades1(event.chave);
      }
    } catch (error) {
      console.warn('Erro ao processar mudança de subunidade:', error);
    }
  }

  onSubunidade1Change(event: any): void {
    if (!event) {
      return;
    }

    try {
      this.funcaoForm.patchValue({
        subunidade1: event.descricao || '',
        subunidade1Stamp: event.chave || ''
      });

      if (event.chave) {
        this.loadSubunidades2(event.chave);
      }
    } catch (error) {
      console.warn('Erro ao processar mudança de subunidade1:', error);
    }
  }

  onSubunidade2Change(event: any): void {
    if (!event) {
      return;
    }

    try {
      this.funcaoForm.patchValue({
        subunidade2: event.descricao || '',
        subunidade2Stamp: event.chave || ''
      });
    } catch (error) {
      console.warn('Erro ao processar mudança de subunidade2:', error);
    }
  }

  onFuncaoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!value) {
      return;
    }

    try {
      this.funcaoForm.patchValue({
        funcao: value
      });
    } catch (error) {
      console.warn('Erro ao processar mudança de função:', error);
    }
  }

  // Métodos de limpeza
  clearOrgao(): void {
    try {
      this.funcaoForm.patchValue({
        orgao: '',
        orgaoStamp: ''
      });
      this.clearDependentSelections('unidade');
    } catch (error) {
      console.warn('Erro ao limpar órgão:', error);
    }
  }

  clearUnidade(): void {
    try {
      this.funcaoForm.patchValue({
        unidade: '',
        unidadeStamp: ''
      });
      this.clearDependentSelections('subunidade');
    } catch (error) {
      console.warn('Erro ao limpar unidade:', error);
    }
  }

  clearSubunidade(): void {
    try {
      this.selectSubunidades = [];
      this.funcaoForm.patchValue({
        subunidade: '',
        subunidadeStamp: ''
      });
      this.clearSubunidade1();
    } catch (error) {
      console.warn('Erro ao limpar subunidade:', error);
    }
  }

  clearSubunidade1(): void {
    try {
      this.selectSubunidades1 = [];
      this.funcaoForm.patchValue({
        subunidade1: '',
        subunidade1Stamp: ''
      });
      this.clearSubunidade2();
    } catch (error) {
      console.warn('Erro ao limpar subunidade1:', error);
    }
  }

  clearSubunidade2(): void {
    try {
      this.selectSubunidades2 = [];
      this.funcaoForm.patchValue({
        subunidade2: '',
        subunidade2Stamp: ''
      });
    } catch (error) {
      console.warn('Erro ao limpar subunidade2:', error);
    }
  }

  clearFuncao(): void {
    try {
      this.funcaoForm.patchValue({
        funcao: ''
      });
    } catch (error) {
      console.warn('Erro ao limpar função:', error);
    }
  }

  // Limpar seleções dependentes
  private clearDependentSelections(from: string): void {
    try {
      if (!this.funcaoForm) {
        console.warn('Formulário não inicializado');
        return;
      }

      switch (from) {
        case 'unidade':
          this.selectUnidades = [];
          this.funcaoForm.patchValue({
            unidade: '',
            unidadeStamp: ''
          });
          this.clearSubunidade();
          break;
        case 'subunidade':
          this.clearSubunidade();
          break;
        case 'subunidade1':
          this.clearSubunidade1();
          break;
        case 'subunidade2':
          this.clearSubunidade2();
          break;
        default:
          console.warn('Tipo de limpeza não reconhecido:', from);
      }
    } catch (error) {
      console.warn('Erro ao limpar seleções dependentes:', error);
    }
  }

  // Salvar função
  salvar(): void {
    if (this.funcaoForm.invalid) {
      this.showError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.isSubmitting = true;
    const { nimMilitar, nomeMilitar, ...rest } = this.funcaoForm.value;
    const formValue = {
      ...rest,
      dataOS: this.funcaoForm.get('dataOS')?.value ? new Date(this.funcaoForm.get('dataOS')?.value).toISOString() : new Date('1900-01-01').toISOString(),
      dataInicio: new Date(this.funcaoForm.get('dataInicio')?.value).toISOString(),
      dataTermino: this.funcaoForm.get('dataTermino')?.value ? new Date(this.funcaoForm.get('dataTermino')?.value).toISOString() : new Date('1900-01-01').toISOString()
    };

    // Adicionar dados de auditoria
    const usuario = this.auth.obterSessao();
    if (!this.data) {
      // Novo registro
      formValue.inseriu = usuario?.nome || usuario?.login || '';
      formValue.inseriuDataHora = new Date();
    } else {
      // Edição
      formValue.alterou = usuario?.nome || usuario?.login || '';
      formValue.alterouDataHora = new Date();
    }

    this.dialogRef.close(formValue);
  }

  // Cancelar
  cancelar(): void {
    this.dialogRef.close();
  }

  // Mostrar erro
  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
