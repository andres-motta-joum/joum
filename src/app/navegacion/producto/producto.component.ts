import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';
import { Producto } from '../../interfaces/producto';
import { provideIcons } from '@ng-icons/core';
import { heroHeart } from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { matAddShoppingCart } from '@ng-icons/material-icons/baseline';
import { matShoppingCart } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [provideIcons({heroHeart, heroHeartSolid,matAddShoppingCart,matShoppingCart})]
})
export class ProductoComponent {
  
  public corazonClick: boolean = false;
  public carritoClick: boolean = false;
  carouselSimilaress: Array<any> = [];

  public imgsOfertas: string[] = [
    '../../../../assets/img/categoria/cuadros/4.jpg',
    '../../../../assets/img/categoria/cuadros/10.jpg',
    '../../../../assets/img/categoria/cuadros/6.jpg',
    '../../../../assets/img/categoria/cuadros/7.jpg',
    '../../../../assets/img/categoria/cuadros/8.jpg',
    '../../../../assets/img/categoria/cuadros/9.jpg',
    '../../../../assets/img/categoria/cuadros/5.jpg',
    '../../../../assets/img/categoria/cuadros/11.jpg',
    '../../../../assets/img/categoria/cuadros/12.jpg',
    '../../../../assets/img/categoria/cuadros/13.jpg',
    '../../../../assets/img/categoria/cuadros/3.jpg'
  ];

  public usuario: Usuario;
  public producto: Producto;

  constructor(private route: ActivatedRoute,private cd: ChangeDetectorRef) {
    for (const imagen of this.imgsOfertas) {
      this.carouselSimilaress.push({
        img: imagen,
        name: 'Cuadro Decorativo Noche Estrellada 100 X 70 Cm',
        precioAnterior: 38000,
        precioFinal: (38000 - (38000 * 0.35)),
        descuento: '0.35'
      });
    }

    this.usuario = {
      fotoPerfil: '../../../../../assets/img/usuarios/user.svg',
      nombreCliente: "Andres Yesid",
      apellidoCliente: "Motta"
    };
    this.producto = {
      foto: "../../../../../assets/img/usuarios/logo.png",
      nombre:"Forro Estuche Smart Case Compatible Para iPad Colores",
      precio:250000,
      descuento: 50000
    };
  }

  agregarFavorito(){
    this.corazonClick = !this.corazonClick;
  }
  agregarCarrito(){
    this.carritoClick = !this.carritoClick;
  }


}
