import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriaEventosPage } from './categoria-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaEventosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriaEventosPage]
})
export class CategoriaEventosPageModule {}
