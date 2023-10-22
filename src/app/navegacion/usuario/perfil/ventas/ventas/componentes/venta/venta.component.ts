import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { Usuario, porComprar } from 'src/app/interfaces/usuario/usuario';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ProductosService } from 'src/app/servicios/productos/productos.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {
  @Input() venta!: Venta;
  @Input() usuario!: Usuario | null;
  @Input() fecha!: string;
  referencias!: porComprar[];
  constructor(private zone: NgZone, private router: Router, private prdsService: ProductosService, private firestore: Firestore){}

  ngOnInit(){
    this.obtenerProductos();
  }

  async obtenerProductos(){
    this.referencias = await Promise.all(this.venta.referencias.map(ref => {
      return ref
    }));
  }
  

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
