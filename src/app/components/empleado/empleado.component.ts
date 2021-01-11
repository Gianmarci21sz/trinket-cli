import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var jQuery:any;
declare var $:any;
declare var Swal : any;

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {
  lista : Empleado[];
  estado : boolean = false;

  constructor(private empleadoService:EmpleadoService,
              private utilsService:UtilsService,
              public router : Router) {      
  } 

  ngOnInit(): void {
    this.utilsService.cargarDataTable('#tablaEmpleado');
    this.cargarLista();  
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }else if(this.empleadoService.empleadolog.nombre_rol === 'Comprador'){
      this.router.navigateByUrl('menu/(opt:listaCompras)');
    }  
  }  

  cargarLista(){
    this.empleadoService.listarEmpleado().subscribe((data:Empleado[])=>{
      this.lista=data;      
      this.estado = true;
    });    
  }

  editar(id_emp : number){
    this.router.navigateByUrl(`/menu/(opt:formEmpleado/${id_emp})`);
  }
  
  eliminar(id_user : string,nom_user : string){
    Swal.fire({
      title: 'Confirme acción',
      html: 'Seguro de eliminar empleado:<br/>"'+nom_user+'"?',      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText : 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(id_user).subscribe((data:boolean)=>{
          if(data === true){
            Swal.fire(
              'Eliminado!',
              'Empleado eliminado satisfactoriamente!',
              'success'
            )
            this.cargarLista();
          }else{
            Swal.fire(
              'Error!',
              'Se produjo un error al tratar de eliminar el empleado',
              'danger'
            )
            this.cargarLista();
          }
        });
      }
    });
  }

}
