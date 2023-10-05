import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MovimientoDinero } from 'src/app/interfaces/movimiento-dinero';
import { transacion } from 'src/app/interfaces/usuario/subInterfaces/dinero';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Component({
  selector: 'app-movimiento-dinero',
  templateUrl: './movimiento-dinero.component.html',
  styleUrls: ['./movimiento-dinero.component.scss']
})
export class MovimientoDineroComponent {
 @Input() movimiento!: transacion ;

 fecha!: string;
 ngOnInit(): void {
   this.fecha = this.formatDate(this.movimiento.fecha);
 }

 formatDate(timestamp: any) {
   // Convertir el timestamp a un objeto Date
   const date = timestamp.toDate();
 
   // Obtener la fecha y hora actual
   const now = new Date();
 
   if (date.toDateString() === now.toDateString()) {
     // Si la fecha es hoy, mostrar solo la hora sin los segundos ni el indicador AM/PM
     return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
   } else if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() > now.getDate() - 7) {
     // Si la fecha es de esta semana, mostrar el día de la semana y la hora sin los segundos ni el indicador AM/PM
     return date.toLocaleString('es-ES', { weekday: 'long' }) + ', ' + date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
   } else {
     // Si la fecha no es de esta semana, mostrar la fecha completa sin la hora
     return date.toLocaleDateString();
   }
 }
}
