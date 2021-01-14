import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddProveedorComponent } from './components/proveedor/add-proveedor/add-proveedor.component';
import { AddCategoriaComponent } from './components/categoria/add-categoria/add-categoria.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { UpCategoriaComponent } from './components/categoria/up-categoria/up-categoria.component';
import { ComprasComponent } from './components/compras/compras.component';
import { EmpleadoFormComponent } from './components/empleado/empleado-form/empleado-form.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { AddProductoComponent } from './components/producto/add-producto/add-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { UpProductoComponent } from './components/producto/up-producto/up-producto.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { UpProveedorComponent } from './components/proveedor/up-proveedor/up-proveedor.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from './user-pages/login/login.component';
import { BackrestComponent } from './components/backrest/backrest.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { RegistroCompraComponent } from './components/compras/registro-compra/registro-compra.component';
import { RegistroInvoiceComponent } from './components/compras/registro-invoice/registro-invoice.component';
import { ListaComprasComponent } from './components/compras/lista-compras/lista-compras.component';
import { ListaInvoiceComponent } from './components/compras/lista-invoice/lista-invoice.component';
import { EditComprasComponent } from './components/compras/edit-compras/edit-compras.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { RestablecerComponent } from './components/restablecer/restablecer.component';
import { ErrorComponent } from './components/error/error.component';
import { EditInvoiceComponent } from './components/compras/edit-invoice/edit-invoice.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PedidoComponent } from './components-cli/pedido/pedido.component';
import { HistorialComponent } from './components-cli/historial/historial.component';
import { DetProductoComponent } from './components-cli/det-producto/det-producto.component';
import { CliReestablecerComponent } from './components-cli/cli-reestablecer/cli-reestablecer.component';
import { CliRecuperarComponent } from './components-cli/cli-recuperar/cli-recuperar.component';
import { CliPerfilComponent } from './components-cli/cli-perfil/cli-perfil.component';
import { CatalogoComponent } from './components-cli/catalogo/catalogo.component';
import { DetComprasComponent } from './components/compras/det-compras/det-compras.component';
import { PrincipalComponent } from './components-cli/principal/principal.component';
import { OrdenVentaComponent } from './components-cli/orden-venta/orden-venta.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'reestablecer/:codgen', component:RestablecerComponent },    
  { path: 'recuperar',component:RecuperarComponent },       
  { path: 'login', component:LoginComponent },  
  { path: 'catalogo', component:CatalogoComponent,children:[
    { path: '',outlet:'cli', component:PrincipalComponent, pathMatch: 'full'},        
    { path: 'cliPerfil',outlet:'cli', component:CliPerfilComponent },   
    { path: 'detProducto/:id',outlet:'cli', component:DetProductoComponent },  
    { path: 'historial',outlet:'cli', component:HistorialComponent },  
    { path: 'pedido',outlet:'cli', component:PedidoComponent }, 
    { path: 'orden',outlet:'cli', component:OrdenVentaComponent },
    { path: '**',outlet:'cli', component:PrincipalComponent},
  ]},     
  { path: 'recuperar', component:CliRecuperarComponent },  
  { path: 'cliReestablecer/:codgen', component:CliReestablecerComponent },
  { path: 'error', component:ErrorComponent },  
  { path: 'menu', component:MenuComponent,children:[    
    { path: '',outlet:'opt', component:EmpleadoComponent, pathMatch: 'full'},    
    { path: 'empleado',outlet:'opt', component:EmpleadoComponent},
    { path: 'producto',outlet:'opt', component:ProductoComponent},  
    { path: 'addProducto',outlet:'opt', component:AddProductoComponent},
    { path: 'upProducto/:id_prod',outlet:'opt', component:UpProductoComponent},
    { path: 'formEmpleado',outlet:'opt', component: EmpleadoFormComponent},
    { path: 'formEmpleado/:id_emp',outlet:'opt', component: EmpleadoFormComponent},    
    { path: 'compras',outlet:'opt', component: ComprasComponent},    
    { path: 'addCompra',outlet:'opt', component: RegistroCompraComponent},           
    { path: 'addInvoice',outlet:'opt', component: RegistroInvoiceComponent},           
    { path: 'categoria',outlet:'opt', component: CategoriaComponent},    
    { path: 'addCategoria',outlet:'opt', component: AddCategoriaComponent},    
    { path: 'upCategoria/:id_cat',outlet:'opt', component: UpCategoriaComponent},    
    { path: 'proveedor',outlet:'opt', component: ProveedorComponent}, 
    { path: 'addProveedor',outlet:'opt', component: AddProveedorComponent}, 
    { path: 'upProveedor/:id_prov',outlet:'opt', component: UpProveedorComponent}, 
    { path: 'backupRestore',outlet:'opt', component: BackrestComponent},
    { path: 'cliente',outlet:'opt', component: ClienteComponent},
    { path: 'listaCompras',outlet:'opt', component: ListaComprasComponent},
    { path: 'listaInvoice',outlet:'opt', component: ListaInvoiceComponent},
    { path: 'editInvoice/:id',outlet:'opt', component: EditInvoiceComponent},
    { path: 'upCompra/:id',outlet:'opt', component: EditComprasComponent},
    { path: 'detCompra/:id',outlet:'opt', component: DetComprasComponent},
    { path: 'ventas',outlet:'opt', component: VentasComponent},
    { path: 'perfil',outlet:'opt', component: PerfilComponent},
    { path: '**',outlet:'opt', component:EmpleadoComponent},
  ] },
  { path: '**', redirectTo: '/menu', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

