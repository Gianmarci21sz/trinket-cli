import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { max, switchAll } from 'rxjs/operators';
import { Categoria } from 'src/app/models/categoria';
import { Imagenes } from 'src/app/models/imagenes';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var Swal : any;

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-up-producto',
  templateUrl: './up-producto.component.html',
  styleUrls: ['./up-producto.component.scss']
})
export class UpProductoComponent implements OnInit {
  nuevoProd : FormGroup;
  estado : boolean = false;
  producto : Producto={    
    id_prod : 0,        
    nom_prod : '',
    descrip_prod : '',
    precio_unit_prod : 0,
    stock_prod : 0,
    nota_prod : '',
    estado_prod : '1',
    id_cat : 0       
  };
  imagenes : String[] = [];  
  imagenesArr : Imagenes[] = [];
  photoSelected1: string | ArrayBuffer;
  photoSelected2: string | ArrayBuffer;
  photoSelected3: string | ArrayBuffer;
  photoSelected4: string | ArrayBuffer;
  photoSelected5: string | ArrayBuffer;  
  file1: File;
  file2: File;
  file3: File;
  file4: File;
  file5: File;
  listaCategorias : Categoria[];

  constructor(private router:Router,
              private route:ActivatedRoute,
              private productoService:ProductoService,
              private categoriaService:CategoriaService,
              private fb:FormBuilder,
              private empleadoService : EmpleadoService) { 
        this.crearFormulario();     
        this.llenarCategorias(); 
        this.cargarProducto();         
  }

  ngOnInit(): void { 
     
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
  }

  volver(){
    this.router.navigateByUrl('/menu/(opt:producto)');
  }

  get nombreNoValido() {
    return this.nuevoProd.get('nom_prod').invalid && this.nuevoProd.get('nom_prod').touched
  }
  get descripcionNoValido() {
    return this.nuevoProd.get('descrip_prod').invalid && this.nuevoProd.get('descrip_prod').touched
  }
  get precioNoValido() {
    return this.nuevoProd.get('precio_unit_prod').invalid && this.nuevoProd.get('precio_unit_prod').touched
  }
  get categoriaNoValido() {
    return this.nuevoProd.get('id_cat').invalid && this.nuevoProd.get('id_cat').touched
  }
  get notaProdNoValido() {
    return this.nuevoProd.get('nota_prod').invalid && this.nuevoProd.get('nota_prod').touched
  }  

  cargarProducto(){
    this.route.paramMap.subscribe( params => {      
      this.productoService.buscar(+params.get('id_prod')).subscribe((data:Producto)=>{        
        this.producto = data;        
        this.nuevoProd.reset({
          descrip_prod : this.producto.descrip_prod,
          precio_unit_prod : this.producto.precio_unit_prod,
          nota_prod : this.producto.nota_prod,
          id_cat : this.producto.id_cat,
          nom_prod  : this.producto.nom_prod,
          id_prod : this.producto.id_prod
        });          
        this.imgXprod(data.id_prod);  
        setTimeout(()=>{
          this.estado = true;
        },500);         
      });            
    });    
  }

  imgXprod(id_prod:number){
    this.productoService.imgXprod(id_prod).subscribe((data:Imagenes[])=>{
      let asd = 0;
      this.imagenesArr = data;      
      for(let o of data){            
        this.imagenes[asd] =  `http://192.168.1.13:1151/api/producto/verArchivo/${o.nom_imagen}`
        asd++;
      }
      /*this.imagenes1 = `http://192.168.1.13:1151/api/producto/verArchivo/${data[0].nom_imagen}`;
      this.imagenes2 = `http://192.168.1.13:1151/api/producto/verArchivo/${data[1].nom_imagen}`;
      this.imagenes3 = `http://192.168.1.13:1151/api/producto/verArchivo/${data[2].nom_imagen}`;
      this.imagenes4 = `http://192.168.1.13:1151/api/producto/verArchivo/${data[3].nom_imagen}`;
      this.imagenes5 = `http://192.168.1.13:1151/api/producto/verArchivo/${data[4].nom_imagen}`;*/
    });
  }

  llenarCategorias(){
    this.categoriaService.listar().subscribe((data:Categoria[])=>{
      this.listaCategorias = data;   
      this.nuevoProd.reset({
        id_cat : data[0].id_cat
      });
    });
  }

  crearFormulario() {
    this.nuevoProd = this.fb.group({      
      descrip_prod : ['',Validators.required,],
      precio_unit_prod : ['',[Validators.required,Validators.max(999999)],],
      nota_prod : ['',Validators.required,],
      id_cat : ['',Validators.required,],
      nom_prod  : ['',  Validators.required ],
      id_prod : ['',,]
    });    
  }

