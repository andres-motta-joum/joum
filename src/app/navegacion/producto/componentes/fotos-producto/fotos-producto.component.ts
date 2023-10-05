import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter, ElementRef, Renderer2, AfterViewInit, OnDestroy} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fotos-producto',
  templateUrl: './fotos-producto.component.html',
  styleUrls: ['./fotos-producto.component.scss']
})
export class fotosProductoComponent implements OnChanges, AfterViewInit, OnDestroy{
  constructor(private route: ActivatedRoute, private render: Renderer2, private elemenetRef: ElementRef) {}
  @Input() fotos!: string[][];
  @Input() sombraPadre!: boolean;
  @Input() indexPadre!: number;
  @Input() estiloSelec!: number;
  @Output() sombraHijo = new EventEmitter<boolean>();
  @Output() fotoIndex = new EventEmitter<number>();
  private routeSubscription!: Subscription;

  selectedImage!: string;
  linea: boolean = true;
  index = 0;

  ngAfterViewInit(){
    const elemento = this.elemenetRef.nativeElement.querySelector(`.div:nth-child(${this.index + 1}) img`);
    this.render.setStyle(elemento, 'border', '1.5px solid #999');
    this.selectedImage = this.fotos[this.estiloSelec][0];
    this.routeSubscription = this.route.url.subscribe(() => {
      this.selectedImage = this.fotos[this.estiloSelec][0];
      this.index = 0;
    });
    this.index = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['estiloSelec']) {
      this.selectedImage = this.fotos[this.estiloSelec][this.index];
    }
    if (changes['fotos'] && changes['fotos'].currentValue.length !== 0) {
      this.selectedImage = changes['fotos'].currentValue[this.estiloSelec][0];

    }
    if (changes['indexPadre']) {
      this.index = this.indexPadre;
      setTimeout(() => {
        this.cambiarImagen();
      });
    }
  }

  cambiarImagen(){
    this.selectedImage = this.fotos[this.estiloSelec][this.index];
    for(let index in this.fotos![this.estiloSelec]){
      const elemento = this.elemenetRef.nativeElement.querySelector(`.div:nth-child(${parseInt(index) + 1}) img`);
      this.render.setStyle(elemento, 'border', '1px solid #bbb');
    }
    const elemento = this.elemenetRef.nativeElement.querySelector(`.div:nth-child(${this.index + 1}) img`);
    this.render.setStyle(elemento, 'border', '1.5px solid #999');
  }

  emitirSombra(){
    this.sombraHijo.emit(!this.sombraPadre);
  }
  emitirIndex(){
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

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

}
