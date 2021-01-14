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
import { NgxCaptchaModule } from 'ngx-captcha';

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
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { RestablecerComponent } from './components/restablecer/restablecer.component';
import { ErrorComponent } from './components/error/error.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { EditInvoiceComponent } from './components/compras/edit-invoice/edit-invoice.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CatalogoComponent } from './components-cli/catalogo/catalogo.component';
import { PedidoComponent } from './components-cli/pedido/pedido.component';
import { HistorialComponent } from './components-cli/historial/historial.component';
import { DetProductoComponent } from './components-cli/det-producto/det-producto.component';
import { CliPerfilComponent } from './components-cli/cli-perfil/cli-perfil.component';
import { CliRecuperarComponent } from './components-cli/cli-recuperar/cli-recuperar.component';
import { CliReestablecerComponent } from './components-cli/cli-reestablecer/cli-reestablecer.component';
import { DetComprasComponent } from './components/compras/det-compras/det-compras.component';
import { PrincipalComponent } from './components-cli/principal/principal.component';
import { OrdenVentaComponent } from './components-cli/orden-venta/orden-venta.component';


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
    VentasComponent,
    RecuperarComponent,
    RestablecerComponent,
    ErrorComponent,
    EditInvoiceComponent,
    PerfilComponent,
    CatalogoComponent,
    PedidoComponent,
    HistorialComponent,
    DetProductoComponent,
    CliPerfilComponent,
    CliRecuperarComponent,
    CliReestablecerComponent,
    DetComprasComponent,
    PrincipalComponent,
    OrdenVentaComponent,  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxCaptchaModule,    
    
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
