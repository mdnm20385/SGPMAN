import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
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
import { PostAdm } from 'app/classes/ClassesSIGEX';
import { Objecto } from 'app/classes/Resposta';

@Component({
  selector: 'app-modal-post-admin',
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
  templateUrl: './modal-post-admin.component.html',
  styleUrl: './modal-post-admin.component.scss'
})
export class ModalPostAdminComponent {
 readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MtxDialog);
  visivel = signal(false);
  isSubmitting= signal(false);

  padForm = this.fb.nonNullable.group({
    postAdmStamp: ['', [Validators.required]],
    codPostoAdm: [0],
    descricao: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.padForm.patchValue({
      postAdmStamp: this.data.record.distritoStamp,
      codPostoAdm: this.data.record.codPostoAdm,
      descricao: this.data.record.descricao,     
    });
  }

  
  gravar() {
    if (this.auth.isAutenticated() === false) {
      return;
    }
    const usuario = this.auth.obterSessao() as Usuario;

    const postAdms:PostAdm={
      postAdmStamp: this.padForm.get('postAdmStamp')!.value,
      codPostoAdm: this.padForm.get('codPostoAdm')!.value.toString(),
      descricao: this.padForm.get('descricao')!.value,
      codDistrito: this.data.record.codDistrito,
      inseriu: usuario.nome!,
      inseriuDataHora:  this.auth.ConvertDate(new Date()),
      alterou: usuario.nome!,
      alterouDataHora: this.auth.ConvertDate(new Date()),
      distritoStamp: this.data.record.distritoStamp,
    }


    const entrda:Objecto={
          dados: postAdms,
          tabela: 'PostAdm',
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
