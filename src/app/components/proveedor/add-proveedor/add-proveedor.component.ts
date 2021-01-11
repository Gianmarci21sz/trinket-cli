import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { tipoDocIdentidad } from 'src/app/models/tipoDocIdentidad';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { TipoDocIdentidadService } from 'src/app/services/tipo-doc-identidad.service';
declare var Swal : any;
import { map } from 'rxjs/operators'
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.scss']
})
export class AddProveedorComponent implements OnInit {
  nuevoProv : FormGroup;
  listaTiposDocIdent : tipoDocIdentidad[];
  estado : boolean = false;
  rod : boolean = true;
  paises : string[] = [];  
  proveedor : Proveedor;
  constructor(
    private tipDocIdentService : TipoDocIdentidadService,    
    private proveedorService : ProveedorService,
    private router : Router,
    private route : ActivatedRoute,
    private fb : FormBuilder,
    private empleadoService : EmpleadoService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarCombos();    
    this.cargarPaises();
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  get contactoNoValido() {
    return this.nuevoProv.get('contact_prov').invalid && this.nuevoProv.get('contact_prov').touched
  }
  get direccionNoValido() {
    return this.nuevoProv.get('direc_prov').invalid && this.nuevoProv.get('direc_prov').touched
  }
  get correoNoValido() {
    return this.nuevoProv.get('correo').invalid && this.nuevoProv.get('correo').touched
  }
  get numDniUserNoValido() {
    return this.nuevoProv.get('num_doc_dni').invalid && this.nuevoProv.get('num_doc_dni').touched
  }
  get numRucUserNoValido() {
    return this.nuevoProv.get('num_doc_ruc').invalid && this.nuevoProv.get('num_doc_ruc').touched
  }
  get idTipNoValido() {
    return this.nuevoProv.get('tip_id').invalid && this.nuevoProv.get('tip_id').touched
  }     
  get paisNoValido() {
    return this.nuevoProv.get('pais_prov').invalid && this.nuevoProv.get('pais_prov').touched
  }  
  get telefonoNoValido() {
    return this.nuevoProv.get('telefono_prov').invalid && this.nuevoProv.get('telefono_prov').touched
  } 
  get celularNoValido() {
    return this.nuevoProv.get('celular_prov').invalid && this.nuevoProv.get('celular_prov').touched
  } 
  get razonNoValido() {
    return this.nuevoProv.get('razon_prov').invalid && this.nuevoProv.get('razon_prov').touched
  }   

  cargarPaises(){    
    this.paises = this.proveedorService.listarPaises();    
  }

  cambiar(){
    this.rod = !this.rod;
  }

  crearFormulario() {
    this.nuevoProv = this.fb.group({        
      razon_prov : ['',Validators.required,],
      pais_prov : ['',Validators.required,],
      tip_id : [0,Validators.required,],
      num_doc_ruc : ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(11),Validators.maxLength(11)],],      
      num_doc_dni : ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(8),Validators.maxLength(8)],],      
      direc_prov  : ['',  Validators.required ],
      contact_prov : ['',[Validators.required],],
      correo  : ['', [ Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')] ],
      telefono_prov : ['',[Validators.required,Validators.minLength(7)],],
      celular_prov : ['',[Validators.required,Validators.minLength(9)],]      
    });    
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
  }

  cargarCombos(){   
    this.tipDocIdentService.listar().subscribe((tdoc:tipoDocIdentidad[])=>{      
      this.listaTiposDocIdent = tdoc;    
      this.nuevoProv.reset({                  
        tip_id : tdoc[0].id_tip
      });     
      this.estado = true; 
    });      
    
  }

  llenarProveedor(){
    if(this.rod){
      this.nuevoProv.get('num_doc_ruc').setValue("12345678917");
      this.proveedor ={
        id_prov:       0,
        tip_id:        this.nuevoProv.get('tip_id').value,
        num_doc_prov:  this.nuevoProv.get('num_doc_dni').value,
        razon_prov:    this.nuevoProv.get('razon_prov').value,
        pais_prov:     this.nuevoProv.get('pais_prov').value,
        direc_prov:    this.nuevoProv.get('direc_prov').value,
        contact_prov:  this.nuevoProv.get('contact_prov').value,
        telefono_prov: this.nuevoProv.get('telefono_prov').value,
        celular_prov:  this.nuevoProv.get('celular_prov').value,
        correo_prov:   this.nuevoProv.get('correo').value,
        estado_prov:   '1',
      }
    }else{
      this.nuevoProv.get('num_doc_dni').setValue("12345678");
      this.proveedor ={
        id_prov:       0,
        tip_id:        this.nuevoProv.get('tip_id').value,
        num_doc_prov:  this.nuevoProv.get('num_doc_ruc').value,
        razon_prov:    this.nuevoProv.get('razon_prov').value,
        pais_prov:     this.nuevoProv.get('pais_prov').value,
        direc_prov:    this.nuevoProv.get('direc_prov').value,
        contact_prov:  this.nuevoProv.get('contact_prov').value,
        telefono_prov: this.nuevoProv.get('telefono_prov').value,
        celular_prov:  this.nuevoProv.get('celular_prov').value,
        correo_prov:   this.nuevoProv.get('correo').value,
        estado_prov:   '1',
      }
    }
  }

  volver(){
    this.router.navigateByUrl('/menu/(opt:proveedor)');
  }

  agregar(){
    this.llenarProveedor();
    if ( this.nuevoProv.invalid ) {      
      return Object.values( this.nuevoProv.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );          
        } else {
          control.markAsTouched();          
        }          
      });          
    }else{      
      this.proveedorService.validarCorreoProv(this.nuevoProv.get('correo').value)
      .subscribe((data:boolean)=>{
        console.log(data);
        if(data === true){
          Swal.fire(
            'Error',
            'El correo ya se encuentra registrado',
            'error'
          );
        }else{
          this.proveedorService.validarDocProv(this.proveedor.num_doc_prov)
          .subscribe((data:boolean)=>{
            if(data === true){
              Swal.fire(
                'Error',
                'El N° de Documento ya se encuentra registrado',
                'error'
              );
            }else{
              this.proveedorService.agregar(this.proveedor).subscribe((data:Proveedor)=>{                
                this.router.navigateByUrl('/menu/(opt:proveedor)');
              });
            }
          })
        }
      });
    }
  }

}
