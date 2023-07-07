import { Component, Input, NgZone} from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../../../../../interfaces/producto'

import { provideIcons } from '@ng-icons/core';

import { matStarRound } from '@ng-icons/material-icons/round';

import { heroHeart } from '@ng-icons/heroicons/outline'; 
import { heroHeartSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [provideIcons({heroHeart,matStarRound, heroHeartSolid})]
})
export class ProductoComponent {
  public corazonClick: boolean = false;
  public corazonOver: boolean = false;
  @Input() listadoCuadradosInp: boolean;
  @Input() listadoLineadoInp: boolean;

  @Input() producto: Producto;
  constructor(private zone: NgZone, private router: Router){
    this.producto = {
      nombre:"andres",
      precio:100,
      descuento:50
    };
    this.listadoCuadradosInp = true;
    this.listadoLineadoInp = false;
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  agregarFavorito(){
    this.corazonClick = !this.corazonClick;
  }
  mostrarCorazon(){
    this.corazonOver = !this.corazonOver;
  }
}
