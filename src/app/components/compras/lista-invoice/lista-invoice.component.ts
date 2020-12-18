import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice';
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
              public router:Router) {
    this.listarInvoice();
    this.utilsService.cargarDataTable('#tablaInvoice');
  }

  ngOnInit(): void {
    
  }

  listarInvoice(){
    this.invoiceService.listar().subscribe((data:Invoice[])=>{
      this.lista = data;
      this.estado = true;
    });
  }

}
