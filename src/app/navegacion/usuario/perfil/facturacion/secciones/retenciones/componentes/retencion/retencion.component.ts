import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-retencion',
  templateUrl: './retencion.component.html',
  styleUrls: ['./retencion.component.scss']
})
export class RetencionComponent {
  @Input() retencion: Producto;
  constructor(private zone: NgZone, private router: Router){
    this.retencion = {
      precio: 0,
      descuento: 0
    }
  }
  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta)
    })
  }
}
