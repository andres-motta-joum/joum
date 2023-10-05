import { Component, OnDestroy, OnInit} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit, OnDestroy{
  private routeSubscription!: Subscription;
  private usuario!: Usuario | undefined;
  productos: Producto[] = [];
  fotos!: string[];

  constructor(private route: ActivatedRoute,private prdService: ProductosService, private authService: AuthService, private auth: Auth, private firestore: Firestore) {}

  ngOnInit() {
    this.routeSubscription = this.route.parent!.parent!.params.subscribe(params => {
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
    if (this.usuario?.publicaciones) {
      const productosRef = await Promise.all(this.usuario?.publicaciones.map((ref:any) => getDoc(ref)));
      productosRef.forEach(productSnapshot => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        this.productos.push(prd);
      });
      this.fotos = await this.prdService.obtenerFotos(this.productos);
    }
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

}
