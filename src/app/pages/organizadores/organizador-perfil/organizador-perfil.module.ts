import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrganizadorPerfilPage } from './organizador-perfil.page';
import { ModalFormEventoComponent } from 'src/app/components/modal-form-evento/modal-form-evento.component';
import { CompartidoModule } from 'src/app/components/moduleCompartido/compartido.module';

const routes: Routes = [
  {
    path: '',
    component: OrganizadorPerfilPage
  }
];

@NgModule({

  /*exports: [
    FormsModule,
    ReactiveFormsModule
  ],*/

  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CompartidoModule
  ],
  declarations: [/*ModalFormEventoComponent,*/ OrganizadorPerfilPage],
  entryComponents: [ModalFormEventoComponent]
})
export class OrganizadorPerfilPageModule {}
