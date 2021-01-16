import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemCarro } from '../models/itemCarro';
import { ItemCarroCli } from '../models/itemCarroCli';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  url : string = environment.uri+'carrito/';
  headers = new HttpHeaders().set('Content-Type','application/json');
  listaCarrito : ItemCarroCli[] = [];
  constructor(private http:HttpClient) { }
  addCarrito(item : ItemCarroCli):Observable<ItemCarroCli>{
    return this.http.post<ItemCarroCli>(this.url,item,{headers:this.headers});
  }
  upCarrito(idcar:number,cantidad:number):Observable<boolean>{
    return this.http.put<boolean>(this.url+`${idcar}/${cantidad}`,{headers:this.headers});
  }
  listCarrito(id : number):Observable<ItemCarroCli[]>{
    return this.http.get<ItemCarroCli[]>(this.url+id,{headers:this.headers});
  }
  delCarrito(id : number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+id,{headers:this.headers});
  }  
  limpiarCarrito(id : number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+'limpiarCarrito/'+id,{headers:this.headers});
  }  
}
