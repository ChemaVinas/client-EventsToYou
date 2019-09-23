import { Component, OnInit } from '@angular/core';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ModalController, AlertController, LoadingController, NavParams } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { Evento } from 'src/app/interfaces/evento';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-modal-form-evento',
  templateUrl: './modal-form-evento.component.html',
  styleUrls: ['./modal-form-evento.component.scss'],
})
export class ModalFormEventoComponent implements OnInit {

  foto;
  eventoGuardado: boolean; //< Comprobación si el evento ha sido guardado

  evento: Evento;
  nuevoEvento: boolean;

  submitted = false;

  categorias;

  constructor(
    private camera: Camera,
    private proveedorEventos: ProveedorEventosService,
    private proveedorOrganizadores: ProveedorOrganizadoresService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private navParams: NavParams) {

    this.eventoGuardado = false;
    //Verificamos si vamos a crear un nuevo evento
    this.nuevoEvento = navParams.get('nuevoEvento');

    if (this.nuevoEvento) {
      this.evento = {
        titulo: '',
        descripcion: '',
        categoria: '',
        web_entradas: ''
      };
    } else {
      this.evento = {
        id: navParams.get('id'),
        titulo: navParams.get('titulo'),
        descripcion: navParams.get('descripcion'),
        categoria: navParams.get('categoria'),
        web_entradas: navParams.get('web')
      };
    }
  }

  ngOnInit() {
    this.proveedorEventos.obtenerCategorias()
      .subscribe(
        async (data) => {
          this.categorias = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  dismissModal() {
    this.modalController.dismiss({
      'eventoGuardado': this.eventoGuardado
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar evento',
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
            this.guardarEvento();
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

  async guardarEvento() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    if (this.nuevoEvento) {

      this.proveedorOrganizadores.crearEvento(
        this.evento)
        .subscribe(
          async (data) => {
            await loading.dismiss();
            this.eventoGuardado = true;
            this.dismissModal();
          },
          (error) => {
            console.log(error);
            loading.dismiss();
          }
        );

    } else {

      this.proveedorOrganizadores.modificarEvento(
        this.evento)
        .subscribe(
          async (data) => {
            await loading.dismiss();
            this.eventoGuardado = true;
            this.dismissModal();
          },
          (error) => {
            console.log(error);
            loading.dismiss();
          }
        );

    }


  }

  onGuardarEvento(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.presentAlertConfirm();
    } else {
      this.presentAlertError();
    }
  }



  elegirImagen(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData
      this.evento.imagen = imageData;
    });
  }

}
