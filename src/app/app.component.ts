import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { EmpleadoService } from './services/empleado.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'demo1';

  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  isLoading: boolean;

  constructor(private router: Router,public empleadoService:EmpleadoService) {
    setInterval(()=>{
      this.empleadoService.expiracion();      
    },5000);
    this.empleadoService.verificar();

  }

  ngOnInit() {
  }

  actividad(){    
    this.empleadoService.guardarLocal();    
  }
}
