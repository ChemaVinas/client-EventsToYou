import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MiembroDetallesPage } from './miembro-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: MiembroDetallesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiembroDetallesPage]
})
export class MiembroDetallesPageModule {}
