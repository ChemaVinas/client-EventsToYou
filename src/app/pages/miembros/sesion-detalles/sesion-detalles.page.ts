import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sesion } from 'src/app/interfaces/sesion';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';

@Component({
  selector: 'app-sesion-detalles',
  templateUrl: './sesion-detalles.page.html',
  styleUrls: ['./sesion-detalles.page.scss'],
})
export class SesionDetallesPage implements OnInit {

  id_sesion: any;
  id_evento: any;
  sesion: Sesion;

  constructor(
    private navCtrl: NavController,
    private ProveedorEventos: ProveedorEventosService,
    private ProveedorMiembros: ProveedorMiembrosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController) {
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
                  if(error.status == 409){
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

}
