import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Swal : any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  whatsapp(){
    Swal.fire({
      title: 'Trinket Cloud Sales',
      text: "Tienes problemas o alguna duda sobre tu productos, con gusto le responderemos por nuestro whatsApp",
      icon: 'success',          
      confirmButtonText: 'OK'      
    }).then((result) => {
      if (result.isConfirmed) {  
        window.open("https://api.whatsapp.com/send?phone=51933936501","_blank")
      }
    }); 
  }

}
