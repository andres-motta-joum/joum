import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftEllipsisSolid } from '@ng-icons/heroicons/solid';
import { matQuestionMark } from '@ng-icons/material-icons/baseline';
import { matMoveToInbox } from '@ng-icons/material-icons/baseline';
import { heroTruckSolid } from '@ng-icons/heroicons/solid';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { aspectsPlatformDropbox } from '@ng-icons/ux-aspects';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { Subscription, first } from 'rxjs';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ProductosService } from 'src/app/servicios/productos/productos.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.scss'],
  providers: [provideIcons({heroChatBubbleLeftEllipsisSolid, matQuestionMark, matMoveToInbox, heroTruckSolid, heroCheckCircleSolid, aspectsPlatformDropbox})]
})
export class DetalleCompraComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone,private router: Router, private authService: AuthService, private firestore: Firestore, private prdsService: ProductosService) {}
  private routeSubscription!: Subscription | undefined;
  usuario!: Usuario | null;
  usuarioVendedor!: Usuario;
  productos: Producto[] = [];
  estilos: string[] = [];
  fotos: string[] = [];
  unidades: number[] = [];
  cantidadUnidades: number = 0;
  fecha!: Date;
  compra!: Venta;

  precio: number = 0;
  precioEnvio: number = 0;

  porPreparar = 0;
  enCamino = 0;
  finalizadas = 0;

  async ngOnInit() {
    const url = this.router.url.split('/');
    const userId = url[1];
    this.usuario = await this.authService.getUsuarioUser(userId);
    if(this.usuario){
      await this.obtenerCompra();
      this.authService.getUsuarioId(this.compra.idVendedor!).pipe(first()).subscribe(usuario =>{
        this.usuarioVendedor = usuario;
      })
      await this.obtenerProductos();
    }else{
      this.router.navigate(['']);
    }
  }

  async obtenerCompra() {
    const url = this.router.url.split('/');
    const compraRef = doc(this.firestore, `ventas/${url[url.length - 1]}`);
    const snapshot = await getDoc(compraRef);
    this.compra = snapshot.data() as Venta;
    const timestamp = this.compra.fechaVenta!;
    this.fecha = new Date(timestamp.seconds * 1000);
  }

  async obtenerProductos(){
    const productosRef = await Promise.all(this.compra.referencias.map(ref => {
      this.estilos.push(ref.estilo);
      this.unidades.push(ref.unidades);
      this.cantidadUnidades += ref.unidades; 
      return getDoc(ref.producto);
    }));
    productosRef.forEach(snapshot => {
      const prd = snapshot.data() as Producto;
      prd.id = snapshot.id
      this.productos.push(prd);
    });
    this.fotos = await this.prdsService.obtenerFotosSegunEstilo(this.productos, this.estilos);
    this.obtenerprecios();
  }

  obtenerprecios(){
    for(const [index, producto] of this.productos.entries()){
      this.precio += (producto.precio! * this.unidades[index]);
      if(producto.envioGratis){
        this.precioEnvio += producto.precioEnvio!;
      }
    }
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }
}
