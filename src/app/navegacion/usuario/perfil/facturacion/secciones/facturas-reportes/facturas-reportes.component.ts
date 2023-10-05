import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-facturas-reportes',
  templateUrl: './facturas-reportes.component.html',
  styleUrls: ['./facturas-reportes.component.scss']
})
export class FacturasReportesComponent {
  public facturacionesReportes: Array<any>= [ //Producto
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
