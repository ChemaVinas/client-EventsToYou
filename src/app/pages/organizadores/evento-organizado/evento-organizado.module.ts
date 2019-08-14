import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventoOrganizadoPage } from './evento-organizado.page';
import { ModalFormEventoComponent } from 'src/app/components/modal-form-evento/modal-form-evento.component';
import { CompartidoModule } from 'src/app/components/moduleCompartido/compartido.module';
import { ModalFormSesionComponent } from 'src/app/components/modal-form-sesion/modal-form-sesion.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const routes: Routes = [
  {
    path: '',
    component: EventoOrganizadoPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CompartidoModule
  ],
  declarations: [ModalFormSesionComponent, EventoOrganizadoPage],
  entryComponents: [ModalFormEventoComponent, ModalFormSesionComponent],
  providers: [Geolocation]
})
export class EventoOrganizadoPageModule {}
