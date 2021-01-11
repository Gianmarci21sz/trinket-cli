import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ItemCarro } from 'src/app/models/itemCarro';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var Swal : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;  
  v : boolean;

  constructor(config: NgbDropdownConfig,public empleadoService:EmpleadoService,
              public compraService:CompraService,
              public utilsService:UtilsService,
              public router : Router) {
    config.placement = 'bottom-right';
    if(localStorage.getItem('sidebar')){
      this.v = JSON.parse(localStorage.getItem('sidebar'));
    }   
    if(this.v===true){
      this.toggleSidebar();
    }
  }

  ngOnInit() {    
    
  }

  eliminar(id : number,imagen : string,producto :string){    
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
      }
    });
    
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {      
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {           
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
        localStorage.setItem('sidebar',JSON.stringify(true));  
      } else {
        body.classList.remove('sidebar-icon-only');
        localStorage.setItem('sidebar',JSON.stringify(false));  
      }
    } else {      
      this.sidebarToggled = !this.sidebarToggled;      
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }
  salir(){
    this.empleadoService.cambiar();
    this.empleadoService.verificar();
  }

}
