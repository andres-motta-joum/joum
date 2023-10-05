import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftEllipsisSolid } from '@ng-icons/heroicons/solid';
import { matQuestionMark } from '@ng-icons/material-icons/baseline';
import { matMoveToInbox } from '@ng-icons/material-icons/baseline';
import { heroTruckSolid } from '@ng-icons/heroicons/solid';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { aspectsPlatformDropbox } from '@ng-icons/ux-aspects';
import { heroBanknotes } from '@ng-icons/heroicons/outline';
import { heroDocumentText } from '@ng-icons/heroicons/outline';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { Subscription, first } from 'rxjs';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss'],
  providers: [provideIcons({heroChatBubbleLeftEllipsisSolid, matQuestionMark, matMoveToInbox, heroTruckSolid, heroCheckCircleSolid, aspectsPlatformDropbox, heroBanknotes, heroDocumentText})]
})
export class DetalleVentaComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone,private router: Router, private authService: AuthService, private firestore: Firestore, private prdsService: ProductosService) {}
  private routeSubscription!: Subscription | undefined;
  usuario!: Usuario | null;
  usuarioCliente!: Usuario;
  productos: Producto[] = [];
  estilos: string[] = [];
  fotos: string[] = [];
  unidades: number[] = [];
  cantidadUnidades: number = 0;
  fecha!: Date;
  venta!: Venta;

  precio: number = 0;
  precioEnvio: number = 0;
  impuestos: number = 0;
  cargoPorVenta: number = 0;

  porPreparar = 0;
  enCamino = 0;
  finalizadas = 0;

  async ngOnInit() {
    const url = this.router.url.split('/');
    const userId = url[1];
    this.usuario = await this.authService.getUsuarioUser(userId);
    if(this.usuario){
      await this.obtenerVenta();
      this.authService.getUsuarioId(this.venta.idCliente!).pipe(first()).subscribe(usuario =>{
        this.usuarioCliente = usuario;
      })
      await this.obtenerProductos();
    }else{
      this.router.navigate(['']);
    }
  }

  async obtenerVenta() {
    const url = this.router.url.split('/');
    const ventaRef = doc(this.firestore, `ventas/${url[url.length - 1]}`);
    const snapshot = await getDoc(ventaRef);
    this.venta = snapshot.data() as Venta;

    const timestamp = this.venta.fechaVenta!;
    this.fecha = new Date(timestamp.seconds * 1000);
  }

  async obtenerProductos(){
    const productosRef = await Promise.all(this.venta.referencias.map(ref => {
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
      if(producto.tipoPublicacion == 'premium'){
        this.cargoPorVenta += (producto.precio! * this.unidades[index]) * 0.11;
      }else if(producto.tipoPublicacion == 'basica'){
        this.cargoPorVenta += (producto.precio! * this.unidades[index]) * 0.07;
      }
    }
    const fuente = this.precio * 0.015;
    const ICA = this.precio * 0.00414;
    this.impuestos = (fuente + ICA);
  }

  navegar(ruta: any[], event: Event):void{
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
