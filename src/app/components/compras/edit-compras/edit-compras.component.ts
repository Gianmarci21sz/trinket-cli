import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { ItemCarro } from 'src/app/models/itemCarro';
import { Producto } from 'src/app/models/producto';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var Swal : any;
declare var $ : any;

@Component({
  selector: 'app-edit-compras',
  templateUrl: './edit-compras.component.html',
  styleUrls: ['./edit-compras.component.scss']
})
export class EditComprasComponent implements OnInit {
  listaDetalle : ItemCarro[] = [];
  nuevaCompra : FormGroup;
  estado : boolean = false;
  public eCompra : Compra ;
  listaProd : Producto[]=[];
  listaFiltro : Producto [] = [];
  texto : string = "";
  aProducto : Producto;
  precio : number;
  cantidad : number;
  total : number = 0;
  constructor(private compraService:CompraService,
              private fb:FormBuilder,
              private route:ActivatedRoute,
              private router:Router,
              private productoService:ProductoService,
              private utilsService:UtilsService,
              private empleadoService : EmpleadoService) {
    this.crearFormulario();
    this.cargarCompra();    
    
  }

  ngOnInit(): void {   
    $('#cantPrecio').draggable();
    this.utilsService.setDefaultPositionModal('#cantPrecio');
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  cerrarModal(){
    this.utilsService.resetPositionModal('#cantPrecio');
  }

  get condicionInvalida(){
    return this.nuevaCompra.get('cond_env').invalid && this.nuevaCompra.get('cond_env').touched
  }

  buscar(){
    this.listaFiltro = [];
    for(let f of this.listaProd){      
      if(f.nom_prod.toLowerCase().indexOf(this.texto.toLowerCase())!=-1){
        this.listaFiltro.push(f);
      }
    } 
  }

  anadir(){    
    if(this.cantidad===0 || this.precio === 0 || this.cantidad.toString()==='' || this.precio.toString()===''){
      Swal.fire(
        'Error',
        'Complete los campos',
        'error'
      )
    }else{
      let lst : ItemCarro[]=[];
      let item : ItemCarro = {      
      prod_id : this.aProducto.id_prod,      
      cant_ord_det : this.cantidad,      
      amount_ord_det: this.cantidad*this.precio,
      unit_price_ord_det : this.precio,
      id_ord_comp_cab : this.eCompra.id_ord_comp_cab
      };
      lst.push(item);
      this.compraService.registrarDetalle(lst).subscribe((data:string)=>{      
        this.cargarDetalle(this.eCompra.id_ord_comp_cab);      
        this.listarProductos();
        this.precio = null;
        this.cantidad = null;
        $('#cantPrecio .close').click();
        Swal.fire(
          'Añadido',
          '',
          'success'
        )
      });
    }
  }

  setProducto(producto:Producto){
    this.aProducto = producto;    
  }

  listarProductos(){       
    this.productoService.listar().subscribe((data:Producto[])=>{      
      for(let d of this.listaDetalle){
        for(let ld of data){
          if(+d.prod_id===+ld.id_prod){
            let a = data.indexOf(ld);
            if ( a !== -1 ) {
              data.splice( a, 1 );
            }
          }
        }
      } 
      this.listaProd = data;   
      this.listaFiltro = this.listaProd;    
    });
  }

  crearFormulario(){
    this.nuevaCompra = this.fb.group({
      cond_env : ['',Validators.required,]      
    });
  }

  aumentar(prod:ItemCarro){    
    if(+prod.cant_ord_det === 0 || +prod.cant_ord_det === null){
      prod.cant_ord_det=1;
    }    
  }

  aumentarPrecio(prod:ItemCarro){
    if(+prod.unit_price_ord_det === 0 || +prod.unit_price_ord_det === null){
      prod.unit_price_ord_det=1;
    }   
  }

  eliminar(id : number,producto:string){
    Swal.fire({
      title: 'Confirme acción',
      text: 'Seguro de eliminar del detalle el producto "'+producto+'"?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText : 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.listaDetalle.length===1){
          Swal.fire(
            'Error',
            'Debe haber al menos un producto en el detalle',
            'error'
          )
        }else{
          this.compraService.delDetalle(id).subscribe((data:boolean)=>{
            if(data === true){
              Swal.fire(
                'Eliminado!',
                'Detalle eliminado satisfactoriamente!',
                'success'
              )
              this.cargarCompra();
            }else{
              Swal.fire(
                'Error!',
                'Se produjo un error al tratar de eliminar el detalle de la compra',
                'danger'
              )
              this.cargarCompra();
            }
          });
        }
      }
    });
  }

  cargarCompra(){
    let params = this.route.snapshot.params;
    if(params){
      this.compraService.buscarCompra(params.id).subscribe((compra:Compra[])=>{        
        this.eCompra = compra[0];               
        this.nuevaCompra.reset({
          cond_env : compra[0].cond_env_cab
        });
        this.cargarDetalle(params.id);
      });
    }
  }

  cargarDetalle(id : number){
    this.compraService.buscarDetalleCompra(id).subscribe((detalle:ItemCarro[])=>{          
      this.listaDetalle = detalle;          
      this.estado = true;
      this.total = 0;
      for(let ld of this.listaDetalle){
        this.total = +this.total + +ld.amount_ord_det;
      }
    });
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;    
    if (key < 48 || key > 57 ) {
      e.preventDefault();
    }   
    
  }

  volver(){
    this.router.navigateByUrl('/menu/(opt:listaCompras)');
  }

  actualizar(){
    if ( this.nuevaCompra.invalid ) {      
      return Object.values( this.nuevaCompra.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );          
        } else {
          control.markAsTouched();          
        }          
      });          
    }else{
      this.compraService.upCompraCondicion(+this.eCompra.id_ord_comp_cab,this.nuevaCompra.get('cond_env').value)
      .subscribe((data:boolean)=>{
        for(let det of this.listaDetalle){
          this.compraService.upDetalleCantidad(+det.ord_comp_det,+det.cant_ord_det,+det.unit_price_ord_det)
          .subscribe((data:boolean)=>{            
          });
        }
        this.router.navigateByUrl('/menu/(opt:listaCompras)');
      });
    }
  }

}
