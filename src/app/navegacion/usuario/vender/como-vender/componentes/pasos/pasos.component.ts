import { Component } from '@angular/core';

@Component({
  selector: 'app-pasos',
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.scss']
})
export class PasosComponent {

  public pasos = [
    'Deside que vas a vender',
    'Registrate',
    'Publica tus productos',
    'Vende tus productos',
    'Envia los productos',
    'Recibe tu pago'
  ];

}
