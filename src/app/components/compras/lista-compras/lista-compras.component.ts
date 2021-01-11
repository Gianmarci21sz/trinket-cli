import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var Swal : any;

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss']
})
export class ListaComprasComponent implements OnInit {
  lista : Compra[] = [];
  constructor(private compraService:CompraService,
              private utilsService:UtilsService,
              private router:Router,
              public empleadoService : EmpleadoService) { }
  estado : boolean = true;
  ngOnInit(): void {
    this.listarCompras();
    this.utilsService.cargarDataTable('#tablaCompras');
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  listarCompras(){
    this.compraService.listarCompras().subscribe((data:Compra[])=>{
      this.lista = data;
    });
  }

  irDetalle(id : number){
    this.router.navigateByUrl(`menu/(opt:detCompra/${id})`);
  }

  editar(id:number){
    this.router.navigateByUrl(`/menu/(opt:upCompra/${id})`);
  }

  eliminar(id : number,num_orden : string){
    Swal.fire({
      title: 'Confirme acción',
      html: `Seguro de eliminar la compra :<br/>
            ID : ${id}<br/>
            N° orden : ${num_orden}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText : 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.eliminarCompra(id).subscribe((data:boolean)=>{
          if(data === true){
            Swal.fire(
              'Eliminado!',
              'Compra eliminada satisfactoriamente!',
              'success'
            )
            this.listarCompras();
          }else{
            Swal.fire(
              'Error!',
              'Se produjo un error al tratar de eliminar la compra',
              'danger'
            )
            this.listarCompras();
          }
        });
      }
    });
  }

}
