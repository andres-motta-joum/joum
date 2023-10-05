import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { getDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent {
  @Input() compra!: Venta;
  @Input() miUsuario!: string;
  @Input() fecha!: Date;
  usuarioVendedor!: string;
  nombreVendedor!: string;
  constructor(private zone: NgZone, private router: Router, private prdsService: ProductosService, private authService: AuthService){}
  productos: Producto[] = [];
  estilos: string[] = [];
  unidades: number[] = [];
  fotos!: string[];
  
  async ngOnInit(){
    await this.obtenerProductos();
    this.authService.getUsuarioId(this.productos[0].idUsuario!).pipe(first()).subscribe(usuario =>{
      this.usuarioVendedor = usuario.usuario!;
      this.nombreVendedor = usuario.nombre!;
    })
  }

  async obtenerProductos(){
    const productosRef = await Promise.all(this.compra.referencias.map(ref => {
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
