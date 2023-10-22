import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription, first, firstValueFrom } from 'rxjs';
import { Estilo, Producto } from 'src/app/interfaces/producto/producto';
import { Usuario, referenciaCompra } from 'src/app/interfaces/usuario/usuario';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-producto-guardado',
  templateUrl: './producto-guardado.component.html',
  styleUrls: ['./producto-guardado.component.scss']
})
export class ProductoGuardadoComponent implements OnInit, OnDestroy{
  @Output() eliminar = new EventEmitter<number>();
  @Input() guardados!: referenciaCompra[];
  @Input() productoGuardado!: Producto;
  @Input() unidad!: number;
  @Input() foto!: string;
  @Input() estilo!: Estilo | undefined;
  @Input() indice!: number;
  @Input() indexEstilo!: number;
  imagenCargada = false;
  private subscription!: Subscription;
  private usuario!: Usuario;
  userUsuario!: string;
  estiloString!: string;
  
  constructor(private zone: NgZone, private router: Router, private firestore: Firestore, private auth:Auth, private authService: AuthService, private comprarService: ComprarService){}

  ngOnInit() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.subscription = this.authService.getUsuarioId(user.uid).subscribe((usuario)=>{
          this.usuario = usuario;
        })
      }
      const usuario$ = this.authService.getUsuarioId(this.productoGuardado.idUsuario!);
      this.userUsuario = (await firstValueFrom(usuario$)).usuario!;
    });
  }

  async cambiarUnidad(accion: string, index: number, unidadesTotales: number){
    const userRef = doc(this.firestore, `usuarios/${this.auth.currentUser?.uid}`);
    if(accion === '+'){
      if(this.unidad < unidadesTotales){
        this.guardados![index].unidades += 1; 
        this.unidad += 1;
        await setDoc(userRef, {guardados: this.guardados}, {merge: true});
      }
    }
    if(accion === '-'){
      if(this.unidad !== 1){
        this.guardados![index].unidades -= 1; 
        this.unidad -= 1;
        await setDoc(userRef, {guardados: this.guardados}, {merge: true})
      }
    }
  }

  agregarCarrito(){
    if(this.foto){
      this.eliminar.emit(this.indice);
      this.comprarService.eliminarReferenciaGuardado(this.usuario, this.indice);
      this.comprarService.agregarReferenciaCarrito(this.productoGuardado.id!, this.auth.currentUser?.uid!, this.estilo!.id , this.unidad);
    }
    
  }

  eliminarGuardado(){
    if(this.foto){
      this.eliminar.emit(this.indice);
      this.comprarService.eliminarReferenciaGuardado(this.usuario, this.indice);
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
