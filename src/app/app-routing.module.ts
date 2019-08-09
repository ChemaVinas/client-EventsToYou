import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: './pages/miembros/tabs/tabs.module#TabsPageModule'
  },
  { path: 'evento-detalles/:eventoId',
    loadChildren: './pages/miembros/evento-detalles/evento-detalles.module#EventoDetallesPageModule'
  },
  { path: 'evento-detalles/:eventoId/sesion-detalles/:sesionId',
    loadChildren: './pages/miembros/sesion-detalles/sesion-detalles.module#SesionDetallesPageModule'
  },
  { path: 'listado-amigos',
    loadChildren: './pages/miembros/listado-amigos/listado-amigos.module#ListadoAmigosPageModule'
  },
  { path: 'miembro-detalles/:login',
    loadChildren: './pages/miembros/miembro-detalles/miembro-detalles.module#MiembroDetallesPageModule'
  },
  { path: 'organizador-detalles/:login',
    loadChildren: './pages/miembros/organizador-detalles/organizador-detalles.module#OrganizadorDetallesPageModule'
  },
  { path: 'categoria-eventos/:categoria',
    loadChildren: './pages/miembros/categoria-eventos/categoria-eventos.module#CategoriaEventosPageModule'
  },
  { path: 'organizador-perfil/:login',
    loadChildren: './pages/organizadores/organizador-perfil/organizador-perfil.module#OrganizadorPerfilPageModule'
  },
  { path: 'evento-organizado/:eventoId',
    loadChildren: './pages/organizadores/evento-organizado/evento-organizado.module#EventoOrganizadoPageModule'
  },
  { path: 'evento-organizado/:eventoId/sesion-organizada/:sesionId',
    loadChildren: './pages/organizadores/sesion-organizada/sesion-organizada.module#SesionOrganizadaPageModule'
  }
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
