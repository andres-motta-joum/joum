import { Component, EventEmitter, Input, Output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';

@Component({
  selector: 'app-editar-direccion',
  templateUrl: './editar-direccion.component.html',
  styleUrls: ['./editar-direccion.component.scss'],
  providers: [provideIcons({ionClose})]
})
export class EditarDireccionComponent {
  @Input() direccion!: string;
  @Output() cerrar = new EventEmitter<void>();

  Cerrar(){
    this.cerrar.emit();
  }
}
