import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notificacion } from 'src/app/interfaces/usuario/subInterfaces/notificacion';

@Component({
  selector: 'app-notificacion-menu',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit{
  constructor(private router: Router){}
  @Input() notificacion!: Notificacion;
  @Input() index!: number;
  fecha!: string;
  mostrar = true;
  ngOnInit(): void {
    if(this.index >= 4){
      this.mostrar = false;
    }
    this.fecha = this.formatDate(this.notificacion.fecha);
  }

  direccionar(link: string){
    this.router.navigate([link]);
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
