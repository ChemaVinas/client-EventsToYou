import { Component, OnInit } from '@angular/core';
import { Sesion } from 'src/app/interfaces/sesion';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';

@Component({
  selector: 'app-sesion-organizada',
  templateUrl: './sesion-organizada.page.html',
  styleUrls: ['./sesion-organizada.page.scss'],
})
export class SesionOrganizadaPage implements OnInit {

  id_sesion: any;
  id_evento: any;
  sesion: Sesion;

  constructor(
    private navCtrl: NavController,
    private proveedorOrganizadores: ProveedorOrganizadoresService,
    private proveedorEventos: ProveedorEventosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router) {
    //Obtenemos el id de la sesion como parámetro
    this.id_sesion = this.activatedRoute.snapshot.paramMap.get('sesionId');
    this.id_evento = this.activatedRoute.snapshot.paramMap.get('eventoId');
  }

  async ngOnInit() {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorEventos.obtenerSesionEvento(this.id_evento, this.id_sesion)
      .subscribe(
        async (data) => {
          this.sesion = data;

          var fecha_sesion = new Date(this.sesion.fecha);

          this.sesion.fechaString = fecha_sesion.toLocaleDateString();
          var hora = fecha_sesion.getHours().toString();
          var minutos = fecha_sesion.getMinutes().toString();
          if (minutos.length < 2) minutos = '0' + minutos;
          this.sesion.horaString = hora + ":" + minutos;

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

  }

  async presentAlertDeleteConfirm() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Confirmar eliminación de sesión',
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
            this.eliminarEvento();
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarEvento() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorOrganizadores.eliminarSesion(
      "login_organizador1",
      this.sesion.id_evento,
      this.sesion.id_sesion)
      .subscribe(
        async (data) => {
          await loading.dismiss();
          this.router.navigate(['/evento-organizado/', this.sesion.id_evento]);
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

}
