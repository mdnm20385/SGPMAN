import { Routes } from '@angular/router';
import { FrmListaOrgaoComponent } from '@core/FormSigex/frm-lista-orgao/frm-lista-orgao.component';
import { FrmModalOrgaoComponent } from '@core/FormSigex/frm-modal-orgao/frm-modal-orgao.component';

export const routes: Routes = [
  { path: 'orgao', component: FrmModalOrgaoComponent },
  { path: 'listaorgao', component: FrmListaOrgaoComponent },
];
