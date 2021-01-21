import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
declare var Swal : any;

@Component({
  selector: 'app-up-categoria',
  templateUrl: './up-categoria.component.html',
  styleUrls: ['./up-categoria.component.scss']
})
export class UpCategoriaComponent implements OnInit {
  categoria : Categoria;
  nuevaCat : FormGroup;
  estado : boolean = false;
  constructor(private fb:FormBuilder,
              private categoriaService:CategoriaService,
              private router : Router,
              private route : ActivatedRoute,
              private empleadoService : EmpleadoService) { }

  ngOnInit(): void {
    this.crearFormulario();    
    this.cargarCategoria();
    if(this.empleadoService.empleadolog.nombre_rol === 'Vendedor'){
      this.router.navigateByUrl('menu/(opt:ventas)');
    }
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

  cargarCategoria(){
    setTimeout(()=>{
      const params = this.route.snapshot.params;
      if(params){
        this.categoriaService.buscar(params.id_cat).subscribe((data:Categoria)=>{
          this.categoria = data;
          this.nuevaCat.reset({            
            nom_cat : data.nom_cat,
            descrip_cat : data.desc_cat,            
          });
          this.estado = true;
        });        
      }
    },500)
  }

  crearFormulario() {
    this.nuevaCat = this.fb.group({      
      nom_cat  : ['',  Validators.required ],
      descrip_cat : ['',Validators.required,],      
    });
  }

  llenarCategoria(){
    this.categoria ={
      id_cat : this.categoria.id_cat,
      nom_cat : this.nuevaCat.get('nom_cat').value,
      desc_cat : this.nuevaCat.get('descrip_cat').value,
      est_cat : this.categoria.est_cat
    }
  }

  actualizar(){
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
      this.categoriaService.validarCategoriaNomEdit(this.categoria.nom_cat,this.categoria.id_cat)
      .subscribe((data:boolean)=>{
        if(data === true){
          Swal.fire(
            'Error',
            'Categoria ya existe',
            'error'
          )
        }else{
          this.categoriaService.actualizar(this.categoria).subscribe((data:Categoria)=>{
            Swal.fire(
              'Modificado',
              'Categoria modificada correctamente',
              'success'
            )
            this.router.navigateByUrl('/menu/(opt:categoria)');
          });
        }
      });
    }

  }

}
