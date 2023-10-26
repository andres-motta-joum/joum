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
    opiniones!: Opinion[];
    fechaVentas: Timestamp[] = [];
    datosCargados = false;
    
    ngOnInit() {
      this.routeSubscription = this.route.parent!.params.subscribe(params => {
        const userId = params['id'];
        this.obtenerusuario(userId);
      });
    }
  
    async obtenerusuario(usuario: string){
      await this.authService.getUsuarioUser(usuario).then((user)=>{
        if(user){
          this.usuario = user;
          this.obtenerOpiniones();
        }
      });
    }
  
    async obtenerOpiniones() {
      if (this.usuario.opiniones && this.usuario.opiniones.length !== 0) {
        const opinionesSnapshot = await Promise.all(this.usuario.opiniones.map((ref:any) => getDoc(ref!))); 
        this.opiniones = opinionesSnapshot.map((snapshot)=>{
          const opinion = snapshot.data() as Opinion;
          opinion.id = snapshot.id;
          return opinion
        })
      }
      this.datosCargados = true;
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
