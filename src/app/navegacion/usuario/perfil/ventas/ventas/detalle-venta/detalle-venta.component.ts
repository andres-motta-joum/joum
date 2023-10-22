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
      this.usuarioCliente = await this.authService.getUsuarioIdPromise(this.venta.idCliente);
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
    this.obtenerprecios();
  }

  obtenerprecios(){
    const fuente = this.precio * 0.015;
    const ICA = this.precio * 0.00414;
    this.impuestos = (fuente + ICA);

    for(let referencia of this.venta.referencias){
      this.precio += (referencia.precioProducto * referencia.unidades);
      this.cantidadUnidades += referencia.unidades;
      if(!referencia.envioGratis){
        this.precioEnvio += referencia.precioEnvio!;
      }
      if(referencia.tipoPublicacion == 'premium'){
        this.cargoPorVenta += (referencia.precioProducto! * referencia.unidades) * 0.11;
      }else if(referencia.tipoPublicacion == 'basica'){
        this.cargoPorVenta += (referencia.precioProducto! * referencia.unidades) * 0.07;
      }
    }
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
