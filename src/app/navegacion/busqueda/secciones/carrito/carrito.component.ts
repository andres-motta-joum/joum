import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute, private userService: UsuarioService){}

  private routeSubscription!: Subscription;
  public usuario!: Usuario | undefined;


  public url!: string;
  ngOnInit() {
    this.obtenerSeccion();
    this.usuario = this.userService.getUserUsuario('MOTTAANDRES20221130093921');
    this.routeSubscription = this.router.events.subscribe(async event => { // Se escucha rutas especificas declaradas en el mismo componente
      if (event instanceof NavigationEnd) {
        this.obtenerSeccion();
      }
    });
  }

  obtenerSeccion(){
    const urlSegments = this.router.url.split('/');
    this.url = urlSegments[urlSegments.length - 1];
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  
  
}
