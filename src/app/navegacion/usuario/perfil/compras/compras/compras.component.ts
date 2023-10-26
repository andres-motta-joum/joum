import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassMini } from '@ng-icons/heroicons/mini';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { Venta } from 'src/app/interfaces/venta';
import { Subscription } from 'rxjs';
import { getDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
  providers: [provideIcons({heroMagnifyingGlassMini, heroAdjustmentsHorizontal})]
})
export class ComprasComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private authService: AuthService) {}
  private routeSubscription!: Subscription | undefined;
  private usuario!: Usuario;
  miUsuario!: string;
  fechas!: Date[];
  compras!: Venta[];
  datosCargados = false;

  ngOnInit() {
    this.routeSubscription = this.route.parent?.params.subscribe(async (params) => {
      const userId = params['id'];
      await this.authService.getUsuarioUser(userId).then((usuario)=>{
        if(usuario){
          this.usuario = usuario;
          this.miUsuario = this.usuario.usuario!;
          this.obtenerDatos();
        }else{
          this.router.navigate(['']);
        }
      })
    });
  }

  async obtenerDatos() {
    if (this.usuario.compras && this.usuario.compras.length !== 0) {
      this.fechas = [];
      const comprasSnapshot = await Promise.all(this.usuario.compras.map( ref => getDoc(ref)));
      this.compras = comprasSnapshot.map((productSnapshot)=>{
        return productSnapshot.data() as Venta;
      })
      for (const compra of this.compras) {
        const timestamp = compra.fechaVenta!;
        let date = new Date(timestamp.seconds * 1000);
        this.fechas.push(date);
      }
    }
    this.datosCargados = true;
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
