import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../interfaces/evento';
import { Sesion } from '../interfaces/sesion';
import { Valoracion } from '../interfaces/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ProveedorEventosService {

  REST_SERVICE_URI = 'http://localhost:8080/EventsToYou/eventos';

  constructor(public http: HttpClient) {
    console.log('Hello ProveedorEventos Service Provider');
  }

  obtenerEventos(){
    return this.http.get<Evento[]>(this.REST_SERVICE_URI);
  }

  obtenerCategorias(){
    return this.http.get(this.REST_SERVICE_URI+'/categorias');
  }

  obtenerEventosCategoria(categoria){
    return this.http.get<Evento[]>(this.REST_SERVICE_URI+'/categorias/'+categoria);
  }

  obtenerEvento(id){
    return this.http.get<Evento>(this.REST_SERVICE_URI+'/'+id);
  }

  buscarEventos(patron){
    return this.http.get<Evento[]>(this.REST_SERVICE_URI+'?patron='+patron);
  }

  obtenerSesionesEvento(id){
    return this.http.get<Sesion[]>(this.REST_SERVICE_URI+'/'+id+'/sesiones');
  }

  obtenerSesionEvento(id_evento, id_sesion){
    return this.http.get<Sesion>(this.REST_SERVICE_URI+'/'+id_evento+'/sesiones/'+id_sesion);
  }

  obtenerValoracionesEvento(id){
    return this.http.get<Valoracion[]>(this.REST_SERVICE_URI+'/'+id+'/valoraciones');
  }

  crearValoracion(login, id_evento, valoracion){
    return this.http.post(this.REST_SERVICE_URI+'/'+id_evento+'/valoraciones?login=' + login, valoracion);
  }

  eliminarValoracion(login, id_evento, id_valoracion){
    return this.http.delete(this.REST_SERVICE_URI+'/'+id_evento+'/valoraciones/'+ id_valoracion +'?login=' + login);
  }

}
