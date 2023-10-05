import { Component } from '@angular/core';

@Component({
  selector: 'app-e-mails',
  templateUrl: './e-mails.component.html',
  styleUrls: ['./e-mails.component.scss']
})
export class EMailsComponent {

  ofertas: boolean = true;
  mensajes: boolean = true;
  opiniones: boolean = true;
  ventas: boolean = true;
  publicacionesPorFinalizar: boolean = true;
  publicacionesFinalizadas: boolean = true;
  compras: boolean = true;

  emailsRecibidos!: any;

  async configuracionNotificaciones(dato: string): Promise<void> {
    if(dato === 'ofertas'){
      this.ofertas = !this.ofertas; // Pronombres y agregar ajustes
      this.emailsRecibidos.ofertasDecuentos = !this.emailsRecibidos.ofertas;
    }
    if(dato === 'mensajes'){
      this.mensajes = !this.mensajes;
      this.emailsRecibidos.ventas = !this.emailsRecibidos.mensajes;
    }
    if(dato === 'opiniones'){
      this.opiniones = !this.opiniones;
      this.emailsRecibidos.publicaciones = !this.emailsRecibidos.opiniones;
    }
    if(dato === 'ventas'){
      this.ventas = !this.ventas;
      this.emailsRecibidos.reclamos = !this.emailsRecibidos.ventas;
    }
    if(dato === 'publicacionesPorFinalizar'){
      this.publicacionesPorFinalizar = !this.publicacionesPorFinalizar;
      this.emailsRecibidos.mensajes = !this.emailsRecibidos.publicacionesPorFinalizar;
    }
    if(dato === 'publicacionesFinalizadas'){
      this.publicacionesFinalizadas = !this.publicacionesFinalizadas;
      this.emailsRecibidos.mensajes = !this.emailsRecibidos.publicacionesFinalizadas;
    }
    if(dato === 'compras'){
      this.compras = !this.compras;
      this.emailsRecibidos.mensajes = !this.emailsRecibidos.compras;
    }
  }
}
