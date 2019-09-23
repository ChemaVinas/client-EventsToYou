import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { SesionApuntada } from '../interfaces/SesionApuntada';
import { EventoGuardado } from '../interfaces/EventoGuardado';
import { Valoracion } from '../interfaces/valoracion';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorMiembrosService {

  data: any;

  httpHeaders: HttpHeaders;
  login: string;

  REST_SERVICE_URI = 'http://localhost:8080/EventsToYou/miembros';

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

  obtenerMiembros() {
    return this.http.get<Usuario[]>(this.REST_SERVICE_URI,
      { headers: this.httpHeaders });
  }

  obtenerMiembro(login) {
    return this.http.get<Usuario>(this.REST_SERVICE_URI + '/' + login,
      { headers: this.httpHeaders });
  }

  obtenerMiembrosSeguidos() {
    return this.http.get<Usuario[]>(this.REST_SERVICE_URI + '/' + this.login + '/miembros_seguidos',
      { headers: this.httpHeaders });
  }

  obtenerSesionesApuntadas(login) {
    return this.http.get<SesionApuntada[]>(this.REST_SERVICE_URI + '/' + login + '/sesiones_apuntadas',
      { headers: this.httpHeaders });
  }

  obtenerEventosGuardados(login) {
    return this.http.get<EventoGuardado[]>(this.REST_SERVICE_URI + '/' + login + '/eventos_guardados',
      { headers: this.httpHeaders });
  }

  obtenerValoracionesDeMiembro(login) {
    return this.http.get<Valoracion[]>(this.REST_SERVICE_URI + '/' + login + '/valoraciones',
      { headers: this.httpHeaders });
  }

  obtenerSesionesApuntadasAmigos() {
    return this.http.get<SesionApuntada[]>(this.REST_SERVICE_URI + '/' + this.login + '/miembros_seguidos/sesiones_apuntadas',
      { headers: this.httpHeaders });
  }

  obtenerEventosGuardadosAmigos() {
    return this.http.get<EventoGuardado[]>(this.REST_SERVICE_URI + '/' + this.login + '/miembros_seguidos/eventos_guardados',
      { headers: this.httpHeaders });
  }

  obtenerValoracionesAmigos() {
    return this.http.get<Valoracion[]>(this.REST_SERVICE_URI + '/' + this.login + '/miembros_seguidos/valoraciones',
      { headers: this.httpHeaders });
  }

  buscarMiembros(patron) {
    return this.http.get<Usuario[]>(this.REST_SERVICE_URI + '?patron=' + patron,
      { headers: this.httpHeaders });
  }

  apuntarseASesion(id_sesion) {
    return this.http.put(this.REST_SERVICE_URI + '/' + this.login + '/sesiones_apuntadas?id_sesion=' + id_sesion, null,
      { headers: this.httpHeaders });
  }

  desapuntarseASesion(id_sesion_apuntada) {
    return this.http.delete(this.REST_SERVICE_URI + '/' + this.login + '/sesiones_apuntadas/' + id_sesion_apuntada,
      { headers: this.httpHeaders });
  }

  guardarEvento(id_evento) {
    return this.http.put(this.REST_SERVICE_URI + '/' + this.login + '/eventos_guardados?id_evento=' + id_evento, null,
      { headers: this.httpHeaders });
  }

  dejarDeGuardarEvento(id_evento_guardado) {
    return this.http.delete(this.REST_SERVICE_URI + '/' + this.login + '/eventos_guardados/' + id_evento_guardado,
      { headers: this.httpHeaders });
  }

  seguirMiembro(login_miembro_seguido) {
    return this.http.put(this.REST_SERVICE_URI + '/' + this.login + '/miembros_seguidos?login_miembroSeguido=' + login_miembro_seguido, null,
      { headers: this.httpHeaders });
  }

  dejarSeguirMiembro(login_miembro_seguido) {
    return this.http.delete(this.REST_SERVICE_URI + '/' + this.login + '/miembros_seguidos/' + login_miembro_seguido,
      { headers: this.httpHeaders });
  }

  crearValoracion(id_evento, valoracion) {
    return this.http.post(this.REST_SERVICE_URI + '/' + this.login + '/valoraciones?id_evento=' + id_evento, valoracion,
      { headers: this.httpHeaders });
  }

  eliminarValoracion(id_valoracion) {
    return this.http.delete(this.REST_SERVICE_URI + '/' + this.login + '/valoraciones/' + id_valoracion,
      { headers: this.httpHeaders });
  }

}
