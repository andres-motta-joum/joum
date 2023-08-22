import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.scss']
})
export class DescripcionComponent {
  @Input() descripcion!: string;
  replaceNewlines(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}
