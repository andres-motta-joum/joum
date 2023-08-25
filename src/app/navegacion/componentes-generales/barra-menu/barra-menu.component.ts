import { Component, ViewChild, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

/*--------- Iconos ---------------*/
import { provideIcons } from '@ng-icons/core';
import { ionNotificationsOutline } from '@ng-icons/ionicons';
import { ionChevronDownOutline }from '@ng-icons/ionicons';
import { heroBars3Solid } from '@ng-icons/heroicons/solid';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';
import { heroShoppingCartSolid } from '@ng-icons/heroicons/solid';
import { matShoppingCart } from '@ng-icons/material-icons/baseline';
import { heroMagnifyingGlassMini } from '@ng-icons/heroicons/mini';
import { heroCurrencyDollarMini } from '@ng-icons/heroicons/mini';

/*---- Componentes ----*/
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component'; 
/*---------- Iconos Compras ---------*/
import { heroShoppingCart, } from '@ng-icons/heroicons/outline';
import { heroStar, } from '@ng-icons/heroicons/outline'; 
import { heroDocumentCheck, } from '@ng-icons/heroicons/outline';
import { heroChatBubbleBottomCenterText, } from '@ng-icons/heroicons/outline';
import { heroBanknotes, } from '@ng-icons/heroicons/outline';

/*----------- Iconos Ventas ----------*/
import { heroRectangleGroup, } from '@ng-icons/heroicons/outline'; 
import { heroBell, } from '@ng-icons/heroicons/outline';
import { heroBuildingStorefront, } from '@ng-icons/heroicons/outline';
import { heroChatBubbleLeftRight, } from '@ng-icons/heroicons/outline';
import { heroBanknotesMini, } from '@ng-icons/heroicons/mini';
import { heroDocumentChartBar, } from '@ng-icons/heroicons/outline';
import { heroArrowTrendingUp, } from '@ng-icons/heroicons/outline';

import { heroDocumentText } from '@ng-icons/heroicons/outline';
import { heroArrowRightOnRectangle } from '@ng-icons/heroicons/outline';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Auth, User } from '@angular/fire/auth';
import { getApp } from '@angular/fire/app';
import { getFirestore } from 'firebase/firestore'; 
import { doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.scss'],
  viewProviders: [provideIcons({ heroBars3Solid, heroMagnifyingGlassMini, heroUserCircleSolid, heroShoppingCartSolid, matShoppingCart, heroCurrencyDollarMini,heroShoppingCart, heroStar, heroDocumentCheck, heroChatBubbleBottomCenterText, heroBanknotes, heroRectangleGroup, heroBell, heroBuildingStorefront, heroChatBubbleLeftRight, heroBanknotesMini, heroDocumentChartBar, heroArrowTrendingUp, heroDocumentText, heroArrowRightOnRectangle, ionNotificationsOutline, ionChevronDownOutline})]
})
export class BarraMenuComponent{
  public ultimoDatoUrl!: string;
  public scrollDisplay: Boolean = true;
  private routeSubscription!: Subscription;
  @ViewChild(MenuLateralComponent, {static: false})
  menuLateral: MenuLateralComponent = new MenuLateralComponent(this.changeDetectorRef, this.zone,this.router);

  public usuario!: Usuario;
  public nombre!: string;

  public logged!: boolean;
  public usuarioLogged!: User;
  public routeStateSubsCription!: Subscription;
  constructor(private changeDetectorRef: ChangeDetectorRef, private zone: NgZone, private router: Router, private route: ActivatedRoute, private userService: UsuarioService, private authService: AuthService, private auth: Auth){}

  ngOnInit() {
    
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.decodificarURL();
    });

    this.routeStateSubsCription = this.authService.userState$.subscribe(user => {
      if (user) {
        this.usuarioLogged = user;
        this.logged = true;
        this.llamarUsuario()
      } else {
        this.logged = false;
      }
    });
  }

  async llamarUsuario(){
    const app = getApp();
    const db = getFirestore(app);
    const docSnap = await getDoc(doc(db, "usuarios", this.auth.currentUser?.uid!));
    this.usuario = docSnap.data()!;
    const palabras = this.usuario.nombre!.trim().split(' ');
    this.nombre = palabras.slice(0, 2).join(' ');
  }

  signOut(){
    this.authService.signOut();
  }

  decodificarURL(){ // Saber el texto puesto en el Input
    const url = this.router.url;
      const decodedUrl = decodeURIComponent(url);
      const segments = decodedUrl.split('/');
      if(segments[1] === 'busqueda'){
        this.ultimoDatoUrl = segments[segments.length - 1];
      }
  }
  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.routeStateSubsCription) {
      this.routeStateSubsCription.unsubscribe();
    }
  }
  //-------------------------------------------------------  Funciones básicas  --------- //
  navegar(ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  buscar(busqueda: string){
    if(busqueda !== ''){
      this.zone.run(()=>{
        this.router.navigate(['busqueda/',busqueda]);
        window.scroll(0,0)
      })
    }else{
      this.zone.run(()=>{
        this.router.navigate(['']);
        window.scroll(0,0)
      })
    }
  }
  buscarEnter(busqueda: string){
    if(busqueda !== ''){
      this.zone.run(()=>{
        this.router.navigate(['busqueda/',busqueda]);
        window.scroll(0,0)
      })
    }
  }
  
}
