import { Routes } from '@angular/router';
import { FrmBuscaComponent } from '@core/FormSigex/frm-busca/frm-busca.component';
import { FrmListaBuscaComponent } from '@core/FormSigex/frm-lista-busca/frm-lista-busca.component';
import { ReloadBuscaComponent } from '@core/FormSigex/frm-lista-busca/reload-busca/reload-busca.component';
import { FrmEstadoHomologacaoComponent } from '@core/FormSigex/frm-lista-busca/reload-busca/TodosFormsBusca/frm-estado-homologacao/frm-estado-homologacao.component';
import { FrmGrauclassificacaoComponent } from 'app/frm-grauclassificacao/frm-grauclassificacao.component';
import { FrmTipoPerfilComponent } from 'app/frm-tipo-perfil/frm-tipo-perfil.component';
import { FrmnivelurgenciaComponent } from 'app/frmnivelurgencia/frmnivelurgencia.component';
export const routes: Routes = [
  { path: 'busca', component: FrmBuscaComponent },
  { path: 'configurao/listabuscaparam/:id', component: ReloadBuscaComponent },
   { path: 'configurao/listabuscaparamBucas/:id', component: FrmListaBuscaComponent },
   { path: 'configurao/EstadoHomologacao/:id', component: FrmEstadoHomologacaoComponent },
   { path: 'configurao/TipoPerfil/:id', component: FrmTipoPerfilComponent },
   { path: 'configurao/nivelurgencia/:id', component: FrmnivelurgenciaComponent },
   { path: 'configurao/Grauclassificacao/:id', component: FrmGrauclassificacaoComponent },
];
