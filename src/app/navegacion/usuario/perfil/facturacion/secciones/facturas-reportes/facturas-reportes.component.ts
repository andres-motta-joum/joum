import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-facturas-reportes',
  templateUrl: './facturas-reportes.component.html',
  styleUrls: ['./facturas-reportes.component.scss']
})
export class FacturasReportesComponent {
  public facturacionesReportes: Array<Producto>= [
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
