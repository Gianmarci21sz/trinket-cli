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
import { ClienteService } from 'src/app/services/cliente.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { TipoDocIdentidadService } from 'src/app/services/tipo-doc-identidad.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ViaService } from 'src/app/services/via.service';
import { ZonaService } from 'src/app/services/zona.service';
declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-cli-perfil',
  templateUrl: './cli-perfil.component.html',
  styleUrls: ['./cli-perfil.component.scss']
})
export class CliPerfilComponent implements OnInit {
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
  estado : boolean = false;

  constructor(
    public utilsService: UtilsService,    
    public clienteService: ClienteService,
    public router: Router,
    private fb: FormBuilder,    
    private viaService: ViaService,
    private zonaService: ZonaService,
    private tipodocService: TipoDocIdentidadService,
    private distritoService: DistritoService,
  ) { 
    this.crearFormularioRegistro();
    this.cargarCombos();
    this.cargarPerfil();   
  }

  ngOnInit(): void {
  }

  get usuarioRNoValido() {
    return this.formaR.get('usuario').invalid && this.formaR.get('usuario').touched
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

  
  ocultar(as: number) {
    if (as === 1) {
      this.isblock = !this.isblock;
    }
  }

  cargarPerfil(){
    this.clienteService.buscar(this.clienteService.clientelog.id_cli)
    .subscribe((data:Cliente)=>{
      this.cliente = data;
      if(data.tipo_doc_identidad_cli==1){
        this.rod = true;
      }else{
        this.rod=false;
      }
      this.formaR.reset({
        tipo_doc : data.tipo_doc_identidad_cli,
        num_doc_dni : data.num_doc_cli,
        num_doc_ruc : data.num_doc_cli,
        correo : data.email_cli,
        distrito : data.dist_id,
        zona : data.zona_id,
        via : data.via_id,
        referencia : data.referencia_cli,
        telefono : data.telefono_cli,
        nombre : data.nom_cli,
        direccion: data.direcc_cli,
        usuario : data.user_cli
      });
      this.estado = true;
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
      
    });
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
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

  llenarCliente() {
    if(this.rod == true){
      this.formaR.get('num_doc_ruc').setValue('12345678912')
      this.cliente = {
        id_cli: this.cliente.id_cli,
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
        pass_cli: this.cliente.pass_cli,
        estado_cli: 1,
        rec_pass: ''
      }
    }else{
      this.formaR.get('num_doc_dni').setValue('12345678')
      this.cliente = {
        id_cli: this.cliente.id_cli,
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
        pass_cli: this.cliente.pass_cli,
        estado_cli: 1,
        rec_pass: ''
      }
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
      this.clienteService.validarTelefonoCliente(this.cliente.telefono_cli,this.cliente.id_cli)
      .subscribe((data:boolean)=>{
        if(data == true){
          Swal.fire(
            "Error",
            "Telefono ya esta registrado",
            "error"
          )
        }else{
          this.clienteService.validarCorreoEditCliente(this.cliente.email_cli,this.cliente.id_cli)
          .subscribe((data:boolean)=>{
            if(data == true){
              Swal.fire(
                "Error",
                "Correo ya esta registrado",
                "error"
              )
            }else{
              this.clienteService.validarDocEditCliente(this.cliente.num_doc_cli,this.cliente.id_cli)
              .subscribe((data:boolean)=>{
                if(data == true){
                  Swal.fire(
                    "Error",
                    "N° documento ya esta registrado",
                    "error"
                  )
                }else{
                  this.clienteService.validarUsuarioCliente(this.cliente.user_cli,this.cliente.id_cli)
                  .subscribe((data:boolean)=>{
                    if(data == true){
                      Swal.fire(
                        "Error",
                        "Usuario ya esta registrado",
                        "error"
                      )
                    }else{
                      this.clienteService.actualizar(this.cliente).subscribe((data:Cliente)=>{
                        if(data !== null){
                          Swal.fire(
                            "Actualizacion exitosa",
                            "Se actualizaron sus datos correctamente",
                            "success"
                          )
                          this.clienteService.autenticacion(this.cliente.user_cli,this.cliente.pass_cli)
                          .subscribe((data:Cliente)=>{
                            this.clienteService.clientelog = data;
                          });
                        }else{
                          Swal.fire(
                            "Error",
                            "Error al intentar actualizar",
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
