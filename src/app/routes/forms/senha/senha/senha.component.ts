import {  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject, } from '@angular/core';
import {  AbstractControl,FormBuilder,FormsModule,ReactiveFormsModule,Validators,} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService, modalSenha, User, Usuario } from '@core';
import { TranslateModule } from '@ngx-translate/core';
import { busca } from 'app/classes/busca';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageHeaderComponent } from '@shared';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { FrmRecuperaSenhaComponent } from '../../../../../../schematics/ng-add/files/module-files/app/routes/sessions/register/frm-recupera-senha/frm-recupera-senha.component';


@Component({
    selector: 'app-senha',
    standalone: true,
    templateUrl: './senha.component.html',
    styleUrl: './senha.component.scss',
    imports: [
      FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
    PageHeaderComponent
    ]
})
export class SenhaComponent  implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  private _snackBar= inject(MatSnackBar);
  constructor(public _dialog: MatDialog,private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,) {}
  ngOnInit() {
    if(this.auth.isAutenticated()===false){
      return;
  }
  const usrs=this.auth.obterSessao() as Usuario;
  this.registerForm.patchValue({
    username:usrs.login!,
    senha: '',
    password: '',
    confirmPassword: '',
  });
    this.changeDetection.detectChanges();
  }
  isSubmitting = false;
  registerForm = this.fb.nonNullable.group(
    {
      username: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [this.matchValidator('password', 'confirmPassword')],
    }
  );

  mostrarAlerta(mensagem: string, tipo: string) {
    this._snackBar.open(mensagem, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
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

  private readonly dialog = inject(MtxDialog);
  login(){
    const se:busca={
      buscaStamp: '',
      codBusca: 0,
      descricao: this.registerForm.get('username')!.value,
      numTabela: '',
      inseriu: this.registerForm.get('senha')!.value,
      inseriuDataHora: '',
      alterou:  this.registerForm.get('confirmPassword')!.value,
      alterouDataHora: ''
    };
    this.auth.TrocarSenha(se)
    .subscribe({
      next: (data) => {
        if(data.sucesso){
        this.dialog.alert(`Senha alterada com sucesso!`);
          this.auth.logout().subscribe(() => {
            this.router.navigateByUrl('/auth/login');
          });
        }else{
          this.dialog.alert(`${data.mensagem}`);
        }

        //this.router.navigateByUrl('/');
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



}
