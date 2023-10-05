import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private authService: AuthService, private prdsService: ProductosService) {}
  private routeSubscription!: Subscription;
  private usuario!: Usuario;
  favoritos: Producto[] = [];
  fotos: string[] = [];
  
  ngOnInit() {
    this.routeSubscription = this.route.parent!.params.subscribe(params => {
      const userId = params['id'];
      this.obtenerusuario(userId);
    });
  }

  async obtenerusuario(usuario: string){
    await this.authService.getUsuarioUser(usuario).then((usuario)=>{
      if(usuario){
        this.usuario = usuario
      }
    })
    this.obtenerProductos();
  }

  async obtenerProductos() {
    if (this.usuario?.favoritos) {
      const productosRef = await Promise.all(this.usuario?.favoritos.map((ref:any) => getDoc(ref)));
      productosRef.forEach(productSnapshot => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        this.favoritos.push(prd);
      });
      this.fotos = await this.prdsService.obtenerFotos(this.favoritos);
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
