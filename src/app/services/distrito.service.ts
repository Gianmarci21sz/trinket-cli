import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Distrito } from '../models/distrito';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  headers = new HttpHeaders().set('Content-Type','application/json');  
  url : string = environment.uri+'distrito/';
  constructor(private http:HttpClient) { }

  listar():Observable<Distrito[]>{
    return this.http.get<Distrito[]>(this.url,{headers:this.headers});
  }
}
