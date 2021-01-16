import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemCarroCli } from '../models/itemCarroCli';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  headers = new HttpHeaders().set('Content-Type','application/json');
  url : string = environment.uri+"venta/";  
  constructor(private http:HttpClient) { }
  
  listar():Observable<Venta[]>{
    return this.http.get<Venta[]>(this.url,{headers:this.headers});
  }  

  listarXcli(id : number):Observable<Venta[]>{
    return this.http.get<Venta[]>(this.url+`ventasXcliente/${id}`,{headers:this.headers});
  }

  addVenta(venta : Venta,tipoPago : number,medioPago:number):Observable<Venta>{
    return this.http.post<Venta>(this.url+`addVenta/${tipoPago}/${medioPago}`,venta,{headers:this.headers});
  }

  addDetalle(id:number,lista : ItemCarroCli[]):Observable<boolean>{
    return this.http.post<boolean>(this.url+`addDetalle/${id}`,lista,{headers:this.headers});
  }

  validarStock(cantidad : number , id:number):Observable<boolean>{
    return this.http.get<boolean>(this.url+`validarStock/${cantidad}/${id}`);
  }


}
