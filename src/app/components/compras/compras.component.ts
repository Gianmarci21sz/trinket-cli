import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { ItemCarro } from 'src/app/models/itemCarro';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var $: any;

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  lista: Producto[] = [];
  listaFiltro: Producto[] = [];
  listaFiltroTexto: Producto[] = [];
  listaCategoria: Categoria[] = [];
  seleccionado: number = 0;
  aProducto: Producto;
  texto: string;
  estado: boolean = false;
  precio: number;
  cantidad: number;
  pageActual : number = 1; 
  show : boolean = false; 
  constructor(private productoService: ProductoService,
    public compraService: CompraService,
    private categoriaService: CategoriaService,
    private utilsService:UtilsService,
    private empleadoService : EmpleadoService,
    private router : Router) { }

  ngOnInit(): void {
    this.listarProductos();
    this.cargarCategorias();
    $('#cantPrecio').draggable();
    this.utilsService.setDefaultPositionModal('#cantPrecio');
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  cargarCategorias() {
    this.categoriaService.listar().subscribe((data: Categoria[]) => {
      this.listaCategoria = data;
    });
  }

  cerrarModal() { 
    this.utilsService.resetPositionModal('#cantPrecio');
  }

  buscar() {
    this.listaFiltroTexto = [];
    for (let f of this.listaFiltro) {
      if (f.nom_prod.toLowerCase().indexOf(this.texto.toLowerCase()) != -1) {
        this.listaFiltroTexto.push(f);
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
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }

  anadir() {
    let item: ItemCarro = {
      prod_id: this.aProducto.id_prod,
      nombre_prod: this.aProducto.nom_prod,
      imagen: this.aProducto.nom_producto,
      unit_price_ord_det: this.precio,
      cant_ord_det: this.cantidad
    };
    this.compraService.agregar(item);
    this.compraService.agregado = true;
    this.precio = null;
    this.cantidad = null;
    $('#cantPrecio .close').click();
    setTimeout(() => {
      this.compraService.agregado = false;;
    }, 1000);
  }

}
