import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrganizadorDetallesPage } from './organizador-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizadorDetallesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrganizadorDetallesPage]
})
export class OrganizadorDetallesPageModule {}
