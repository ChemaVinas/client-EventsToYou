import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias;

  constructor(
    private navCtrl: NavController,
    private proveedorEventos: ProveedorEventosService,
    private loadingCtrl: LoadingController,
    private modalController: ModalController) { }

  async ngOnInit() {

    console.log('ngOnInit categorias page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorEventos.obtenerCategorias()
      .subscribe(
        async (data) => {
          this.categorias = data;
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

  }


}
