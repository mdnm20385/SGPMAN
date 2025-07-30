import { Routes } from '@angular/router';
import { FrmListaProcessemtramitacaoComponent } from '@core/JuntasMedicas/frm-lista-processemtramitacao/frm-lista-processemtramitacao.component';
import { FrmListaProcessoHomoNaologadosComponent } from '@core/JuntasMedicas/frm-lista-processo-homo-naologados/frm-lista-processo-homo-naologados.component';
import { FrmListaProcessoHomologadosComponent } from '@core/JuntasMedicas/frm-lista-processo-homologados/frm-lista-processo-homologados.component';
import { FrmListaProcessporinciarComponent } from '@core/JuntasMedicas/frm-lista-processporinciar/frm-lista-processporinciar.component';
import { MenuSenderComponent } from 'app/FormulariosVendas/Menu/menu-sender/menu-sender.component';

export const routes: Routes = [
  { path: 'listaProcessoshomoldados', component: FrmListaProcessoHomologadosComponent },
  { path: 'listaProcessosnaohomoldados', component: FrmListaProcessoHomoNaologadosComponent },
  { path: 'listaProcessosemtramitacao', component: FrmListaProcessemtramitacaoComponent },
    { path: 'menu5', component: MenuSenderComponent },
  { path: 'listaProcessoseporIniciar', component: FrmListaProcessporinciarComponent }
];
