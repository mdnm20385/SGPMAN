import { Routes } from '@angular/router';
import { FrmListaSaidasComponent } from '@core/FormSigex/frm-lista-saidas/frm-lista-saidas.component';
import { FrmSaidaProcessoComponent } from '@core/FormSigex/frm-saida-processo/frm-saida-processo.component';
export const routes: Routes = [
  { path: 'saida', component: FrmSaidaProcessoComponent },
  { path: 'listasaidas', component: FrmListaSaidasComponent },
];
