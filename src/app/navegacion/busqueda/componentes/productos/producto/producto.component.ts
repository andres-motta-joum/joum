import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';
import { provideIcons } from '@ng-icons/core';

import { matStarRound } from '@ng-icons/material-icons/round';

import { heroHeart } from '@ng-icons/heroicons/outline'; 
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { Auth } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ProductosService } from 'src/app/servicios/productos/productos.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [provideIcons({heroHeart,matStarRound, heroHeartSolid})]
})
export class ProductoComponent {
  @Input() producto!: Producto;
  @Input() usuario!: Usuario | undefined;
  @Input() index!: number;
  @Output() eliminarIndex =  new EventEmitter<number>();
  corazonClick: boolean = false;
  corazonOver: boolean = false;
  enFavoritos: boolean = false;
  
  constructor(private zone: NgZone, private router: Router, private auth: Auth, private firestore: Firestore, private prdService: ProductosService){}

  ngOnInit(){
    this.definirFavorito(this.usuario, this.producto.id!);
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  async agregarFavorito(){
    this.corazonClick = !this.corazonClick;
    if(this.enFavoritos){
      if(this.auth.currentUser){ //Eliminar
        this.enFavoritos = false;
        const usuarioRef = doc(this.firestore, `usuarios/${this.auth.currentUser.uid}`);
        const productoRef = doc(this.firestore, `productos/${this.producto.id}`);
        const snapshot = await getDoc(usuarioRef);
        const usuario = snapshot.data();
        const index = usuario!['favoritos'].findIndex((referencia: DocumentReference<DocumentData>) => referencia.id == productoRef.id);
        usuario!['favoritos'].splice(index, 1);

        this.prdService.eliminarFavorito(this.auth.currentUser.uid, usuario!['favoritos'], productoRef);
      }else{
        this.router.navigate(['cuenta/crear-cuenta']);
      }
    }else{
      if(this.auth.currentUser){ //Agregar
        this.enFavoritos = true;
        this.prdService.agregarFavorito(this.producto.id!, this.auth.currentUser.uid);
      }else{
        this.router.navigate(['cuenta/crear-cuenta']);
      }
    }
  }
  mostrarCorazon(){
    this.corazonOver = !this.corazonOver;
  }

  eliminarProductoHistorial(){
    this.eliminarIndex.emit(this.index);
  }

  definirFavorito(usuario: Usuario | undefined, productoId: string){
    if(usuario){
      if(usuario.favoritos){
        const favorito = usuario.favoritos.find(ref => ref.id === productoId);
        if(favorito){
          this.enFavoritos = true;
          this.corazonClick = true;
        }else{
          this.enFavoritos = false;
        }
      }
    }else{
      this.enFavoritos = false;
    }
  }
}
