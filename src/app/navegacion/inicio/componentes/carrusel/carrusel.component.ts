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

  public slickWidth!: number;

  public leftPosition!: number;

  public fotos: string[] = [];

  constructor(private renderer: Renderer2,private zone: NgZone,private router: Router, private storage: Storage, private prdService: ProductosService) { }

  @ViewChild('lista', { static: false }) carrucel!: ElementRef;

  scrollDerecha: number = 0;

  ngAfterViewInit() {
    this.carrucel.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(event: any) {
    const scrollLeft = event.target!.scrollLeft;
    this.scrollDerecha = scrollLeft;
  }

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

  Move(value: number): void {
    const contenedor = this.carrucel.nativeElement;

    // Obtener la posición actual del scroll horizontal
    const scrollLeft = contenedor.scrollLeft;

    if (value === 1) {
        // Mover hacia la izquierda
        contenedor.scrollTo({ left: scrollLeft - this.slickWidth, behavior: 'smooth' });
    } else if (value === 2) {
        // Mover hacia la derecha
        contenedor.scrollTo({ left: scrollLeft + this.slickWidth, behavior: 'smooth' });
    }
  }
}
