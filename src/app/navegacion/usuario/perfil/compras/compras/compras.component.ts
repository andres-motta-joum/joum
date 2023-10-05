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
  private usuario!: Usuario | null;
  miUsuario!: string;
  productos!: Producto[];
  fechas!: Date[];
  compras!: Venta[]
  unidades!: number[]

  porPreparar = 0;
  enCamino = 0;
  finalizadas = 0;

  ngOnInit() {
    this.routeSubscription = this.route.parent?.params.subscribe(async (params) => {
      const userId = params['id'];
      this.usuario = await this.authService.getUsuarioUser(userId);
      this.miUsuario = this.usuario?.usuario!;
      if(this.usuario){
        this.obtenerDatos();
      }else{
        this.router.navigate(['']);
      }
    });
  }

  async obtenerDatos() {
    this.compras = [];
    this.productos = [];
    this.unidades = [];
    this.fechas = [];
    await this.obtenerCompras();
    for (const compra of this.compras) {
      const timestamp = compra.fechaVenta!;
      let date = new Date(timestamp.seconds * 1000);
      this.fechas.push(date);
      if (!compra.entregado) {
        this.porPreparar += !compra.enCamino ? 1 : 0;
        this.enCamino += compra.enCamino ? 1 : 0;
      } else {
        this.finalizadas += 1;
      }
    }
  }

  async obtenerCompras() {
    if (this.usuario?.compras) {
      const compraRef = await Promise.all(this.usuario?.compras!.map((ref:any) => getDoc(ref)));
      compraRef.forEach(productSnapshot => {
        const prd = productSnapshot.data() as Venta;
        this.compras.push(prd);
      });
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
