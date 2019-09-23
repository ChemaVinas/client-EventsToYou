import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { Sesion } from 'src/app/interfaces/sesion';
import { Valoracion } from 'src/app/interfaces/valoracion';
import { NgForm } from '@angular/forms';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-evento-detalles',
  templateUrl: './evento-detalles.page.html',
  styleUrls: ['./evento-detalles.page.scss'],
})
export class EventoDetallesPage implements OnInit {
  submitted = false;

  valor_puntuaciones: number[];
  id_evento: any;
  evento: Evento;
  sesiones: Sesion[];
  valoraciones: Valoracion[];
  valoracion_miembro: Valoracion;

  login_actual_miembro: string;
  eventoYaValorado: boolean;

  constructor(
    private proveedorEventos: ProveedorEventosService,
    private proveedorMiembros: ProveedorMiembrosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private cd: ChangeDetectorRef,
    private authenticationService: AuthenticationService) {
    //Obtenemos el id del evento como parámetro
    this.id_evento = this.activatedRoute.snapshot.paramMap.get('eventoId');
    this.valor_puntuaciones = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
    this.valoracion_miembro = { puntuacion: null, comentario: "" };
    this.login_actual_miembro = this.authenticationService.credenciales.value.login;
    this.eventoYaValorado = false;
  }

  ngOnInit() {
    this.obtenerEvento();
    this.obtenerSesiones();
    this.obtenerValoraciones();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar valoracion',
      message: '<div><strong>Puntuación: </strong>' + this.valoracion_miembro.puntuacion + '</div>' +
        '<div><strong>Comentario: </strong>' + this.valoracion_miembro.comentario + '</div>',
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
            this.guardarValoracion();
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

  onGuardarValoracion(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.presentAlertConfirm();
    } else {
      this.presentAlertError();
    }
  }

  async guardarValoracion() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.crearValoracion(
      this.evento.id,
      this.valoracion_miembro)
      .subscribe(
        async (data) => {
          await loading.dismiss();

          const toast = await this.toastController.create({
            message: "Valoración enviada",
            duration: 2000
          });
          toast.present();

          this.eventoYaValorado = true;
          this.valoracion_miembro = { puntuacion: null, comentario: "" };
          this.obtenerValoraciones();
          this.obtenerEvento();
        },
        (error) => {
          loading.dismiss();
          console.log(error);
        }
      );
  }

  async onEliminarValoracion(valoracion) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación:',
      message: '<div><strong>Puntuación: </strong>' + valoracion.puntuacion + '</div>' +
        '<div><strong>Comentario: </strong>' + valoracion.comentario + '</div>',
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
            this.eliminarValoracion(valoracion);
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarValoracion(valoracion) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.eliminarValoracion(
      valoracion.id)
      .subscribe(
        async (data) => {
          await loading.dismiss();

          const toast = await this.toastController.create({
            message: "Valoración eliminada",
            duration: 2000
          });
          toast.present();

          this.eventoYaValorado = false;
          this.submitted = false;
          this.obtenerValoraciones();
          this.obtenerEvento();
        },
        (error) => {
          loading.dismiss();
          console.log(error);
        }
      );
  }

  async guardarEvento() {
    const alert = await this.alertController.create({
      header: 'Confirmar el guardado',
      message: 'Guardar el evento: ' + this.evento.titulo,
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
            this.proveedorMiembros.guardarEvento(
              this.evento.id)
              .subscribe(
                async (data) => {

                  const toast = await this.toastController.create({
                    message: "Evento guardado",
                    duration: 2000
                  });
                  toast.present();

                },
                async (error) => {
                  //No se puede guardar un evento ya guardado
                  if (error.status == 409) {
                    const toast = await this.toastController.create({
                      message: "¡Ya has guardado el evento anteriormente!",
                      duration: 2000
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

  async obtenerEvento() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
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
  }

  async obtenerSesiones() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
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

  async obtenerValoraciones() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();

    this.proveedorEventos.obtenerValoracionesEvento(this.id_evento)
      .subscribe(
        async (data) => {
          this.valoraciones = data;

          if (this.valoraciones != null) {
            for (let valoracion of this.valoraciones) {
              if (valoracion.login_miembro == this.login_actual_miembro) {
                this.eventoYaValorado = true;
              }

              //Convertimos la fecha y almacenamos la hora
              var fecha_sesion = new Date(valoracion.fecha);

              var fecha = fecha_sesion.toLocaleDateString();
              var hora = fecha_sesion.toLocaleTimeString();
              valoracion.fechaString = fecha + " - " + hora;
            }
          }

          this.refresh();
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

  refresh(){
    this.cd.detectChanges();
  }

}
