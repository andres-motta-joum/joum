import { Component, NgZone, OnInit } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroBanknotes } from '@ng-icons/heroicons/outline';
import { heroCheckBadge } from '@ng-icons/heroicons/outline';
import { heroArrowUturnLeft } from '@ng-icons/heroicons/outline';
import { heroStar } from '@ng-icons/heroicons/outline';

import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  providers: provideIcons({heroBanknotes, heroCheckBadge, heroArrowUturnLeft, heroStar})
})
export class SubMenuComponent implements OnInit{
  constructor(private auth: Auth, private router: Router, private authService: AuthService){}
  usuario!: string;
  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (user)=>{
      if(user){
        this.usuario = (await this.authService.getUsuarioIdPromise(user.uid)).usuario;
      }
    })
  }

  navegar(ruta: string){
    if(this.usuario){
      this.router.navigate([ruta]);
      window.scroll(0,0)
    }
  }
}
