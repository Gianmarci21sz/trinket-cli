import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CompraService } from './compra.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {  
  public url : string;
  public empleadolog : Empleado;    
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient,private router:Router) { 
    this.url = environment.uri+'empleado/';
    if(localStorage.getItem("empleadolog")){
      this.empleadolog=JSON.parse(localStorage.getItem("empleadolog"));
    }else{
      this.empleadolog=null;
    }    
  }

  verificar(){
    if(this.empleadolog == null){
      this.router.navigate(['/login']);
    }
  }

  verificarLogin(){
    if(this.empleadolog){
      this.router.navigateByUrl('/menu/(opt:empleado)');
    }
  }

  expiracion(){
    let currentDate = new Date();
    let exp = JSON.parse(localStorage.getItem("expires"));
    if(Date.parse(currentDate.toString()) >= Date.parse(exp)){
      this.cambiar();
    }
  }

  autenticacion(email:string,pass:string):Observable<Empleado>{          
    return this.http.get<Empleado>(this.url+`autenticacion/${email}/${pass}`,{headers:this.headers});
  }

  guardarLocal(){
    if(this.empleadolog !=null){
      localStorage.setItem("empleadolog",JSON.stringify(this.empleadolog));
      this.empleadolog=JSON.parse(localStorage.getItem("empleadolog"));
      let expires = new Date;
      //expires.setSeconds(expires.getSeconds()+10);
      expires.setMinutes(expires.getMinutes()+5000);
      localStorage.setItem("expires",JSON.stringify(expires));
    }        
  }

  cambiar(){
    localStorage.setItem("empleadolog",null);    
    this.empleadolog=JSON.parse(localStorage.getItem("empleadolog"));
    localStorage.removeItem("expires");    
    localStorage.removeItem("items");    
    localStorage.removeItem("sidebar");
    this.router.navigate(['login']);    
  }

  enviarCorreoEmp(empleado : Empleado):Observable<string>{
    return this.http.post<string>(this.url+'enviarCorreo',empleado,{headers:this.headers});
  }

  enviarCorreoRecuperar(correo : string){
    return this.http.get(this.url+`enviarCorreoRecuperar/${correo}`,{headers:this.headers});
  }

  buscarPorCodigoRecuperar(codigo : string):Observable<Empleado>{
    return this.http.get<Empleado>(this.url+`buscarPorCodigoRecuperar/${codigo}`,{headers:this.headers});
  }

  cambiarPass(correo : string , pass : string){
    return this.http.get(this.url+`cambiarPass/${correo}/${pass}`,{headers:this.headers});
  }

  //CRUD

  listarEmpleado():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.url+'listar',{headers:this.headers});
  }

  agregarEmpleado(empleado : Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(this.url,empleado,{headers:this.headers});
  }

  actualizarEmpleado(empleado : Empleado){
    return this.http.put<Empleado>(this.url+empleado.id_emp,empleado,{headers:this.headers});
  }

  validarCorreo(correo : string):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarCorreo/${correo}`,{headers:this.headers});
  }

  validarCorreoEdit(correo : string,id : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarCorreoEdit/${correo}/${id}`,{headers:this.headers});
  }

  validarDoc(num_doc : string):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarDni/${num_doc}`,{headers:this.headers});
  }

  validarDocEdit(num_doc : string,id : number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarDniEdit/${num_doc}/${id}`,{headers:this.headers});
  }

  buscarEmpleado(id : string):Observable<Empleado>{
    return this.http.get<Empleado>(this.url+`buscar/${id}`,{headers:this.headers});
  }

  refrescarEmpleado(id : string):Observable<Empleado>{
    return this.http.get<Empleado>(this.url+`refrescar/${id}`,{headers:this.headers});
  }

  eliminarEmpleado(id : string):Observable<boolean>{    
    return this.http.delete<boolean>(this.url+id,{headers:this.headers});
  }
}
