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

    if (this.authService.estaAutenticado(rol)){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
