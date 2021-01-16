import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Empleado } from 'src/app/models/empleado';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
declare var Swal : any;

@Component({
  selector: 'app-cli-reestablecer',
  templateUrl: './cli-reestablecer.component.html',
  styleUrls: ['./cli-reestablecer.component.scss']
})
export class CliReestablecerComponent implements OnInit {
  usuario : string = "";
  forma : FormGroup;
  estado : boolean = false;
  isblock: boolean = true;
  constructor(private route : ActivatedRoute,
              private clienteService : ClienteService,
              private fb : FormBuilder,
              private router : Router) 
  { 
    let params = route.snapshot.params;
    if(params){
      this.clienteService.buscarPorCodigoRecuperarCli(params.codgen).subscribe((data:Cliente)=>{
        if(data != null){
          this.usuario = data.user_cli;
          this.estado = true;
        }else{
          this.router.navigateByUrl('errorCli');
        }
      });
    }
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get passNoValido() {
    return this.forma.get('pass').invalid && this.forma.get('pass').touched
  }

  crearFormulario() {
    this.forma = this.fb.group({            
      pass: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(60),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
    });
  }

  ocultar(as: number) {
    if (as === 1) {
      this.isblock = !this.isblock;
    }
  }

  reestablecer(){
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }        
      });     
    }else{
      this.clienteService.cambiarPass(this.usuario,this.forma.get('pass').value).subscribe(data=>{
        Swal.fire({
          title: 'Contraseña cambiada',
          text: "Ingrese con su nueva contraseña",
          icon: 'success',          
          confirmButtonText: 'OK',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {              
            this.router.navigateByUrl('/catalogo');     
          }
        });  
      });
    }
  }


}
