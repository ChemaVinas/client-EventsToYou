import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organizador-detalles',
  templateUrl: './organizador-detalles.page.html',
  styleUrls: ['./organizador-detalles.page.scss'],
})
export class OrganizadorDetallesPage implements OnInit {

  organizador;
  login: any;

  constructor(
    public navCtrl: NavController,
    public proveedorOrganizadores: ProveedorOrganizadoresService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController) {
      //Obtenemos el login del organizador como parámetro
      this.login = this.activatedRoute.snapshot.paramMap.get('login');
    }

    async ngOnInit() {

      console.log('ngOnInit organizador-detalles page');
  
      const loading = await this.loadingCtrl.create({
        message: 'Cargando..',
      });
  
      await loading.present();
  
      this.proveedorOrganizadores.obtenerOrganizador(this.login)
        .subscribe(
          async (data) => {
            this.organizador = data;

            var fecha_alta = new Date(this.organizador.fecha_alta);
          
            this.organizador.fecha_alta = fecha_alta.toLocaleDateString();

            await loading.dismiss();
          },
          (error) => {
            console.log(error);
            loading.dismiss();
          }
        );
    }

}
