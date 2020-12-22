import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { ItemCarro } from 'src/app/models/itemCarro';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var Swal:any;

@Component({
  selector: 'app-registro-compra',
  templateUrl: './registro-compra.component.html',
  styleUrls: ['./registro-compra.component.scss']
})
export class RegistroCompraComponent implements OnInit {
  nuevaCompra : FormGroup;
  estado : boolean = true;
  proveedores : Proveedor[]=[];
  cajas : number[]=[];  
  precios : number[]=[];  
  constructor(public compraService : CompraService,
              private utilsService : UtilsService,
              private fb:FormBuilder,
              private proveedorService : ProveedorService,
              private empleadoService : EmpleadoService,
              private router:Router) { 

    for(let i = 0;i<this.compraService.items.length;i++){
      this.cajas[i]=this.compraService.items[i].cant_ord_det;
    }    
  }

  ngOnInit(): void {
    this.validar();
    this.crearFormulario();
    this.cargarProveedores();
  }

  get condicionInvalida(){
    return this.nuevaCompra.get('cond_env').invalid && this.nuevaCompra.get('cond_env').touched
  }

  get proveedorInvalido(){
    return this.nuevaCompra.get('prov_id').invalid && this.nuevaCompra.get('prov_id').touched
  }

  crearFormulario(){
    this.nuevaCompra = this.fb.group({
      cond_env : ['',Validators.required,],
      prov_id : ['',Validators.required,]
    });
  }

  volver(){
    this.router.navigateByUrl('/menu/(opt:listaCompras)');
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
  }

  cargarProveedores(){
    this.proveedorService.listar().subscribe((data:Proveedor[])=>{
      this.proveedores = data;
    });
  }

  validar(){
    if(this.compraService.items.length===0){
      this.router.navigateByUrl('/menu/(opt:compras)');
    }
  }  

  eliminar(id : number,imagen : string,producto:string){  
    Swal.fire({
      title: 'Confirme acción',
      html: `Seguro de eliminar producto del carrito?:<br/><br/>
            <img style="height: 50px;width: 50px;" 
            src="http://192.168.1.13:1151/api/producto/verArchivo/${imagen}" 
            class="card-img-top mx-auto"
            alt="">&nbsp;&nbsp;&nbsp; ${producto}`,      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText : 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.eliminar(id);
        this.validar();
      }
    });          
  }

  aumentar(id:number,indice:number){    
    if(+this.cajas[indice]===0 || +this.cajas[indice]===null){
      this.cajas[indice]=1;
    }
    this.compraService.aumentar(+id,+this.cajas[indice]);
  }
  aumentarPrecio(prod:ItemCarro){
    if(+prod.unit_price_ord_det==0 || prod.unit_price_ord_det.toString()==''){
      prod.unit_price_ord_det = 1;
    }
    this.compraService.aumentarPrecio(+prod.prod_id,+prod.unit_price_ord_det);
  }

  agregar(){
    if ( this.nuevaCompra.invalid ) {      
      return Object.values( this.nuevaCompra.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );          
        } else {
          control.markAsTouched();          
        }          
      });          
    }else{
      let compra : Compra = {
        cond_env_cab : this.nuevaCompra.get('cond_env').value,
        prov_id : +this.nuevaCompra.get('prov_id').value,
        emp_id: +this.empleadoService.empleadolog.id_emp
      };
      this.compraService.registrarCompra(compra).subscribe((data:Compra)=>{ 
        for(let pr of this.compraService.items){
          pr.id_ord_comp_cab = data.id_ord_comp_cab;
        } 
        this.compraService.registrarDetalle(this.compraService.items).subscribe((data:string)=>{
          this.compraService.items = [];
          localStorage.setItem("items",JSON.stringify(this.compraService.items));
          this.router.navigateByUrl('/menu/(opt:compras)');
        });    
      });
    }
    
  }

}
