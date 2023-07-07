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
    '../../../../assets/img/anuncios/slider-uno.svg',
    '../../../../assets/img/anuncios/slider-uno.svg'
  ];
  
  carouselCategorias = [
    { img: '../../../../assets/img/categoria/cuadros/4.jpg', name: 'Cuadros' },
    { img: '../../../../assets/img/categoria/estantes/3.jpg', name: 'Estantes' },
    { img: '../../../../assets/img/categoria/lamparas/6.jpg', name: 'Lámparas' },
    { img: '../../../../assets/img/categoria/macetas/1.jpg', name: 'Macetas' },
    { img: '../../../../assets/img/categoria/relojespared/4.jpg', name: 'Relojes de Pared' },
    { img: '../../../../assets/img/categoria/tapetes/1.jpg', name: 'Tapetes' },
    { img: '../../../../assets/img/categoria/vinilos/3.jpg', name: 'Vinilos' },
    { img: '../../../../assets/img/categoria/macetas/2.jpg', name: 'Adornos' }
  ];

  carouselOfertas: Array<any> = [];

  public imgsOfertas: string[] = [
    '../../../../assets/img/categoria/cuadros/1.jpg',
    '../../../../assets/img/categoria/estantes/1.jpg',
    '../../../../assets/img/categoria/macetas/3.jpg',
    '../../../../assets/img/categoria/relojespared/5.jpg',
    '../../../../assets/img/categoria/tapetes/3.jpg',
    '../../../../assets/img/categoria/vinilos/5.jpg',
    '../../../../assets/img/categoria/tapetes/5.jpg',
    '../../../../assets/img/categoria/relojespared/1.jpg',
    '../../../../assets/img/categoria/vinilos/1.jpg',
    '../../../../assets/img/categoria/macetas/5.jpg',
    '../../../../assets/img/categoria/macetas/2.jpg'
  ];

  constructor( private zone: NgZone, private router: Router) {
    for (const imagen of this.imgsOfertas) {
      this.carouselOfertas.push({
        img: imagen,
        name: 'Repisas Flotantes Modelo P-05 Para...',
        precioNormal: 28000,
        precioRebaja: 5000,
        descuento: '0.36'
      });
    }
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
