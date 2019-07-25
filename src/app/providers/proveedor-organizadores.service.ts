import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorOrganizadoresService {

  data: any;

  REST_SERVICE_URI = 'http://localhost:8080/EventsToYou/organizadores';

  constructor(public http: HttpClient) {
    console.log('Hello ProveedorOrganizadores Service Provider');
  }

  obtenerOrganizadores(){
    return this.http.get(this.REST_SERVICE_URI);
  }

  obtenerOrganizador(login){
    return this.http.get(this.REST_SERVICE_URI+'/'+login);
  }
}
