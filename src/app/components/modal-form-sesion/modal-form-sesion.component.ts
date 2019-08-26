import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Sesion } from 'src/app/interfaces/sesion';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { ModalController, AlertController, LoadingController, NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { HttpClient } from '@angular/common/http';
import { ProveedorReverseGeocodingService } from 'src/app/providers/proveedor-reverse-geocoding.service';

@Component({
  selector: 'app-modal-form-sesion',
  templateUrl: './modal-form-sesion.component.html',
  styleUrls: ['./modal-form-sesion.component.scss'],
})
export class ModalFormSesionComponent implements OnInit {

  sesionGuardada: boolean;
  submitted = false;
  sesion: Sesion;
  id_evento: number;
  titulo_evento: string;

  fecha_sesion;
  hora_sesion;
  fecha_sesion_string: string;
  hora_sesion_string: string;

  fecha_min: string;
  fecha_max: string;

  marker: any;

  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(private proveedorEventos: ProveedorEventosService,
    private proveedorOrganizadores: ProveedorOrganizadoresService,
    private proveedorReverseGeocodingService: ProveedorReverseGeocodingService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private navParams: NavParams,
    private geolocation: Geolocation,

    public http: HttpClient) {

    let fecha_actual = new Date(),
      day = '' + fecha_actual.getDate(),
      month = '' + (fecha_actual.getMonth() + 1),
      year = fecha_actual.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.fecha_min = [year, month, day].join('-');
    this.fecha_max = [year + 2, month, day].join('-');

    this.sesionGuardada = false;
    this.id_evento = navParams.get('id_evento');
    this.titulo_evento = navParams.get('titulo_evento');
    this.sesion = {
      titulo_evento: this.titulo_evento,
      id_evento: this.id_evento,
      ciudad: '',
      direccion: '',
      latitud: null,
      longitud: null
    }
  }

  ngOnInit() {
    this.iniciarMapa();
  }

  dismissModal() {
    console.log('dismissModal ¿sesion guardada? -> ' + this.sesionGuardada);
    this.modalController.dismiss({
      'sesionGuardada': this.sesionGuardada
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar sesión',
      message: '<div><strong>Evento: </strong>' + this.titulo_evento + '</div>' +
        '<div><strong>Ciudad: </strong>' + this.sesion.ciudad + '</div>' +
        '<div><strong>Dirección: </strong>' + this.sesion.direccion + '</div>' +
        '<div><strong>Fecha: </strong>' + this.fecha_sesion_string + '</div>' +
        '<div><strong>Hora: </strong>' + this.hora_sesion_string + '</div>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.guardarSesion();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: '<strong>Compruebe todos los campos del formulario</strong>',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Aceptar');
          }
        }
      ]
    });

    await alert.present();
  }

  async guardarSesion() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorOrganizadores.crearSesion(
      this.id_evento,
      this.sesion)
      .subscribe(
        async (data) => {
          await loading.dismiss();
          this.sesionGuardada = true;
          this.dismissModal();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

  onGuardarSesion(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      var fecha_sesion = new Date(this.fecha_sesion);
      var hora_sesion = new Date(this.hora_sesion);

      this.fecha_sesion_string = fecha_sesion.toLocaleDateString();
      var hora = hora_sesion.getHours().toString();
      var minutos = hora_sesion.getMinutes().toString();
      if (minutos.length < 2) minutos = '0' + minutos;
      this.hora_sesion_string = hora + ":" + minutos;

      var fecha = new Date(
        fecha_sesion.getFullYear(),
        fecha_sesion.getMonth(),
        fecha_sesion.getDate(),
        hora_sesion.getHours(),
        hora_sesion.getMinutes()
      );

      this.sesion.fecha = fecha;

      this.presentAlertConfirm();
    } else {
      this.presentAlertError();
    }
  }




  async iniciarMapa() {
    const API_KEY = 'AIzaSyDzlaZjDKMU2cVYRhwWiTE1NF9mqN8rh2Y';
    const googleMaps = await getGoogleMaps(
      API_KEY
    );

    const mapEle = this.mapElement.nativeElement;

    const rta = await this.geolocation.getCurrentPosition();
    this.obtenerDatosPosicion(rta.coords.latitude, rta.coords.longitude, API_KEY);
    var myLatLng = { lat: rta.coords.latitude, lng: rta.coords.longitude };
    //var myLatLng = { lat: 37.777022, lng: -3.794393 };

    const map = new googleMaps.Map(mapEle, {
      center: myLatLng,
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false
    });

    var marker = new googleMaps.Marker({
      position: myLatLng,
      map: map
    });

    map.addListener('click', (e) => {
      marker.setMap(null);
      var new_marker = new googleMaps.Marker({
        position: e.latLng,
        map: map
      });
      marker = new_marker;
      map.panTo(e.latLng);

      console.log(e.latLng.lat().toFixed(6) + " " + e.latLng.lng().toFixed(6));

      this.obtenerDatosPosicion(e.latLng.lat().toFixed(6), e.latLng.lng().toFixed(6), API_KEY);

    });

    googleMaps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }


  obtenerDatosPosicion(lat, lng, API_KEY) {
    this.proveedorReverseGeocodingService.obtenerDatosPosicion(lat, lng, API_KEY).subscribe(
      async (data) => {
        var direccion = data.results[0].address_components[1].short_name + ", " + data.results[0].address_components[0].short_name;
        var ciudad = data.results[0].address_components[2].short_name;
        this.sesion.direccion = direccion;
        this.sesion.ciudad = ciudad;
        this.sesion.latitud = lat;
        this.sesion.longitud = lng;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //FIN DE LA CLASE PRINCIPAL
}



function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });

}