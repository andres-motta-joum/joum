import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter, ElementRef, Renderer2, AfterViewInit, OnDestroy, HostListener, ViewChild} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fotos-producto',
  templateUrl: './fotos-producto.component.html',
  styleUrls: ['./fotos-producto.component.scss']
})
export class fotosProductoComponent implements OnChanges, AfterViewInit, OnDestroy{
  constructor(private route: ActivatedRoute, private render: Renderer2, private elemenetRef: ElementRef) {}
  @Input() producto!: Producto;
  @Input() fotos!: any[];
  @Input() sombraPadre!: boolean;
  @Input() indexPadre!: number;
  @Output() sombraHijo = new EventEmitter<boolean>();
  @Output() fotoIndex = new EventEmitter<number>();
  @ViewChild('scrollElement') scrollElementRef!: ElementRef;
  private routeSubscription!: Subscription;

  selectedImage!: string;
  linea: boolean = true;
  index = 0;

  contadorIndex = 0;

  anchoPagina: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.anchoPagina = event.target.innerWidth;
  }

  ngAfterViewInit(){
    const elemento = this.elemenetRef.nativeElement.querySelector(`.div:nth-child(${this.index + 1}) img`);
    this.render.setStyle(elemento, 'border', '1.5px solid #999');
    this.selectedImage = this.fotos[0];
    this.routeSubscription = this.route.url.subscribe(() => {
      this.selectedImage = this.fotos[0];
      this.index = 0;
    });
    this.index = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fotos'] && changes['fotos'].currentValue.length !== 0) {
      this.selectedImage = changes['fotos'].currentValue[0];
    }
    if (changes['indexPadre']) {
      this.index = this.indexPadre;
      setTimeout(() => {
        this.cambiarImagen();
      });
    }
  }

  cambiarImagen(){
    this.selectedImage = this.fotos[this.index];
    for(let index in this.fotos){
      const elemento = this.elemenetRef.nativeElement.querySelector(`.div:nth-child(${parseInt(index) + 1}) img`);
      this.render.setStyle(elemento, 'border', '1px solid #bbb');
      this.render.setStyle(elemento, 'opacity', '0.86');
    }
    const elemento = this.elemenetRef.nativeElement.querySelector(`.div:nth-child(${this.index + 1}) img`);
    this.render.setStyle(elemento, 'border', '1.5px solid #b8b8b8');
    this.render.setStyle(elemento, 'opacity', '1');
    if(this.anchoPagina <= 670){
      this.scrolearImagen();
    }
  }

  emitirSombra(){
    this.sombraHijo.emit(!this.sombraPadre);
  }
  emitirIndex(index?: number){
    if(index){ //movil
      this.index = index;
    }
    this.fotoIndex.emit(this.index);
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 14;
 
    if (atBottom) {
      this.linea = false
    }else{
      this.linea = true
    }
  }

  onScrollBajo(event: Event): void {
    const element = event.target as HTMLElement;
    const atBottom = element.scrollLeft + element.clientWidth >= element.scrollWidth - 14 && element.clientWidth < 70 * this.fotos.length;
 
    if (atBottom) {
      this.linea = false
    }else{
      this.linea = true
    }
  }

  touchedScroll(event: TouchEvent) {
    const element = event.currentTarget as HTMLElement;
    element.style.overflowX = 'hidden';
    setTimeout(() => {element.style.overflowX = 'auto'}, 50);

    let containerWidth = element.offsetWidth;
    let scrollLeft = element.scrollLeft;
  
    let leftPorFoto = scrollLeft - (containerWidth * this.contadorIndex);
    if (leftPorFoto > 0) {
      this.contadorIndex += 1;
    } else if (leftPorFoto < 0) {
      this.contadorIndex -= 1;
    }
  
    const scrollTo = containerWidth * this.contadorIndex;
    const distanceToScroll = scrollTo - scrollLeft;
    const animationDuration = 200; 
    let startTime: number | null = null;
    function step(timestamp: number) {
        if (!startTime) {
            startTime = timestamp;
        }
        const elapsedTime = timestamp - startTime;
        if (elapsedTime < animationDuration) {
            const progress = elapsedTime / animationDuration;
            const newScrollLeft = scrollLeft + distanceToScroll * progress;
            element.scrollLeft = newScrollLeft;
            window.requestAnimationFrame(step);
        } else {
            element.scrollLeft = scrollTo;
        }
    }
    window.requestAnimationFrame(step);
}

  scrolearImagen(){
    const element = this.scrollElementRef.nativeElement as HTMLElement;
    let containerWidth = element.offsetWidth;
    let scrollLeft = element.scrollLeft;
    const scrollTo = containerWidth * this.index;
    const distanceToScroll = scrollTo - scrollLeft;
    console.log(distanceToScroll)
    const animationDuration = 330; 
    let startTime: number | null = null;
    function step(timestamp: number) {
        if (!startTime) {
            startTime = timestamp;
        }
        const elapsedTime = timestamp - startTime;
        if (elapsedTime < animationDuration) {
            const progress = elapsedTime / animationDuration;
            const newScrollLeft = scrollLeft + distanceToScroll * progress;
            element.scrollLeft = newScrollLeft;
            window.requestAnimationFrame(step);
        } else {
            element.scrollLeft = scrollTo;
        }
    }
    window.requestAnimationFrame(step);
  }
  

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

}
