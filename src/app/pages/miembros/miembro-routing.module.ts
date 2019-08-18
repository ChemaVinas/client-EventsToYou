import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'tabs',
        pathMatch: 'full'
      },
      {
        path: 'tabs',
        loadChildren: './tabs/tabs.module#TabsPageModule'
      },
      {
        path: 'evento-detalles/:eventoId',
        loadChildren: './evento-detalles/evento-detalles.module#EventoDetallesPageModule'
      },
      {
        path: 'evento-detalles/:eventoId/sesion-detalles/:sesionId',
        loadChildren: './sesion-detalles/sesion-detalles.module#SesionDetallesPageModule'
      },
      {
        path: 'listado-amigos',
        loadChildren: './listado-amigos/listado-amigos.module#ListadoAmigosPageModule'
      },
      {
        path: 'miembro-perfil',
        loadChildren: './miembro-perfil/miembro-perfil.module#MiembroPerfilPageModule'
      },
      {
        path: 'miembro-detalles/:login',
        loadChildren: './miembro-detalles/miembro-detalles.module#MiembroDetallesPageModule'
      },
      {
        path: 'organizador-detalles/:login',
        loadChildren: './organizador-detalles/organizador-detalles.module#OrganizadorDetallesPageModule'
      },
      {
        path: 'categoria-eventos/:categoria',
        loadChildren: './categoria-eventos/categoria-eventos.module#CategoriaEventosPageModule'
      },
      {
        path: 'busquedas',
        loadChildren: './busquedas/busquedas.module#BusquedasPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
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
export class MiembroRoutingModule { }
