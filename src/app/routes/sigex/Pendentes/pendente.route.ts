import { Routes } from '@angular/router';
import { FrmPendentesComponent } from '@core/FormSigex/frm-pendentes/frm-pendentes.component';

export const routes: Routes = [
  { path: 'pendente', component: FrmPendentesComponent },
  { path: 'listapendente', component: FrmPendentesComponent },
];
