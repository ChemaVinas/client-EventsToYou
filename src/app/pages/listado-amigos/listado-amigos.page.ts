import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';

@Component({
  selector: 'app-listado-amigos',
  templateUrl: './listado-amigos.page.html',
  styleUrls: ['./listado-amigos.page.scss'],
})
export class ListadoAmigosPage implements OnInit {

  miembros;
  organizadores; //< Provisional

  constructor(
    public navCtrl: NavController,
    public proveedorMiembros: ProveedorMiembrosService,
    public proveedorOrganizadores: ProveedorOrganizadoresService,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {

    console.log('ngOnInit listado-amigos page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerMiembros()
      .subscribe(
        async (data) => {
          this.miembros = data;
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

    //Provisional
    this.proveedorOrganizadores.obtenerOrganizadores()
      .subscribe(
        async (data) => {
          this.organizadores = data;
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }



}
