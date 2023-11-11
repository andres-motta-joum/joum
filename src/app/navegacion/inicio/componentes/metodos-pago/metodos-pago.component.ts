import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-metodos-pago',
  templateUrl: './metodos-pago.component.html',
  styleUrls: ['./metodos-pago.component.scss']
})
export class MetodosPagoComponent {
  constructor(){}
  @Input() visible!: boolean;
  @Output() cerrar = new EventEmitter<void>();

  @HostListener('document:click')
  cerrarContenido(){
    this.cerrar.emit();
  }
}
