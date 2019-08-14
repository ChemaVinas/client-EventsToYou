import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sesion } from 'src/app/interfaces/sesion';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
//import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-sesion-detalles',
  templateUrl: './sesion-detalles.page.html',
  styleUrls: ['./sesion-detalles.page.scss'],
})
export class SesionDetallesPage implements OnInit {

  id_sesion: any;
  id_evento: any;
  sesion: Sesion;
  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(
    private navCtrl: NavController,
    private ProveedorEventos: ProveedorEventosService,
    private ProveedorMiembros: ProveedorMiembrosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController/*,
    private geolocation: Geolocation*/) {
    //Obtenemos el id de la sesion como parámetro
    this.id_sesion = this.activatedRoute.snapshot.paramMap.get('sesionId');
    this.id_evento = this.activatedRoute.snapshot.paramMap.get('eventoId');
  }

  async ngOnInit() {

    console.log('ngOnInit sesion-detalles page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.ProveedorEventos.obtenerSesionEvento(this.id_evento, this.id_sesion)
      .subscribe(
        async (data) => {
          this.sesion = data;

          var fecha_sesion = new Date(this.sesion.fecha);

          var fecha = fecha_sesion.toLocaleDateString();
          var hora = fecha_sesion.getHours().toString();
          var minutos = fecha_sesion.getMinutes().toString();
          if (minutos.length < 2) minutos = '0' + minutos;
          this.sesion.fechaString = fecha;
          this.sesion.horaString = hora + ":" + minutos;

          this.iniciarMapa();
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

  }

  async apuntarseASesion() {
    const alert = await this.alertController.create({
      header: 'Confirmar apunte',
      message: 'Apuntarse a la sesión del evento: ' + this.sesion.titulo_evento,
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
            this.ProveedorMiembros.apuntarseASesion(
              "login_miembro1", this.sesion.id_sesion)
              .subscribe(
                async (data) => {

                  const toast = await this.toastController.create({
                    message: "Apuntado a la sesión",
                    duration: 4000
                  });
                  toast.present();
                  this.router.navigate(['/evento-detalles/' + this.id_evento]);

                },
                async (error) => {
                  //No se puede apuntar a una sesión ya apuntada
                  if (error.status == 409) {
                    const toast = await this.toastController.create({
                      message: "¡Ya estabas apuntado a esta sesión anteriormente!",
                      duration: 4000
                    });
                    toast.present();
                  };
                  console.log(error);
                }
              );
          }
        }
      ]
    });

    await alert.present();

  }

  async iniciarMapa() {

    const googleMaps = await getGoogleMaps(
      'AIzaSyDzlaZjDKMU2cVYRhwWiTE1NF9mqN8rh2Y'
    );

    const mapEle = this.mapElement.nativeElement;

    var myLatLng = { lat: this.sesion.latitud, lng: this.sesion.longitud };

    /*const rta = await this.geolocation.getCurrentPosition();
    var myLatLng = { lat: rta.coords.latitude, lng: rta.coords.longitude };
    console.log(myLatLng);*/

    const map = new googleMaps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false
    });

    /*const infoWindow = new googleMaps.InfoWindow({
      content: `<h4 style="color: #a41df2;">` + this.sesion.titulo_evento +  `</h4>`
    });*/

    const marker = new googleMaps.Marker({
      position: myLatLng,
      map,
      title: "Marcador de sesión"
    });

    // Place a draggable marker on the map
    /*var marker = new googleMaps.Marker({
      position: myLatLng,
      map: map,
      draggable: true,
      title: "Drag me!"
    });*/

    /*marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });*/

    googleMaps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
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