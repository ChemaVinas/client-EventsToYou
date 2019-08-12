import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { EventoGuardado } from 'src/app/interfaces/EventoGuardado';
import { SesionApuntada } from 'src/app/interfaces/SesionApuntada';
import { Valoracion } from 'src/app/interfaces/valoracion';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';

@Component({
  selector: 'app-miembro-detalles',
  templateUrl: './miembro-detalles.page.html',
  styleUrls: ['./miembro-detalles.page.scss'],
})
export class MiembroDetallesPage implements OnInit {

  miembro: Usuario;
  eventos_guardados: EventoGuardado[];
  sesiones_apuntadas: SesionApuntada[];
  valoraciones: Valoracion[];
  login: any;
  segmento;

  constructor(
    private navCtrl: NavController,
    private proveedorEventos: ProveedorEventosService,
    private proveedorMiembros: ProveedorMiembrosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private cd: ChangeDetectorRef) {
    //Obtenemos el login del miembro como parámetro
    this.login = this.activatedRoute.snapshot.paramMap.get('login');
  }

  async ngOnInit() {

    console.log('ngOnInit miembro-detalles page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerMiembro(this.login)
      .subscribe(
        async (data) => {
          this.miembro = data;

          var fecha_alta = new Date(this.miembro.fecha_alta);

          this.miembro.fechaString = fecha_alta.toLocaleDateString();

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

    this.segmento = "Apuntados";
    this.getSesionesApuntadas();

  }

  async getSesionesApuntadas() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerSesionesApuntadas(this.login)
      .subscribe(
        async (data) => {
          this.sesiones_apuntadas = data;

          if (this.sesiones_apuntadas != null) {
            //Convertimos la fecha y almacenamos la hora
            for (let sesion_apuntada of this.sesiones_apuntadas) {
              var fecha_sesion_apuntada = new Date(sesion_apuntada.fecha);

              var fecha = fecha_sesion_apuntada.toLocaleDateString();
              var hora = fecha_sesion_apuntada.toLocaleTimeString();
              sesion_apuntada.fechaString = fecha + " - " + hora;
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

  async getEventosGuardados() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerEventosGuardados(this.login)
      .subscribe(
        async (data) => {
          this.eventos_guardados = data;

          if (this.eventos_guardados != null) {
            //Convertimos la fecha y almacenamos la hora
            for (let evento_guardado of this.eventos_guardados) {
              var fecha_evento_guardado = new Date(evento_guardado.fecha);

              var fecha = fecha_evento_guardado.toLocaleDateString();
              var hora = fecha_evento_guardado.toLocaleTimeString();
              evento_guardado.fechaString = fecha + " - " + hora;
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

  async getValoraciones() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerValoracionesDeMiembro(this.login)
      .subscribe(
        async (data) => {
          this.valoraciones = data;

          if (this.valoraciones != null) {
            //Convertimos la fecha y almacenamos la hora
            for (let valoracion of this.valoraciones) {
              var fecha_valoracion = new Date(valoracion.fecha);

              var fecha = fecha_valoracion.toLocaleDateString();
              var hora = fecha_valoracion.toLocaleTimeString();
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

  segmentoCambiado(ev: any) {
    this.segmento = ev.detail.value;

    switch (this.segmento) {
      case "Apuntados": {
        this.getSesionesApuntadas();
        break;
      }
      case "Guardados": {
        this.getEventosGuardados();
        break;
      }
      case "Valoraciones": {
        this.getValoraciones();
        break;
      }
      default: {
        console.log("Segmento inválido");
        break;
      }
    }
  }

  async eliminarValoracion(valoracion) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: 'Eliminar valoración del evento: ' + valoracion.titulo_evento,
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
            this.proveedorEventos.eliminarValoracion(
              "login_miembro1",
              valoracion.id_evento,
              valoracion.id)
              .subscribe(
                async (data) => {

                  const toast = await this.toastController.create({
                    message: "Valoración eliminada correctamente",
                    duration: 2000
                  });
                  toast.present();

                  this.getValoraciones();
                },
                (error) => {
                  console.log(error);
                }
              );
          }
        }
      ]
    });

    await alert.present();

  }

  async eliminarSesionApuntada(sesion_apuntada) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: 'Eliminar la asistencia al evento: ' + sesion_apuntada.titulo_evento +
        ' en ' + sesion_apuntada.ciudad_sesion,
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
            this.proveedorMiembros.desapuntarseASesion(
              "login_miembro1", sesion_apuntada.id)
              .subscribe(
                async (data) => {

                  const toast = await this.toastController.create({
                    message: "Sesion desapuntada correctamente",
                    duration: 2000
                  });
                  toast.present();

                  this.getSesionesApuntadas();
                },
                (error) => {
                  console.log(error);
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarEventoGuardado(evento_guardado) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: 'Dejar de guardar el evento: ' + evento_guardado.titulo_evento,
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
            this.proveedorMiembros.dejarDeGuardarEvento(
              "login_miembro1", evento_guardado.id)
              .subscribe(
                async (data) => {

                  const toast = await this.toastController.create({
                    message: "Has dejado de guardar el evento correctamente",
                    duration: 2000
                  });
                  toast.present();

                  this.getEventosGuardados();
                },
                (error) => {
                  console.log(error);
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }

  async seguirAlMiembro() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Seguir al miembro: ' + this.miembro.nombre,
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
            this.proveedorMiembros.seguirMiembro(
              "login_miembro1", this.miembro.login)
              .subscribe(
                async (data) => {

                  const toast = await this.toastController.create({
                    message: "Miembro seguido",
                    duration: 2000
                  });
                  toast.present();

                },
                async (error) => {
                  //No se puede seguir a un miembro ya seguido
                  if (error.status == 409) {
                    const toast = await this.toastController.create({
                      message: "¡Ya has seguido a este miembro anteriormente!",
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


  refresh(){
    this.cd.detectChanges();
  }

}
