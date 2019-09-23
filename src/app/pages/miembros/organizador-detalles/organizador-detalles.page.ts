import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Evento } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-organizador-detalles',
  templateUrl: './organizador-detalles.page.html',
  styleUrls: ['./organizador-detalles.page.scss'],
})
export class OrganizadorDetallesPage implements OnInit {

  organizador: Usuario;
  eventos: Evento[];
  login: any;

  constructor(
    private proveedorOrganizadores: ProveedorOrganizadoresService,
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

          this.organizador.fechaString = fecha_alta.toLocaleDateString();

          await loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );

    this.proveedorOrganizadores.obtenerEventosDeOrganizador(this.login)
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
