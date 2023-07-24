import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { Mensaje } from 'src/app/interfaces/mensaje';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.scss']
})
export class EnviarMensajeComponent {

  public mensajes: Array<Mensaje>= [
    {
      productoId: "abcd",
      remitente: "cliente",
      contenido: "Hola. buenas tardes.",
      visto: true,
    },
    {
      productoId: "abcd",
      remitente: "vendedor",
      contenido: "Hola ¿en qué le puedo ayudar?",
      visto: true,
    },
    {
      productoId: "abcd",
      remitente: "cliente",
      contenido: "El producto tiene garantia en daños con el agua?, veo que en la publicación está esta gatantia, me podría confirmalo?",
      visto: true,
    },
    {
      productoId: "abcd",
      remitente: "vendedor",
      contenido: "Si, por supuesto. Tiene garantia de 3 meses.",
      visto: true,
    },
    {
      productoId: "abcd",
      remitente: "cliente",
      contenido: "Ok, gracias.",
      visto: true,
    },
    {
      productoId: "abcd",
      remitente: "vendedor",
      contenido: "Con gusto.",
      visto: true,
    }
  ]
  public productos: Array<Producto>= [
    {
      foto: '../../../../../../../assets/img/categoria/cuadros/19.jpg',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../../assets/img/categoria/coleccionables/3.jpg',
      precio: 0,
      descuento: 0
    }
  ]

  constructor(private zone: NgZone, private router: Router){}

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }

}
