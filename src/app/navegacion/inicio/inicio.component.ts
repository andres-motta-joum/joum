import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent{

  slider = [
    '../../../../assets/img/anuncios/slider-uno.svg',
    '../../../../assets/img/anuncios/slider-dos.svg',
    '../../../../assets/img/anuncios/slider-uno.svg'
  ];
  
  carouselCategorias = [
    { img: '../../../../assets/img/categoria/cuadros/21.jpg', name: 'Cuadros' },
    { img: '../../../../assets/img/categoria/estantes/15.jpg', name: 'Estantes' },
    { img: '../../../../assets/img/categoria/lamparas/6.jpg', name: 'Lámparas' },
    { img: '../../../../assets/img/categoria/macetas/1.jpg', name: 'Macetas' },
    { img: '../../../../assets/img/categoria/relojespared/14.jpg', name: 'Relojes' },
    { img: '../../../../assets/img/categoria/difusores/1.jpg', name: 'Difusores' },
    { img: '../../../../assets/img/categoria/vinilos/9.jpg', name: 'Vinilos' },
    { img: '../../../../assets/img/categoria/coleccionables/19.jpg', name: 'Coleccionables' }
  ];

  public carouselOfertas: any[] = [
    {
      img: '../../../../assets/img/categoria/cuadros/19.jpg',
      name: 'Conjunto de cuadros pequeños decorativos',
      precioAnterior: 164000,
      precioFinal: (164000 - (164000 * 0.17)),
      descuento: '0.17'
    },
    {
      img: '../../../../assets/img/categoria/cuadros/6.jpg',
      name: 'Cuadros decorativos para sala modernos y elegantes',
      precioAnterior: 115000,
      precioFinal: (115000 - (115000 * 0.2)),
      descuento: '0.2'
    },
    {
      img: '../../../../assets/img/categoria/macetas/15.jpg',
      name: 'Conjunto de macetas pequeñas para el hogar',
      precioAnterior: 38000,
      precioFinal: (38000 - (38000 * 0.35)),
      descuento: '0.35'
    },
    {
      img: '../../../../assets/img/categoria/relojespared/2.jpg',
      name: 'Reloj de pared estilo con mariposas',
      precioAnterior: 40000,
      precioFinal: (40000 - (40000 * 0.19)),
      descuento: '0.19'
    },
    {
      img: '../../../../assets/img/categoria/vinilos/3.jpg',
      name: 'Vinilo con frase motivacional',
      precioAnterior: 45000,
      precioFinal: (45000 - (45000 * 0.1)),
      descuento: '0.1'
    },
    {
      img: '../../../../assets/img/categoria/coleccionables/17.jpg',
      name: 'Figuras coleccionables',
      precioAnterior: 29000,
      precioFinal: (29000 - (29000 * 0.16)),
      descuento: '0.16'
    },
        {
      img: '../../../../assets/img/categoria/cuadros/19.jpg',
      name: 'Conjunto de cuadros pequeños decorativos',
      precioAnterior: 164000,
      precioFinal: (164000 - (164000 * 0.17)),
      descuento: '0.17'
    },
    {
      img: '../../../../assets/img/categoria/cuadros/6.jpg',
      name: 'Cuadros decorativos para sala modernos y elegantes',
      precioAnterior: 115000,
      precioFinal: (115000 - (115000 * 0.2)),
      descuento: '0.2'
    },
    {
      img: '../../../../assets/img/categoria/macetas/15.jpg',
      name: 'Conjunto de macetas pequeñas para el hogar',
      precioAnterior: 38000,
      precioFinal: (38000 - (38000 * 0.35)),
      descuento: '0.35'
    },
    {
      img: '../../../../assets/img/categoria/relojespared/2.jpg',
      name: 'Reloj de pared estilo con mariposas',
      precioAnterior: 40000,
      precioFinal: (40000 - (40000 * 0.19)),
      descuento: '0.19'
    },
    {
      img: '../../../../assets/img/categoria/vinilos/3.jpg',
      name: 'Vinilo con frase motivacional',
      precioAnterior: 45000,
      precioFinal: (45000 - (45000 * 0.1)),
      descuento: '0.1'
    }
  ];

  constructor( private zone: NgZone, private router: Router) {
    window.scroll(0,0)
  }
  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
