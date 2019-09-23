import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.credenciales.subscribe(value => {
        if (value == null) {
          this.appPages = null;
          this.router.navigate(['/login']);

        } else if (value.rol == "Miembro") {
          this.appPages = [
            {
              title: 'Perfil',
              url: '/miembros/miembro-perfil',
              icon: 'person'
            },
            {
              title: 'Amigos',
              url: '/miembros/listado-amigos',
              icon: 'people'
            }
          ];
          this.router.navigate(["/miembros"]);

        } else if (value.rol == "Organizador") {
          this.appPages = null;
          this.router.navigate(["/organizadores"]);
        }

      });
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
