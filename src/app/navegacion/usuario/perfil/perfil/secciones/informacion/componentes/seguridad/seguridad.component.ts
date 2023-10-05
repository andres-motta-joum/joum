import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.scss']
})
export class SeguridadComponent {

  @Output() mostrarContenido = new EventEmitter<string>(); 

  editarContenido(editar: string){
    this.mostrarContenido.emit(editar);
  }
}
