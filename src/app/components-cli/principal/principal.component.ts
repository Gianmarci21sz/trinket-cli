import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Cliente } from 'src/app/models/cliente';
import { ItemCarroCli } from 'src/app/models/itemCarroCli';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { CompraService } from 'src/app/services/compra.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var Swal:any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  lista: Producto[] = [];
  listaFiltro: Producto[] = [];
  listaFiltroTexto: Producto[] = [];
  listaCategoria: Categoria[] = [];
  texto : string = "";
  aProducto: Producto;
  estado : boolean = false;
  seleccionado: number = 0;
  pageActual : number = 1;
  show : boolean = false;
  agregado : boolean = false;

  constructor(private categoriaService:CategoriaService,
              private productoService:ProductoService,
              public compraService : CompraService,
              public router: Router,
              public clienteService:ClienteService,
              private carritoService : CarritoService
              ) {

    this.listarProductos();
    this.cargarCategorias();
   }

  ngOnInit(): void {
  }

  cargarCategorias() {
    this.categoriaService.listar().subscribe((data: Categoria[]) => {
      this.listaCategoria = data;
    });
  }

  whatsapp(){
    Swal.fire({
      title: 'Trinket Cloud Sales',
      text: "Tienes problemas o alguna duda sobre tu productos, con gusto le responderemos por nuestro whatsApp",
      icon: 'success',          
      confirmButtonText: 'OK'      
    }).then((result) => {
      if (result.isConfirmed) {  
        window.open("https://api.whatsapp.com/send?phone=51933936501","_blank")
      }
    }); 
  }

  buscar() {
    this.listaFiltroTexto = [];
    console.log(this.texto);
    if(this.texto === ""){
      this.listaFiltroTexto = this.lista;
    }else{      
      for (let f of this.listaFiltro) {
        if (f.nom_prod.toLowerCase().indexOf(this.texto.toLowerCase()) != -1) {
          this.listaFiltroTexto.push(f);
        }
      }
    }
  }

  filtrarXcat(id_cat: number) {
    this.seleccionado = id_cat;
    this.listaFiltro = [];
    for (let f of this.lista) {
      if (+f.id_cat === +id_cat) {
        this.listaFiltro.push(f);
      }
    }
    this.texto = "";
    this.listaFiltroTexto = this.listaFiltro;
  }

  listarProductos() {
    this.seleccionado = 0;
    this.productoService.listar().subscribe((data: Producto[]) => {
      this.lista = data;
      this.listaFiltro = this.lista;
      this.listaFiltroTexto = this.listaFiltro;
      this.texto = "";
      setTimeout(() => {
        this.estado = true;
      }, 500)
    });
  }

  agregar(u: Producto) {
    this.aProducto = u;
    if(this.clienteService.clientelog){
      let item: ItemCarroCli = {      
        id_prod: this.aProducto.id_prod,
        id_cli:this.clienteService.clientelog.id_cli,
        nombre_prod: this.aProducto.nom_prod,
        imagen: this.aProducto.nom_producto,
        base_imp_vent_det: this.aProducto.precio_unit_prod,      
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
