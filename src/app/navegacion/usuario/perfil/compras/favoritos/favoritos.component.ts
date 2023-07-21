import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent {
  public compras: Array<any>= [
    {
      imagen: '../../../../../../assets/img/categoria/macetas/13.jpg'
    },
    {
      imagen: '../../../../../../assets/img/categoria/lamparas/6.jpg'
    }
    ,
    {
      imagen: '../../../../../../assets/img/categoria/vinilos/6.jpg'
    }
    ,
    {
      imagen: '../../../../../../assets/img/categoria/macetas/2.jpg'
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
