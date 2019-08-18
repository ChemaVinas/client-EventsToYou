import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalFormUsuarioComponent } from 'src/app/components/modal-form-usuario/modal-form-usuario.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales;
  segmento;
  submitted = false;

  constructor(private authenticationService: AuthenticationService,
    private alertController: AlertController,
    private modalController: ModalController) {
    this.credenciales = { login: "", clave: "" };
  }

  ngOnInit() {
    this.segmento = "Miembro";
  }

  ionViewDidLeave() {
    this.credenciales = { login: "", clave: "" };
    this.submitted = false;
  }
  
  loginMiembro(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authenticationService.login_miembro(this.credenciales.login, this.credenciales.clave);
    } else {
      this.presentAlertError("Compruebe todos los campos del formulario");
    }
  }

  loginOrganizador(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authenticationService.login_organizador(this.credenciales.login, this.credenciales.clave);
    } else {
      this.presentAlertError("Compruebe todos los campos del formulario");
    }
  }


  segmentoCambiado(ev: any) {
    this.credenciales = { login: "", clave: "" };
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

  async presentUsuarioModalForm() {
    const modal = await this.modalController.create({
      component: ModalFormUsuarioComponent
    });
    return await modal.present();
  }

}
