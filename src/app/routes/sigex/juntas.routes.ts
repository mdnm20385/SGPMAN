import { Routes } from '@angular/router';
import { FrmListaProcessoComponent } from '@core/JuntasMedicas/frm-lista-processo/frm-lista-processo.component';
import { FrmProcessoComponent } from '@core/JuntasMedicas/frm-processo/frm-processo.component';
import { MenuSenderComponent } from 'app/FormulariosVendas/Menu/menu-sender/menu-sender.component';
import { VendaComponent } from '@core/JuntasMedicas/venda/venda.component';
import { FactComponent } from '@core/Formsfacturacao/fact/fact.component';
export const routes: Routes = [
  { path: 'listaProcesso', component: FrmListaProcessoComponent },
  { path: 'vendas', component: VendaComponent },

  { path: 'fact', component: FactComponent },
  { path: 'menu', component: MenuSenderComponent },

  { path: 'modalprocesso', component: FrmProcessoComponent },
];
