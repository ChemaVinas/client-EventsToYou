import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-listado-amigos',
  templateUrl: './listado-amigos.page.html',
  styleUrls: ['./listado-amigos.page.scss'],
})
export class ListadoAmigosPage implements OnInit {

  amigos: Usuario[];

  constructor(
    private proveedorMiembros: ProveedorMiembrosService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private cd: ChangeDetectorRef) { }

  async ngOnInit() {

    console.log('ngOnInit listado-amigos page');
    this.obtenerMiembrosSeguidos();

  }

  async obtenerMiembrosSeguidos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerMiembrosSeguidos()
      .subscribe(
        async (data) => {
          this.amigos = data;
          this.refresh();
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

  async dejarDeSeguirAMiembro(amigo) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Dejar de seguir al miembro: ' + amigo.nombre,
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
            this.proveedorMiembros.dejarSeguirMiembro(
              amigo.login)
              .subscribe(
                async (data) => {

                  const toast = await this.toastController.create({
                    message: "Has dejado de seguir al miembro correctamente",
                    duration: 2000
                  });
                  toast.present();

                  this.obtenerMiembrosSeguidos();
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


  refresh(){
    this.cd.detectChanges();
  }

}
