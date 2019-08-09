import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { Sesion } from 'src/app/interfaces/sesion';
import { Valoracion } from 'src/app/interfaces/valoracion';

@Component({
  selector: 'app-evento-detalles',
  templateUrl: './evento-detalles.page.html',
  styleUrls: ['./evento-detalles.page.scss'],
})
export class EventoDetallesPage implements OnInit {

  id_evento: any;
  evento: Evento;
  sesiones: Sesion[];
  valoraciones: Valoracion[];
  sub;

  constructor(
    private navCtrl: NavController,
    private proveedorEventos: ProveedorEventosService,
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


    this.proveedorEventos.obtenerSesionesEvento(this.id_evento)
      .subscribe(
        async (data) => {
          this.sesiones = data;

          if(this.sesiones != null){
            //Convertimos la fecha y almacenamos la hora
            for (let sesion of this.sesiones) {
              var fecha_sesion = new Date(sesion.fecha);
              
              var fecha = fecha_sesion.toLocaleDateString();
              var hora = fecha_sesion.getHours().toString();
              var minutos = fecha_sesion.getMinutes().toString();
              if (minutos.length < 2) minutos = '0' + minutos;
              sesion.fechaString = fecha + " - " + hora + ":" + minutos;
            }
          }

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

    this.proveedorEventos.obtenerValoracionesEvento(this.id_evento)
      .subscribe(
        async (data) => {
          this.valoraciones = data;

          if (this.valoraciones != null) {
            //Convertimos la fecha y almacenamos la hora
            for (let valoracion of this.valoraciones) {
              var fecha_sesion = new Date(valoracion.fecha);

              var fecha = fecha_sesion.toLocaleDateString();
              var hora = fecha_sesion.toLocaleTimeString();
              valoracion.fechaString = fecha + " - " + hora;
            }
          }

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

}
