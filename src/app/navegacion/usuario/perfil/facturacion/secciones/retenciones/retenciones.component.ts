import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';


@Component({
  selector: 'app-retenciones',
  templateUrl: './retenciones.component.html',
  styleUrls: ['./retenciones.component.scss']
})
export class RetencionesComponent {
  public retenciones: Array<Producto>= [
    {
      foto: '../../../../../../assets/img/categoria/cuadros/19.jpg',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../assets/img/categoria/coleccionables/3.jpg',
      precio: 0,
      descuento: 0
    }
  ]
}
