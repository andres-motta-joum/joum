import { provideIcons } from '@ng-icons/core';
import { matCameraAlt } from '@ng-icons/material-icons/baseline';
import { matPersonAddAlt } from '@ng-icons/material-icons/baseline';
import { matPerson } from '@ng-icons/material-icons/baseline';
import { heroBuildingStorefrontSolid } from '@ng-icons/heroicons/solid';
import { heroDocumentTextSolid } from '@ng-icons/heroicons/solid';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';
import { heroShareSolid } from '@ng-icons/heroicons/solid';

import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  providers: [provideIcons({matCameraAlt, matPersonAddAlt, matPerson, heroBuildingStorefrontSolid, heroDocumentTextSolid, heroPlaySolid, heroShareSolid})]
})
export class PerfilUsuarioComponent implements OnInit, OnDestroy{
  constructor(private route: ActivatedRoute, private zone: NgZone, private router: Router, private userService: UsuarioService) {}
  public state!: string;
  public url!: string;
  public usuarioLink!: string;
  private routeSubscription!: Subscription;

  public usuario!: Usuario | undefined;
  public diasJoum!: string;

  ngOnInit() {
    this.obtenerUsuarios();
    const urlSegments = this.router.url.split('/');
    this.url = urlSegments[urlSegments.length - 1];

    this.routeSubscription = this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        await this.obtenerUsuarios();
        const urlSegments = this.router.url.split('/');
        this.url = urlSegments[urlSegments.length - 1];
        }
    });
  }
  
  async obtenerUsuarios() {
    this.usuarioLink = this.route.parent?.snapshot.paramMap.get('id')!;
    this.usuario = await this.userService.getUserUsuario(this.usuarioLink);
    
    this.diasJoum = this.obtenerTiempoTranscurrido(this.usuario?.diasComoVendedor!);
  }
  
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  obtenerTiempoTranscurrido(dias: number) {
    if (dias < 0) {
      return 'Error: Los días no pueden ser negativos';
    }
  
    if (dias === 1) {
      return '1 día';
    } else if (dias < 30) {
      return `${dias} días`;
    } else if (dias >= 30 && dias < 365) {
      const meses = Math.floor(dias / 30);
      const diasRestantes = dias % 30;
      if (diasRestantes === 0) {
        return `${meses} mes${meses > 1 ? 'es' : ''}`;
      } else {
        return `${meses} mes${meses > 1 ? 'es' : ''} y ${diasRestantes} día${diasRestantes > 1 ? 's' : ''}`;
      }
    } else {
      const anios = Math.floor(dias / 365);
      const diasRestantes = dias % 365;
      const meses = Math.floor(diasRestantes / 30);
      const diasExtras = diasRestantes % 30;
      return `${anios} año${anios > 1 ? 's' : ''} y ${meses} mes${meses > 1 ? 'es' : ''}`;
    }
  }

  cambiarEstado(newState: string): any {
    this.state = newState;
  }

  navegar(enlace: any[], event: Event): void {
    event.preventDefault();
    this.zone.run(() => {
      this.router.navigate(enlace);
      window.scroll(0,0)
    });
  }

  navegarInicio(){
    this.zone.run(() => {
      this.router.navigate(['']);
      window.scroll(0,0)
    });
  }

}
