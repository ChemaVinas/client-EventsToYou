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
  filtro_ciudad: string;
  ciudades_disponibles;

  constructor(
    private proveedorEventos: ProveedorEventosService,
    private loadingCtrl: LoadingController) {
    this.filtro_ciudad = "Todas";
  }

  async ngOnInit() {

    console.log('ngOnInit inicio page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorEventos.obtenerCiudadesDeProximasSesiones()
      .subscribe(
        async (data) => {
          this.ciudades_disponibles = data;
        },
        (error) => {
          console.log(error);
        }
      );

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

  async ciudadCambiada($event) {
    var ciudad = $event.detail.value;
    console.log(ciudad);

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    if (ciudad == 'Todas') {
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

    } else {
      this.proveedorEventos.obtenerEventosCiudad(ciudad)
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

}
