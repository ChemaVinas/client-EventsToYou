import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorSesionesService {

  data: any;

  REST_SERVICE_URI = 'http://localhost:8080/EventsToYou/sesiones';

  constructor(public http: HttpClient) {
    console.log('Hello ProveedorSesiones Service Provider');
  }

  obtenerSesion(id){
    return this.http.get(this.REST_SERVICE_URI+'/'+id);
  }

}
