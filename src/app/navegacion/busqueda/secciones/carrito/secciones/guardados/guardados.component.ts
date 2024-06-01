import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario, referenciaCompra } from 'src/app/interfaces/usuario/usuario';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.component.html',
  styleUrls: ['./guardados.component.scss']
})
export class GuardadosComponent implements OnInit{
  constructor(private zone: NgZone, private router: Router, private firestore: Firestore, private authService: AuthService, private prdsService: ProductosService, private auth: Auth, private comprarService: ComprarService){}
  private subscription!: Subscription;
  private usuario!: Usuario;
  guardados!: referenciaCompra[];
  productos: Producto[] = [];
  unidades: number[] = [];
  tamanios: (number | string)[] = [];

  public cantidadProductos = 0;

  verificacion = false;
  productosLenght!: number;

  sinGuardados!: boolean;

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.authService.getUsuarioId(user.uid).pipe(first()).subscribe((usuario)=>{
          if(usuario.guardados && usuario.guardados.length !== 0){
            this.usuario = usuario;
            this.guardados = usuario.guardados;
            this.obtenerProductos();
            this.sinGuardados = false;
          }else{
            this.sinGuardados = true;
          }
        })
      } else {
        this.router.navigate(['cuenta/crear-cuenta']);
      }
    });
  }

  async obtenerProductos() {
    if (this.usuario?.guardados) {
      const productosRef = await Promise.all(this.usuario?.guardados.map((ref:referenciaCompra) => getDoc(ref.producto)));
      this.tamanios = this.usuario.guardados!.map((guardado)=>{
        if( typeof guardado.tamanioIndex === 'number'){
          return guardado.tamanioIndex
        }else{
          return 'false';
        }
      })
      await Promise.all(productosRef.map(async (productSnapshot, index) => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        this.productos.push(prd);
      }));
    }
    this.unidades = this.usuario.guardados!.map((guardados)=>{
      return guardados.unidades;
    })
    this.productos = await this.comprarService.obtenerProductos(this.guardados);
  }

  eliminar(index: number){
    this.guardados.splice(index, 1);
    this.productos.splice(index, 1);
    this.unidades.splice(index, 1);
    this.tamanios.splice(index, 1);
    if(this.guardados.length !== 0){
      this.sinGuardados = false;
    }else{
      this.sinGuardados = true;
    }
  }

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

}