  actualizar(){
    this.llenarProducto();   
    if ( this.nuevoProd.invalid ) {      
      return Object.values( this.nuevoProd.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );          
        } else {
          control.markAsTouched();          
        }          
      });          
    }else{       
      this.productoService.validarNombreProductoEdit(this.producto.nom_prod,this.producto.id_prod)
      .subscribe((data:boolean)=>{
        if(data == true){
          Swal.fire(
            "Error",
            "Ya existe un producto con ese nombre",
            "error"
          )
        }else{
          this.productoService.actualizar(this.producto).subscribe((data:Producto)=>{               
            this.productoService.actualizarImagen(this.imagenesArr[0].id_imagen,this.file1).subscribe(data=>{},err=>{});
            this.productoService.actualizarImagen(this.imagenesArr[1].id_imagen,this.file2).subscribe(data=>{},err=>{});
            this.productoService.actualizarImagen(this.imagenesArr[2].id_imagen,this.file3).subscribe(data=>{},err=>{});
            this.productoService.actualizarImagen(this.imagenesArr[3].id_imagen,this.file4).subscribe(data=>{},err=>{});
            this.productoService.actualizarImagen(this.imagenesArr[4].id_imagen,this.file5)
            .subscribe((data)=>{     
              Swal.fire(
                'Modificado',
                'Producto actualizado correctamente',
                'success'
              )     
              this.router.navigateByUrl('/menu/(opt:producto)');          
            },
              err=>{});
          });
        }
      });
    }
  }

  llenarProducto(){
    this.producto ={ 
      id_prod : this.nuevoProd.get('id_prod').value,
      nom_prod : this.nuevoProd.get('nom_prod').value,
      descrip_prod : this.nuevoProd.get('descrip_prod').value,
      precio_unit_prod : this.nuevoProd.get('precio_unit_prod').value,
      stock_prod : this.producto.stock_prod,
      nota_prod : this.nuevoProd.get('nota_prod').value,
      estado_prod : '1',
      id_cat : this.nuevoProd.get('id_cat').value        
    }
  }

  onPhotoSelected1(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {      
      this.file1 = <File>event.target.files[0];      
      if(this.file1.name.split('.').pop().toString()==='jpg' || this.file1.name.split('.').pop().toString()==='png'){
        if(this.file1.size<1000000){
          // image preview
          const reader = new FileReader();
          reader.onload = e => this.photoSelected1 = reader.result;
          reader.readAsDataURL(this.file1);
        }else{
          this.file1 = undefined;
          alert('Peso de la imagen no debe exceder 1mb');
        } 
      }else{
        this.file1 = undefined;
        alert('El formato de la imagen debe ser JPG o PNG');
      }      
    }
  }
  onPhotoSelected2(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file2 = <File>event.target.files[0];
      if(this.file2.name.split('.').pop().toString()==='jpg' || this.file2.name.split('.').pop().toString()==='png'){
        if(this.file2.size<1000000){
          // image preview
          const reader = new FileReader();
          reader.onload = e => this.photoSelected2 = reader.result;
          reader.readAsDataURL(this.file2);
        }else{
          this.file2 = undefined;
          alert('Peso de la imagen no debe exceder 1mb');
        } 
      }else{
        this.file2 = undefined;
        alert('El formato de la imagen debe ser JPG o PNG');
      }           
    }
  }
  onPhotoSelected3(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file3 = <File>event.target.files[0];
      if(this.file3.name.split('.').pop().toString()==='jpg' || this.file3.name.split('.').pop().toString()==='png'){
        if(this.file3.size<1000000){
          // image preview
          const reader = new FileReader();
          reader.onload = e => this.photoSelected3 = reader.result;
          reader.readAsDataURL(this.file3);
        }else{
          alert('Peso de la imagen no debe exceder 1mb');
          this.file3 = undefined;
        } 
      }else{
        this.file3 = undefined;
        alert('El formato de la imagen debe ser JPG o PNG');
      }    
    }
  }
  onPhotoSelected4(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file4 = <File>event.target.files[0];
      if(this.file4.name.split('.').pop().toString()==='jpg' || this.file4.name.split('.').pop().toString()==='png'){
        if(this.file4.size<1000000){
          // image preview
          const reader = new FileReader();
          reader.onload = e => this.photoSelected4 = reader.result;
          reader.readAsDataURL(this.file4);
        }else{
          alert('Peso de la imagen no debe exceder 1mb');
          this.file4 = undefined;
        } 
      }else{
        this.file4 = undefined;
        alert('El formato de la imagen debe ser JPG o PNG');
      }       
    }
  }
  onPhotoSelected5(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file5 = <File>event.target.files[0];
      if(this.file5.name.split('.').pop().toString()==='jpg' || this.file5.name.split('.').pop().toString()==='png'){
        if(this.file5.size<1000000){
          // image preview
          const reader = new FileReader();
          reader.onload = e => this.photoSelected5 = reader.result;
          reader.readAsDataURL(this.file5);
        }else{
          this.file5 = undefined;
          alert('Peso de la imagen no debe exceder 1mb');
        } 
      }else{
        this.file5 = undefined;
        alert('El formato de la imagen debe ser JPG o PNG');
      }       
    }
  }

}
