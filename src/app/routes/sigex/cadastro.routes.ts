import { Routes } from '@angular/router';
import { FrmCLComponent } from '@core/JuntasMedicas/frm-cl/frm-cl.component';
import { FrmFncComponent } from '@core/JuntasMedicas/frm-fnc/frm-fnc.component';
import { ProductFormComponent } from '@core/JuntasMedicas/product-form/product-form.component';
export const routes: Routes = [
  { path: 'produto', component: ProductFormComponent },
  { path: 'servico', component: ProductFormComponent },
  { path: 'cliente', component: FrmCLComponent },
  { path: 'fnc', component: FrmFncComponent },
];
