import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compra } from '../models/compra';
import { ItemCarro } from '../models/itemCarro';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  items : ItemCarro[] = [];
  headers = new HttpHeaders().set('Content-Type','application/json');  
  url : string = environment.uri+'compra/';
  agregado : boolean = false;
  constructor(private http:HttpClient) { 
    if(localStorage.getItem('items')){
      this.items = JSON.parse(localStorage.getItem("items"));
    }
  }

  registrarCompra(compra:Compra):Observable<Compra>{
    return this.http.post<Compra>(this.url+'addCompra',compra,{headers:this.headers});
  }

  registrarDetalle(detalle : ItemCarro[]):Observable<string>{
    return this.http.post<string>(this.url+'addDetalle',detalle,{headers:this.headers});
  }

  listarCompras():Observable<Compra[]>{
    return this.http.get<Compra[]>(this.url+'listarCompra',{headers:this.headers});
  }

  eliminarCompra(id : number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+'delCompra/'+id,{headers:this.headers});
  }

  buscarCompra(id : number):Observable<Compra[]>{
    return this.http.get<Compra[]>(this.url+`buscarCompra/${id}`,{headers:this.headers});
  }

  buscarDetalleCompra(id : number):Observable<ItemCarro[]>{
    return this.http.get<ItemCarro[]>(this.url+`detalleCompra/${id}`,{headers:this.headers});
  }  
  
  delDetalle(id:number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+'delDetalle/'+id,{headers:this.headers});
  }

  upDetalleCantidad(id:number,cantidad:number,precio:number):Observable<boolean>{
    return this.http.put<boolean>(this.url+`upDetalleCantidad/${id}/${cantidad}/${precio}`,{headers:this.headers});
  }

  upCompraCondicion(id:number,condicion:string):Observable<boolean>{
    return this.http.put<boolean>(this.url+`upCompraCondicion/${id}/${condicion}`,{headers:this.headers});
  }


  // CARRITO

  agregar(item : ItemCarro){
    let ref : boolean = false;
    if(this.items.length>0){
      for(let ic of this.items){        
        if(ic.prod_id === item.prod_id){
          ic.cant_ord_det = item.cant_ord_det;
          ic.unit_price_ord_det = item.unit_price_ord_det;
          ref = false;
          break;
        }else{
          ref = true;
        }        
      }                
    }else{
      this.items.push(item);
    }
    if(ref){
      this.items.push(item);
    }
    for(let ic of this.items){
      ic.amount_ord_det = ic.cant_ord_det * ic.unit_price_ord_det;
    }
    localStorage.setItem('items',JSON.stringify(this.items));
  }

  eliminar(id : number){
    for(let ic of this.items){
      if(ic.prod_id === id){
        let a = this.items.indexOf(ic);
        if ( a !== -1 ) {
          this.items.splice( a, 1 );
        }
      }
    } 
    localStorage.setItem('items',JSON.stringify(this.items));
  }

  aumentar(id:number,cantidad:number){    
    for(let ic of this.items){      
      if(+ic.prod_id === +id){        
          ic.cant_ord_det = +cantidad;    
          ic.amount_ord_det = ic.unit_price_ord_det * ic.cant_ord_det;                  
      }
    } 
    localStorage.setItem('items',JSON.stringify(this.items));
  }
  aumentarPrecio(id:number,precio:number){    
    for(let ic of this.items){      
      if(+ic.prod_id === +id){        
          ic.unit_price_ord_det = +precio;                      
          ic.amount_ord_det = ic.unit_price_ord_det * ic.cant_ord_det;
      }
    } 
    localStorage.setItem('items',JSON.stringify(this.items));
  }
}
