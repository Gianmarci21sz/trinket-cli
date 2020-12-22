import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  public invoiceCollapsed = false;
  
  constructor(public router:Router,
              public empleadoService:EmpleadoService,
              private compraService:CompraService) { 
    
  }

  ngOnInit() {
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  irCompras(){
    if(this.compraService.items.length>0){
      this.router.navigateByUrl('/menu/(opt:addCompra)');
    }else{
      alert('No hay productos seleccionados!!');
    }
  }

}
