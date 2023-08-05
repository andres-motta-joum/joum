import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.component.html',
  styleUrls: ['./guardados.component.scss']
})
export class GuardadosComponent {

  public productosGuardados: Array<Producto>= [
    {
      foto: '../../../../../../../assets/img/categoria/coleccionables/8.jpg',
      nombre: 'Figura decarativa para sala',
      precio: 0,
      descuento: 0
    },
    {
      foto: '../../../../../../../assets/img/categoria/coleccionables/3.jpg',
      nombre: 'Par de muñecos estronáuticos coleccionabes',
      precio: 0,
      descuento: 0
    }
  ]

  constructor(private zone: NgZone, private router: Router){
  }
  
  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
