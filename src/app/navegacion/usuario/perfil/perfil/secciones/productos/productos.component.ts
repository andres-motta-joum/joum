import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  public productos: Array<Producto>= [
    {
      foto: '../../../../../../../assets/img/categoria/cuadros/19.jpg',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../../assets/img/categoria/coleccionables/3.jpg',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../../assets/img/categoria/coleccionables/8.jpg',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../../assets/img/categoria/coleccionables/9.jpg',
      precio: 0,
      descuento: 0
    }
  ]
}
