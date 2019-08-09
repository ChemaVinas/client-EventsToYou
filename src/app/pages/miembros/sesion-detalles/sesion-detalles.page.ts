import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ActivatedRoute } from '@angular/router';
import { Sesion } from 'src/app/interfaces/sesion';

@Component({
  selector: 'app-sesion-detalles',
  templateUrl: './sesion-detalles.page.html',
  styleUrls: ['./sesion-detalles.page.scss'],
})
export class SesionDetallesPage implements OnInit {

  id_sesion: any;
  id_evento: any;
  sesion: Sesion;

  constructor(
    private navCtrl: NavController,
    private ProveedorEventos: ProveedorEventosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController) {
    //Obtenemos el id de la sesion como parámetro
    this.id_sesion = this.activatedRoute.snapshot.paramMap.get('sesionId');
    this.id_evento = this.activatedRoute.snapshot.paramMap.get('eventoId');
  }

  async ngOnInit() {

    console.log('ngOnInit sesion-detalles page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.ProveedorEventos.obtenerSesionEvento(this.id_evento, this.id_sesion)
      .subscribe(
        async (data) => {
          this.sesion = data;

          var fecha_sesion = new Date(this.sesion.fecha);
          
          var fecha = fecha_sesion.toLocaleDateString();
          var hora = fecha_sesion.getHours().toString();
          var minutos = fecha_sesion.getMinutes().toString();
          if (minutos.length < 2) minutos = '0' + minutos;
          this.sesion.fechaString = fecha;
          this.sesion.horaString = hora + ":" + minutos;

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

  }

}
