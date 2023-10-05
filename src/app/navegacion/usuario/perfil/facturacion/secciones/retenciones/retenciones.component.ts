import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';


@Component({
  selector: 'app-retenciones',
  templateUrl: './retenciones.component.html',
  styleUrls: ['./retenciones.component.scss']
})
export class RetencionesComponent {
  public retenciones: Array<any>= [ //Producto
    {
      precio: 0,
      descuento: false,
      detalles: {fotos: [['assets/img/categoria/adornos/9.jpg']]}
    },
    {
      precio: 0,
      descuento: false,
      detalles: {fotos: [['assets/img/categoria/adornos/9.jpg']]}
    }
  ]
}
