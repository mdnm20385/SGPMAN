import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth.service';
import { Usuario } from '@core/interface';
import { Provincia } from 'app/classes/ClassesSIGEX';
import { Objecto } from 'app/classes/Resposta';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Pais } from 'app/classes/Facturacao/Facturacao';
import { Procura } from 'app/classes/Procura';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';
import { finalize } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-prov',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './modal-prov.component.html',
  styleUrl: './modal-prov.component.scss',
  providers: [TablesRemoteDataService],
})
export class ModalProvComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA, { optional: true });
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MtxDialog);
  private readonly remoteSrv = inject(TablesRemoteDataService);
  isSubmitting = signal(false);

  //paises = signal<Pais[]>([]);

  provForm = this.fb.nonNullable.group({
    provinciaStamp: [''],
    codProv: [''],
    descricao: ['', [Validators.required]],
    inseriu: [''],
    inseriuDataHora: [''],
    alterou: [''],
    alterouDataHora: [''],
    paisStamp: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.data?.record) {
      this.provForm.patchValue({
        provinciaStamp: this.data.record.provinciaStamp,
        codProv: this.data.record.codProv,
        descricao: this.data.record.descricao,
        paisStamp: this.data.record.paisStamp,
      });
    }


    this.carregarPaises();
  }
  paises: { paisStamp: string, descricao: string }[] = [];
  carregarPaises() {
this.paises = [
    { paisStamp: '1', descricao: 'Angola' },
    { paisStamp: '2', descricao: 'Brasil' },
    { paisStamp: '3', descricao: 'Portugal' }
  ];
    
  }

  gravar() {
    if (this.auth.isAutenticated() === false) {
      return;
    }
    const usuario = this.auth.obterSessao() as Usuario;
    const prov: Provincia = {
      provinciaStamp: this.provForm.get('provinciaStamp')!.value,
      codProv: this.provForm.get('codProv')!.value,
      descricao: this.provForm.get('descricao')!.value,
      paisStamp: this.provForm.get('paisStamp')!.value,
      inseriu: usuario.nome!,
      inseriuDataHora: this.auth.ConvertDate(new Date()),
      alterou: usuario.nome!,
      alterouDataHora: this.auth.ConvertDate(new Date()),
    };

    const entrda: Objecto = {
      dados: prov,
      tabela: 'provincia',
      condicao: 'vazio',
      sucesso: false,
    };

    this.auth
      .InserirAlterarObjecto(entrda)
      .pipe()
      .subscribe({
        next: data => {
          if (data.sucesso == true) {
            this.dialog.alert(`Operação executada com sucesso!`);
            this.dialogRef.close();
          } else {
            this.dialog.alert(`Operação não executada! código do erro` + data.mensagem);
          }
        },
        error: (errorRes: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.dialog.alert(`Operação não executada! código do erro` + errorRes.status);
        },
      });
  }
}
