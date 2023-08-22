import { Component, ElementRef, OnInit, Renderer2, ViewChild, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

import { heroChevronLeftSolid } from '@ng-icons/heroicons/solid';
import { heroChevronRightSolid } from '@ng-icons/heroicons/solid';

import { Producto } from 'src/app/interfaces/producto/producto';

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

  @ViewChild('track') track!: ElementRef;
  @ViewChild('slickList') slickList!: ElementRef;

  public slickWidth!: number;

  public leftPosition!: number;

  public botonPrev: Boolean = false;

  constructor( 
    private renderer: Renderer2,
    private zone: NgZone,
    private router: Router
    ) { }

  navegar( ruta: any[]): any {
    this.zone.run(() => {
      this.router.navigate(ruta);
      window.scroll(0,0)
    });
  }

  ngOnInit(): void {
    if (this.carousel === 1){
        this.slickWidth = 200;
    }else
    if (this.carousel === 2){
        this.slickWidth = 250;
    }else
    if (this.carousel === 3){
        this.slickWidth = 252;
    }
  }

  Move(value: number): void {
    const trackWidth = this.track.nativeElement.offsetWidth;
    const listWidth = this.slickList.nativeElement.offsetWidth;

    this.leftPosition = this.track.nativeElement.style.left === '' ? 0 : (parseFloat(this.track.nativeElement.style.left) * -1);

    if (this.leftPosition < (trackWidth - listWidth) && value === 2) {
      this.renderer.setStyle(this.track.nativeElement, 'left', `${-1 * (this.leftPosition + this.slickWidth)}px`);
    } else if (this.leftPosition > 0 && value === 1) {
      this.renderer.setStyle(this.track.nativeElement, 'left', `${-1 * (this.leftPosition - this.slickWidth)}px`);
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
