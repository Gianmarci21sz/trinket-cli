import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
declare var Swal : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  forma : FormGroup;
  constructor(private fb:FormBuilder,
              private empleadoService:EmpleadoService,
              private router:Router) {
  this.crearFormulario();
  this.empleadoService.verificarLogin();
  }

  ngOnInit() {
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }

  get passNoValido() {
    return this.forma.get('pass').invalid && this.forma.get('pass').touched
  }

  crearFormulario() {
    this.forma = this.fb.group({      
      email  : ['', [ Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')] ],
      pass : ['',Validators.required,]
    });
  }

  autenticacion(){
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }        
      });     
    }else{
      this.empleadoService.autenticacion(this.forma.get("email").value,this.forma.get("pass").value)
      .subscribe((data:Empleado)=>{        
        if(data){          
          this.empleadoService.empleadolog=data;
          this.empleadoService.guardarLocal();
          Swal.fire({
            title: 'Bienvenido a Trinket',
            text: "Acceso concedido",
            icon: 'success',          
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {              
              this.router.navigateByUrl('/menu/(opt:empleado)');     
            }
          });                   
        }else{
          alert('Error contraseña o email');
        }
    },err=>{
      console.log(err);
    });
    }
    
  }

}
