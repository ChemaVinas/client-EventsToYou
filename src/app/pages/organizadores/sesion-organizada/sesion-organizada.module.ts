import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SesionOrganizadaPage } from './sesion-organizada.page';

const routes: Routes = [
  {
    path: '',
    component: SesionOrganizadaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SesionOrganizadaPage]
})
export class SesionOrganizadaPageModule {}
