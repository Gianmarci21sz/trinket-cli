import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
declare var Swal : any;

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.scss']
})
export class AddCategoriaComponent implements OnInit {
  estado : boolean = false;
  nuevaCat : FormGroup;
  categoria : Categoria;
  constructor(private fb:FormBuilder,
              private categoriaService:CategoriaService,
              private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();    
  }

  get nombreNoValido() {
    return this.nuevaCat.get('nom_cat').invalid && this.nuevaCat.get('nom_cat').touched
  }
  get descripcionNoValido() {
    return this.nuevaCat.get('descrip_cat').invalid && this.nuevaCat.get('descrip_cat').touched
  }

  volver(){
    this.router.navigateByUrl('/menu/(opt:categoria)');
  }

  crearFormulario() {
    this.nuevaCat = this.fb.group({      
      nom_cat  : ['',  Validators.required ],
      descrip_cat : ['',Validators.required,],      
    });
    this.estado = true;
  }

  llenarCategoria(){
    this.categoria ={
      id_cat : 0,
      nom_cat : this.nuevaCat.get('nom_cat').value,
      desc_cat : this.nuevaCat.get('descrip_cat').value,
      est_cat : '1'
    }
  }

  agregar(){
    if ( this.nuevaCat.invalid ) {      
      return Object.values( this.nuevaCat.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );          
        } else {
          control.markAsTouched();          
        }          
      });          
    }else{
      this.llenarCategoria();
      this.categoriaService.validarCategoriaNom(this.categoria.nom_cat)
      .subscribe((data:boolean)=>{
        if(data === true){
          Swal.fire(
            'Error',
            'Categoria ya existe',
            'error'
          )
        }else{
          this.categoriaService.agregar(this.categoria).subscribe((data:Categoria)=>{
            this.router.navigateByUrl('/menu/(opt:categoria)');
          });
        }
      })
    }

  }

}
