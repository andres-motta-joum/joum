import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first, firstValueFrom } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario, porComprar } from 'src/app/interfaces/usuario/usuario';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoSeccionComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute, private authService: AuthService, private prdsService: ProductosService, private auth:Auth, private comprarService: ComprarService){}
  private subscription!: Subscription;
  private usuario!: Usuario;
  carrito!: porComprar[];
  productos: Producto[] = [];
  unidades: number[] = [];
  fotos: string[] = [];
  estilos: string[] = [];
  indexEstilos: number[] = [];

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
            this.carrito = usuario.carrito
            this.obtenerProductos();
            this.sinCarrito = false;
          }else{
            this.sinCarrito = true;
          }
        })
      } else {
        this.router.navigate(['cuenta/iniciar-sesion']);
      }
    });
  }

  async obtenerProductos() {
    if (this.usuario?.carrito) {
      const productosRef = await Promise.all(this.usuario?.carrito.map((ref:any) => getDoc(ref.producto)));
      productosRef.forEach((productSnapshot, index) => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        this.productos.push(prd);
        this.estilos.push(this.usuario.carrito![index].estilo!);
      });
      this.indexEstilos = this.usuario.carrito!.map((carrito)=>{
        const partes = carrito.estilo.split(':');
        return Number(partes[0]) - 1;
      })
      this.fotos = await this.prdsService.obtenerFotosSegunEstilo(this.productos, this.estilos);
      this.unidades = this.usuario.carrito!.map((carrito)=>{
        return carrito.unidades;
      })

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
    this.fotos.splice(index, 1);
    this.estilos.splice(index, 1);
    this.indexEstilos.splice(index, 1);
    if(this.carrito.length !== 0){
      this.sinCarrito = false;
    }else{
      this.sinCarrito = true;
    }
  }

  obtenerPrecios(carrito: porComprar[]){
    let precioProductos = 0;
    let precioEnvios = 0;
    if(this.productosLenght == 1){
      precioProductos = this.productos[0].precio!;
      if(!this.productos[0].envioGratis){
        precioEnvios = this.productos[0].precioEnvio!;
      }
    }else{
      for (const [index, producto] of this.productos.entries()) {
        precioProductos += producto.precio! * carrito[index].unidades;
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
