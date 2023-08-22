import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.component.html',
  styleUrls: ['./guardados.component.scss']
})
export class GuardadosComponent {
  constructor(private zone: NgZone, private router: Router,private userService: UsuarioService, private prdService: ProductoService){}

  public usuario!: Usuario | undefined;
  public productos!: Producto[];
  public unidades!: number[];


  public cantidadProductos = 0;

  ngOnInit() {
    this.productos = [];
    this.unidades = [];
    this.usuario = this.userService.getUserUsuario('MOTTAANDRES20221130093921');
    for(const carrito of this.usuario?.guardados!){
      this.productos.push(this.prdService.getProductsId(carrito.producto!.id!!)!);
      this.unidades.push(carrito.cantidad!);
    }
    for(const [i, producto] of this.productos.entries()){
      this.cantidadProductos += this.unidades[i];
    }
  }

  cambiarUnidades(valor: any){
    this.unidades[valor.indice] = valor.unidad;
  }

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

}
