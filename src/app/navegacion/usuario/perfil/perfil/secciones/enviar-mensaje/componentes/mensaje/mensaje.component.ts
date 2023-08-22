import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Mensaje } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent {
  @Input() mensaje!: Mensaje;
  @Input() tipoUsuario!: string;
}
