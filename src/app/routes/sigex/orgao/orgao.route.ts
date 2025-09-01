import { Routes } from '@angular/router';

import { DistComponent } from '@core/SGPMFORMS/Pages/dist/dist.component';
import { LocalidComponent } from '@core/SGPMFORMS/Pages/localid/localid.component';
import { OrgaoComponent } from '@core/SGPMFORMS/Pages/orgao/orgao.component';
import { PaisComponent } from '@core/SGPMFORMS/Pages/pais/pais.component';
import { PostAdminComponent } from '@core/SGPMFORMS/Pages/post-admin/post-admin.component';
import { ProvComponent } from '@core/SGPMFORMS/Pages/prov/prov.component';

export const routes: Routes = [
  //{ path: 'orgao', component: FrmModalOrgaoComponent },
  { path: 'listaorgao', component: OrgaoComponent },
  { path: 'listapais', component: PaisComponent },
  { path: 'listaprov', component: ProvComponent },  
  { path: 'listadist/:provinciaStamp', component: DistComponent },
  { path: 'listapad/:distritoStamp', component: PostAdminComponent },  
  { path: 'listalocalid/:postAdmStamp', component: LocalidComponent }
];
