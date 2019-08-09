import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Perfil',
      url: '/miembro-detalles/login_miembro1',
      icon: 'person'
    },
    {
      title: 'Amigos',
      url: '/listado-amigos',
      icon: 'people'
    },
    {
      title: 'Organizador',
      url: '/organizador-perfil/login_organizador1',
      icon: 'alert'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
