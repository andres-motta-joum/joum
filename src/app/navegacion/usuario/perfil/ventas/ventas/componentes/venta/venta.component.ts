import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { getDoc } from '@angular/fire/firestore';
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
  constructor(private zone: NgZone, private router: Router, private prdsService: ProductosService){}
  productos: Producto[] = [];
  estilos: string[] = [];
  unidades: number[] = [];
  fotos!: string[];
  
  ngOnInit(){
    this.obtenerProductos();
  }

  async obtenerProductos(){
    const productosRef = await Promise.all(this.venta.referencias.map(ref => {
      this.estilos.push(ref.estilo);
      this.unidades.push(ref.unidades);
      return getDoc(ref.producto);
    }));
    productosRef.forEach(snapshot => {
      const prd = snapshot.data() as Producto;
      prd.id = snapshot.id
      this.productos.push(prd);
    });
    this.fotos = await this.prdsService.obtenerFotosSegunEstilo(this.productos, this.estilos);
  }
  

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
