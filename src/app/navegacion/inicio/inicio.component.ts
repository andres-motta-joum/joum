import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { Producto } from 'src/app/interfaces/producto/producto';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{
  constructor( private zone: NgZone, private router: Router, private productoService: ProductoService, private authService: AuthService) {window.scroll(0,0)}

  ngOnInit(){
    this.productos = this.productoService.getProducts();
  }
 //-----------------

  slider = [
    'assets/img/anuncios/slider-uno.svg',
    'assets/img/anuncios/slider-uno.svg',
    'assets/img/anuncios/slider-uno.svg'
  ];

  public productos!: Producto[];

  public categorias: Producto[] = 
  [
    {
      nombre: 'Cuadros',
      detalles:{
        fotos: [['assets/img/categoria/cuadros/21.jpg']]
      }
    },
    {
      nombre: 'Repisas',
      detalles:{
        fotos: [['assets/img/categoria/repisas/15.jpg']]
      }
    },
    {
      nombre: 'Iluminación',
      detalles:{
        fotos: [['assets/img/categoria/iluminacion/6.jpg']]
      }
    },
    {
      nombre: 'Macetas',
      detalles:{
        fotos: [['assets/img/categoria/macetas/1.jpg']]
      }
    },
    {
      nombre: 'Relojes',
      detalles:{
        fotos: [['assets/img/categoria/relojes/14.jpg']]
      }
    },
    {
      nombre: 'Difusores',
      detalles:{
        fotos: [['assets/img/categoria/difusores/1.jpg']]
      }
    },
    {
      nombre: 'Vinilos',
      detalles:{
        fotos: [['assets/img/categoria/vinilos/9.jpg']]
      }
    },
    {
      nombre: 'Adornos',
      detalles:{
        fotos: [['assets/img/categoria/adornos/19.jpg']]
      }
    }
  ];
  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
