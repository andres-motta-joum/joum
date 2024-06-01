import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Mensaje } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit{
  @Input() mensaje!: Mensaje;
  @Input() tipoUsuario!: string;
  contenido!: string;
  fecha!: string;

  ngOnInit(): void {
    this.contenido = this.mensaje.contenido.replace(/\n/g, '<br>');
    this.fecha = this.formatDate(this.mensaje.fecha);
  }

  formatDate(timestamp: any) {
    const date = timestamp.toDate();
    
    const now = new Date();
  
    if (date.toDateString() === now.toDateString()) {
      // Si la fecha es hoy, mostrar solo la hora sin los segundos ni el indicador AM/PM
      return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
    } else if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() > now.getDate() - 7) {
      // Si la fecha es de esta semana, mostrar el día de la semana y la hora sin los segundos ni el indicador AM/PM
      return date.toLocaleString('es-ES', { weekday: 'short' }) + ', ' + date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
    } else {
      // Si la fecha no es de esta semana, mostrar la fecha completa sin la hora
      return date.toLocaleDateString();
    }
  }
}
