import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroStar } from '@ng-icons/heroicons/outline';
import { Subscription } from 'rxjs';
import { Opinion, Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { Firestore, Timestamp, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss'],
  providers: [provideIcons({heroStar})]
})
  export class OpinionesComponent implements OnInit, OnDestroy{
    constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private authService: AuthService, private prdsService: ProductosService, private firestore: Firestore) {}
    private routeSubscription!: Subscription;
    private usuario!: Usuario;
    opiniones: Opinion[] = [];
    fechaVentas: Timestamp[] = [];
    productos: Producto[] = [];
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
      this.obtenerOpiniones();
    }
  
    async obtenerOpiniones() {
      if (this.usuario?.opiniones) {
        //Obtener opiniones -------
        const opinionesRef = await Promise.all(this.usuario?.opiniones.map((ref:any) => getDoc(ref!))); 
        opinionesRef.forEach(snapshot => {
          const opinion = snapshot.data() as Opinion;
          opinion.id = snapshot.id;
          this.opiniones.push(opinion);
        });

        //Obtener ventas de las opiniones -------
        const ventasRef = await Promise.all(this.opiniones.map((opinion: Opinion) => {
          const ref = doc(this.firestore, `ventas/${opinion.numVenta}`);
          return getDoc(ref!);
        })); 
        ventasRef.forEach(snapshot => {
          const venta = snapshot.data() as Venta;
          this.fechaVentas.push(venta.fechaVenta);
        });

        //Obtener productos de las opiniones -------
        const productosRef = await Promise.all(this.opiniones.map((opinion:Opinion) => getDoc(opinion.producto!)));
        productosRef.forEach(snapshot => {
          const prd = snapshot.data() as Producto;
          prd.id = snapshot.id;
          this.productos.push(prd);
        });

        //obtener fotos de los productos
        this.fotos = await this.prdsService.obtenerFotos(this.productos);
      }
    }

    navegar(ruta: any[], event: Event){
      event.preventDefault();
      this.zone.run(()=>{
        this.router.navigate(ruta)
      })
    }

    ngOnDestroy(): void {
      if(this.routeSubscription){
        this.routeSubscription.unsubscribe();
      }
    }
}
