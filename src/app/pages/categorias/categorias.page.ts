import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { CategoriaModalComponent } from 'src/app/components/categoria-modal/categoria-modal.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias;

  constructor(
    public navCtrl: NavController,
    public proveedorEventos: ProveedorEventosService,
    private loadingCtrl: LoadingController,
    public modalController: ModalController) { }

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

  async presentModalCategoria(categoria) {
    const modal = await this.modalController.create({
      component: CategoriaModalComponent,
      componentProps: { categoria: categoria}
    });
    return await modal.present();
  }


}
