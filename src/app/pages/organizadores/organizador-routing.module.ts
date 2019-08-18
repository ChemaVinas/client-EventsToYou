import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'organizador-perfil',
        pathMatch: 'full'
      },
      {
        path: 'organizador-perfil',
        loadChildren: './organizador-perfil/organizador-perfil.module#OrganizadorPerfilPageModule'
      },
      {
        path: 'evento-organizado/:eventoId',
        loadChildren: './evento-organizado/evento-organizado.module#EventoOrganizadoPageModule'
      },
      {
        path: 'evento-organizado/:eventoId/sesion-organizada/:sesionId',
        loadChildren: './sesion-organizada/sesion-organizada.module#SesionOrganizadaPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'organizador-perfil',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrganizadorRoutingModule { }
