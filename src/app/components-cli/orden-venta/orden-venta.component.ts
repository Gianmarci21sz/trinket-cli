import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchAll } from 'rxjs/operators';
import { ItemCarroCli } from 'src/app/models/itemCarroCli';
import { MedioPago } from 'src/app/models/medioPago';
import { TipoPago } from 'src/app/models/tipoPago';
import { Venta } from 'src/app/models/venta';
import { CarritoService } from 'src/app/services/carrito.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MedioPagoService } from 'src/app/services/medio-pago.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import { VentasService } from 'src/app/services/ventas.service';
declare var Swal: any;

@Component({
  selector: 'app-orden-venta',
  templateUrl: './orden-venta.component.html',
  styleUrls: ['./orden-venta.component.scss']
})
export class OrdenVentaComponent implements OnInit {
  total: number = 0;
  forma: FormGroup;
  errores: string[] = [];
  venta: Venta;
  medio: MedioPago[] = [];
  tipo: TipoPago[] = [];
  transaccion: boolean = false;
  constructor(public carritoService: CarritoService,
    private clienteService: ClienteService,
    private ventasService: VentasService,
    private tipoPagoService: TipoPagoService,
    private medioPagoService: MedioPagoService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarCombos();
    this.cargarCarrito();
    this.crearFormulario();
    this.cargar();
  }

  get medioInvalido() {
    return this.forma.get('medio').invalid && this.forma.get('medio').touched;
  }
  get tipoInvalido() {
    return this.forma.get('tipo').invalid && this.forma.get('tipo').touched;
  }
  get transaccionInvalido() {
    return this.forma.get('transaccion').invalid && this.forma.get('transaccion').touched;
  }

  cargarCombos() {
    this.medioPagoService.listar().subscribe((data: MedioPago[]) => {
      this.medio = data;
    });
    this.tipoPagoService.listar().subscribe((data: TipoPago[]) => {
      this.tipo = data;
    });
  }

  cambiar() {
    if (this.forma.get('medio').value == 2) {
      this.transaccion = true;
    } else {
      this.transaccion = false;
    }
  }

  llenarVenta() {
    if (this.transaccion === true) {
      this.venta = {
        id_cli: this.clienteService.clientelog.id_cli,
        num_trans_cab: this.forma.get('transaccion').value,
        est_vent_cab: 1
      }
    } else {
      this.forma.get('transaccion').setValue('null');
      this.venta = {
        id_cli: this.clienteService.clientelog.id_cli,
        num_trans_cab: this.forma.get('transaccion').value,
        est_vent_cab: 1
      }
    }
  }

  ordenVenta() {
    this.llenarVenta();
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      let i = 0;
      let texto: string = "";
      for (let item of this.carritoService.listaCarrito) {
        this.ventasService.validarStock(item.cantidad, item.id_prod)
          .subscribe((data: boolean) => {
            if (data === false) {
              this.errores.push(item.nombre_prod);
              i++;
            }
          });
      }
      setTimeout(() => {
        texto = "Stock no disponible: ";
        for (let er of this.errores) {
          texto += er + ', ';
        }
        if (this.errores.length > 0) {
          Swal.fire(
            "Error",
            texto.substring(0, texto.trim().length - 1) + '.',
            "error"
          )
        } else {
          this.ventasService.addVenta(this.venta, this.forma.get('tipo').value, this.forma.get('medio').value)
            .subscribe((data: Venta) => {
              if (data !== null) {
                this.ventasService.addDetalle(data.id_vent_cab, this.carritoService.listaCarrito)
                  .subscribe((data: boolean) => {
                    if (data == true) {
                      this.carritoService.limpiarCarrito(this.clienteService.clientelog.id_cli)
                        .subscribe((data: boolean) => {
                          if (data == true) {
                            this.carritoService.listCarrito(this.clienteService.clientelog.id_cli)
                              .subscribe((data: ItemCarroCli[]) => {
                                this.carritoService.listaCarrito = data;
                              });
                            Swal.fire(
                              "Pedido Realizado",
                              "El pedido se realizo correctamente, revise su correo.",
                              "success"
                            )
                            this.router.navigateByUrl('catalogo');
                          }
                        });
                    }
                  });
              }
            });
        }
      }, 500);
    }
  }
  

  cargar() {
    this.forma.reset({
      nombre: this.clienteService.clientelog.nom_cli,
      direccion: this.clienteService.clientelog.direcc_cli
    });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', ,],
      direccion: ['', ,],
      medio: ['', Validators.required,],
      tipo: ['', Validators.required,],
      transaccion: ['', Validators.required,]
    });
  }

  cargarCarrito() {
    this.carritoService.listCarrito(this.clienteService.clientelog.id_cli)
      .subscribe((data: ItemCarroCli[]) => {
        this.carritoService.listaCarrito = data;
        for (let d of data) {
          this.total += d.base_imp_vent_det * d.cantidad;
        }
      });
  }

}
