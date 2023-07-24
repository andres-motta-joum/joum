import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassMini } from '@ng-icons/heroicons/mini';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [provideIcons({heroMagnifyingGlassMini, heroAdjustmentsHorizontal})]
})
export class VentasComponent {

  public ventas: Array<Producto>= [
    {
      foto: '../../../../../../assets/img/categoria/cuadros/19.jpg',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../assets/img/categoria/coleccionables/3.jpg',
      precio: 0,
      descuento: 0
    }
  ]

  constructor(private zone: NgZone, private router: Router){
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta)
    })
  }

}
