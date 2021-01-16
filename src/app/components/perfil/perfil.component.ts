import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { tipoDocIdentidad } from 'src/app/models/tipoDocIdentidad';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolesService } from 'src/app/services/roles.service';
import { TipoDocIdentidadService } from 'src/app/services/tipo-doc-identidad.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Rol } from '../../models/rol';
declare var Swal: any;
declare var $: any;
declare var document: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  isblock1: boolean = true;
  isblock2: boolean = true;
  isblock3: boolean = true;
  nuevoEmp: FormGroup;
  cambioContra: FormGroup;
  estado: boolean = false;
  listaRoles: Rol[] = [];
  listaTiposDocIdent: tipoDocIdentidad[] = [];
  empleado: Empleado = {
    id_emp: '0',
    nom_emp: '',
    ape_emp: '',
    id_tip: null,
    num_doc_emp: '',
    direcc_emp: '',
    telefono_emp: '',
    email: '',
    pass_emp: '123456',
    id_rol: 0,
    estado_emp: 1
  };

  constructor(
    private rolesService: RolesService,
    private tipDocIdentService: TipoDocIdentidadService,
    private empleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilsService: UtilsService
  ) {
    this.crearFormulario();
    this.cargarCombos();
    this.verActualizar();
  }

  ngOnInit(): void {
    if (this.empleadoService.empleadolog.nombre_rol === 'Vendedor') {
      this.router.navigateByUrl('menu/(opt:ventas)');
    } else if (this.empleadoService.empleadolog.nombre_rol === 'Comprador') {
      this.router.navigateByUrl('menu/(opt:listaCompras)');
    }
  }
  ocultar(as: number) {
    if (as === 1) {
      this.isblock1 = !this.isblock1;
    } else if (as === 2) {
      this.isblock2 = !this.isblock2;
    } else if (as === 3) {
      this.isblock3 = !this.isblock3;
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

  get pass1NoValido() {
    return this.cambioContra.get('pass1').invalid && this.cambioContra.get('pass1').touched
  }
  get pass2NoValido() {
    return this.cambioContra.get('pass2').invalid && this.cambioContra.get('pass2').touched
  }
  get pass3NoValido() {
    return this.cambioContra.get('pass3').invalid && this.cambioContra.get('pass3').touched
  }

  verActualizar() {
    this.empleadoService.buscarEmpleado(this.empleadoService.empleadolog.id_emp).subscribe((data: Empleado) => {            
      this.nuevoEmp.reset({
        id_emp: data.id_emp,
        nom_user: data.nom_emp,
        ape_user: data.ape_emp,
        id_tip: data.id_tip,
        num_dni: data.num_doc_emp,
        direcc_user: data.direcc_emp,
        telefono_user: data.telefono_emp,
        email: data.email,
        id_rol: data.id_rol
      });
      this.empleado = data;
      this.estado = true;
    });
  }

  cargarCombos() {
    this.rolesService.listar().subscribe((data: Rol[]) => {
      this.listaRoles = data;
      this.tipDocIdentService.listar().subscribe((tdoc: tipoDocIdentidad[]) => {
        this.listaTiposDocIdent = tdoc;
      });
    });
  }
  cerrarModal() {
    this.utilsService.resetPositionModal('#cambio');
  }


  crearFormulario() {
    this.nuevoEmp = this.fb.group({
      id_emp: ['', ,],
      nom_user: ['', Validators.required,],
      ape_user: ['', Validators.required,],
      id_tip: [0, Validators.required,],
      num_dni: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(8), Validators.maxLength(8)],],
      direcc_user: ['', Validators.required],
      telefono_user: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(9), Validators.maxLength(9)],],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')]],
      id_rol: ['', Validators.required,]

    });

    this.cambioContra = this.fb.group({
      pass1: ['', Validators.required,],
      pass2: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(60),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      pass3: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(60),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    });
  }

  llenarEmpleado() {
    this.nuevoEmp.reset({
      nom_user: this.nuevoEmp.get('nom_user').value,
      ape_user: this.nuevoEmp.get('ape_user').value,
      id_tip: this.nuevoEmp.get('id_tip').value,
      num_dni: this.nuevoEmp.get('num_dni').value,
      direcc_user: this.nuevoEmp.get('direcc_user').value,
      telefono_user: this.nuevoEmp.get('telefono_user').value,
      email: this.nuevoEmp.get('email').value,
      id_rol: this.nuevoEmp.get('id_rol').value,
      id_emp: this.nuevoEmp.get('id_emp').value
    });

    this.empleado = {
      nom_emp: this.nuevoEmp.get('nom_user').value,
      ape_emp: this.nuevoEmp.get('ape_user').value,
      id_tip: this.nuevoEmp.get('id_tip').value,
      num_doc_emp: this.nuevoEmp.get('num_dni').value,
      direcc_emp: this.nuevoEmp.get('direcc_user').value,
      telefono_emp: this.nuevoEmp.get('telefono_user').value,
      email: this.nuevoEmp.get('email').value,
      pass_emp: this.empleado.pass_emp,
      id_rol: this.nuevoEmp.get('id_rol').value,
      estado_emp: 1,
      id_emp: this.nuevoEmp.get('id_emp').value
    }
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }

  volver() {
    this.router.navigateByUrl('/menu/(opt:empleado)');
  }

  cambiarPass() {
    if (this.cambioContra.invalid) {      
      return Object.values(this.cambioContra.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }else{
      this.empleadoService.autenticacion(this.empleadoService.empleadolog.email, this.cambioContra.get('pass1').value)
      .subscribe((data: Empleado) => {
        if (this.cambioContra.get('pass1').value === '' || this.cambioContra.get('pass2').value === ''
          || this.cambioContra.get('pass3').value === '') {
          Swal.fire(
            'Error',
            'Complete todos los campos',
            'error'
          )
        }
        else if (data == null) {
          Swal.fire(
            'Error',
            'Contraseña actual incorrecta',
            'error'
          )
        } else if (this.cambioContra.get('pass2').value !== this.cambioContra.get('pass3').value) {
          Swal.fire(
            'Error',
            'La nueva contraseña debe coincidir con la confirmacion',
            'error'
          )
        } else {
          this.empleadoService.cambiarPass(this.empleadoService.empleadolog.email, this.cambioContra.get('pass2').value)
            .subscribe((data) => {
              this.utilsService.cambiar();
              Swal.fire({
                title: 'Contraseña cambiada',
                text: "Se cerrará la sesion",
                icon: 'success',
                confirmButtonText: 'OK',
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
                  this.utilsService.borrar();
                  $('#cambio .cerrar').click();
                  this.empleadoService.cambiar();
                  this.router.navigateByUrl('/login');
                }
              });
            });
        }
      });
    }
  }

  editar() {
    this.llenarEmpleado();
    if (this.nuevoEmp.invalid) {
      return Object.values(this.nuevoEmp.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      this.empleadoService.validarCorreoEdit(this.nuevoEmp.get('email').value, this.nuevoEmp.get('id_emp').value)
        .subscribe((data: boolean) => {          
          if (data === true) {
            Swal.fire(
              'Error',
              'El correo ya se encuentra registrado',
              'error'
            );
          } else {
            this.empleadoService.validarDocEdit(this.empleado.num_doc_emp, +this.empleado.id_emp)
              .subscribe((data: boolean) => {
                if (data === true) {
                  Swal.fire(
                    'Error',
                    'El N° de documento ya se encuentra registrado',
                    'error'
                  );
                } else {
                  this.empleadoService.actualizarEmpleado(this.empleado).subscribe((data: Empleado) => {                    
                    this.empleadoService.refrescarEmpleado(this.empleado.id_emp).subscribe((emple:Empleado)=>{
                      console.log(emple); 
                      this.empleadoService.empleadolog = emple; 
                      this.empleadoService.guardarLocal();
                    });
                    Swal.fire(
                      'Completado',
                      'Cambios guardados correctamente',
                      'success'
                    )
                  });
                }
              });
          }
        });
    }
  }


}
