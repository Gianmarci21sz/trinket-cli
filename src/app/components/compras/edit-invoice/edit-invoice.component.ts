import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { Invoice } from 'src/app/models/invoice';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { InvoiceService } from 'src/app/services/invoice.service';
declare var Swal:any;

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  estado: boolean = false;
  nuevoInvoice: FormGroup;
  listaCompras: Compra[] = [];
  invoice : Invoice ;
  constructor(private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
    private route : ActivatedRoute,
    private empleadoService : EmpleadoService) {    
    this.crearFormulario();
    this.cargarCombo();
    
  }

  ngOnInit(): void {
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  get OrdenCompraCabId() {
    return this.nuevoInvoice.get('ord_comp_cab_id').invalid && this.nuevoInvoice.get('ord_comp_cab_id').touched
  }
  get numOrdenCab() {
    return this.nuevoInvoice.get('num_orden_cab').invalid && this.nuevoInvoice.get('num_orden_cab').touched
  }
  get numConsignedCab() {
    return this.nuevoInvoice.get('num_consigned_cab').invalid && this.nuevoInvoice.get('num_consigned_cab').touched
  }
  get nomContactCab() {
    return this.nuevoInvoice.get('nom_contact_cab').invalid && this.nuevoInvoice.get('nom_contact_cab').touched
  }
  get telefonoContactCab() {
    return this.nuevoInvoice.get('telef_contact_cab').invalid && this.nuevoInvoice.get('telef_contact_cab').touched
  }
  get conuntryCab() {
    return this.nuevoInvoice.get('country_cab').invalid && this.nuevoInvoice.get('country_cab').touched
  }
  get staateCab() {
    return this.nuevoInvoice.get('state_cab').invalid && this.nuevoInvoice.get('state_cab').touched
  }
  get termsPayCab() {
    return this.nuevoInvoice.get('terms_pay_cab').invalid && this.nuevoInvoice.get('terms_pay_cab').touched
  }

  cargarInvoice(){
    let params = this.route.snapshot.params;
    if(params){
      this.invoiceService.buscar(params.id).subscribe((data:Invoice)=>{
        this.invoice = data;
        console.log(data.ord_comp_cab_id);
        this.nuevoInvoice.reset({
          ord_comp_cab_id: data.ord_comp_cab_id,
          num_orden_cab: data.num_orden_cab,
          num_consigned_cab: data.num_consigned_cab,
          nom_contact_cab: data.nomb_contact_cab,
          telef_contact_cab : data.telef_contact_cab,
          country_cab: data.country_cab,
          state_cab: data.state_cab,
          terms_pay_cab: data.terms_pay_cab,
        });
      });
    }
  }

  crearFormulario() {
    this.nuevoInvoice = this.fb.group({
      ord_comp_cab_id: ['', Validators.required,],
      num_orden_cab: ['', Validators.required,],
      num_consigned_cab: ['', Validators.required,],
      nom_contact_cab: ['', Validators.required,],
      telef_contact_cab: ['', Validators.required,],
      country_cab: ['', Validators.required,],
      state_cab: ['', Validators.required,],
      terms_pay_cab: ['', Validators.required,]
    });
  }

  cargarCombo() {
    this.invoiceService.listarCompras().subscribe((data: Compra[]) => {
      this.listaCompras = data;
      this.estado = true;
      this.cargarInvoice();
    });
  }

  llenarInvoice(){
    this.invoice = {
      id_invoice_cab:    this.invoice.id_invoice_cab,
      ord_comp_cab_id:   this.nuevoInvoice.get('ord_comp_cab_id').value,      
      num_consigned_cab: this.nuevoInvoice.get('num_consigned_cab').value,      
      nomb_contact_cab:  this.nuevoInvoice.get('nom_contact_cab').value,
      telef_contact_cab: this.nuevoInvoice.get('telef_contact_cab').value,
      country_cab:       this.nuevoInvoice.get('country_cab').value,
      state_cab:         this.nuevoInvoice.get('state_cab').value,
      terms_pay_cab:     this.nuevoInvoice.get('terms_pay_cab').value,
    };
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
  }

  volver(){
    this.router.navigateByUrl('/menu/(opt:listaInvoice)');
  }

  editar() {
    if ( this.nuevoInvoice.invalid ) {      
      return Object.values( this.nuevoInvoice.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );          
        } else {
          control.markAsTouched();          
        }          
      });          
    }else{
      this.llenarInvoice();
      this.invoiceService.editar(this.invoice).subscribe((data:Invoice)=>{
        Swal.fire(
          'Modificado',
          'Invoice modificado correctamente',
          'success'
        ) 
        this.router.navigateByUrl('/menu/(opt:listaInvoice)');
      });
    }
  }

}
