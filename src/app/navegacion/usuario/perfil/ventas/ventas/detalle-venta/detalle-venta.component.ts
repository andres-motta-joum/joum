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
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { Direccion } from 'src/app/interfaces/usuario/subInterfaces/direccion';

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
  fechaEnCamino!: Date;
  fechaEntrega!: Date;
  venta!: Venta;

  precio: number = 0;
  precioEnvio: number = 0;
  envio: number = 0;

  porPreparar = 0;
  enCamino = 0;
  finalizadas = 0;

  direccion!: Direccion;
  direccionString!: string;

  entregaAprox!: string;
  fechaCompra!: string;

  async ngOnInit() {
    const url = this.router.url.split('/');
    const userId = url[1];
    this.usuario = await this.authService.getUsuarioUser(userId);
    if(this.usuario){
      await this.obtenerVenta();
      this.usuarioCliente = await this.authService.getUsuarioIdPromise(this.venta.idCliente);
      this.obtenerDireccion();
      this.fechaEntregas();
    }else{
      this.router.navigate(['']);
    }
  }

  fechaEntregas(){
    let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    this.entregaAprox = `El producto llegará entre el ${this.fecha.getDate() + 1} y ${this.fecha.getDate() + 2} de ${meses[this.fecha.getMonth()]}`;
    this.fechaCompra = `${this.fecha.getDate()} de ${meses[this.fecha.getMonth()]}`;
  }

  async obtenerVenta() {
    const url = this.router.url.split('/');
    const ventaRef = doc(this.firestore, `ventas/${url[url.length - 1]}`);
    const snapshot = await getDoc(ventaRef);
    this.venta = snapshot.data() as Venta;

    const timestamp = this.venta.fechaVenta!;
    const timestampDos = this.venta.fechaEnCamino!;
    const timestampTres = this.venta.fechaEntrega!;
    this.fecha = new Date(timestamp.seconds * 1000);
    if(this.venta.enCamino){
      this.fechaEnCamino = new Date(timestampDos.seconds * 1000);
    }
    if(this.venta.entregado){
      this.fechaEntrega = new Date(timestampTres.seconds * 1000);
    }
    this.obtenerprecios();
  }

  obtenerprecios(){
    for(let referencia of this.venta.referencias){
      if(referencia.gramosTamanio !== 'false'){
        switch (referencia.gramosTamanio){
          case '102 g': this.precio += (201000 * referencia.unidades); break;
          case '51 g':this.precio += (118000 * referencia.unidades); break;
        }
      }else{
        this.precio += (referencia.precioProducto * referencia.unidades);
      }
      if(!referencia.envioGratis){
        this.precioEnvio += referencia.precioEnvio!;
      }
      if(!referencia.envioGratis){
        this.envio = 10000
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

  async botonEnCamino(){
    if(!this.venta.enCamino){
      this.venta.enCamino = true;
      this.venta.fechaEnCamino = new Date();
      const ventaRef = doc(this.firestore, `ventas/${this.venta.numVenta}`);
      await setDoc(ventaRef, this.venta, {merge: true});
      const clienteRef = doc(this.firestore, `usuarios/${this.usuarioCliente.id}`);
      const notificacion = {
        foto: 'https://firebasestorage.googleapis.com/v0/b/enerfull-c3272.appspot.com/o/ilustraciones%2FenCamino.png?alt=media&token=03f6a533-ec00-4cd8-a233-f4f15b4bbeab',
        titulo: 'En camino',
        contenido: `¡Tu compra está en camino! Prepárate para recibir tu pedido pronto.`,
        fecha: new Date(),
        tipo: 'entrega',
        link: `${this.usuarioCliente.usuario}/compras/detalle-compra/${this.venta.numVenta}`,
        visto: false,
      };
      this.usuarioCliente.notificaciones!.push(notificacion);
      await updateDoc(clienteRef, {notificaciones: this.usuarioCliente.notificaciones});
    }
  }

  async botonEntregado(){
    if(!this.venta.entregado){
      this.venta.entregado = true;
      this.venta.fechaEntrega = new Date();
      const ventaRef = doc(this.firestore, `ventas/${this.venta.numVenta}`);
      await setDoc(ventaRef, this.venta, {merge: true});
      const clienteRef = doc(this.firestore, `usuarios/${this.usuarioCliente.id}`);
      const notificacion = {
        foto: 'https://firebasestorage.googleapis.com/v0/b/enerfull-c3272.appspot.com/o/ilustraciones%2Fentregado.png?alt=media&token=92869c39-cb1b-4cce-8774-4b4bf3fac819',
        titulo: 'Entregado',
        contenido: `Entregamos tu paquete a las ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} en ${this.direccionString}`,
        fecha: new Date(),
        tipo: 'entrega',
        link: `${this.usuarioCliente.usuario}/compras/detalle-compra/${this.venta.numVenta}`,
        visto: false,
      };
      this.usuarioCliente.notificaciones!.push(notificacion);
      await updateDoc(clienteRef, {notificaciones: this.usuarioCliente.notificaciones});
    }
  }

  obtenerDireccion(){
    const direcciones = this.usuarioCliente.direcciones;
    for(let direccion of direcciones!){
      if(direccion.direccionPredeterminada){
        direccion = direccion //Obtener dirección que tenga por defecto
      }
    }
    if(!this.direccion){
      this.direccion = direcciones![direcciones!.length - 1]; //Obtener la ultima dirección que tenga el usuario
    }
    this.obtenerDireccionString();
  }
  obtenerDireccionString(){
    const arrayModificado: string[] = this.direccion.direccion!.map((element, index) => {
      if (index === 2) {
        return `#${element}`;
      } else if (index === 3) {
        if(element !== ''){
          return `- ${element}`;
        }else{
          return ''
        }
      } else {
        return element
      }
    });

    this.direccionString = arrayModificado.join(' ');
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }
}
