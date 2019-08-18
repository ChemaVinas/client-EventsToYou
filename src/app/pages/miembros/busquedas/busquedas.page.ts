import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ProveedorEventosService } from 'src/app/providers/proveedor-eventos.service';
import { ProveedorMiembrosService } from 'src/app/providers/proveedor-miembros.service';
import { ActivatedRoute } from '@angular/router';
import { ProveedorOrganizadoresService } from 'src/app/providers/proveedor-organizadores.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Evento } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.page.html',
  styleUrls: ['./busquedas.page.scss'],
})
export class BusquedasPage implements OnInit {

  patronBusqueda;
  segmento;

  usuarios: Usuario[];
  eventos: Evento[];

  constructor(private proveedorEventos: ProveedorEventosService,
    private proveedorMiembros: ProveedorMiembrosService,
    private proveedorOrganizadores: ProveedorOrganizadoresService) {}

  ngOnInit() {
    this.segmento = "Eventos";
  }

  segmentoCambiado(ev: any) {
    this.patronBusqueda = "";
    this.eventos = null;
    this.usuarios = null;
    this.segmento = ev.detail.value;
  }

  async busquedaCambiadaEvento() {
    if(this.patronBusqueda == ""){
      this.eventos = null;
      return;
    }

    this.proveedorEventos.buscarEventos(this.patronBusqueda).subscribe(
      async (data) => {
        this.eventos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async busquedaCambiadaMiembro() {
    if(this.patronBusqueda == ""){
      this.usuarios = null;
      return;
    }
    
    this.proveedorMiembros.buscarMiembros(this.patronBusqueda).subscribe(
      async (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  busquedaCambiadaOrganizador() {
    if(this.patronBusqueda == ""){
      this.usuarios = null;
      return;
    }
    
    this.proveedorOrganizadores.buscarOrganizadores(this.patronBusqueda).subscribe(
      async (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}