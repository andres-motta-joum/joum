import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss']
})
export class OpinionComponent {
  @Input() opinion: Producto;
    subMenu: boolean = false;
    constructor(private zone: NgZone, private router: Router){
      this.opinion = {
        precio: 0,
        descuento: 0
    }
  }
  desplegar(){
    this.subMenu = !this.subMenu;
  }
  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta)
    })
  }
}
