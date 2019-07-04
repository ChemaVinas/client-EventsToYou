import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController} from '@ionic/angular';

import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento-detalles',
  templateUrl: './evento-detalles.page.html',
  styleUrls: ['./evento-detalles.page.scss'],
})
export class EventoDetallesPage implements OnInit {

  id_evento: any;
  evento: any;
  sub;

  constructor(
    public navCtrl: NavController,
    public proveedorEventos: ProveedorEventosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController) {
      //Obtenemos el id del evento como parámetro
      this.id_evento = this.activatedRoute.snapshot.paramMap.get('eventoId');
    }

    async ngOnInit() {

    console.log('ngOnInit evento-detalles page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorEventos.obtenerEvento(this.id_evento)
      .subscribe(
        async (data) => {
          this.evento = data;
          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

  }

  ionViewDidLoad(){
    
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit evento-detalles page');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit evento-detalles page');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy evento-detalles page');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter evento-detalles page');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter evento-detalles page');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave evento-detalles page');
  }

}
