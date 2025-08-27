import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { HeaderMilitarComponent } from '@core/SGPMFORMS/heade/header-militar/header-militar.component';

@Component({
  selector: 'app-modal-lingua-militar',
  templateUrl: './modal-lingua-militar.component.html',
  styleUrls: ['./modal-lingua-militar.component.scss'],
  standalone: true,
  providers: [TablesRemoteDataService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatCardModule,
    MatDatepickerModule,
    MtxSelectModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatCheckboxModule,
          HeaderMilitarComponent
  ]
})
export class ModalLinguaMilitarComponent implements OnInit {
  linguaForm!: FormGroup;
  isSubmitting = false;
    autocompleteOptions: { [key: string]: string[] } = {
      lingua: [],
      fala: [],
      leitura: [],
      escrita: [],
      compreensao: []
    };
      filteredOptions: { [key: string]: string[] } = {
        lingua: [],
        fala: [],
        leitura: [],
        escrita: [],
        compreensao: []
      };

  constructor(
    private fb: FormBuilder,
        private remoteSrv: TablesRemoteDataService,
    private dialogRef: MatDialogRef<ModalLinguaMilitarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      // Adicione o serviço remoto aqui, exemplo:
      // private remoteSrv: RemoteService
    }
isEdit:boolean=false;
  ngOnInit(): void {
this.isEdit=this.data.isEdit;
    this.linguaForm = this.fb.group({
      lingua: [this.data?.lingua || '', Validators.required],
      fala: [this.data?.fala || '', Validators.required],
      leitura: [this.data?.leitura || '', Validators.required],
      escrita: [this.data?.escrita || '', Validators.required],
    compreensao: [this.data?.compreensao || '', Validators.required],
        materna: [this.data?.materna || false],
      nimMilitar: [ this.data?.nimMilitar || ''],
      nomeMilitar: [ this.data?.nomeMilitar || ''],
    });

      this.loadAutocompleteOptions('lingua', 8);
      this.loadAutocompleteOptions('fala', 9);
      this.loadAutocompleteOptions('leitura', 10);
      this.loadAutocompleteOptions('escrita', 11);
    this.loadAutocompleteOptions('compreensao', 12);
['lingua', 'fala', 'leitura', 'escrita', 'compreensao'].forEach(field => {
  this.linguaForm.get(field)?.valueChanges.subscribe(value => {
    this.filteredOptions[field] = this.filterOptions(field, value);
  });
});
    }


    // Filtro reativo para cada campo


  filterOptions(field: string, value: string): string[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.autocompleteOptions[field].filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }


    loadAutocompleteOptions(field: string, numTabela: number): void {
      const se = {
        tabela: 'busca',
        campo1: 'descricao',
        campo2: 'codBusca',
        condicao: `numTabela=${numTabela}`,
        campochave: 'descricao'
      };
 this.remoteSrv.getSelection(se).subscribe({
          next: (result: any) => {
            const arr = result?.dados?.selects && Array.isArray(result.dados.selects)
              ? result.dados.selects
              : [];
            this.autocompleteOptions[field] = arr.map((c: any) => c.descricao);
              this.filteredOptions[field] = this.autocompleteOptions[field];

          },
          error: (e: any) => {
            this.autocompleteOptions[field] = [];
          }
        });

    }

    salvar(): void {
      if (this.linguaForm.invalid) {
        return;
      }
      this.isSubmitting = true;
  const { nimMilitar, nomeMilitar, ...rest } = this.linguaForm.value;
  this.dialogRef.close(rest);
    }

    cancelar(): void {
      this.dialogRef.close(null);
    }
}
