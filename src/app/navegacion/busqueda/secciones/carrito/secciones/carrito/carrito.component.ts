import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoSeccionComponent {
  public productosCarrito: Array<Producto>= [
    {
      foto: '../../../../../../../assets/img/categoria/cuadros/19.jpg',
      nombre: 'Conjunto de cuadros decorativos para habitación.',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../../assets/img/categoria/coleccionables/3.jpg',
      nombre: 'Par de muñecos estronáuticos coleccionabes',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../../assets/img/categoria/coleccionables/8.jpg',
      nombre: 'Figura decarativa para sala',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../../assets/img/categoria/coleccionables/9.jpg',
      nombre: 'Figura coleccionable de pacman, con diferentes modos de luz(Calida). Para estante',
      precio: 0,
      descuento: 0
    }
  ]
}
