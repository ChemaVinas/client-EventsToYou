import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { ActivatedRoute } from '@angular/router';
import { ModalFormEventoComponent } from 'src/app/components/modal-form-evento/modal-form-evento.component';
import { Usuario } from 'src/app/interfaces/usuario';
import { Evento } from 'src/app/interfaces/evento';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-organizador-perfil',
  templateUrl: './organizador-perfil.page.html',
  styleUrls: ['./organizador-perfil.page.scss'],
})
export class OrganizadorPerfilPage implements OnInit {

  organizador: Usuario;
  eventos: Evento[];
  login: any;

  constructor(
    private navCtrl: NavController,
    private proveedorOrganizadores: ProveedorOrganizadoresService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController,
    private storage: Storage) {
    //Obtenemos el login del organizador desde memoria
    storage.get("credenciales").then(value => {
      if (value) {
        this.login = value.login;
      }
    });
  }

  async ngOnInit() {

    console.log('ngOnInit organizador-detalles page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorOrganizadores.obtenerOrganizador(this.login)
      .subscribe(
        async (data) => {
          this.organizador = data;

          var fecha_alta = new Date(this.organizador.fecha_alta);

          this.organizador.fechaString = fecha_alta.toLocaleDateString();

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

  ionViewWillEnter() {
    this.obtenerEventosDeOrganizador();
  }

  async presentGuardarEventoModalForm() {
    const modal = await this.modalController.create({
      component: ModalFormEventoComponent,
      componentProps: {
        'nuevoEvento': true
      }
    });

    modal.onDidDismiss().then(async (data) => {

      if (data.data.eventoGuardado) {
        this.obtenerEventosDeOrganizador();
      }

    });

    return await modal.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Evento guardado correctamente.',
      duration: 2000
    });
    toast.present();
  }



  async obtenerEventosDeOrganizador() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorOrganizadores.obtenerEventosDeOrganizador(this.login)
      .subscribe(
        async (data) => {
          this.eventos = data;
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }
}
