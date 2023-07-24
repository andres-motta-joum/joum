import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroChevronRightMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-editar-datos',
  templateUrl: './editar-datos.component.html',
  styleUrls: ['./editar-datos.component.scss'],
  providers: [provideIcons({heroChevronRightMini})]
})
export class EditarDatosComponent {
  nuevoDato: Boolean = false;
  dato: string = "";

  seleccion(dato: string){
    this.nuevoDato = true;
    this.dato = dato;
  }

}
