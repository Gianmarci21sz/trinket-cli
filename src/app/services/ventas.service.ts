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
}
