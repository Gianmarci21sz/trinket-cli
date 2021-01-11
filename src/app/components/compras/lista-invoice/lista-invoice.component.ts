import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-lista-invoice',
  templateUrl: './lista-invoice.component.html',
  styleUrls: ['./lista-invoice.component.scss']
})
export class ListaInvoiceComponent implements OnInit {
  lista : Invoice[] = [];
  estado : boolean = false;
  constructor(private invoiceService:InvoiceService,
              private utilsService:UtilsService,
              public router:Router,
              private empleadoService : EmpleadoService) {
    this.listarInvoice();
    this.utilsService.cargarDataTable('#tablaInvoice');
  }

  ngOnInit(): void {
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  listarInvoice(){
    this.invoiceService.listar().subscribe((data:Invoice[])=>{
      this.lista = data;
      this.estado = true;
    });
  }

  editar(id : number){
    this.router.navigateByUrl(`menu/(opt:editInvoice/${id})`);
  }

}
