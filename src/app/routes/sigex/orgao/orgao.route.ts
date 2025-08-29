import { Routes } from '@angular/router';
import { FrmListaOrgaoComponent } from '@core/FormSigex/frm-lista-orgao/frm-lista-orgao.component';
import { FrmModalOrgaoComponent } from '@core/FormSigex/frm-modal-orgao/frm-modal-orgao.component';
import { DistComponent } from '@core/SGPMFORMS/Pages/dist/dist.component';
import { PaisComponent } from '@core/SGPMFORMS/Pages/pais/pais.component';
import { ProvComponent } from '@core/SGPMFORMS/Pages/prov/prov.component';

export const routes: Routes = [
  { path: 'orgao', component: FrmModalOrgaoComponent },
  { path: 'listaorgao', component: FrmListaOrgaoComponent },
  { path: 'listapais', component: PaisComponent },
  { path: 'listaprov', component: ProvComponent },  
  { path: 'listadist/:provinciaStamp', component: DistComponent }
];
