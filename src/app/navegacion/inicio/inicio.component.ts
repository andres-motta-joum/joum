import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, OnDestroy{
  constructor( private auth: Auth, private router: Router, private prdService: ProductosService, private authService: AuthService){}
  productos!: Producto[];
  enUsuario!: boolean;
  usuarioNuevo = false;
  
  ngOnInit(){
    if(this.authService.usuarioNuevo){
      this.usuarioNuevo = true;
    }
    this.auth.onAuthStateChanged((user)=>{
      user ? this.enUsuario = true : this.enUsuario = false;
    })
    this.prdService.obtenerProductos().then((productos)=>{
      this.productos = productos;
    })
  }
 //-----------------

  slider = [
    'assets/img/anuncios/joum.png',
    'assets/img/anuncios/linio.png',
    'assets/img/anuncios/mercado.png'
  ];

  navegar(): void{
    if(this.enUsuario){
      this.router.navigate(['vender']);
    }else{
      this.router.navigate(['cuenta/crear-cuenta']);
    }
    window.scroll(0,0)
  }

  ngOnDestroy(): void {
    if(this.authService.usuarioNuevo){
      this.authService.usuarioNuevo = false;
    }
  }
}
