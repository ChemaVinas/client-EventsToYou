import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'listado-eventos', loadChildren: './pages/listado-eventos/listado-eventos.module#ListadoEventosPageModule'},
  {
    path: 'evento-detalles/:eventoId',
    loadChildren: './pages/evento-detalles/evento-detalles.module#EventoDetallesPageModule'
  },
  { path: 'sesion-detalles/:sesionId',
    loadChildren: './pages/sesion-detalles/sesion-detalles.module#SesionDetallesPageModule' }
  /*{
    path: '',
    redirectTo: '/app/tabs/home',
    pathMatch: 'full'
  }*//*,
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  {
    path: 'listado-eventos',
    loadChildren: './pages/listado-eventos/listado-eventos.module#ListadoEventosPageModule'
  },
  {
    path: 'evento-detalles/:eventoId',
    loadChildren: './pages/evento-detalles/evento-detalles.module#EventoDetallesPageModule'
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
