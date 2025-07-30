import { Routes } from '@angular/router';
import { FrmCadastrouserComponent } from '@core/FormSigex/usuario/frm-cadastrouser/frm-cadastrouser.component';
import { FrmlistauserComponent } from '@core/FormSigex/usuario/frmlistauser/frmlistauser.component';
import { SenhaComponent } from 'app/routes/forms/senha/senha/senha.component';
import { FrmSenhaRecuperadaComponent } from '../../../../../schematics/ng-add/files/module-files/app/routes/sessions/register/frm-senha-recuperada/frm-senha-recuperada.component';
import { FrmRelatorioJuntasComponent } from '../../../../../schematics/ng-add/files/module-files/app/routes/sessions/register/frm-relatorio-juntas/frm-relatorio-juntas.component';
import { MenuSenderComponent } from 'app/FormulariosVendas/Menu/menu-sender/menu-sender.component';
export const routes: Routes = [
  { path: 'senha', component: SenhaComponent },
  { path: 'cadastrouser', component: FrmCadastrouserComponent },
  { path: 'listauser', component: FrmlistauserComponent },
  { path: 'permissao', component: MenuSenderComponent },
  { path: 'Recuperada', component:  FrmSenhaRecuperadaComponent },
  { path: 'relatoriosd', component:  FrmRelatorioJuntasComponent },
];
