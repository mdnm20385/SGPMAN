import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService, EmailRec, modalSenha, Usuario } from '@core';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { FrmRecuperaSenhaComponent } from './frm-recupera-senha/frm-recupera-senha.component';
import { MtxDialog } from '@ng-matero/extensions/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
  ]
})
export class RegisterComponent implements OnInit

{

  private readonly fb = inject(FormBuilder);

  isSubmitting = false;
  registerForm = this.fb.nonNullable.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.email]],
      rememberMe: [false],
    }
  );

  private readonly auth = inject(AuthService);
  constructor(public _dialog: MatDialog,
    private changeDetection: ChangeDetectorRef,) {}
  ngOnInit() {

    if(this.auth.isAutenticated()===false){
      return;
  }
  const usrs=this.auth.obterSessao() as Usuario;
  this.registerForm.patchValue({
    username:usrs.nome!,
    password: '',
    rememberMe:false
  });
    this.changeDetection.detectChanges();
  }

  get username() {
    return this.registerForm.get('username')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }
  get rememberMe() {
    return this.registerForm.get('rememberMe')!;
  }

  private readonly dialog = inject(MtxDialog);
  login() {
    this.isSubmitting = true;
const email:EmailRec={
  email: this.username.value,
  codigo: this.password.value
}

    this.auth
      .PasseRecover(email)
      .pipe(
        finalize(() => this.isSubmitting = false),
      )
      .subscribe({
        next: (data) => {
          if(data.sucesso===true){
            localStorage.removeItem('codigo');
            localStorage.setItem('codigo', JSON.stringify(data.dados));
            this.auth.logout().pipe().subscribe();
          }
        },
        error: (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.registerForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
          this.isSubmitting = false;
        },
      });
  }

  matchValidator(source: string, target: string) {
    return (control: AbstractControl) => {
      const sourceControl = control.get(source)!;
      const targetControl = control.get(target)!;
      if (targetControl.errors && !targetControl.errors.mismatch) {
        return null;
      }
      if (sourceControl.value !== targetControl.value) {
        targetControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        targetControl.setErrors(null);
        return null;
      }
    };
  }




  Recuperar() {
    if(this.auth.isAutenticated()===false){
      return;
  }
const dddd:modalSenha={
  usuario:this.username.value,
  senha: this.password.value,
  confirmarSenha: this.password.value,
};
const dialogRef = this.dialog.originalOpen(FrmRecuperaSenhaComponent, {
  width: '600px',
 disableClose: true,
 autoFocus: false,
 enterAnimationDuration: '1000ms',
 exitAnimationDuration: '1000ms',
 data: { record: dddd},
});
dialogRef.afterClosed().subscribe(() => {

});






      }
}
