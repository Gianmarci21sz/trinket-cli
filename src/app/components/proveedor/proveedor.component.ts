import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var Swal : any;

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
  listaProveedores : Proveedor[] = [];
  estado : boolean = false;
  constructor(private proveedorService : ProveedorService,
              private utilsService : UtilsService,
              public router : Router,
              private empleadoService : EmpleadoService) { }

  ngOnInit(): void {        
    this.listarProveedores();
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  listarProveedores(){
    this.proveedorService.listar().subscribe((data:Proveedor[])=>{
      this.listaProveedores = data;   
      this.estado = true;   
      this.utilsService.cargarDataTable('#tablaProveedor');
    });
  }

  editar(id:number){
    this.router.navigateByUrl(`/menu/(opt:upProveedor/${id})`);
  }

  eliminar(id:number,razon :string){
    Swal.fire({
      title: 'Confirme acción',
      html: 'Seguro de eliminar proveedor:<br/>"'+razon+'"?',      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText : 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedorService.eliminar(id).subscribe((data:boolean)=>{
          if(data === true){
            Swal.fire(
              'Eliminado!',
              'Proveedor eliminado satisfactoriamente!',
              'success'
            )
            this.listarProveedores();
          }else{
            Swal.fire(
              'Error!',
              'Se produjo un error al tratar de eliminar el proveedor',
              'danger'
            )
            this.listarProveedores();
          }
        });
      }
    });
  }

}
