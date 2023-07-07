import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  public productos: any = [
    {
      foto: '../../../../../../../../assets/img/ilustraciones/ilustración1.jpg',
      nombre: 'Ilustración a mano',
      precio: '100000',
      cantidad: '2'
    },
    {
      foto: '../../../../../../../../assets/img/ilustraciones/men.jpg',
      nombre: 'Ilustración a mano',
      precio: '100000',
      cantidad: '2'
    }
  ];
}
