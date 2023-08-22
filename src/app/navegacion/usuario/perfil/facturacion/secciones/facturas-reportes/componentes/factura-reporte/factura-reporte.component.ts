import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-factura-reporte',
  templateUrl: './factura-reporte.component.html',
  styleUrls: ['./factura-reporte.component.scss']
})
export class FacturaReporteComponent {
  @Input() facturaReporte: Producto;
  subMenu: boolean = false;
  constructor(private zone: NgZone, private router: Router){
    this.facturaReporte = {
      precio: 0,
      descuento: false
    }
  }
  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  desplegar(){
    this.subMenu = !this.subMenu;
  }
}
