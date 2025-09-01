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
import { Distrito } from 'app/classes/ClassesSIGEX';
import { Objecto } from 'app/classes/Resposta';

@Component({
  selector: 'app-modal-dist',
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
  templateUrl: './modal-dist.component.html',
  styleUrl: './modal-dist.component.scss'
})
export class ModalDistComponent implements OnInit {
 readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MtxDialog);
  visivel = signal(false);
  isSubmitting= signal(false);

  distForm = this.fb.nonNullable.group({
    distritoStamp: ['', [Validators.required]],
    codDistrito: [0],
    descricao: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.distForm.patchValue({
      distritoStamp: this.data.record.distritoStamp,
      codDistrito: this.data.record.codDistrito,
      descricao: this.data.record.descricao,     
    });
  }

  
  gravar() {
    if (this.auth.isAutenticated() === false) {
      return;
    }
    const usuario = this.auth.obterSessao() as Usuario;

    const distritos:Distrito={
      distritoStamp: this.distForm.get('distritoStamp')!.value,
      codDistrito: this.distForm.get('codDistrito')!.value.toString(),
      descricao: this.distForm.get('descricao')!.value,
      codProv: this.data.record.codProv,
      inseriu: usuario.nome!,
      inseriuDataHora:  this.auth.ConvertDate(new Date()),
      alterou: usuario.nome!,
      alterouDataHora: this.auth.ConvertDate(new Date()),
      provinciaStamp: this.data.record.provinciaStamp,
    }

    const entrda:Objecto={
          dados: distritos,
          tabela: 'Distrito',
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
