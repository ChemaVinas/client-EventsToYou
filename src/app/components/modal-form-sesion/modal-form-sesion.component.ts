import { Component, OnInit } from '@angular/core';
import { Sesion } from 'src/app/interfaces/sesion';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { ModalController, AlertController, LoadingController, NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';

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

  constructor(private proveedorEventos: ProveedorEventosService,
      private proveedorOrganizadores: ProveedorOrganizadoresService,
      private modalController: ModalController,
      private alertController: AlertController,
      private loadingCtrl: LoadingController,
      private navParams: NavParams) {

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
    }
  }

  ngOnInit() { }

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
        '<div><strong>Hora: </strong>' + this.hora_sesion_string + '</div>' ,
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
      "login_organizador1",
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

}
