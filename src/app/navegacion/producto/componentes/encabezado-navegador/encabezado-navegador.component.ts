import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { provideIcons } from '@ng-icons/core';
import { heroChevronRightMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-encabezado-navegador',
  templateUrl: './encabezado-navegador.component.html',
  styleUrls: ['./encabezado-navegador.component.scss'],
  providers: [provideIcons({heroChevronRightMini})]
})
export class EncabezadoNavegadorComponent implements OnInit{
  @Input() producto!: Producto;
  navegacion: string[] = [];
  links: string[] = [];
  ngOnInit(): void {
    this.navegacion.push(this.producto.categoria);
    this.navegacion.push(this.producto.nombre)
  }

}
