import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
declare var Swal : any;

@Component({
  selector: 'app-cli-recuperar',
  templateUrl: './cli-recuperar.component.html',
  styleUrls: ['./cli-recuperar.component.scss']
})
export class CliRecuperarComponent implements OnInit {
  forma : FormGroup;
  estado : boolean = true;
  constructor(private clienteService:ClienteService,
              private fb : FormBuilder,
              private router : Router) {
    this.clienteService.verificarLogin();
    this.crearFormulario();
   }

   ngOnInit(): void {
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  crearFormulario() {
    this.forma = this.fb.group({      
      usuario  : ['',Validators.required ],      
    });
  }

  enviar(){
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }        
      });     
    }else{
      this.clienteService.buscarClienteXusuario(this.forma.get('usuario').value).subscribe((data:Cliente)=>{
        if(data!==null){
          this.estado = false;
          this.clienteService.enviarCorreoRecuperar(this.forma.get('usuario').value).subscribe(data=>{
            this.estado = true;
            Swal.fire({
              title: 'Mensaje Enviado',
              text: "Se envio mensaje al correo registrado",
              icon: 'success',          
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {              
                this.router.navigateByUrl('/catalogo');     
              }
            });       
          });
        }else{
          Swal.fire(
            'Error',
            'No se encontro el usuario indicado',
            'error'
          )
        }
      });
    }
  }

}
