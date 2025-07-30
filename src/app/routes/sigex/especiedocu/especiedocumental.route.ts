import { Routes } from '@angular/router';
import { FrmEspecieDocumentalComponent } from '@core/FormSigex/frm-especie-documental/frm-especie-documental.component';
import { FrmListaEspecieDocumentalComponent } from '@core/FormSigex/frm-lista-especie-documental/frm-lista-especie-documental.component';

export const routes: Routes = [
  { path: 'especiedocumental', component: FrmEspecieDocumentalComponent },
  { path: 'listaespeciedocumental', component: FrmListaEspecieDocumentalComponent },
];
