import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MiembroPerfilPage } from './miembro-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: MiembroPerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiembroPerfilPage]
})
export class MiembroPerfilPageModule {}
