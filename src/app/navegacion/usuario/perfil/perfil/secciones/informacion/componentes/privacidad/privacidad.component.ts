import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.component.html',
  styleUrls: ['./privacidad.component.scss']
})
export class PrivacidadComponent {
  @Output() mostrarContenido = new EventEmitter<string>(); 

  editarContenido(editar: string){
    this.mostrarContenido.emit(editar);
  }
}
