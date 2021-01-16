import { Injectable } from '@angular/core';
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class UtilsService { 
  cargaEstado : boolean = false;  
  cargaEstadoCli : boolean = false;
  pendiente : boolean = false;
  constructor() {     
    if(localStorage.getItem('pendiente')){
      this.pendiente = JSON.parse( localStorage.getItem('pendiente'));
    }else{
      localStorage.setItem('pendiente',JSON.stringify(this.pendiente));
    }
  }  

  cambiar(){
    localStorage.setItem('pendiente',JSON.stringify(!this.pendiente));
  }

  borrar(){
    localStorage.removeItem('pendiente');
  }

  cargarDataTable(tabla:string){     
    let buscador : boolean=true;
    if(tabla == "#tablaVentas" || tabla == "#tablaCompras"){
      $(tabla).DataTable().destroy();  
      buscador = false;
    }
    setTimeout(()=>{            
      $(tabla).DataTable({
        searching : buscador,        
        "language":{
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad"
            }
        }
      });      
    },150); 
  }

  

  setDefaultPositionModal(id : string){
    $(id).data({
      'originalLeft': $(id).css('left'),
      'origionalTop': $(id).css('top')
    }); 
  }

  resetPositionModal(id : string){
    setTimeout(()=>{
      $(id).css({
        'left': $(id).data('originalLeft'),
        'top': $(id).data('origionalTop')
      });
    },500); 
  }
}
