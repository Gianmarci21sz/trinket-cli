import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Cliente } from 'src/app/models/cliente';
import { ItemCarro } from 'src/app/models/itemCarro';
import { ItemCarroCli } from 'src/app/models/itemCarroCli';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var $ : any;
declare var Swal : any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  lista: Producto[] = [];
  listaFiltro: Producto[] = [];
  listaFiltroTexto: Producto[] = [];
  listaCategoria: Categoria[] = [];
  seleccionado: number = 0;
  aProducto: Producto;
  texto: string;
  estado: boolean = false;  
  pageActual : number = 1;
  show : boolean = false;
  show2 : boolean = false;  
  isblock : boolean = true;
  forma : FormGroup;

  constructor(private productoService: ProductoService,
    public compraService: CompraService,
    private categoriaService: CategoriaService,
    public utilsService:UtilsService,
    public empleadoService : EmpleadoService,
    public clienteService : ClienteService,
    public router : Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.listarProductos();
    this.cargarCategorias();
    this.crearFormulario();    
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  get passNoValido() {
    return this.forma.get('pass').invalid && this.forma.get('pass').touched
  }

  crearFormulario() {
    this.forma = this.fb.group({      
      usuario  : ['', [ Validators.required]],
      pass : ['',Validators.required]
    });
  }

  irCompras(){
    if(this.clienteService.clientelog){
      this.router.navigate(['/pedido'])
    }else{
      alert('Primero debe logearse');
    }
  }
  
  cargarCategorias() {
    this.categoriaService.listar().subscribe((data: Categoria[]) => {
      this.listaCategoria = data;
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
    let item: ItemCarroCli = {
      id_prod: this.aProducto.id_prod,
      nombre_prod: this.aProducto.nom_prod,
      imagen: this.aProducto.nom_producto,
      base_imp_vent_det: this.aProducto.precio_unit_prod,      
      cantidad: 1
    };
  } 
  
  ocultar(as: number) {
    if (as === 1) {
      this.isblock = !this.isblock;
    }
  }
  
  salir(){
    this.clienteService.salir();
  }

  login(){
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }        
      });     
    }else{
      this.clienteService.autenticacion(this.forma.get('usuario').value,this.forma.get('pass').value)
      .subscribe((data:Cliente)=>{
        if(data!== null){
          this.clienteService.clientelog = data;
          this.clienteService.guardarLocal();
          $("#login .btn-close").click();
        }else{
          Swal.fire(
            "Error",
            "Usuario o contraseña incorrecto",
            "error"
          )
        }
      });
    }
  }

}
