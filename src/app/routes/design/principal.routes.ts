import { Routes } from '@angular/router';
import { FrmListaEntradasComponent } from '@core/FormSigex/frm-lista-entradas/frm-lista-entradas.component';
import { PaginainicialComponent } from '@theme/admin-layout/paginainicial/paginainicial.component';

export const routes: Routes = [
  { path: 'principal', component: PaginainicialComponent },
    { path: 'listaentrada', component: FrmListaEntradasComponent },
];
