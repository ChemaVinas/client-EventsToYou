import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorSesionesService } from 'src/app/providers/proveedor-sesiones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sesion-detalles',
  templateUrl: './sesion-detalles.page.html',
  styleUrls: ['./sesion-detalles.page.scss'],
})
export class SesionDetallesPage implements OnInit {

  id_sesion: any;
  sesion: any;

  constructor(
    public navCtrl: NavController,
    public proveedorSesiones: ProveedorSesionesService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController) {
    //Obtenemos el id de la sesion como parámetro
    this.id_sesion = this.activatedRoute.snapshot.paramMap.get('sesionId');
  }

  async ngOnInit() {

    console.log('ngOnInit sesion-detalles page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

    this.proveedorSesiones.obtenerSesion(this.id_sesion)
      .subscribe(
        async (data) => {
          this.sesion = data;

          var fecha_sesion = new Date(this.sesion.fecha);
          
          this.sesion.fecha = fecha_sesion.toLocaleDateString();
          this.sesion.hora = fecha_sesion.toLocaleTimeString();

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

  }

}
