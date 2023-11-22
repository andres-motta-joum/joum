import { Component, ElementRef, OnInit, Renderer2, ViewChild, Input, NgZone, SimpleChanges } from '@angular/core';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

import { heroChevronLeftSolid } from '@ng-icons/heroicons/solid';
import { heroChevronRightSolid } from '@ng-icons/heroicons/solid';

import { Producto } from 'src/app/interfaces/producto/producto';
import { ProductosService } from 'src/app/servicios/productos/productos.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
  viewProviders: provideIcons({heroChevronLeftSolid, heroChevronRightSolid})
})
export class CarruselComponent {
  @Input() elements!: Producto[];
  @Input() categorias!: Array<any>;
  @Input() carousel = 0;

  @ViewChild('contenedor') contenedor!: ElementRef;
  @ViewChild('lista') lista!: ElementRef;

  public slickWidth!: number;

  public leftPosition!: number;

  public botonPrev: Boolean = false;

  public fotos: string[] = [];

  constructor(private renderer: Renderer2,private zone: NgZone,private router: Router, private storage: Storage, private prdService: ProductosService) { }

  navegar( ruta: any[]): any {
    this.zone.run(() => {
      this.router.navigate(ruta);
      window.scroll(0,0)
    });
  }

  ngOnInit(): void {
    if (this.carousel === 2){
        this.slickWidth = 250;
    }else
    if (this.carousel === 3){
        this.slickWidth = 252;
    }  

  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['elements'] && changes['elements'].currentValue) {
      const productos = changes['elements'].currentValue;
      if(productos[0].nombre !== 'Cuadros'){ //Verificamos que no sean los elementos de las categorías
        this.fotos = await this.prdService.obtenerFotos(productos);
      } 
    }
  }

  Move(value: number): void {
    const contenedorWidth = this.contenedor.nativeElement.offsetWidth;
    const listWidth = this.lista.nativeElement.offsetWidth;

    this.leftPosition = this.contenedor.nativeElement.style.left === '' ? 0 : (parseFloat(this.contenedor.nativeElement.style.left) * -1);

    if (this.leftPosition < (contenedorWidth - listWidth) && value === 2) {
      this.renderer.setStyle(this.contenedor.nativeElement, 'left', `${-1 * (this.leftPosition + this.slickWidth)}px`);
    } else if (this.leftPosition > 0 && value === 1) {
      this.renderer.setStyle(this.contenedor.nativeElement, 'left', `${-1 * (this.leftPosition - this.slickWidth)}px`);
    }

    if(value == 1){
      if(this.leftPosition <= 300){
        this.botonPrev = false;
      }else if(this.leftPosition > 0){
        this.botonPrev = true;
      }
    }else if(value == 2){
      this.botonPrev = true;
    }
  }
}
