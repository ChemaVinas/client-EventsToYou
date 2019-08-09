import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { SesionApuntada } from '../interfaces/SesionApuntada';
import { EventoGuardado } from '../interfaces/EventoGuardado';
import { Valoracion } from '../interfaces/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ProveedorMiembrosService {

  data: any;

  REST_SERVICE_URI = 'http://localhost:8080/EventsToYou/miembros';

  constructor(public http: HttpClient) {
    console.log('Hello ProveedorMiembros Service Provider');
  }

  obtenerMiembros(){
    return this.http.get<Usuario[]>(this.REST_SERVICE_URI);
  }

  obtenerMiembro(login){
    return this.http.get<Usuario>(this.REST_SERVICE_URI+'/'+login);
  }

  obtenerMiembrosSeguidos(login){
    return this.http.get<Usuario[]>(this.REST_SERVICE_URI+'/'+login+'/miembros_seguidos');
  }

  obtenerSesionesApuntadas(login){
    return this.http.get<SesionApuntada[]>(this.REST_SERVICE_URI+'/'+login+'/sesiones_apuntadas');
  }

  obtenerEventosGuardados(login){
    return this.http.get<EventoGuardado[]>(this.REST_SERVICE_URI+'/'+login+'/eventos_guardados');
  }

  obtenerValoracionesDeMiembro(login){
    return this.http.get<Valoracion[]>(this.REST_SERVICE_URI+'/'+login+'/valoraciones');
  }

  obtenerSesionesApuntadasAmigos(login){
    return this.http.get<SesionApuntada[]>(this.REST_SERVICE_URI+'/'+login+'/miembros_seguidos/sesiones_apuntadas');
  }

  obtenerEventosGuardadosAmigos(login){
    return this.http.get<EventoGuardado[]>(this.REST_SERVICE_URI+'/'+login+'/miembros_seguidos/eventos_guardados');
  }

  obtenerValoracionesAmigos(login){
    return this.http.get<Valoracion[]>(this.REST_SERVICE_URI+'/'+login+'/miembros_seguidos/valoraciones');
  }
}
