import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
    data: {
      preload: true
    },
  },
  {
    path: 'miembros',
    canActivate: [AuthGuardService],
    data: {
      rol: "Miembro"
    },
    loadChildren: './pages/miembros/miembro-routing.module#MiembroRoutingModule'
  },
  {
    path: 'organizadores',
    canActivate: [AuthGuardService],
    data: {
      rol: "Organizador"
    },
    loadChildren: './pages/organizadores/organizador-routing.module#OrganizadorRoutingModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
