import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-categoria-eventos',
  templateUrl: './categoria-eventos.page.html',
  styleUrls: ['./categoria-eventos.page.scss'],
})
export class CategoriaEventosPage implements OnInit {

  eventos: Evento[];
  categoria;

  constructor(
    private navCtrl: NavController,
    private proveedorEventos: ProveedorEventosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController) {
    //Obtenemos la categoria como parámetro
    this.categoria = this.activatedRoute.snapshot.paramMap.get('categoria');
  }

  async ngOnInit() {

    console.log('ngOnInit inicio page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorEventos.obtenerEventosCategoria(this.categoria)
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
