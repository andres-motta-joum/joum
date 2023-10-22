import { Component, NgZone} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  constructor(private zone: NgZone, private router: Router, private authService: AuthService, private auth: Auth){}
  private subscription!: Subscription;
  usuario!: Usuario;
  url!: string;

  ngOnInit() {
    this.obtenerSeccion();
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.authService.getUsuarioId(user.uid).pipe(first()).subscribe((usuario)=>{
          this.usuario = usuario;
        })
      } else {
        this.router.navigate(['cuenta/iniciar-sesion']);
      }
    });

    this.subscription = this.router.events.subscribe( event => { // Se escucha rutas especificas declaradas en el mismo componente
      if (event instanceof NavigationEnd) {
        this.obtenerSeccion();
      }
    });
  }

//----------------------------------------------------------
  obtenerSeccion(){
    const urlSegments = this.router.url.split('/');
    this.url = urlSegments[urlSegments.length - 1];
  }

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  
  
}
