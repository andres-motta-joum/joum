import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent {
  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute, private userService: UsuarioService){}
  descuentos: boolean = true;
  ventas: boolean = true;
  publicaciones: boolean = true;
  reclamos: boolean = true;
  mensajes: boolean = true;

  private routeSubscription!: Subscription;
  public usuario!: Usuario | undefined;

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.usuario = this.userService.getUserUsuario('MOTTAANDRES20221130093921');
    });
  }

  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  onButtonClick(dato: string): void {
    if(dato === 'descuentos'){
      this.descuentos = !this.descuentos; // Pronombres y agregar ajustes
    }
    if(dato === 'ventas'){
      this.ventas = !this.ventas;
    }
    if(dato === 'publicaciones'){
      this.publicaciones = !this.publicaciones;
    }
    if(dato === 'reclamos'){
      this.reclamos = !this.reclamos;
    }
    if(dato === 'mensajes'){
      this.mensajes = !this.mensajes;
    }
  }

}
