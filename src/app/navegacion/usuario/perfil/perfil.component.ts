import {AfterViewInit, ChangeDetectorRef,Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, Renderer2,ViewChild, } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid'; 

/*---------- Iconos Compras ---------*/
import { heroShoppingCartSolid } from '@ng-icons/heroicons/solid';
import { heroShoppingCart } from '@ng-icons/heroicons/outline';
import { heroStar } from '@ng-icons/heroicons/outline'; 
import { heroDocumentCheck } from '@ng-icons/heroicons/outline';
import { heroChatBubbleBottomCenterText } from '@ng-icons/heroicons/outline';

/*----------- Iconos Ventas ----------*/
import { heroRectangleGroup } from '@ng-icons/heroicons/outline'; 
import { heroBell } from '@ng-icons/heroicons/outline';
import { heroBuildingStorefront } from '@ng-icons/heroicons/outline';
import { heroChatBubbleLeftRight } from '@ng-icons/heroicons/outline';
import { heroBanknotesMini } from '@ng-icons/heroicons/mini';
import { heroCurrencyDollarSolid } from '@ng-icons/heroicons/solid';
import { heroCurrencyDollar } from '@ng-icons/heroicons/outline';
import { heroArrowTrendingUp } from '@ng-icons/heroicons/outline';
import { heroChartPie } from '@ng-icons/heroicons/outline';

import { heroDocumentTextSolid } from '@ng-icons/heroicons/solid';

import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  animations: [
    trigger('submenu', [
      state('active', style({
        maxHeight: '460px'
      })),
      state('inactive', style({
        maxHeight: '0'
      })),
      transition('inactive => active', animate('300ms')),
      transition('active => inactive', animate('300ms'))
    ])
  ],
  providers: [provideIcons({heroChevronDown, heroShoppingCartSolid, heroUserCircleSolid, heroShoppingCart, heroStar, heroDocumentCheck, heroChatBubbleBottomCenterText, heroBanknotesMini,heroRectangleGroup, heroBell,heroBuildingStorefront, heroChatBubbleLeftRight, heroCurrencyDollar, heroCurrencyDollarSolid, heroArrowTrendingUp, heroChartPie, heroDocumentTextSolid})]
})
export class PerfilComponent implements OnDestroy, OnInit{

  constructor(private router: Router,private route: ActivatedRoute,private renderer: Renderer2,private changeDetector: ChangeDetectorRef,private zone: NgZone, private authService: AuthService, private auth: Auth) {}
  private routerSubscription!: Subscription;

  miNombre!: string;
  miUsuario!: string;

  ngOnInit(): any { 
    this.obtenerUsuario();
    this.routerSubscription = this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        this.obtenerUsuario();
      }
    });
  }

  obtenerUsuario(){
    const url = (this.router.url).split('/');
    this.auth.onAuthStateChanged(async (usuario)=>{
      if(usuario){
        const miUsuario = await this.authService.getUsuarioIdPromise(usuario.uid);
        if(miUsuario.usuario == url[1]){
          //---- en caso de estár en mi perfil
          this.miNombre = miUsuario.nombre!.split(' ').slice(0, 2).join(' ');
          this.miUsuario = miUsuario.usuario;
        }else{
          if(url[2] == 'perfil' && (url[3] == 'informacion' || url[3] == 'productos')){
            //---- en caso de estár en un perfil de otro usuario, ya con cuenta iniciada
            const usuarioUrl = await this.authService.getUsuarioUser(url[1]);
            if(usuarioUrl){
              this.miNombre = miUsuario.nombre!.split(' ').slice(0, 2).join(' ');
              this.miUsuario = miUsuario.usuario!;
            }else{
              this.router.navigate(['']); // usuario de la url no existe
            }
          }else{
            this.router.navigate(['']);
          }
        }
      }else{
        if(url[2] == 'perfil' && (url[3] == 'informacion' || url[3] == 'productos')){
          const usuarioUrl = await this.authService.getUsuarioUser(url[1]);
          if(!usuarioUrl){
            this.router.navigate(['']); // usuario de la url no existe
          }
          //---- en caso de estár en un perfil de otro usuario, sin cuenta iniciada
        }else{
          this.router.navigate(['cuenta/crear-cuenta']);
        }
      }
      
    });
  }


  //---------------------------------

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
