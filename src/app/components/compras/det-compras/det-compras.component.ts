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
  selector: 'app-det-compras',
  templateUrl: './det-compras.component.html',
  styleUrls: ['./det-compras.component.scss']
})
export class DetComprasComponent implements OnInit {
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
    this.cargarCompra();      
  }

  ngOnInit(): void {      
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  get condicionInvalida(){
    return this.nuevaCompra.get('cond_env').invalid && this.nuevaCompra.get('cond_env').touched
  }    

  
  cargarCompra(){
    let params = this.route.snapshot.params;
    if(params){
      this.compraService.buscarCompra(params.id).subscribe((compra:Compra[])=>{        
        this.eCompra = compra[0];            
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
