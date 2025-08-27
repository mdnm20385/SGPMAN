import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MilDoc } from 'app/classes/SGPM/Models';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { HeaderMilitarComponent } from '@core/SGPMFORMS/heade/header-militar/header-militar.component';
import { condicoesprocura } from 'app/classes/CampoSessoes';

@Component({
  selector: 'app-modal-documento-militar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    HeaderMilitarComponent
],
  templateUrl: './modal-documento-militar.component.html',
  styleUrls: ['./modal-documento-militar.component.scss'],
  providers: [TablesRemoteDataService]
})
export class ModalDocumentoMilitarComponent implements OnInit,
 AfterViewInit {
  form: FormGroup;
  isEdit: boolean = false;
  isSubmitting = false;
  loading = false;
  tipoDocumentoOptions: string[] = [];
  provinciasOptions: string[] = [];
  selectProvincias: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalDocumentoMilitarComponent>,
    private remoteSrv: TablesRemoteDataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private cd: ChangeDetectorRef
  ) {
    this.isEdit = data.isEdit;
    const documento = this.data.documento || {};
    this.form = this.fb.group({
      tipoDocumento: [documento.tipoDocumento || '', [Validators.required]],
      numeroDoc: [documento.numeroDoc || '', [Validators.required]],
      localemissao: [documento.localemissao || '', [Validators.required]],
      dataemissao: [documento.dataemissao || '', [Validators.required]],
      datavalid: [documento.datavalid || '', [Validators.required]],
      milDocStamp: [documento.milDocStamp || ''],
      codMilDoc: [documento.codMilDoc || 0],
      milStamp: [documento.milStamp || ''],
      inseriu: [documento.inseriu || ''],
      inseriuDataHora: [documento.inseriuDataHora || new Date()],
      alterou: [documento.alterou || ''],
      alterouDataHora: [documento.alterouDataHora || null],
    nimMilitar:  [this.data?.nimMilitar] ,
    nomeMilitar: [this.data?.nomeMilitar]
    });
  }
reloadFormData(): void{
  this.loadTipoDocumentoFromBusca();
this.loadProvincias();

}
  ngOnInit(): void {
    // Update tipoDocumentoOptions from parent

  }

  loadTipoDocumentoFromBusca(): void {
   this.tipoDocumentoOptions = this.data.tipoDocumentoOptions;
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

ngAfterViewInit(): void {

  this.loadTipoDocumentoFromBusca();
    // Load provinces for local de emissão
    this.loadProvincias();
    // Quando a data de emissão mudar, adiciona 5 anos para a data de validade
    const dataEmissaoControl = this.form.get('dataemissao');
    if (dataEmissaoControl) {
      dataEmissaoControl.valueChanges.subscribe(value => {
        if (value) {
          try {
            const dataEmissao = new Date(value);
            if (!isNaN(dataEmissao.getTime())) {
              const dataValidade = new Date(dataEmissao);
              dataValidade.setFullYear(dataValidade.getFullYear() + 5);
              this.form.patchValue({
                datavalid: dataValidade.toISOString().split('T')[0]
              }, { emitEvent: false });
            }
          } catch (error) {
            console.error('Error processing date:', error);
          }
        }
      });
    }
  const formattedFuncao = {
    nimMilitar: this.data?.nimMilitar || '',
    nomeMilitar: this.data?.nomeMilitar || '',
   };
  this.form.patchValue(formattedFuncao);
  this.cd.detectChanges();}
  onSubmit(): void {
    if (this.form?.valid) {
      const formValue = this.form.getRawValue();
      // Ensure all required fields are present
      if (formValue.tipoDocumento &&
          formValue.numeroDoc &&
          formValue.localemissao &&
          formValue.dataemissao &&
          formValue.datavalid) {
        this.dialogRef.close(formValue);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Helper method to safely get form control
  getFormControl(name: string) {
    return this.form?.get(name);
  }

  loadProvincias(): void {
    this.loading = true;
    const se = {
      tabela: 'Provincia',
      campo1: 'descricao',
      campo2: 'provinciaStamp',
      condicao: '1=1',
      campochave: 'provinciaStamp'
    };

    this.remoteSrv.getSelection(se).subscribe({
      next: (data: any) => {
        if (data.sucesso) {
          this.selectProvincias = data.dados.selects;
          this.provinciasOptions = this.selectProvincias
            .map((p: any) => p.descricao)
            .filter((descricao: string) => descricao && descricao.trim() !== '');
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar províncias:', error);
        this.loading = false;
      }
    });
  }
}
