import { Component, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario, porComprar } from 'src/app/interfaces/usuario/usuario';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Subscription, first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-producto-carrito',
  templateUrl: './producto-carrito.component.html',
  styleUrls: ['./producto-carrito.component.scss']
})
export class ProductoCarritoComponent implements OnInit, OnDestroy{
  @Output() eliminar = new EventEmitter<number>();
  @Input() carrito!: porComprar[];
  @Input() productoCarrito!: Producto; 
  @Input() unidad!: number;
  @Input() foto!: string;
  @Input() estilo!: string;
  @Input() indice!: number;
  @Input() indexEstilo!: number;
  private subscription!: Subscription;
  private usuario!: Usuario;
  userUsuario!: string;
  estiloString!: string;
  
  constructor(private zone: NgZone, private router: Router, private firestore: Firestore, private auth:Auth, private comprarService: ComprarService, private authService: AuthService){}

  ngOnInit() {
    this.estiloString = this.estilo.slice(2);
    this.auth.onAuthStateChanged(async(user) => {
      if (user) {
        this.subscription = this.authService.getUsuarioId(user.uid).subscribe((usuario)=>{
          this.usuario = usuario;
        })
      }
      const usuario$ = this.authService.getUsuarioId(this.productoCarrito.idUsuario!);
      this.userUsuario = (await firstValueFrom(usuario$)).usuario!;
    });
  }
  
  async cambiarUnidad(accion: string, index: number, unidadesTotales: number){
    const userRef = doc(this.firestore, `usuarios/${this.auth.currentUser?.uid}`);
    if(accion === '+'){
      if(this.unidad < unidadesTotales){
        this.carrito![index].unidades += 1; 
        this.unidad += 1;
        await setDoc(userRef, {carrito: this.carrito}, {merge: true});
      }
    }
    if(accion === '-'){
      if(this.unidad !== 1){
        this.carrito![index].unidades -= 1; 
        this.unidad -= 1;
        await setDoc(userRef, {carrito: this.carrito}, {merge: true})
      }
    }
  }
  agregarGuardado(){
    if(this.foto){
      this.eliminar.emit(this.indice);
      this.comprarService.eliminarReferenciaCarrito(this.usuario, this.indice);
      this.comprarService.agregarReferenciaGuardado(this.productoCarrito.id!, this.auth.currentUser?.uid!, this.estilo, this.unidad);
    }
  }

  eliminarCarrito(){
    if(this.foto){
      this.eliminar.emit(this.indice);
      this.comprarService.eliminarReferenciaCarrito(this.usuario, this.indice);
    }
  }
  
  navegar(ruta: any[]){
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
