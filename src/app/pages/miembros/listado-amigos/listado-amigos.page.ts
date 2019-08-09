import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-listado-amigos',
  templateUrl: './listado-amigos.page.html',
  styleUrls: ['./listado-amigos.page.scss'],
})
export class ListadoAmigosPage implements OnInit {

  amigos: Usuario[];

  constructor(
    private navCtrl: NavController,
    private proveedorMiembros: ProveedorMiembrosService,
    private proveedorOrganizadores: ProveedorOrganizadoresService,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {

    console.log('ngOnInit listado-amigos page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerMiembrosSeguidos('login_miembro1')
      .subscribe(
        async (data) => {
          this.amigos = data;
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }



}
