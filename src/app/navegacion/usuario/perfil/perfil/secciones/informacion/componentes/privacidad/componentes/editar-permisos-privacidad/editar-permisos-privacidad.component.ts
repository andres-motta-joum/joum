import { Component, EventEmitter, Input, Output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';

@Component({
  selector: 'app-editar-permisos-privacidad',
  templateUrl: './editar-permisos-privacidad.component.html',
  styleUrls: ['./editar-permisos-privacidad.component.scss'],
  providers: [provideIcons({ionClose})]
})
export class EditarPermisosPrivacidadComponent {
  @Input() direccion!: string;
  @Output() cerrar = new EventEmitter<void>();

  Cerrar(){
    this.cerrar.emit();
  }
}
