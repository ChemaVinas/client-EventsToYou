import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { Evento } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage {

  eventos: Evento[];

  constructor(
    private proveedorEventos: ProveedorEventosService,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {

    console.log('ngOnInit inicio page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorEventos.obtenerEventos()
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
