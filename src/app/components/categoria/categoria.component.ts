import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var Swal :any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  estado : boolean = false;
  listaCategorias : Categoria[] = [];
  constructor(private utilsService:UtilsService,
              private categoriaService : CategoriaService,
              private empleadoService:EmpleadoService,
              public router : Router) { }

  ngOnInit(): void {
    this.utilsService.cargarDataTable('#tablaCategoria');
    this.listarCategorias(); 
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    } 
  }
  

  listarCategorias(){
    this.categoriaService.listar().subscribe((data:Categoria[])=>{
      this.listaCategorias = data;
      this.estado = true;
    });
  }

  eliminar(id : number,nombre : string){
    this.categoriaService.verificarProdXcat(id).subscribe((data:boolean)=>{
      if(data === true){
        Swal.fire(
          'Error',
          'Hay productos relacionados a esta categoria',
          'error'
        )
      }else{
        Swal.fire({
          title: 'Confirme acción',
          html: 'Seguro de eliminar categoria:<br/>"'+nombre+'"?',      
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText : 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.categoriaService.eliminar(id).subscribe((data:boolean)=>{
              if(data === true){
                Swal.fire(
                  'Eliminado!',
                  'Categoria eliminada satisfactoriamente!',
                  'success'
                )
                this.listarCategorias();
              }else{
                Swal.fire(
                  'Error!',
                  'Se produjo un error al tratar de eliminar la categoria',
                  'danger'
                )
                this.listarCategorias();
              }
            });
          }
        });
      }
    });
  }

}
