import { Routes } from '@angular/router';
import { FrmListaArquivoComponent } from '@core/FormSigex/frm-lista-arquivo/frm-lista-arquivo.component';
import { FrmModalArquivoComponent } from '@core/FormSigex/frm-modal-arquivo/frm-modal-arquivo.component';
import { VendaComponent } from '@core/JuntasMedicas/venda/venda.component';


export const routes: Routes = [
  { path: 'arquivo', component: FrmModalArquivoComponent },
  { path: 'listaarquivo', component: FrmListaArquivoComponent },
];
