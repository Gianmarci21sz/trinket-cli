import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Distrito } from 'src/app/models/distrito';
import { ItemCarroCli } from 'src/app/models/itemCarroCli';
import { tipoDocIdentidad } from 'src/app/models/tipoDocIdentidad';
import { Via } from 'src/app/models/via';
import { Zona } from 'src/app/models/zona';
import { CarritoService } from 'src/app/services/carrito.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { CompraService } from 'src/app/services/compra.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoDocIdentidadService } from 'src/app/services/tipo-doc-identidad.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ViaService } from 'src/app/services/via.service';
import { ZonaService } from 'src/app/services/zona.service';
declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  @ViewChild('captchaElem') captchaElem; 
  listaTipoDoc: tipoDocIdentidad[] = [];
  listaVia: Via[] = [];
  listaZona: Zona[] = [];
  listaDistrito: Distrito[] = [];  
  show: boolean = false;
  show2: boolean = false;
  isblock: boolean = true;
  rod: boolean = true;  
  forma: FormGroup;
  formaR: FormGroup;
  cliente: Cliente;
  siteKey: string = "6LcqOCkaAAAAAGkNRmX4mz3IUb4KudQ94Sqp5tBw";
  isblock1: boolean = true;
  isblock2: boolean = true;
  isblock3: boolean = true;  
  cambioContra: FormGroup;  

  constructor(private productoService: ProductoService,
    public compraService: CompraService,    
    public utilsService: UtilsService,    
    public clienteService: ClienteService,
    public router: Router,
    private fb: FormBuilder,
    private titleService: Title,
    private viaService: ViaService,
    private zonaService: ZonaService,
    private tipodocService: TipoDocIdentidadService,
    private distritoService: DistritoService,
    public carritoService:CarritoService) {
    this.titleService.setTitle("Trinket Cloud Sales");
    setInterval(() => {
      this.clienteService.expiracion();
    }, 5000);
    if(this.clienteService.clientelog){
      this.cargarCarrito();
    }
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.crearFormularioRegistro();
    this.cargarCombos();     
    this.cambioPass();
  }   

  cargarCarrito(){
    this.carritoService.listCarrito(this.clienteService.clientelog.id_cli)
      .subscribe((data:ItemCarroCli[])=>{
        this.carritoService.listaCarrito = data;
      });
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  get passNoValido() {
    return this.forma.get('pass').invalid && this.forma.get('pass').touched
  }

  get usuarioRNoValido() {
    return this.formaR.get('usuario').invalid && this.formaR.get('usuario').touched
  }
  get passRNoValido() {
    return this.formaR.get('pass').invalid && this.formaR.get('pass').touched
  }
  get tipoNoValido() {
    return this.formaR.get('tipo_doc').invalid && this.formaR.get('tipo_doc').touched
  }
  get rucNoValido() {
    return this.formaR.get('num_doc_ruc').invalid && this.formaR.get('num_doc_ruc').touched
  }
  get dniNoValido() {
    return this.formaR.get('num_doc_dni').invalid && this.formaR.get('num_doc_dni').touched
  }
  get correoNoValido() {
    return this.formaR.get('correo').invalid && this.formaR.get('correo').touched
  }
  get distritoNoValido() {
    return this.formaR.get('distrito').invalid && this.formaR.get('distrito').touched
  }
  get zonaNoValido() {
    return this.formaR.get('zona').invalid && this.formaR.get('zona').touched
  }
  get viaNoValido() {
    return this.formaR.get('via').invalid && this.formaR.get('via').touched
  }
  get referenciaNoValido() {
    return this.formaR.get('referencia').invalid && this.formaR.get('referencia').touched
  }
  get telefonoNoValido() {
    return this.formaR.get('telefono').invalid && this.formaR.get('telefono').touched
  }
  get nombreNoValido() {
    return this.formaR.get('nombre').invalid && this.formaR.get('nombre').touched
  }
  get direccionNoValido() {
    return this.formaR.get('direccion').invalid && this.formaR.get('direccion').touched
  }

  get captchaNoValido() {
    return this.forma.get('recaptcha').invalid && this.forma.get('recaptcha').touched
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


  crearFormulario() {
    this.forma = this.fb.group({
      usuario: ['', [Validators.required]],
      pass: ['', Validators.required],
      recaptcha: [, Validators.required]
    });
  }

  esconder(as: number) {
    if (as === 1) {
      this.isblock1 = !this.isblock1;
    } else if (as === 2) {
      this.isblock2 = !this.isblock2;
    } else if (as === 3) {
      this.isblock3 = !this.isblock3;
    }
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

  cargarCombos() {
    this.tipodocService.listar().subscribe((data: tipoDocIdentidad[]) => {
      this.listaTipoDoc = data;            
    });
    this.zonaService.listar().subscribe((data: Zona[]) => {
      this.listaZona = data;
    });
    this.viaService.listar().subscribe((data: Via[]) => {
      this.listaVia = data;
    });
    this.distritoService.listar().subscribe((data: Distrito[]) => {
      this.listaDistrito = data;
    });
  }

  cambiar() {
    if(this.formaR.get('tipo_doc').value == 1){
      this.rod = true;
      this.formaR.get('num_doc_ruc').setValue('');
    }else{
      this.rod = false;
      this.formaR.get('num_doc_dni').setValue('');
    }
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
      this.clienteService.autenticacion(this.clienteService.clientelog.user_cli, this.cambioContra.get('pass1').value)
      .subscribe((data: Cliente) => {
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
          this.clienteService.cambiarPass(this.clienteService.clientelog.user_cli, this.cambioContra.get('pass2').value)
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
                  this.carritoService.listaCarrito = [];
                  $('#cambio .cerrar').click();
                  this.clienteService.salir();
                  this.router.navigateByUrl('/catalogo');
                }
              });
            });
        }
      });
    }
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

  crearFormularioRegistro() {
    this.formaR = this.fb.group({
      tipo_doc: ['', [Validators.required]],
      num_doc_ruc: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(11), Validators.maxLength(11)],],
      num_doc_dni: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(8), Validators.maxLength(8)],],
      correo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')]],
      distrito: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      via: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(9)],],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(60),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    });
  }

  llenarCliente() {
    if(this.rod == true){
      this.formaR.get('num_doc_ruc').setValue('12345678912')
      this.cliente = {
        id_cli: 0,
        nom_cli: this.formaR.get('nombre').value,
        tipo_doc_identidad_cli: this.formaR.get('tipo_doc').value,
        num_doc_cli: this.formaR.get('num_doc_dni').value,
        dist_id: this.formaR.get('distrito').value,
        zona_id: this.formaR.get('zona').value,
        via_id: this.formaR.get('via').value,
        direcc_cli: this.formaR.get('direccion').value,
        referencia_cli: this.formaR.get('referencia').value,
        telefono_cli : this.formaR.get('telefono').value,
        email_cli: this.formaR.get('correo').value,
        user_cli: this.formaR.get('usuario').value,
        pass_cli: this.formaR.get('pass').value,
        estado_cli: 1,
        rec_pass: ''
      }
    }else{
      this.formaR.get('num_doc_dni').setValue('12345678')
      this.cliente = {
        id_cli: 0,
        nom_cli: this.formaR.get('nombre').value,
        tipo_doc_identidad_cli: this.formaR.get('tipo_doc').value,
        num_doc_cli: this.formaR.get('num_doc_ruc').value,
        dist_id: this.formaR.get('distrito').value,
        zona_id: this.formaR.get('zona').value,
        via_id: this.formaR.get('via').value,
        direcc_cli: this.formaR.get('direccion').value,
        referencia_cli: this.formaR.get('referencia').value,
        telefono_cli : this.formaR.get('telefono').value,
        email_cli: this.formaR.get('correo').value,
        user_cli: this.formaR.get('usuario').value,
        pass_cli: this.formaR.get('pass').value,
        estado_cli: 1,
        rec_pass: ''
      }
    }
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }

  irCompras() {
    if (this.clienteService.clientelog) {
      if(this.carritoService.listaCarrito.length>0){
        this.router.navigateByUrl('catalogo/(cli:pedido)')
      }else{
        alert('No hay productos en el carrito');  
      }  
    } else {
      alert('Primero debe logearse');
    }
  }

  cambioPass(){
    this.cambioContra = this.fb.group({
      pass1: ['', Validators.required,],
      pass2: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(60),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      pass3: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(60),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    });
  }

  limpiar() {
    this.formaR.reset();
    this.isblock = true;
  }

  limpiarLogin(){
    this.captchaElem.resetCaptcha();
    this.forma.reset();  
    this.isblock = true;    
  }

  ocultar(as: number) {
    if (as === 1) {
      this.isblock = !this.isblock;
    }
  }

  recuperar(){
    $("#login .btn-close").click();
    this.router.navigateByUrl('/cliRecuperar');
  }

  salir() {
    this.clienteService.salir();
    this.carritoService.listaCarrito = [];
  }

  login() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      this.clienteService.autenticacion(this.forma.get('usuario').value, this.forma.get('pass').value)
        .subscribe((data: Cliente) => {
          if (data !== null) {
            this.clienteService.clientelog = data;
            this.clienteService.guardarLocal();
            $("#login .btn-close").click();
            this.cargarCarrito();
          } else {
            Swal.fire(
              "Error",
              "Usuario o contraseña incorrecto",
              "error"
            )
          }
        });
    }
  } 

  registrar() {  
    this.llenarCliente();  
    if (this.formaR.invalid) {
      return Object.values(this.formaR.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }else {      
      this.utilsService.cargaEstadoCli = true;
      this.clienteService.validarTelefonoCliente(this.cliente.telefono_cli,0)
      .subscribe((data:boolean)=>{
        if(data == true){
          Swal.fire(
            "Error",
            "Telefono ya esta registrado",
            "error"
          )
        }else{
          this.clienteService.validarCorreoCliente(this.cliente.email_cli)
          .subscribe((data:boolean)=>{
            if(data == true){
              Swal.fire(
                "Error",
                "Correo ya esta registrado",
                "error"
              )
            }else{
              this.clienteService.validarDocCliente(this.cliente.num_doc_cli)
              .subscribe((data:boolean)=>{
                if(data == true){
                  Swal.fire(
                    "Error",
                    "N° documento ya esta registrado",
                    "error"
                  )
                }else{
                  this.clienteService.validarUsuarioCliente(this.cliente.user_cli,0)
                  .subscribe((data:boolean)=>{
                    if(data == true){
                      Swal.fire(
                        "Error",
                        "Usuario ya esta registrado",
                        "error"
                      )
                    }else{
                      this.clienteService.agregar(this.cliente).subscribe((data:Cliente)=>{
                        if(data !== null){
                          this.utilsService.cargaEstadoCli = false;
                          Swal.fire(
                            "Registro exitoso",
                            "Ahora puede iniciar sesion con su usuario y contraseña",
                            "success"
                          )
                          $("#registro .btn-close").click();
                        }else{
                          Swal.fire(
                            "Error",
                            "Error al intentar registrar",
                            "error"
                          )
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }
}
