import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { Evento } from '../interfaces/evento';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorOrganizadoresService {

  data: any;

  httpHeaders: HttpHeaders;
  login: string;

  REST_SERVICE_URI = 'http://192.168.43.33:8080/EventsToYou/organizadores';
  //REST_SERVICE_URI = 'http://localhost:8080/EventsToYou/organizadores';

  constructor(public http: HttpClient, private storage: Storage,
    private authenticationService: AuthenticationService) {
      
    this.authenticationService.credenciales.subscribe(value => {
      console.log(value);
      if (value != null) {
        this.login = value.login;
        this.httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(value.login + ':' + value.clave)
        });
      }
    });
  }

  obtenerOrganizadores() {
    return this.http.get<Usuario[]>(this.REST_SERVICE_URI,
      { headers: this.httpHeaders });
  }

  obtenerOrganizador(login) {
    return this.http.get<Usuario>(this.REST_SERVICE_URI + '/' + login,
      { headers: this.httpHeaders });
  }

  obtenerEventosDeOrganizador(login) {
    return this.http.get<Evento[]>(this.REST_SERVICE_URI + '/' + login + '/eventos',
      { headers: this.httpHeaders });
  }

  buscarOrganizadores(patron) {
    return this.http.get<Usuario[]>(this.REST_SERVICE_URI + '?patron=' + patron,
      { headers: this.httpHeaders });
  }

  crearEvento(evento) {
    return this.http.post(this.REST_SERVICE_URI + '/' + this.login + '/eventos', evento,
      { headers: this.httpHeaders });

  }

  modificarEvento(evento) {
    return this.http.put(this.REST_SERVICE_URI + '/' + this.login + '/eventos/' + evento.id, evento,
      { headers: this.httpHeaders });
  }

  eliminarEvento(id) {
    return this.http.delete(this.REST_SERVICE_URI + '/' + this.login + '/eventos/' + id,
      { headers: this.httpHeaders });
  }

  crearSesion(id_evento, sesion) {
    return this.http.post(this.REST_SERVICE_URI + '/' + this.login + '/eventos/' + id_evento + '/sesiones', sesion,
      { headers: this.httpHeaders });
  }

  eliminarSesion(id_evento, id_sesion) {
    return this.http.delete(this.REST_SERVICE_URI + '/' + this.login + '/eventos/' + id_evento + '/sesiones/' + id_sesion,
      { headers: this.httpHeaders });
  }

}
