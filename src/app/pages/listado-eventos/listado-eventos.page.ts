import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';

@Component({
  selector: 'app-listado-eventos',
  templateUrl: './listado-eventos.page.html',
  styleUrls: ['./listado-eventos.page.scss'],
})
export class ListadoEventosPage implements OnInit {

  eventos;

  constructor(
    public navCtrl: NavController,
    public proveedorEventos: ProveedorEventosService) { }

  ngOnInit() {
    this.proveedorEventos.obtenerEventos()
    .subscribe(
      (data)=> {this.eventos = data;},
      (error)=> {console.log(error);}
    );
  }

  ionViewDidLoad(){
    
  }

  eventoTapped(event, evento) {
    //this.router.navigate(['/evento-detalles', evento.idEvento]);
    this.navCtrl.navigateForward('/evento-detalles/' + evento.idEvento);
  }

}
