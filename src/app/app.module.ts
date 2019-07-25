import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ProveedorEventosService } from './providers/proveedor-eventos.service';
import { ProveedorSesionesService } from './providers/proveedor-sesiones.service';
import { ProveedorMiembrosService } from './providers/proveedor-miembros.service';
import { ProveedorOrganizadoresService } from './providers/proveedor-organizadores.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProveedorEventosService,
    ProveedorSesionesService,
    ProveedorMiembrosService,
    ProveedorOrganizadoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
