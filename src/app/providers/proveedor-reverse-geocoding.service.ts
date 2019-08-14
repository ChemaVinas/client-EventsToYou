import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorReverseGeocodingService {
  
  constructor(public http: HttpClient) { }

  obtenerDatosPosicion(lat, lng, API_KEY){
    return this.http.get<any>("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key="+API_KEY);
  }
}
