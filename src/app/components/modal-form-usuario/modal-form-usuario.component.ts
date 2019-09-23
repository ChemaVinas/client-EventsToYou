import { Component, OnInit } from '@angular/core';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-modal-form-usuario',
  templateUrl: './modal-form-usuario.component.html',
  styleUrls: ['./modal-form-usuario.component.scss'],
})
export class ModalFormUsuarioComponent implements OnInit {

  foto;
  segmento;
  submitted = false;
  usuario: Usuario;

  constructor(
    private camera: Camera,
    private authenticationService: AuthenticationService,
    private modalController: ModalController,
    private alertController: AlertController) {
    this.usuario = {
      login: "",
      nombre: "",
      clave: "",
      ubicacion: "",
      biografia: "",
      web: "",
      descripcion: ""
    };
  }

  ngOnInit() {
    this.segmento = "Miembro";
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  registrarMiembro(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authenticationService.registrar_miembro(this.usuario);
    } else {
      this.presentAlertError("Compruebe todos los campos del formulario");
    }
  }

  registrarOrganizador(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authenticationService.registrar_organizador(this.usuario);
    } else {
      this.presentAlertError("Compruebe todos los campos del formulario");
    }
  }


  segmentoCambiado(ev: any) {
    this.usuario = {
      login: "",
      nombre: "",
      clave: "",
      ubicacion: "",
      biografia: "",
      web: "",
      descripcion: ""
    };
    this.foto = null;
    this.segmento = ev.detail.value;
  }

  async presentAlertError(mensaje) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: '<strong>' + mensaje + '</strong>',
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

  elegirImagen(){
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData
      this.usuario.avatar = imageData;
    });
  }

}
