import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compra } from '../models/compra';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  url : string = environment.uri+"invoice/";
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  listar():Observable<Invoice[]>{
    return this.http.get<Invoice[]>(this.url+'listar',{headers:this.headers});
  }

  buscar(id : number):Observable<Invoice>{
    return this.http.get<Invoice>(this.url+`buscar/${id}`,{headers:this.headers});
  }

  compraProveedor(id : number):Observable<Invoice>{
    return this.http.get<Invoice>(this.url+`compraProveedor/${id}`,{headers:this.headers});
  }

  listarCompras():Observable<Compra[]>{
    return this.http.get<Compra[]>(this.url+'listarCompras',{headers:this.headers});
  }

  agregar(invoice : Invoice):Observable<Invoice>{
    return this.http.post<Invoice>(this.url,invoice,{headers:this.headers});
  }

  editar(invoice : Invoice):Observable<Invoice>{
    return this.http.put<Invoice>(this.url+invoice.id_invoice_cab,invoice,{headers:this.headers});
  }
}
