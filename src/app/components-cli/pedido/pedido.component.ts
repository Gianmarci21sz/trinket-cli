import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarroCli } from 'src/app/models/itemCarroCli';
import { CarritoService } from 'src/app/services/carrito.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {  
  total: number = 0;
  igv: number = 0;
  subtotal: number = 0;

  constructor(private clienteService: ClienteService,
    public carritoService: CarritoService,
    private router: Router) {
    this.clienteService.verificar();
    this.listarCarrito();
  }

  ngOnInit(): void {
  }

  listarCarrito() {
    this.carritoService.listCarrito(this.clienteService.clientelog.id_cli)
      .subscribe((data: ItemCarroCli[]) => {
        this.carritoService.listaCarrito = data;
        this.sumarTotal();
        if (data.length == 0) {
          this.router.navigateByUrl('catalogo');
        }
      });
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }

  actualizarCantidad(pro: ItemCarroCli, e) {
    this.carritoService.upCarrito(pro.id_carr, pro.cantidad).subscribe((data: boolean) => {
      if (data == true) {
        this.carritoService.listaCarrito[this.carritoService.listaCarrito.indexOf(pro)].cantidad = pro.cantidad;
        this.sumarTotal();
      }
    });
  }

  eliminar(pro:ItemCarroCli){
    this.carritoService.delCarrito(pro.id_carr).subscribe((data:boolean)=>{
      if(data == true){
        this.listarCarrito();
      }
    });
  }

  sumarTotal() {
    this.total = 0;
    this.igv = 0;
    this.subtotal = 0;
    for (let pro of this.carritoService.listaCarrito) {
      this.total = this.total + (pro.base_imp_vent_det * pro.cantidad)
    }
    this.igv = this.total * 0.18;
    this.subtotal = this.total - this.igv;

  }

}
