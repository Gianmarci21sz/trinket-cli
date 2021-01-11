import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venta } from 'src/app/models/venta';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilsService } from 'src/app/services/utils.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  estado : boolean = false;
  lista : Venta[] = [];
  constructor(private ventasService : VentasService,
              private utilsService : UtilsService,
              private empleadoService : EmpleadoService,
              private router : Router) { 
    this.listarVentas();
    this.utilsService.cargarDataTable('#tablaVentas');
  }

  ngOnInit(): void {
    if(this.empleadoService.empleadolog.nombre_rol === 'Comprador'){
      this.router.navigateByUrl('menu/(opt:listaCompras)');
    }
  }

  listarVentas(){
    this.ventasService.listar().subscribe((data:Venta[])=>{
      this.lista = data;
      this.estado = true;
    });
  }

}
