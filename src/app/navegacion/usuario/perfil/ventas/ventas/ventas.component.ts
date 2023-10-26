import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassMini } from '@ng-icons/heroicons/mini';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { Subscription} from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [provideIcons({heroMagnifyingGlassMini, heroAdjustmentsHorizontal})]
})
export class VentasComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private authService: AuthService) {}
  private routeSubscription!: Subscription | undefined;
  usuario!: Usuario;
  productos!: Producto[];
  fechas!: string[];
  ventas!: Venta[];
  datosCargados = false;

  porPreparar = 0;
  enCamino = 0;
  finalizadas = 0;

  ngOnInit() {
    this.routeSubscription = this.route.parent?.params.subscribe(async (params) => {
      const userId = params['id'];
      await this.authService.getUsuarioUser(userId).then((usuario)=>{
        if(usuario){
          this.usuario = usuario;
          this.obtenerDatos();
        }else{
          this.router.navigate(['']);
        }
      })
    });
  }

  async obtenerDatos() {
    if (this.usuario.ventas && this.usuario.ventas.length !== 0) {
      this.fechas = [];
      const ventasRef = await Promise.all(this.usuario.ventas.map((ref:any) => getDoc(ref)));
      this.ventas = ventasRef.map((productSnapshot)=>{
        return productSnapshot.data() as Venta;
      })
      for (const venta of this.ventas) {
        const timestamp = venta.fechaVenta!;
        let date = new Date(timestamp.seconds * 1000);
        let options: Intl.DateTimeFormatOptions = { 
            day: '2-digit', 
            month: 'long', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        };
        let formattedDate = date.toLocaleString('es-ES', options);
        this.fechas.push(formattedDate + ' hs');
        if (!venta.entregado) {
          this.porPreparar += !venta.enCamino ? 1 : 0;
          this.enCamino += venta.enCamino ? 1 : 0;
        } else {
          this.finalizadas += 1;
        }
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
