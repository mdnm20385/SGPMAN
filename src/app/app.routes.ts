import { Routes } from '@angular/router';
import { authGuard } from '@core';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { LoginComponent } from './routes/sessions/login/login.component';
import { PaginainicialComponent } from '@theme/admin-layout/paginainicial/paginainicial.component';
import { RegisterComponent } from '../../schematics/ng-add/files/module-files/app/routes/sessions/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      { path: 'principal', component: PaginainicialComponent },
      {
        path: 'design',
        loadChildren: () => import('./routes/design/design.routes').then(m => m.routes),
      },{
        path: 'principal',
        loadChildren: () => import('./routes/design/principal.routes').then(m => m.routes),
      },
      {
        path: 'inicio',
        loadChildren: () => import('./routes/iniciostart/iniciostart/iniciostart.route').then(m => m.routes),
      },
      {
        path: 'cadastro',
        loadChildren: () => import('./routes/sigex/cadastro.routes').
        then(m => m.routes)
           },
      {
        path: 'facturacao',
        loadChildren: () => import('./routes/sigex/Facturacao.routes').
        then(m => m.routes)
           },
      {
        path: 'pessoal',
        loadChildren: () => import('./routes/sigex/sgpm.routes').
        then(m => m.routes)
           },
      {
        path: 'documento',
        loadChildren: () => import('./routes/sigex/sigex.routes').then(m => m.routes),
      },
      {
        path: 'documento',
        loadChildren: () => import('./routes/sigex/saidas/saidas.routes').then(m => m.routes),
      },
      {
        path: 'documento',
        loadChildren: () => import('./routes/sigex/Pendentes/pendente.route').then(m => m.routes),
      },
      {
        path: 'parametrizacao',
        loadChildren: () => import('./routes/sigex/orgao/orgao.route').then(m => m.routes),
      },

      {
        path: 'arquivo',
        loadChildren: () => import('./routes/sigex/arquivo/arquivo.route').then(m => m.routes),
      },
      {
        path: 'parametrizacao',
        loadChildren: () => import('./routes/sigex/direcao/direcao.route').then(m => m.routes),
      },
      {
        path: 'parametrizacao',
        loadChildren: () => import('./routes/sigex/especiedocu/especiedocumental.route').then(m => m.routes),
      },
      {
        path: 'parametrizacao',
        loadChildren: () => import('./routes/sigex/busca/busca.route').then(m => m.routes),
      },
      {
        path: 'material',
        loadChildren: () => import('./routes/material/material.routes').then(m => m.routes),
      },
      {
        path: 'media',
        loadChildren: () => import('./routes/media/media.routes').then(m => m.routes),
      },
      {
        path: 'forms',
        loadChildren: () => import('./routes/forms/forms.routes').then(m => m.routes),
      },
      {
        path: 'tables',
        loadChildren: () => import('./routes/tables/tables.routes').then(m => m.routes),
      },
      {
        path: 'profile',
        loadChildren: () => import('./routes/profile/profile.routes').then(m => m.routes),
      },
      {
        path: 'permissions',
        loadChildren: () => import('./routes/permissions/permissions.routes').then(m => m.routes),
      },
      {
        path: 'utilities',
        loadChildren: () => import('./routes/utilities/utilities.routes').then(m => m.routes),
      },
      {
        path: 'juntas',
        loadChildren: () => import('./routes/sigex/juntas.routes').then(m => m.routes),
      },
      {
        path: 'juntass',
        loadChildren: () => import('./routes/sigex/juntass.routes').then(m => m.routes),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'principal' },
];
