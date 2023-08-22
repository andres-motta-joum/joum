import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter, ElementRef, Renderer2, AfterViewInit} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-fotos-producto',
  templateUrl: './fotos-producto.component.html',
  styleUrls: ['./fotos-producto.component.scss']
})
export class fotosProductoComponent implements OnChanges, OnInit, AfterViewInit{
  constructor(private route: ActivatedRoute, private render: Renderer2, private elemenetRef: ElementRef) {}
  @Input() producto!: Producto;
  @Input() sombraPadre!: boolean;
  @Input() indexPadre!: number;
  @Output() sombraHijo = new EventEmitter<boolean>();
  @Output() fotoIndex = new EventEmitter<number>();

  public selectedImage!: string;
  public linea: boolean = true;
  public index = 0;

  ngAfterViewInit(){
    const elemento = this.elemenetRef.nativeElement.querySelector(`.div:nth-child(${this.index + 1}) img`);
    this.render.setStyle(elemento, 'border', '1.5px solid #999');
  }
  ngOnInit(){
    this.selectedImage = this.producto.detalles!.fotos![0][0];
    this.route.url.subscribe(() => {
      this.selectedImage = this.producto.detalles!.fotos![0][0];
      this.index = 0;
    });
    this.index = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['producto']) {
      this.selectedImage = this.producto.detalles!.fotos![0][0];
      this.index = 0;
      setTimeout(() => {
        this.cambiarImagen();
      });
    }
    if (changes['indexPadre']) {
      this.index = this.indexPadre;
      setTimeout(() => {
        this.cambiarImagen();
      });
    }
  }

  cambiarImagen(){
    this.selectedImage = this.producto.detalles!.fotos![0][this.index];
    for(let index in this.producto.detalles!.fotos![0]){
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
  
}
