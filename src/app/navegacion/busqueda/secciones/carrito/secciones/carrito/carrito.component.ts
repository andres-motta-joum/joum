import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoSeccionComponent {
  constructor(private zone: NgZone, private router: Router,private userService: UsuarioService, private prdService: ProductoService){}

  public usuario!: Usuario | undefined;
  public productos!: Producto[];
  public unidades!: number[];

  public precioProductos = 0;
  public precioEnvio = 0;

  public cantidadProductos = 0;

  ngOnInit() {
    this.productos = [];
    this.unidades = [];
    this.usuario = this.userService.getUserUsuario('MOTTAANDRES20221130093921');
    for(const carrito of this.usuario?.carrito!){
      this.productos.push(this.prdService.getProductsId(carrito.producto!.id!!)!);
      this.unidades.push(carrito.cantidad!);
    }
    for(const [i, producto] of this.productos.entries()){
      if(producto.descuento){
        this.precioProductos += (producto.precio! - (producto.precio! * (producto.porcentajeDescuento! / 100)));
      }else{
        this.precioProductos += (producto.precio! * this.unidades[i]);
      }
      this.cantidadProductos += this.unidades[i];
      if(!producto.envioGratis){
        this.precioEnvio += producto.precioEnvio!
      }
    }
  }

  cambiarUnidades(valor: any){
    this.unidades[valor.indice] = valor.unidad;
    this.modificarPrecios();
  }

  modificarPrecios(){
    this.precioProductos = 0;
    this.cantidadProductos = 0;
    for(const [i, producto] of this.productos.entries()){
      this.precioProductos += (producto.precio! * this.unidades[i]);
      this.cantidadProductos += this.unidades[i];
    }
  }

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

}
