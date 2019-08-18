import { Component, OnInit } from '@angular/core';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-modal-form-usuario',
  templateUrl: './modal-form-usuario.component.html',
  styleUrls: ['./modal-form-usuario.component.scss'],
})
export class ModalFormUsuarioComponent implements OnInit {

  segmento;
  submitted = false;
  usuario: Usuario;

  constructor(private authenticationService: AuthenticationService,
    private proveedorOrganizadores: ProveedorOrganizadoresService,
    private proveedorMiembros: ProveedorMiembrosService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController) {
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

}
