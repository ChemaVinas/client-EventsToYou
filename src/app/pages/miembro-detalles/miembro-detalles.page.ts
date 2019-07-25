import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-miembro-detalles',
  templateUrl: './miembro-detalles.page.html',
  styleUrls: ['./miembro-detalles.page.scss'],
})
export class MiembroDetallesPage implements OnInit {

  miembro;
  login: any;

  constructor(
    public navCtrl: NavController,
    public proveedorMiembros: ProveedorMiembrosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController) {
      //Obtenemos el login del miembro como parámetro
      this.login = this.activatedRoute.snapshot.paramMap.get('login');
    }

    async ngOnInit() {

      console.log('ngOnInit miembro-detalles page');
  
      const loading = await this.loadingCtrl.create({
        message: 'Cargando..',
      });
  
      await loading.present();
  
      this.proveedorMiembros.obtenerMiembro(this.login)
        .subscribe(
          async (data) => {
            this.miembro = data;

            var fecha_alta = new Date(this.miembro.fecha_alta);
          
            this.miembro.fecha_alta = fecha_alta.toLocaleDateString();

            await loading.dismiss();
          },
          (error) => {
            console.log(error);
            loading.dismiss();
          }
        );
    }

    segmentChanged(ev: any) {
      console.log('Segment changed', ev);
    }

}
