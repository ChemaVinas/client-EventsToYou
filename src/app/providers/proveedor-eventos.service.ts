import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorEventosService {

  data: any;

  REST_SERVICE_URI = 'http://localhost:8080/EventsToYou/eventos';

  constructor(public http: HttpClient) {
    console.log('Hello ProveedorEventos Service Provider');
  }

  obtenerEventos(){
    return this.http.get(this.REST_SERVICE_URI);
  }

  obtenerCategorias(){
    return this.http.get(this.REST_SERVICE_URI+'/categorias');
  }

  obtenerEventosCategoria(categoria){
    return this.http.get(this.REST_SERVICE_URI+'/categorias/'+categoria);
  }

  obtenerEvento(id){
    return this.http.get(this.REST_SERVICE_URI+'/'+id);
  }

  obtenerSesionesEvento(id){
    return this.http.get(this.REST_SERVICE_URI+'/'+id+'/sesiones');
  }

  obtenerValoracionesEvento(id){
    return this.http.get(this.REST_SERVICE_URI+'/'+id+'/valoraciones');
  }

}
