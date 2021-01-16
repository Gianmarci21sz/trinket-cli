import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var Swal : any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  lista : Producto[];
  estado : boolean = false;
  constructor(private productoService:ProductoService,
              private utilsService : UtilsService,
              public router:Router,
              public empleadoService : EmpleadoService) { 
        
  }

  ngOnInit(): void {   
    this.utilsService.cargarDataTable('#tablaProducto');
    this.cargarLista();     
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  

  cargarLista(){    
    this.productoService.listar().subscribe((data:Producto[])=>{
      this.lista=data; 
      this.estado = true;    
      console.log(data)        ;
    });     
  }

  editar(id_prod : number){
    this.router.navigateByUrl(`/menu/(opt:upProducto/${id_prod})`);
  }

  eliminar(id_prod : number,nom_prod : string){
    this.productoService.validarDelProducto(id_prod).subscribe((data:String[])=>{
      if(data.length==0){
        Swal.fire({
          title: 'Confirme acción',
          text: 'Seguro de eliminar el producto "'+nom_prod+'"?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText : 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.productoService.eliminar(id_prod).subscribe((data:boolean)=>{
              if(data === true){
                Swal.fire(
                  'Eliminado!',
                  'Producto eliminado satisfactoriamente!',
                  'success'
                )
                this.cargarLista();
              }else{
                Swal.fire(
                  'Error!',
                  'Se produjo un error al tratar de eliminar el producto',
                  'danger'
                )
                this.cargarLista();
              }
            });
          }
        });
      }else{
        Swal.fire(
          "Error",
          "El producto se encuentra en una venta sin confirmar",
          "error"
        )
      }
    });
  }

}
