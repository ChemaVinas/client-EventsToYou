import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { Evento } from '../interfaces/evento';

@Injectable({
  providedIn: 'root'
})
export class ProveedorOrganizadoresService {

  data: any;

  REST_SERVICE_URI = 'http://localhost:8080/EventsToYou/organizadores';

  constructor(public http: HttpClient) {
    console.log('Hello ProveedorOrganizadores Service Provider');
  }

  obtenerOrganizadores() {
    return this.http.get<Usuario[]>(this.REST_SERVICE_URI);
  }

  obtenerOrganizador(login) {
    return this.http.get<Usuario>(this.REST_SERVICE_URI + '/' + login);
  }

  obtenerEventosDeOrganizador(login) {
    return this.http.get<Evento[]>(this.REST_SERVICE_URI + '/' + login + '/eventos');
  }

  crearEvento(login, evento) {
    return this.http.post(this.REST_SERVICE_URI + '/' + login + '/eventos', evento/*,
    {
      headers: new  HttpHeaders ({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true', 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      })
    }*/);

  }

  modificarEvento(login, evento){
    return this.http.put(this.REST_SERVICE_URI + '/' + login + '/eventos/' + evento.id, evento/*,
    {
      headers: new  HttpHeaders ({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true', 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT'
      })
    }*/);
  }

  eliminarEvento(login, id){
    return this.http.delete(this.REST_SERVICE_URI + '/' + login + '/eventos/' + id);
  }

  crearSesion(login, id_evento, sesion){
    return this.http.post(this.REST_SERVICE_URI + '/' + login + '/eventos/' + id_evento + '/sesiones', sesion);
  }

  eliminarSesion(login, id_evento, id_sesion){
    return this.http.delete(this.REST_SERVICE_URI + '/' + login + '/eventos/' + id_evento + '/sesiones/' + id_sesion);
  }

}
