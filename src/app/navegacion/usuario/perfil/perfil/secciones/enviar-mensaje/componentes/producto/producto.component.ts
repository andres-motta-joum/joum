import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  @Input() producto: Producto;
  constructor(){
    this.producto = {
      precio: 0,
      descuento: 0
    }
  }
}
