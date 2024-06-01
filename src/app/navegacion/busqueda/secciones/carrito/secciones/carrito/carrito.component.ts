import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first, firstValueFrom } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario, referenciaCompra } from 'src/app/interfaces/usuario/usuario';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoSeccionComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone, private router: Router, private firestore: Firestore, private authService: AuthService, private prdsService: ProductosService, private auth:Auth, private comprarService: ComprarService){}
  private subscription!: Subscription;
  private usuario!: Usuario;
  carrito!: referenciaCompra[];
  productos: Producto[] = [];
  unidades: number[] = [];
  tamanios: (number | string)[] = [];

  cantidadProductos = 0;

  verificacion = false;
  productosLenght!: number;
  precioProductos!: number;
  precioEnvios!: number;

  sinCarrito!: boolean;

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.authService.getUsuarioId(user.uid).pipe(first()).subscribe((usuario)=>{
          if(usuario.carrito && usuario.carrito.length !== 0){
            this.usuario = usuario;
            this.carrito = usuario.carrito;
            this.obtenerProductos();
            this.sinCarrito = false;
          }else{
            this.sinCarrito = true;
          }
        })
      } else {
        this.router.navigate(['cuenta/crear-cuenta']);
      }
    });
  }

  async obtenerProductos() {
    if (this.usuario?.carrito) {
      const productosRef = await Promise.all(this.usuario?.carrito.map((ref:referenciaCompra) => getDoc(ref.producto)));
      this.tamanios = this.usuario.carrito!.map((carrito)=>{
        if(typeof carrito.tamanioIndex === 'number'){
          return carrito.tamanioIndex
        }else{
          return 'false';
        }
      });
      await Promise.all(productosRef.map(async (productSnapshot, index) => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        this.productos.push(prd);
      }));
      this.unidades = this.usuario.carrito!.map((carrito)=>{
        return carrito.unidades;
      });

      this.subscription = this.comprarService.$obtenerCarrito.subscribe(async (carrito)=>{
        let productosLenght = 0;
        for(let referencia of carrito){
          productosLenght += referencia.unidades;
        }
        this.productosLenght = productosLenght;
        this.obtenerPrecios(carrito)
      });
    }
  }

  eliminar(index: number){
    this.carrito.splice(index, 1);
    this.productos.splice(index, 1);
    this.unidades.splice(index, 1);
    this.tamanios.splice(index, 1);
    if(this.carrito.length !== 0){
      this.sinCarrito = false;
    }else{
      this.sinCarrito = true;
    }
  }

  obtenerPrecios(carrito: referenciaCompra[]){
    let precioProductos = 0;
    let precioEnvios = 0;
    if(this.productosLenght == 1){
      let precio!: number;
      if(typeof this.tamanios[0] == 'number'){
        precio = this.productos[0].tamanios![this.tamanios[0] as number].precio!;
      }else{
        precio = this.productos[0].precio!;
      }
      precioProductos = precio;
      if(!this.productos[0].envioGratis){
        precioEnvios = this.productos[0].precioEnvio!;
      }
    }else{
      for (const [index, producto] of this.productos.entries()) {
        let precio!: number;
        if(producto.tamanios){
          precio = producto.tamanios[this.tamanios[index] as number].precio! * carrito[index].unidades;
        }else{
          precio = producto.precio! * carrito[index].unidades;
        }
        precioProductos += precio;
        if(!producto.envioGratis){
          precioEnvios += producto.precioEnvio!;
        }else{
          precioEnvios += 0;
        }
      }
    }
    this.precioProductos = precioProductos;
    this.precioEnvios = precioEnvios;
  }

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  async comprar(){
    const usuario$ = this.authService.getUsuarioId(this.auth.currentUser?.uid!); // Se vuelve a obtener el usuario, para obtener el carrito actualizado
    const usuario = await firstValueFrom(usuario$);
    if(usuario.carrito && usuario.carrito.length !== 0){
      this.comprarService.agregarReferenciaCarritoCompra(usuario.carrito!, usuario.id!)
      if(usuario.direcciones){
        this.router.navigate(['comprar/checkout/resumen']);
      }else{
        this.comprarService.agregarDir = true;
        this.router.navigate(['comprar/checkout/detalles-envio']);
      }
    }
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
