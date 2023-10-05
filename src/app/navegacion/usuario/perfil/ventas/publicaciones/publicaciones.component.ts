import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassMini } from '@ng-icons/heroicons/mini';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  providers: [provideIcons({heroMagnifyingGlassMini, heroAdjustmentsHorizontal})]
})
export class PublicacionesComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private authService: AuthService, private productosService: ProductosService) {}
  private routeSubscription!: Subscription;
  public usuario!: Usuario;
  public publicaciones: Producto[] = [];
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
    if (this.usuario?.publicaciones) {
      const productosRef = await Promise.all(this.usuario?.publicaciones.map((ref:any) => getDoc(ref)));
      productosRef.forEach(productSnapshot => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        this.publicaciones.push(prd);
      });
      this.fotos = await this.productosService.obtenerFotos(this.publicaciones);
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
