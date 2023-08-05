import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-producto-guardado',
  templateUrl: './producto-guardado.component.html',
  styleUrls: ['./producto-guardado.component.scss']
})
export class ProductoGuardadoComponent {
  @Input() productoGuardado!: Producto;
}
