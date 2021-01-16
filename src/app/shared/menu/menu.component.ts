import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CompraService } from 'src/app/services/compra.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private empleadoService:EmpleadoService,private router:Router,
              public compraService:CompraService,
              private titleService:Title,
              public utilsService:UtilsService) {    
    empleadoService.verificar();    
    this.titleService.setTitle("Trinket Admin")
    setInterval(()=>{
      this.empleadoService.expiracion();      
    },5000); 
  } 

  ngOnInit() {
  }
  

}
