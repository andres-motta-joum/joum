import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../../../interfaces/producto';
import { Usuario } from '../../../../interfaces/usuario';

import { provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeft } from '@ng-icons/heroicons/outline';
import { heroTruck } from '@ng-icons/heroicons/outline';
import { matPlagiarism } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-datos-vendedor',
  templateUrl: './datos-vendedor.component.html',
  styleUrls: ['./datos-vendedor.component.scss'],
  providers: [provideIcons({heroChatBubbleLeft, heroTruck, matPlagiarism})]
})
export class DatosVendedorComponent {
  @Input() producto: Producto;
  @Input() usuario: Usuario;

  constructor(private zone: NgZone, private router: Router){
    this.usuario = {
      fotoPerfil: 'Ejemplo',
      nombreCliente: "Ejemplo",
      apellidoCliente: "Ejemplo"
    };
    this.producto = {
      foto: "Ejemplo",
      nombre:"Ejemplo",
      precio:100,
      descuento:50
    };
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
