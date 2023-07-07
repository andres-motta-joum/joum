import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fotos-producto',
  templateUrl: './fotos-producto.component.html',
  styleUrls: ['./fotos-producto.component.scss']
})
export class FotosProductoComponent {
  @Input() foto: string;
  constructor() {
    this.foto = '';
  }
}
