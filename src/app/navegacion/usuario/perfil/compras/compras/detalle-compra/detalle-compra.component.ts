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
  cantidadUnidades: number = 0;
  fecha!: Date;
  fechaEnCamino!: Date;
  fechaEntregado!: Date;
  compra!: Venta;

  precio: number = 0;
  precioEnvio: number = 0;
  envio: number = 0;

  entregaAprox!: string;
  fechaCompra!: string;

  async ngOnInit() {
    const url = this.router.url.split('/');
    const userId = url[1];
    this.usuario = await this.authService.getUsuarioUser(userId);
    if(this.usuario){
      await this.obtenerCompra();
      this.usuarioVendedor = await this.authService.getUsuarioIdPromise(this.compra.idVendedor);
      this.fechaEntregas();
    }else{
      this.router.navigate(['']);
    }
  }

  fechaEntregas(){
    let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    this.entregaAprox = `Tu producto llegará entre el ${this.fecha.getDate() + 1} y ${this.fecha.getDate() + 2} de ${meses[this.fecha.getMonth()]}`;
    this.fechaCompra = `${this.fecha.getDate()} de ${meses[this.fecha.getMonth()]}`;
  }

  async obtenerCompra() {
    const url = this.router.url.split('/');
    const compraRef = doc(this.firestore, `ventas/${url[url.length - 1]}`);
    const snapshot = await getDoc(compraRef);
    this.compra = snapshot.data() as Venta;
    const timestamp = this.compra.fechaVenta!;
    const timestampDos = this.compra.fechaEnCamino!;
    const timestampTres = this.compra.fechaEntrega!;
    this.fecha = new Date(timestamp.seconds * 1000);
    if(this.compra.enCamino){
      this.fechaEnCamino = new Date(timestampDos.seconds * 1000);
    }
    if(this.compra.entregado){
      this.fechaEntregado = new Date(timestampTres.seconds * 1000);
    }
    this.obtenerprecios();
  }


  obtenerprecios(){
    for(let referencia of this.compra.referencias){
      if(referencia.gramosTamanio !== 'false'){
        switch (referencia.gramosTamanio){
          case '102 g': this.precio += (201000 * referencia.unidades); break;
          case '51 g':this.precio += (118000 * referencia.unidades); break;
        }
      }else{
        this.precio += (referencia.precioProducto * referencia.unidades);
      }
      this.cantidadUnidades += referencia.unidades;
      if(referencia.envioGratis){
        this.precioEnvio += referencia.precioEnvio!;
      }
      if(!referencia.envioGratis){
        this.envio += 10000
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
