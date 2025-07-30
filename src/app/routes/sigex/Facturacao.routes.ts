import { Routes } from '@angular/router';
import { FactComponent } from '@core/Formsfacturacao/fact/fact.component';
import { FrmFtComponent } from '@core/Formsfacturacao/frm-ft/frm-ft.component';
import { FrmrclComponent } from '@core/Formsfacturacao/frmrcl/frmrcl.component';
import { FrmrcpComponent } from '@core/Formsfacturacao/frmrcp/frmrcp.component';
import { FrmrpgfComponent } from '@core/Formsfacturacao/frmrpgf/frmrpgf.component';
export const routes: Routes = [
  { path: 'frmft', component: FrmFtComponent },
  { path: 'frmrcl', component: FrmrclComponent },
  { path: 'facts', component: FactComponent },
  { path: 'frmcp', component: FrmrcpComponent },
  { path: 'frmpgf', component: FrmrpgfComponent },
];
