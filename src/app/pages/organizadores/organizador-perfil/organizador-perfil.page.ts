import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { ActivatedRoute } from '@angular/router';
import { ModalFormEventoComponent } from 'src/app/components/modal-form-evento/modal-form-evento.component';
import { Usuario } from 'src/app/interfaces/usuario';
import { Evento } from 'src/app/interfaces/evento';

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
    private toastController: ToastController) {
    //Obtenemos el login del organizador como parámetro
    this.login = this.activatedRoute.snapshot.paramMap.get('login');
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

  async ionViewWillEnter() {
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

  ngOnChanges() {
    console.log('ngOnChanges organizador-perfil page');
  }

  /*ngDoCheck() {
    console.log('ngDoCheck organizador-perfil page');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked organizador-perfil page');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked organizador-perfil page');
  }*/





  ngAfterViewInit() {
    console.log('ngAfterViewInit organizador-perfil page');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit organizador-perfil page');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy organizador-perfil page');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter organizador-perfil page');
  }



  ionViewWillLeave() {
    console.log('ionViewWillLeave organizador-perfil page');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave organizador-perfil page');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload organizador-perfil page');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad organizador-perfil page');
  }

  ionViewCanEnter() {
    console.log('ionViewCanEnter organizador-perfil page');
  }

  ionViewCanLeave() {
    console.log('ionViewCanLeave organizador-perfil page');
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

        const loading = await this.loadingCtrl.create({
          message: 'Cargando..',
        });

        await loading.present();

        this.proveedorOrganizadores.obtenerEventosDeOrganizador(this.login)
          .subscribe(
            async (data) => {
              this.eventos = data;
              await loading.dismiss();
              this.presentToast();
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Evento guardado correctamente.',
      duration: 2000
    });
    toast.present();
  }

}
