import { NgModule } from '@angular/core';

import { ModalEspecialMilitarComponent } from './modal-especial-militar/modal-especial-militar.component';
import { ModalRegMilitarComponent } from './modal-reg-militar/modal-reg-militar.component';
@NgModule({
  imports: [
    ModalRegMilitarComponent,
    ModalEspecialMilitarComponent
  ],
  exports: [
    ModalRegMilitarComponent,
    ModalEspecialMilitarComponent
  ]
})
export class UcFichaMilitarModule { }
