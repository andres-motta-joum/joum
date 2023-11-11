import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';
import { ProductosService } from 'src/app/servicios/productos/productos.service';

@Component({
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{
  constructor( private zone: NgZone, private router: Router, private prdService: ProductosService) {window.scroll(0,0)}
  public productos!: Producto[];
  
  ngOnInit(){
    this.prdService.obtenerProductos().then((productos)=>{
      this.productos = productos;
    })
  }
 //-----------------

  slider = [
    'assets/img/anuncios/joum.png',
    'assets/img/anuncios/linio.png',
    'assets/img/anuncios/mercado.png'
  ];


  public categorias: any[] = 
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
