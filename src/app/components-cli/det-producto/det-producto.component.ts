import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Imagenes } from 'src/app/models/imagenes';
import { ItemCarroCli } from 'src/app/models/itemCarroCli';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var Swal:any;

@Component({
  selector: 'app-det-producto',
  templateUrl: './det-producto.component.html',
  styleUrls: ['./det-producto.component.scss']
})
export class DetProductoComponent implements OnInit {
  producto : Producto;
  agregado : boolean = false;
  imagenes : Imagenes[]= [];

  constructor(private route:ActivatedRoute,
              private productoService:ProductoService,
              private carritoService:CarritoService,
              private clienteService:ClienteService
              ) { 

                this.cargarProducto();
              }

  ngOnInit(): void {
  }

  cargarProducto(){
    let params = this.route.snapshot.params;
    if(params){
      this.productoService.buscar(params.id).subscribe((data:Producto)=>{
        this.producto = data;        
        this.productoService.imgXprod(params.id).subscribe((data:Imagenes[])=>{
          this.imagenes = data;
        });
      });
    }
  }

  agregar(){    
    if(this.clienteService.clientelog){
      let item: ItemCarroCli = {      
        id_prod: this.producto.id_prod,
        id_cli:this.clienteService.clientelog.id_cli,
        nombre_prod: this.producto.nom_prod,
        imagen: this.producto.nom_producto,
        base_imp_vent_det: this.producto.precio_unit_prod,      
        cantidad: 1
      };
      this.carritoService.addCarrito(item).subscribe((data:ItemCarroCli)=>{
        if(data!==null){
          this.agregado = true
          this.carritoService.listCarrito(this.clienteService.clientelog.id_cli)
          .subscribe((data:ItemCarroCli[])=>{
            this.carritoService.listaCarrito = data;
          });
          setTimeout(() => {
            this.agregado = false;
          }, 3000);
        }
      });
    }else{
      Swal.fire(
        "Error",
        "Primero debe logearse",
        "error"
      )
    }
  }

}
