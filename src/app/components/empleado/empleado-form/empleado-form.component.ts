import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { tipoDocIdentidad } from 'src/app/models/tipoDocIdentidad';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolesService } from 'src/app/services/roles.service';
import { TipoDocIdentidadService } from 'src/app/services/tipo-doc-identidad.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Rol } from '../../../models/rol';
declare var Swal: any;

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent implements OnInit {
  editing : boolean = false;
  nuevoEmp : FormGroup;
  estado : boolean = false;
  listaRoles : Rol[] = [];
  listaTiposDocIdent : tipoDocIdentidad[] = [];  
  empleado : Empleado = {
    id_emp :       '0',
    nom_emp:      '',
    ape_emp:      '',
    id_tip:        null,
    num_doc_emp:  '',
    direcc_emp:   '',
    telefono_emp: '',
    email:         '',
    pass_emp:     '123456',
    id_rol:        0,
    estado_emp:   1    
  };
  
  constructor(
    private rolesService : RolesService,
    private tipDocIdentService : TipoDocIdentidadService,    
    private empleadoService : EmpleadoService,
    private router : Router,
    private route : ActivatedRoute,
    private fb : FormBuilder,
    private utilsService : UtilsService
  ) { 
    this.crearFormulario();
    this.cargarCombos(); 
    this.verActualizar();     
  }

  ngOnInit(): void {           
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }else if(this.empleadoService.empleadolog.nombre_rol === 'Comprador'){
      this.router.navigateByUrl('menu/(opt:listaCompras)');
    }
  }

  get nombreNoValido() {
    return this.nuevoEmp.get('nom_user').invalid && this.nuevoEmp.get('nom_user').touched
  }
  get apellidonNoValido() {
    return this.nuevoEmp.get('ape_user').invalid && this.nuevoEmp.get('ape_user').touched
  }
  get emailNoValido() {
    return this.nuevoEmp.get('email').invalid && this.nuevoEmp.get('email').touched
  }
  get numDniUserNoValido() {
    return this.nuevoEmp.get('num_dni').invalid && this.nuevoEmp.get('num_dni').touched
  }
  get numRucUserNoValido() {
    return this.nuevoEmp.get('num_ruc').invalid && this.nuevoEmp.get('num_ruc').touched
  }
  get idTipNoValido() {
    return this.nuevoEmp.get('id_tip').invalid && this.nuevoEmp.get('id_tip').touched
  }  
  get idRolNoValido() {
    return this.nuevoEmp.get('id_rol').invalid && this.nuevoEmp.get('id_rol').touched
  }  
  get direccionNoValido() {
    return this.nuevoEmp.get('direcc_user').invalid && this.nuevoEmp.get('direcc_user').touched
  }  
  get telefonoNoValido() {
    return this.nuevoEmp.get('telefono_user').invalid && this.nuevoEmp.get('telefono_user').touched
  }  

  verActualizar(){    
    setTimeout(()=>{
      const params = this.route.snapshot.params;
      if(params.id_emp){
        this.empleadoService.buscarEmpleado(params.id_emp).subscribe((data:Empleado)=>{
          console.log(data);
          this.nuevoEmp.reset({
            id_emp :       data.id_emp,
            nom_user:      data.nom_emp,
            ape_user:      data.ape_emp,
            id_tip:        data.id_tip,
            num_dni:       data.num_doc_emp,            
            direcc_user:   data.direcc_emp,
            telefono_user: data.telefono_emp,
            email:         data.email,
            id_rol:        data.id_rol
          });
          this.empleado = data;    
          this.editing = true;    
          this.estado = true;                    
        });
        
      } else{
        this.estado = true;        
      }
      
    },500);
  }

  cargarCombos(){
    this.rolesService.listar().subscribe((data:Rol[])=>{
      this.listaRoles = data;
      this.tipDocIdentService.listar().subscribe((tdoc:tipoDocIdentidad[])=>{      
        this.listaTiposDocIdent = tdoc;    
        this.nuevoEmp.reset({          
          id_rol : data[0].id_rol,
          id_tip : tdoc[0].id_tip
        });      
      });      
    });
  }


  crearFormulario() {
    this.nuevoEmp = this.fb.group({  
      id_emp : ['',,],    
      nom_user : ['',[Validators.required],],
      ape_user : ['',Validators.required,],
      id_tip : [0,Validators.required,],
      num_dni : ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(8),Validators.maxLength(8)],],      
      direcc_user  : ['',  Validators.required ],
      telefono_user : ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(9),Validators.maxLength(9)],],
      email  : ['', [ Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')] ],
      id_rol : ['',Validators.required,],
    });    
  }

  llenarEmpleado(){       
    this.nuevoEmp.reset({
      nom_user:      this.nuevoEmp.get('nom_user').value,
      ape_user:      this.nuevoEmp.get('ape_user').value,
      id_tip:        this.nuevoEmp.get('id_tip').value,
      num_dni:       this.nuevoEmp.get('num_dni').value,      
      direcc_user:   this.nuevoEmp.get('direcc_user').value,
      telefono_user: this.nuevoEmp.get('telefono_user').value,
      email:         this.nuevoEmp.get('email').value,      
      id_rol:        this.nuevoEmp.get('id_rol').value,
      id_emp :      this.nuevoEmp.get('id_emp').value
    });
    
    this.empleado ={       
      nom_emp:      this.nuevoEmp.get('nom_user').value,
      ape_emp:      this.nuevoEmp.get('ape_user').value,
      id_tip:        this.nuevoEmp.get('id_tip').value,
      num_doc_emp:  this.nuevoEmp.get('num_dni').value,
      direcc_emp:   this.nuevoEmp.get('direcc_user').value,
      telefono_emp: this.nuevoEmp.get('telefono_user').value,
      email:         this.nuevoEmp.get('email').value,
      pass_emp:     this.empleado.pass_emp,
      id_rol:        this.nuevoEmp.get('id_rol').value,
      estado_emp : 1     ,
      id_emp : this.nuevoEmp.get('id_emp').value           
    }
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
  }

  volver(){
    this.router.navigateByUrl('/menu/(opt:empleado)');
  }

  soloLetras(e) {
    let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toLowerCase();
    let letras = " �����abcdefghijklmn�opqrstuvwxyz";
    let especiales: any = "8-37-39-46";

    let tecla_especial = false
    for (let i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }

  editar(){
    this.llenarEmpleado();
    if ( this.nuevoEmp.invalid ) {      
      return Object.values( this.nuevoEmp.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );          
        } else {
          control.markAsTouched();          
        }          
      });          
    }else{      
      this.empleadoService.validarCorreoEdit(this.nuevoEmp.get('email').value,this.nuevoEmp.get('id_emp').value)
      .subscribe((data:boolean)=>{
        console.log(data);
        if(data === true){
          Swal.fire(
            'Error',
            'El correo ya se encuentra registrado',
            'error'
          );
        }else{
          this.empleadoService.validarDocEdit(this.empleado.num_doc_emp,+this.empleado.id_emp)
          .subscribe((data:boolean)=>{
            if(data===true){
              Swal.fire(
                'Error',
                'El N° de documento ya se encuentra registrado',
                'error'
              );
            }else{
              this.empleadoService.actualizarEmpleado(this.empleado).subscribe((data:Empleado)=>{                
                if(+this.empleadoService.empleadolog.id_emp===+data.id_emp){
                  this.empleadoService.refrescarEmpleado(this.empleado.id_emp).subscribe((emple:Empleado)=>{                    
                    this.empleadoService.empleadolog = emple; 
                    this.empleadoService.guardarLocal();
                  });
                  Swal.fire(
                    'Completado',
                    'Cambios guardados correctamente',
                    'success'
                  )
                }else{
                  this.router.navigateByUrl('/menu/(opt:empleado)');
                }
                
              });
            }
          });
        }
      });
    }
  }

  agregar(){
    this.llenarEmpleado();
    if ( this.nuevoEmp.invalid ) {      
      return Object.values( this.nuevoEmp.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );          
        } else {
          control.markAsTouched();          
        }          
      });          
    }else{      
      this.empleadoService.validarCorreo(this.nuevoEmp.get('email').value)
      .subscribe((data:boolean)=>{
        console.log(data);
        if(data === true){
          Swal.fire(
            'Error',
            'El correo ya se encuentra registrado',
            'error'
          );
        }else{
          this.empleadoService.validarDoc(this.empleado.num_doc_emp)
          .subscribe((data:boolean)=>{
            if(data === true){
              Swal.fire(
                'Error',
                'El N° de Documento ya se encuentra registrado',
                'error'
              );
            }else{
              this.empleadoService.agregarEmpleado(this.empleado).subscribe((data:Empleado)=>{
                this.empleadoService.enviarCorreoEmp(data).subscribe((data:string)=>{
                  console.log(data);
                });
                this.router.navigateByUrl('/menu/(opt:empleado)');
              });
            }
          })
        }
      });
    }
  }

}
