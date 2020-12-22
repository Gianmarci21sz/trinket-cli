import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from './shared/menu/menu.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';

import {HttpClientModule} from '@angular/common/http';
import { EmpleadoComponent } from './components/empleado/empleado.component'
import { LoginComponent } from './user-pages/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { AddProductoComponent } from './components/producto/add-producto/add-producto.component';
import { UpProductoComponent } from './components/producto/up-producto/up-producto.component';
import { EmpleadoFormComponent } from './components/empleado/empleado-form/empleado-form.component';
import { ComprasComponent } from './components/compras/compras.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { AddCategoriaComponent } from './components/categoria/add-categoria/add-categoria.component';
import { UpCategoriaComponent } from './components/categoria/up-categoria/up-categoria.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { AddProveedorComponent } from './components/proveedor/add-proveedor/add-proveedor.component';
import { UpProveedorComponent } from './components/proveedor/up-proveedor/up-proveedor.component';
import { BackrestComponent } from './components/backrest/backrest.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { RegistroCompraComponent } from './components/compras/registro-compra/registro-compra.component';
import { RegistroInvoiceComponent } from './components/compras/registro-invoice/registro-invoice.component';
import { ListaComprasComponent } from './components/compras/lista-compras/lista-compras.component';
import { EditComprasComponent } from './components/compras/edit-compras/edit-compras.component';
import { ListaInvoiceComponent } from './components/compras/lista-invoice/lista-invoice.component';
import { VentasComponent } from './components/ventas/ventas.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,    
    MenuComponent,
    ContentAnimateDirective,
    EmpleadoComponent,
    LoginComponent,
    ProductoComponent,
    AddProductoComponent,
    UpProductoComponent,
    EmpleadoFormComponent,
    ComprasComponent,
    CategoriaComponent,
    AddCategoriaComponent,
    UpCategoriaComponent,
    ProveedorComponent,
    AddProveedorComponent,
    UpProveedorComponent,
    BackrestComponent,
    ClienteComponent,
    RegistroCompraComponent,
    RegistroInvoiceComponent,        
    ListaComprasComponent,
    EditComprasComponent,
    ListaInvoiceComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule    
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
