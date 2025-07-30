import { Routes } from '@angular/router';
import { authGuard } from '@core';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from '../../module-files/app/routes/dashboard/dashboard.component';
import { Error403Component } from '../../module-files/app/routes/sessions/403.component';
import { Error404Component } from '../../module-files/app/routes/sessions/404.component';
import { Error500Component } from '../../module-files/app/routes/sessions/500.component';
import { LoginComponent } from '../../module-files/app/routes/sessions/login/login.component';
import { RegisterComponent } from '../../module-files/app/routes/sessions/register/register.component';
import { SenhaComponent } from 'app/routes/forms/senha/senha/senha.component';
import { FrmSenhaComponent } from 'app/routes/forms/senha/senha/frm-senha/frm-senha.component';


export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'senhasss', component: FrmSenhaComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
