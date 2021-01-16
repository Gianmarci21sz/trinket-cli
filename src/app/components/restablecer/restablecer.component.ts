import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
declare var Swal : any;

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.scss']
})
export class RestablecerComponent implements OnInit {
  correo : string = "";
  forma : FormGroup;
  estado : boolean = false;
  isblock : boolean = true;
  constructor(private route : ActivatedRoute,
              private empleadoService : EmpleadoService,
              private fb : FormBuilder,
              private router : Router) 
  { 
    let params = route.snapshot.params;
    if(params){
      this.empleadoService.buscarPorCodigoRecuperar(params.codgen).subscribe((data:Empleado)=>{
        if(data != null){
          this.correo = data.email;
          this.estado = true;
        }else{
          this.router.navigate(['error']);
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
      pass : ['',Validators.required,]
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
      this.empleadoService.cambiarPass(this.correo,this.forma.get('pass').value).subscribe(data=>{
        Swal.fire({
          title: 'Contraseña cambiada',
          text: "Ingrese con su nueva contraseña",
          icon: 'success',          
          confirmButtonText: 'OK',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {              
            this.router.navigateByUrl('/login');     
          }
        });  
      });
    }
  }

}
