import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public url : string;
  public clientelog : Cliente;    
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient,
              private router:Router) { 
    this.url = environment.uri+'cliente/';
    if(localStorage.getItem("clientelog")){
      this.clientelog=JSON.parse(localStorage.getItem("clientelog"));
    }else{
      this.clientelog=null;
    }    
  }

  verificar(){
    if(this.clientelog == null){
      this.router.navigate(['/catalogo']);
    }
  }  

  verificarLogin(){
    if(this.clientelog){
      this.router.navigateByUrl('/catalogo');
    }
  }

  expiracion(){
    let currentDate = new Date();
    let exp = JSON.parse(localStorage.getItem("expirescli"));
    if(Date.parse(currentDate.toString()) >= Date.parse(exp)){
      this.salir();      
    }
  }

  autenticacion(email:string,pass:string):Observable<Cliente>{          
    return this.http.get<Cliente>(this.url+`autenticacion/${email}/${pass}`,{headers:this.headers});
  }

  guardarLocal(){
    if(this.clientelog !=null){
      localStorage.setItem("clientelog",JSON.stringify(this.clientelog));
      this.clientelog=JSON.parse(localStorage.getItem("clientelog"));
      let expires = new Date;
      //expires.setSeconds(expires.getSeconds()+10);
      expires.setMinutes(expires.getMinutes()+5000);
      localStorage.setItem("expirescli",JSON.stringify(expires));
    }        
  }

  salir(){
    localStorage.setItem("clientelog",null);    
    this.clientelog=JSON.parse(localStorage.getItem("clientelog"));
    localStorage.removeItem("expirescli"); 
    this.verificar();                  
  }

  // RECUPERAR PASS

  buscarClienteXusuario(usuario : string):Observable<Cliente>{
    return this.http.get<Cliente>(this.url+`buscarClienteXusuario/${usuario}`,{headers:this.headers});
  }

  enviarCorreoRecuperar(correo : string){
    return this.http.get(this.url+`enviarCorreoRecuperar/${correo}`,{headers:this.headers});
  }

  buscarPorCodigoRecuperarCli(codigo : string):Observable<Cliente>{
    return this.http.get<Cliente>(this.url+`buscarPorCodigoRecuperarCli/${codigo}`,{headers:this.headers});
  }

  cambiarPass(usuario : string , pass : string){
    return this.http.get(this.url+`cambiarPass/${usuario}/${pass}`,{headers:this.headers});
  }

  // CRUD

  listar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url,{headers : this.headers});
  }

  buscar(id : number):Observable<Cliente>{
    return this.http.get<Cliente>(this.url+id,{headers:this.headers});
  }

  agregar(cliente : Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url,cliente,{headers:this.headers});
  }

  actualizar(cliente : Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url+cliente.id_cli,cliente,{headers:this.headers});
  }

  eliminar(id : number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+id,{headers:this.headers});
  }

  validarDocCliente(doc : string):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarDocCliente/${doc}`,{headers:this.headers});
  }

  validarDocEditCliente(doc : string,id : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarDocEditCliente/${doc}/${id}`,{headers:this.headers});
  }

  validarCorreoCliente(correo : string):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarCorreoCliente/${correo}`,{headers:this.headers});
  }

  validarCorreoEditCliente(correo : string,id : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarCorreoEditCliente/${correo}/${id}`,{headers:this.headers});
  }

  validarUsuarioCliente(usuario : string,id : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarUsuarioCliente/${usuario}/${id}`,{headers:this.headers});
  }

  validarTelefonoCliente(telefono : string,id : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarTelefonoCliente/${telefono}/${id}`,{headers:this.headers});
  }

}
