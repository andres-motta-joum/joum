import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { provideIcons } from '@ng-icons/core';
import { heroChevronRightMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-encabezado-navegador',
  templateUrl: './encabezado-navegador.component.html',
  styleUrls: ['./encabezado-navegador.component.scss'],
  providers: [provideIcons({heroChevronRightMini})]
})
export class EncabezadoNavegadorComponent implements OnInit, OnChanges{
  @Input() producto!: Producto;
  navegacion: string[] = [];
  links: string[] = [];
  ngOnInit(): void {
    this.navegacion = [this.producto.categoria, this.producto.nombre];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && changes['producto'].currentValue) {
      this.navegacion = [this.producto.categoria, this.producto.nombre];
    }
  }

}
