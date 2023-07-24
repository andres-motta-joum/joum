import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroStar } from '@ng-icons/heroicons/outline';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss'],
  providers: [provideIcons({heroStar})]
})
  export class OpinionesComponent {
    public opiniones: Array<Producto>= [
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
