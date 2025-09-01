import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { Usuario } from '@core/interface';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { Pais } from 'app/classes/Facturacao/Facturacao';
import { Objecto } from 'app/classes/Resposta';

@Component({
  selector: 'app-modal-pais',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MtxButtonModule,
    MatIconModule,
    MtxSelectModule,
    CommonModule,
  ],
  templateUrl: './modal-pais.component.html',
  styleUrl: './modal-pais.component.scss',
})
export class ModalPaisComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MtxDialog);
  visivel = signal(false);
  isSubmitting= signal(false);

  paisForm = this.fb.nonNullable.group({
    paisStamp: ['', [Validators.required]],
    codPais: [0],
    descricao: ['', [Validators.required]],
    abreviatura: '',
    nacional: false,
    pordefeito: false,
  });
  

  ngOnInit(): void {
    
    this.paisForm.patchValue({
      paisStamp: this.data.record.paisStamp,
      codPais: this.data.record.codPais,
      descricao: this.data.record.descricao,
      abreviatura: this.data.record.abreviatura,    
      nacional: this.data.record.nacional,          
      pordefeito: this.data.record.pordefeito,      
    });
  }


  gravar() {
    if (this.auth.isAutenticated() === false) {
      return;
    }
    const usuario = this.auth.obterSessao() as Usuario;

    const paises:Pais={
      paisStamp: this.paisForm.get('paisStamp')!.value,
      codPais: this.paisForm.get('codPais')!.value.toString(),
      descricao: this.paisForm.get('descricao')!.value,
      abreviatura: this.paisForm.get('abreviatura')!.value,
      nacional: this.paisForm.get('nacional')!.value,
      pordefeito: this.paisForm.get('pordefeito')!.value,
      inseriu: usuario.nome,
      inseriuDataHora:  this.auth.ConvertDate(new Date()),
      alterou: usuario.nome!,
      alterouDataHora: this.auth.ConvertDate(new Date())
    }

    const entrda:Objecto={
          dados: paises,
          tabela: 'pais',
          condicao: 'vazio',
          sucesso: false
        };
    
    this.auth
          .InserirAlterarObjecto(entrda)
          .pipe()
          .subscribe({
            next: (data) => {
              if(data.sucesso==true){
                this.dialog.alert(`Operação executada com sucesso!`);
                this.dialogRef.close();
              }else{
                this.dialog.alert(`Operação não executada! código do erro` +data.mensagem);
              }
            },
            error: (errorRes: HttpErrorResponse) => {
              this.isSubmitting.set(false);
              this.dialog.alert(`Operação não executada! código do erro` +errorRes.status);
            },
          });
      }
  }

