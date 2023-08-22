import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/usuario/subInterfaces/venta';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {
  @Input() venta!: Venta;
  @Input() producto!: Producto;
  @Input() usuario!: Usuario | undefined;
  @Input() unidad?: number;
  constructor(private zone: NgZone, private router: Router){}
  
  ngOnInit(){
  }
  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
