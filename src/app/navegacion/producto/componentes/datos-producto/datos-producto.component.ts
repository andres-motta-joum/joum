import { Component, EventEmitter, Input, NgZone, OnChanges,OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../../../interfaces/producto/producto';
import { Usuario } from '../../../../interfaces/usuario/usuario';

import { provideIcons } from '@ng-icons/core';
import { matStarRound } from '@ng-icons/material-icons/round';
import { heroTruck } from '@ng-icons/heroicons/outline';
import { matGppGoodOutline } from '@ng-icons/material-icons/outline';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { first } from 'rxjs';
import { DocumentData, DocumentReference, Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss'],
  providers: [provideIcons({matStarRound, heroTruck, matGppGoodOutline})]
})
export class DatosProductoComponent implements OnChanges{
  constructor(private zone: NgZone, private router: Router, private comprarService: ComprarService, private auth: Auth, private authService: AuthService, private firestore: Firestore){}
  @Input() producto!: Producto;
  @Output() estilo = new EventEmitter<number>();
  @Output() unidadeS = new EventEmitter<number>();
  @Input() productoCargado!: boolean;
  promedioCalificacion!: number;
  promedio!: number;
  unidades: number = 1;
  unaUnidad = true;
  selectEstilo: number = 0;

  vendidos!: string;

  productoPropio!: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['producto'] && changes['producto'].currentValue) {
      this.promedioCalificacion = this.calcularPromedioCalificaciones(this.producto.opiniones);
      this.vendidos = this.calcularVentas(this.producto.ventas);
      this.unidades= 1;
      this.selectEstilo= 0;
      this.productoPropio = false;
      if(this.auth.currentUser){
        if(this.producto.idUsuario == this.auth.currentUser.uid){
          this.productoPropio = true;
        }
      }
    }
    const select: HTMLSelectElement | null = document.querySelector('#unidades');
    select!.value = '1';
    this.unaUnidad = true;
  }

  calcularVentas(ventas: number): string {
    if (ventas <= 9 || ventas % 10 === 0 || ventas % 50 === 0 || ventas % 100 === 0) {
      if(ventas == 0){
        return "nuevo producto"
      }else if(ventas == 1){
        return `${ventas} vendido`;
      }else{
        return `${ventas} vendidos`;
      }
    } else if (ventas < 100) {
      return `+ ${Math.floor(ventas / 10) * 10} vendidos`;
    } else if (ventas < 1000) {
      return `+ ${Math.floor(ventas / 50) * 50} vendidos`;
    } else {
      return `+ ${Math.floor(ventas / 100) * 100} vendidos`;
    }
  }

//Estrellas ---------------------------------------

  calcularPromedioCalificaciones(opiniones: Producto['opiniones']): number {
    const sumaCalificaciones = opiniones!.reduce((total, calificacion) => total + calificacion.calificacion!, 0);
    const promedio = sumaCalificaciones / opiniones!.length;
    this.promedio = Number(promedio.toFixed(1));
    return this.redondearCalificacion(promedio);
  }

  redondearCalificacion(calificacion: number): number {
    const valoresPosibles = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    let valorCercano = valoresPosibles[0];
    let diferenciaMinima = Math.abs(calificacion - valorCercano);

    for (const valor of valoresPosibles) {
        const diferencia = Math.abs(calificacion - valor);
        if (diferencia < diferenciaMinima) {
            valorCercano = valor;
            diferenciaMinima = diferencia;
        }
    }

    return Math.round(valorCercano * 20);
  }

//------------------------------------------------------

  async seleccionarEstilo(){
    this.selectEstilo = Number(this.selectEstilo);
    this.estilo.emit(this.selectEstilo);
    if(this.auth.currentUser){ // si el usuario está deslogueado, no sé hace la validación para modificar carrito
      const usuarioRef = doc(this.firestore, `usuarios/${this.auth.currentUser.uid}`);
      const snapshot = await getDoc(usuarioRef);
      const usuario = snapshot.data();
      const index = usuario!['carrito'].findIndex((referencia: DocumentReference<DocumentData>) => referencia.id == this.producto.id);
      if(index !== -1){
        usuario!['carrito'][index];
      }
    }
  }

  cambiarUnidades(event: any) {
    this.unidades = event.target.value;
    this.unaUnidad = event.target.value == 1;
    this.unidadeS.emit(this.unidades);
  }

  async comprar(){
    if(this.productoCargado){
      if(this.producto){ //verificar que el producto ah cargado para no enviar datos undefined
        if(this.auth.currentUser){
          if(this.productoPropio){
            //Este es tu producto
          }else{
            this.comprarService.agregarReferenciaCompra(this.producto.id!, this.auth.currentUser.uid, this.producto.estilos![this.selectEstilo].nombre, this.selectEstilo + 1, Number(this.unidades));
            this.authService.getUsuarioId(this.auth.currentUser.uid).pipe(first()).subscribe((usuario)=>{
              if(usuario.direcciones && usuario.direcciones.length !== 0){
                this.router.navigate(['comprar/checkout/resumen']);
              }else{
                this.comprarService.agregarDir = true;
                this.router.navigate(['comprar/checkout/detalles-envio']);
              }
            })
          }
        }else{
          this.router.navigate(['cuenta/iniciar-sesion']);
        }
      }
    }
  }

  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  opiniones(){
    window.scroll(0,3000)
  }
}
