import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../../../interfaces/producto';
import { Usuario } from '../../../../interfaces/usuario';

import { provideIcons } from '@ng-icons/core';
import { matStarRound } from '@ng-icons/material-icons/round';
import { heroTruck } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss'],
  providers: [provideIcons({matStarRound, heroTruck})]
})
export class DatosProductoComponent {
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
      precio:0,
      descuento:0
    };
  }
  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  opiniones(){
    window.scroll(0,3000)
  }
}
