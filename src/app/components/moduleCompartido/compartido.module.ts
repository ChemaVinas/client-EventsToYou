import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormEventoComponent } from '../modal-form-evento/modal-form-evento.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalFormEventoComponent
  ],
  exports: [
    ModalFormEventoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class CompartidoModule { }
