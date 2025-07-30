import { Routes } from '@angular/router';
import { FrmListaDirecaoComponent } from '@core/FormSigex/frm-lista-direcao/frm-lista-direcao.component';
import { FrmModalDirecaoComponent } from '@core/FormSigex/frm-modal-direcao/frm-modal-direcao.component';

export const routes: Routes = [
  { path: 'direcao', component: FrmModalDirecaoComponent },
  { path: 'listadirecao', component: FrmListaDirecaoComponent },
];
