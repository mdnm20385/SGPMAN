import { Routes } from '@angular/router';
import { FrmEntradasProcessoComponent } from '@core/FormSigex/frm-entradas-processo/frm-entradas-processo.component';
import { FrmListaEntradasComponent } from '@core/FormSigex/frm-lista-entradas/frm-lista-entradas.component';
export const routes: Routes = [
  { path: 'entrada', component: FrmEntradasProcessoComponent },
  { path: 'listaentrada', component: FrmListaEntradasComponent },
];
