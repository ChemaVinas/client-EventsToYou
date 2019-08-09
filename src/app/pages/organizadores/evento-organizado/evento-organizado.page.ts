import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalFormEventoComponent } from 'src/app/components/modal-form-evento/modal-form-evento.component';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { Evento } from 'src/app/interfaces/evento';
import { Sesion } from 'src/app/interfaces/sesion';
import { Valoracion } from 'src/app/interfaces/valoracion';
import { ModalFormSesionComponent } from 'src/app/components/modal-form-sesion/modal-form-sesion.component';

@Component({
  selector: 'app-evento-organizado',
  templateUrl: './evento-organizado.page.html',
  styleUrls: ['./evento-organizado.page.scss'],
})
export class EventoOrganizadoPage implements OnInit {

  eventoInterface: Evento;

  id_evento: any;
  evento: Evento;
  sesiones: Sesion[];
  valoraciones: Valoracion[];

  constructor(
    private navCtrl: NavController,
    private proveedorEventos: ProveedorEventosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private modalController: ModalController,
    private proveedorOrganizadores: ProveedorOrganizadoresService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router) {
    //Obtenemos el id del evento como parámetro
    this.id_evento = this.activatedRoute.snapshot.paramMap.get('eventoId');
  }

  async ngOnInit() {

    console.log('ngOnInit evento-organizado page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorEventos.obtenerEvento(this.id_evento)
      .subscribe(
        async (data) => {
          this.evento = data;
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

    this.proveedorEventos.obtenerValoracionesEvento(this.id_evento)
      .subscribe(
        async (data) => {
          this.valoraciones = data;

          if (this.valoraciones != null) {
            //Convertimos la fecha y almacenamos la hora
            for (let valoracion of this.valoraciones) {
              var fecha_sesion = new Date(valoracion.fecha);

              var fecha = fecha_sesion.toLocaleDateString();
              var hora = fecha_sesion.toLocaleTimeString();
              valoracion.fechaString = fecha + " - " + hora;
            }
          }

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorEventos.obtenerSesionesEvento(this.id_evento)
      .subscribe(
        async (data) => {
          this.sesiones = data;

          if (this.sesiones != null) {
            //Convertimos la fecha y almacenamos la hora
            for (let sesion of this.sesiones) {
              var fecha_sesion = new Date(sesion.fecha);

              var fecha = fecha_sesion.toLocaleDateString();
              var hora = fecha_sesion.getHours().toString();
              var minutos = fecha_sesion.getMinutes().toString();
              if (minutos.length < 2) minutos = '0' + minutos;
              sesion.fechaString = fecha + " - " + hora + ":" + minutos;
            }
          }

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

  async presentGuardarEventoModalForm() {
    const modal = await this.modalController.create({
      component: ModalFormEventoComponent,
      componentProps: {
        'nuevoEvento': false,
        'id': this.evento.id,
        'titulo': this.evento.titulo,
        'descripcion': this.evento.descripcion,
        'categoria': this.evento.categoria,
        'web': this.evento.web_entradas
      }
    });

    modal.onDidDismiss().then(async (data) => {

      if (data.data.eventoGuardado) {

        const loading = await this.loadingCtrl.create({
          message: 'Cargando..',
        });

        await loading.present();

        this.proveedorEventos.obtenerEvento(this.id_evento)
          .subscribe(
            async (data) => {
              this.evento = data;
              await loading.dismiss();
              this.presentToast('Evento guardado correctamente.');
            },
            (error) => {
              console.log(error);
              loading.dismiss();
            }
          );

      }

    });

    return await modal.present();
  }

  async presentCrearSesionModalForm() {
    const modal = await this.modalController.create({
      component: ModalFormSesionComponent,
      componentProps: {
        'id_evento': this.evento.id,
        'titulo_evento': this.evento.titulo
      }
    });

    modal.onDidDismiss().then(async (data) => {

      if (data.data.sesionGuardada) {

        const loading = await this.loadingCtrl.create({
          message: 'Cargando..',
        });

        await loading.present();

        this.proveedorEventos.obtenerSesionesEvento(this.id_evento)
          .subscribe(
            async (data) => {
              this.sesiones = data;

              if (this.sesiones != null) {
                //Convertimos la fecha y almacenamos la hora
                for (let sesion of this.sesiones) {
                  var fecha_sesion = new Date(sesion.fecha);

                  var fecha = fecha_sesion.toLocaleDateString();
                  var hora = fecha_sesion.getHours().toString();
                  var minutos = fecha_sesion.getMinutes().toString();
                  if (minutos.length < 2) minutos = '0' + minutos;
                  sesion.fechaString = fecha + " - " + hora + ":" + minutos;
                }
              }

              await loading.dismiss();
            },
            (error) => {
              console.log(error);
              loading.dismiss();
            }
          );

      }

    });

    return await modal.present();
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertDeleteConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación de evento',
      message: '<div><strong>Título: </strong>' + this.evento.titulo + '</div>' +
        '<div><strong>Descripción: </strong>' + this.evento.descripcion + '</div>' +
        '<div><strong>Categoría: </strong>' + this.evento.categoria + '</div>' +
        '<div><strong>Web: </strong>' + this.evento.web_entradas + '</div>',
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

    this.proveedorOrganizadores.eliminarEvento(
      "login_organizador1",
      this.evento.id)
      .subscribe(
        async (data) => {
          await loading.dismiss();
          this.router.navigate(['/organizador-perfil/login_organizador1']);
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

}
