import { Component, Input } from '@angular/core';

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
