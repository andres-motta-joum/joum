import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { Subscription } from 'rxjs';
import { MetricasService } from 'src/app/servicios/perfil/metricas/metricas.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss'],
  providers: [provideIcons({heroAdjustmentsHorizontal})]
})
export class MetricasComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone, private router: Router, private firestore: Firestore, private auth: Auth, private authService: AuthService, private metricasService: MetricasService){}
  private routeSubscription!: Subscription;
  encabezadoUrl: String = "";
  user!: string;

  ngOnInit(): void {
    this.metricasService.cambiarMiVariable('semanal');
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.obtenerUsuario();
        this.url();
      }
    })
    this.routeSubscription = this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        this.obtenerUsuario();
        this.url();
      }
    });
  }

  async obtenerUsuario(){
    if(this.auth.currentUser){
      const usuario = await this.authService.getUsuarioIdPromise(this.auth.currentUser.uid);
      this.user = usuario.usuario;
    }
  }

  url(){
    const rutas = this.router.url.split('/');
    if(rutas[2] == 'metricas'){
      switch (rutas[3]) {
        case 'negocio': this.encabezadoUrl = "negocio"; break;
        case 'atencion-compradores': this.encabezadoUrl = "atencion"; break;
        case 'stock': this.encabezadoUrl = "stock"; break;
        case 'puntos': this.encabezadoUrl = "puntos"; break;
        default: this.encabezadoUrl = "negocio"; break;
      }      
    }
  }
  
  cambiarPeriodoTiempo(event: Event){
    this.metricasService.cambiarMiVariable((event.target as HTMLSelectElement).value)
  }

  navegar(ruta: any[]):void{
    if(this.user){
      this.router.navigate(ruta);
      window.scroll(0,0);
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
  

}
