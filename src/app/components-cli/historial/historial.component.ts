import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { ClienteService } from 'src/app/services/cliente.service';
import { UtilsService } from 'src/app/services/utils.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  estado : boolean = false;
  lista : Venta[] = [];
  constructor(private ventasService : VentasService,
              private utilsService : UtilsService,
              private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.listarVentas();
  }

  listarVentas(){
    this.ventasService.listarXcli(this.clienteService.clientelog.id_cli)
    .subscribe((data:Venta[])=>{
      this.lista = data;    
      this.estado = true;
    });
    this.utilsService.cargarDataTable('#tablaHistorial');
  }

}
