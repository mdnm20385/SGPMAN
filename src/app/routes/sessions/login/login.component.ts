import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { AuthService, User, Usuario } from '@core/authentication';
import { Menu, MenuService } from '@core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { LogoutService } from 'app/services/logout.service';
import { MtxDialog } from '@ng-matero/extensions/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
  ],
})
export class LoginComponent  implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
constructor(
  private logoutService: LogoutService,){

  }
  ngOnInit(): void {
    if(this.auth.mensagemtoquen()===true){
      this.dialog.alert(`${this.auth.obtermensagemtoquen()}`);
      const usr=this.auth.obterpassword() as Usuario;
      this.loginForm.patchValue({username:usr.login!,password:usr.senha!, rememberMe:false});
      this.auth.removepassword();
    }
  }
  isSubmitting = false;
  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });
  get username() {
    return this.loginForm.get('username')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }
  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }
   showMacAddress() {
}
private readonly authService = inject(AuthService);
private readonly menuService = inject(MenuService);
private readonly permissonsService = inject(NgxPermissionsService);
private readonly rolesService = inject(NgxRolesService);
private setMenu(menu: Menu[]) {
  this.menuService.addNamespace(menu, 'menu');
  this.menuService.set(menu);
}
private setPermissions(user: User) {
  // In a real app, you should get permissions and roles from the user information.
  const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
  this.permissonsService.loadPermissions(permissions);
  this.rolesService.flushRoles();
  this.rolesService.addRoles({ QUALQ: permissions });
  // Tips: Alternatively you can add permissions with role at the same time.
  // this.rolesService.addRolesWithPermissions({ ADMIN: permissions });
}

Refresh(){
  window.location.reload();
}
private readonly dialog = inject(MtxDialog);
  login() {
    this.isSubmitting = true;
    this.auth.eliminarSessao();
    this.auth
      .login(this.username.value, this.password.value, this.rememberMe.value)
      .pipe(filter(authenticated => authenticated))
      .subscribe({
        next: () => {
          this.auth.user().subscribe((data1)=>{
            this.setPermissions(data1);
                });
                if(this.auth.isAutenticated()===false){
                    this.dialog.alert(`Dados de acesso inválidos`);
                    this.auth.logout().pipe().subscribe();
                    return;
                }
                const usrs=this.auth.obterSessao() as Usuario;

                if  (usrs==null || usrs.activopa==false){
  this.dialog.alert(`Dados de acesso inválidos`);
  this.auth.logout().pipe().subscribe();
                }
if(this.auth.isAutenticated()===true){
  const datati=new Date();
if(usrs.priEntrada==='1' ){
  if(datati>new Date(usrs.passwordexperaem)
  ){
    this.dialog.alert(`${usrs.nome}, o código introduzido já expirou.\n Clica em esqueci senha para gerar novo código!`);
this.auth.logout().pipe().subscribe();
return;
  }
  else{
    this.router.navigateByUrl('/auth/senhasss');
    return;
  }
}

}else{
  this.dialog.alert(`Dados de acesso inválidos`);

}


this.router.navigateByUrl('/');
            this.logoutService.startLogoutCountDown(300000);
        },
        error: (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.loginForm;
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

