import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    var rol = route.data.rol;
    //return this.authService.estaAutenticado(rol);

    if (this.authService.estaAutenticado(rol)){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

    // If the user is not logged in we'll send them back to the home page
    /*if (!this.authService.estaAutenticado()) {
      console.log('No estás logueado');
      this.router.navigate(['login']);
      return false;
    }

    this.router.navigate(['/tabs/inicio']);
    console.log('Logueado');
    return true;*/

    //return this.authService.estaAutenticado();

    /*var rol = route.data.rol;
    console.log("Este es el rol: " + rol)

    var rol_usuario = this.authService.estaAutenticado();

    console.log("Este es el rol del usuario: " + rol_usuario)
    
    if (rol === rol_usuario) {
      return true;
    }
    return false;*/
  }
}
