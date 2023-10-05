import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  constructor(private zone: NgZone, private router: Router){}
  @Input() producto!: Producto;
  @Input() compra!: Venta;
  @Input() unidad!: number;
  @Input() foto!: string;
  @Input() estilo!: string;

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
