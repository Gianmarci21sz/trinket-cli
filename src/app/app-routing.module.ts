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
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './user-pages/login/login.component';
import { BackrestComponent } from './components/backrest/backrest.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { RegistroCompraComponent } from './components/compras/registro-compra/registro-compra.component';
import { RegistroInvoiceComponent } from './components/compras/registro-invoice/registro-invoice.component';
import { UpCompraComponent } from './components/compras/up-compra/up-compra.component';
import { ListaComprasComponent } from './components/compras/lista-compras/lista-compras.component';
import { ListaInvoiceComponent } from './components/compras/lista-invoice/lista-invoice.component';
import { EditComprasComponent } from './components/compras/edit-compras/edit-compras.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },      
  { path: 'login', component:LoginComponent },  
  { path: 'menu', component:SpinnerComponent,children:[    
    { path: '',outlet:'opt', component:EmpleadoComponent, pathMatch: 'full'},    
    { path: 'empleado',outlet:'opt', component:EmpleadoComponent},
    { path: 'producto',outlet:'opt', component:ProductoComponent},  
    { path: 'addProducto',outlet:'opt', component:AddProductoComponent},
    { path: 'upProducto/:id_prod',outlet:'opt', component:UpProductoComponent},
    { path: 'formEmpleado',outlet:'opt', component: EmpleadoFormComponent},
    { path: 'formEmpleado/:id_emp',outlet:'opt', component: EmpleadoFormComponent},    
    { path: 'compras',outlet:'opt', component: ComprasComponent},    
    { path: 'addCompra',outlet:'opt', component: RegistroCompraComponent},  
    { path: 'upCompra',outlet:'opt', component: UpCompraComponent},      
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
    { path: 'upCompra/:id',outlet:'opt', component: EditComprasComponent},
    { path: '**',outlet:'opt', component:EmpleadoComponent},
  ] },
  { path: '**', redirectTo: '/menu', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
