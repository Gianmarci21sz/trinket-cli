import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MedioPago } from '../models/medioPago';
import { TipoPago } from '../models/tipoPago';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {
  url : string = environment.uri+'tipopago';
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  listar():Observable<TipoPago[]>{
    return this.http.get<TipoPago[]>(this.url,{headers:this.headers});
  }
}
