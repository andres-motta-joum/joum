import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { provideIcons } from '@ng-icons/core';
import { matCameraAlt } from '@ng-icons/material-icons/baseline';
import { matPersonAddAlt } from '@ng-icons/material-icons/baseline';
import { matPerson } from '@ng-icons/material-icons/baseline';
import { heroBuildingStorefrontSolid } from '@ng-icons/heroicons/solid';
import { heroDocumentTextSolid } from '@ng-icons/heroicons/solid';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';
import { heroShareSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  providers: [provideIcons({matCameraAlt, matPersonAddAlt, matPerson, heroBuildingStorefrontSolid, heroDocumentTextSolid, heroPlaySolid, heroShareSolid})]
})
export class PerfilUsuarioComponent
{
  public seguirClick: boolean = false;
  public seguidores: number;
  public state: string;
  private subscriptions: Subscription[] = [];
  public photoText = 'Arrastra aquí tu foto';
  public stateFoto = 'inactive';

  constructor(private route: ActivatedRoute, private zone: NgZone, private router: Router) {
    this.state = 'info';
    this.seguidores = 36;
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

  cambiarFoto(): any {
    this.stateFoto = 'active';
    this.photoText = 'Arrastra aquí tu foto';
  }
  getFoto(fileInput: HTMLInputElement): void {
    if (fileInput.files !== null) {
      this.photoText = fileInput.files[0].name;
    }
  }
  salirFoto():any{
    this.stateFoto = 'inactive';
  }

  agregarFavorito(){
    this.seguirClick = !this.seguirClick;
  }

}
