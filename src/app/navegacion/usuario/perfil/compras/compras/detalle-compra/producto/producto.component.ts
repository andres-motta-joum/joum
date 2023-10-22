import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';
import { porComprar } from 'src/app/interfaces/usuario/usuario';
import { Venta } from 'src/app/interfaces/venta';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  constructor(private zone: NgZone, private router: Router){}
  @Input() compra!: Venta;
  @Input() referencia!: porComprar;

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
