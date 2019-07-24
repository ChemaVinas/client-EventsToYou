import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage {

  eventos;

  constructor(
    public navCtrl: NavController,
    public proveedorEventos: ProveedorEventosService,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {

    console.log('ngOnInit inicio page');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    await loading.present();

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

  ngAfterViewInit() {
    console.log('ngAfterViewInit inicio page');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit inicio page');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy inicio page');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter inicio page');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter inicio page');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave inicio page');
  }

  ionViewDidLoad() {

  }

  //Función provisional, no utilizaremos el navCtrl para redireccionar sino routerLink del html
  eventoTapped(event, evento) {
    //this.router.navigate(['/evento-detalles', evento.idEvento]);
    this.navCtrl.navigateForward('/evento-detalles/' + evento.id);
  }

}
