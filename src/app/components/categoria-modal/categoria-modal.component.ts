import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.scss'],
})
export class CategoriaModalComponent implements OnInit {

  eventos;
  categoria;

  constructor(
    public modalCtrl: ModalController,
    public proveedorEventos: ProveedorEventosService,
    public navParams: NavParams) { }

  ngOnInit() {
    this.proveedorEventos.obtenerEventosCategoria(this.categoria)
      .subscribe(
        async (data) => {
          this.eventos = data;
        },
        (error) => {
          console.log(error);
        }
      );

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
