import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
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
  providers: provideIcons({heroUserCircle, heroBanknotes, heroCheckBadge, heroArrowUturnLeft, heroStar})
})
export class SubMenuComponent implements OnInit{
  constructor(private auth: Auth, private router: Router, private authService: AuthService){}
  mediosPago!: boolean;
  sign: boolean = false;
  usuario: boolean = false;
  user!: string;
  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (user)=>{
      if(user){
        this.usuario = true;
        this.user = (await this.authService.getUsuarioIdPromise(user.uid)).usuario;
      }
    })
  }
  metodosPago(){
    this.router.navigate(['quienes-somos']);
    window.scroll(0,690);
  }
  navegar(ruta: string){
    if(ruta == 'favoritos'){
      if(this.usuario){
        if(this.user){
          this.router.navigate([this.user + '/favoritos']);
          window.scroll(0,0)
        }
      }else{
        setTimeout(()=>{
          this.sign = true;
        }, 10)
      }
    }else{
      this.router.navigate([ruta]);
      window.scroll(0,0)
    }
  }
  @HostListener('document:click')
  closeSign() {
    if(this.sign){
      this.sign = false;
    }
  }
}
