import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { ActivatedRoute } from '@angular/router';
import { EventoGuardado } from 'src/app/interfaces/EventoGuardado';
import { SesionApuntada } from 'src/app/interfaces/SesionApuntada';
import { Valoracion } from 'src/app/interfaces/valoracion';

@Component({
  selector: 'app-ultima-actividad',
  templateUrl: './ultima-actividad.page.html',
  styleUrls: ['./ultima-actividad.page.scss'],
})
export class UltimaActividadPage implements OnInit {

  eventos_guardados: EventoGuardado[];
  sesiones_apuntadas: SesionApuntada[];
  valoraciones: Valoracion[];
  segmento;

  constructor(
    private navCtrl: NavController,
    private proveedorMiembros: ProveedorMiembrosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController) {}

  async ngOnInit() {

    console.log('ngOnInit ultima-actividad page');

    this.segmento = "Apuntados";
    this.getSesionesApuntadasAmigos();

  }

  async getSesionesApuntadasAmigos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerSesionesApuntadasAmigos()
      .subscribe(
        async (data) => {
          this.sesiones_apuntadas = data;

          if (this.sesiones_apuntadas != null) {
            //Convertimos la fecha y almacenamos la hora
            for (let sesion_apuntada of this.sesiones_apuntadas) {
              var fecha_sesion_apuntada = new Date(sesion_apuntada.fecha);

              var fecha = fecha_sesion_apuntada.toLocaleDateString();
              var hora = fecha_sesion_apuntada.toLocaleTimeString();
              sesion_apuntada.fechaString = fecha + " - " + hora;
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

  async getEventosGuardadosAmigos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerEventosGuardadosAmigos()
      .subscribe(
        async (data) => {
          this.eventos_guardados = data;

          if (this.eventos_guardados != null) {
            //Convertimos la fecha y almacenamos la hora
            for (let evento_guardado of this.eventos_guardados) {
              var fecha_evento_guardado = new Date(evento_guardado.fecha);

              var fecha = fecha_evento_guardado.toLocaleDateString();
              var hora = fecha_evento_guardado.toLocaleTimeString();
              evento_guardado.fechaString = fecha + " - " + hora;
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

  async getValoracionesAmigos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorMiembros.obtenerValoracionesAmigos()
      .subscribe(
        async (data) => {
          this.valoraciones = data;

          if (this.valoraciones != null) {
            //Convertimos la fecha y almacenamos la hora
            for (let valoracion of this.valoraciones) {
              var fecha_valoracion = new Date(valoracion.fecha);

              var fecha = fecha_valoracion.toLocaleDateString();
              var hora = fecha_valoracion.toLocaleTimeString();
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

  segmentoCambiado(ev: any) {
    this.segmento = ev.detail.value;

    switch (this.segmento) {
      case "Apuntados": {
        this.getSesionesApuntadasAmigos();
        break;
      }
      case "Guardados": {
        this.getEventosGuardadosAmigos();
        break;
      }
      case "Valoraciones": {
        this.getValoracionesAmigos();
        break;
      }
      default: {
        console.log("Segmento inválido");
        break;
      }
    }
  }

}
