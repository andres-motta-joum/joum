import { Component, EventEmitter, Input, Output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';

@Component({
  selector: 'app-eliminar-cuenta',
  templateUrl: './eliminar-cuenta.component.html',
  styleUrls: ['./eliminar-cuenta.component.scss'],
  providers: [provideIcons({ionClose})]
})
export class EliminarCuentaComponent {
  @Input() direccion!: string;
  @Output() cerrar = new EventEmitter<void>();

  Cerrar(){
    this.cerrar.emit();
  }
}
