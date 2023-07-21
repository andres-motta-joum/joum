import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassMini } from '@ng-icons/heroicons/mini';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
  providers: [provideIcons({heroMagnifyingGlassMini, heroAdjustmentsHorizontal})]
})
export class ComprasComponent {

  public compras: Array<any>= [
    {
      imagen: '../../../../../../assets/img/categoria/macetas/12.jpg'
    },
    {
      imagen: '../../../../../../assets/img/categoria/lamparas/3.jpg'
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
