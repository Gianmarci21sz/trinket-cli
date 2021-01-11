import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  lista : Cliente[]=[];
  estado : boolean = false;
  constructor(public router:Router,
              private clienteService:ClienteService,
              private utilsService : UtilsService,
              private empleadoService:EmpleadoService) { }

  ngOnInit(): void {
    this.listarClientes();
    this.utilsService.cargarDataTable('#tablaCliente');
    if(this.empleadoService.empleadolog.nombre_rol === 'Comprador'){
      this.router.navigateByUrl('menu/(opt:listaCompras)');
    }
  }

  listarClientes(){
    this.clienteService.listar().subscribe((data:Cliente[])=>{
      this.lista = data;
      this.estado = true;
    });
  }

  editar(id : number){
    this.router.navigateByUrl(`/menu/(opt:upCliente/${id})`);
  }

  eliminar(id:number,nombre:string){

  }

}
