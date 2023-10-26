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
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Auth, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc} from '@angular/fire/firestore'; 
import { Notificacion } from 'src/app/interfaces/usuario/subInterfaces/notificacion';
import { InformacionPerfilService } from 'src/app/servicios/informacionPerfil/informacion-perfil.service';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.scss'],
  viewProviders: [provideIcons({ heroBars3Solid, heroMagnifyingGlassMini, heroUserCircleSolid, heroShoppingCartSolid, matShoppingCart, heroCurrencyDollarMini,heroShoppingCart, heroStar, heroDocumentCheck, heroChatBubbleBottomCenterText, heroBanknotes, heroRectangleGroup, heroBell, heroBuildingStorefront, heroChatBubbleLeftRight, heroBanknotesMini, heroDocumentChartBar, heroArrowTrendingUp, heroDocumentText, heroArrowRightOnRectangle, ionNotificationsOutline, ionChevronDownOutline})]
})
export class BarraMenuComponent{
  constructor(private changeDetectorRef: ChangeDetectorRef, private zone: NgZone, private router: Router, private route: ActivatedRoute, private authService: AuthService, private auth: Auth, private firestore: Firestore, private perfilService: InformacionPerfilService){}
  public ultimoDatoUrl!: string;
  public scrollDisplay: Boolean = true;
  private routeSubscription!: Subscription;
  @ViewChild(MenuLateralComponent, {static: false})
  menuLateral: MenuLateralComponent = new MenuLateralComponent(this.auth, this.authService, this.changeDetectorRef, this.zone,this.router, this.perfilService);

  usuario!: Usuario | null;
  nombre!: string;
  inUser!: boolean;

  routeStateSubsCription!: Subscription;
  notificaciones!: Notificacion[];
  nuevaNotificacion!: boolean;

  isMouseOver = false;
  height = '0px';

  productosEnCarrito: number = 0;

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(()=> {
      this.decodificarURL();
    });

    this.routeSubscription = this.authService.userState$.subscribe(user => {
      if (user) {
        this.inUser = true;
        this.obtenerUsuario()
      } else {this.inUser = false;}
    });
  }
  //Mostrar notificaciones -------
  mouseIn(){
    if(this.notificaciones){
      if (!this.isMouseOver) {
        this.isMouseOver = true;
        setTimeout(()=>{
          if(this.isMouseOver){
            if(this.notificaciones.length > 4){
              this.height = '497px';
            }else{
              this.height = (this.notificaciones.length * 115.5) + 31 + 'px';
            }
            this.marcarComoVisto(this.usuario?.notificaciones!)
          }
        }, 100)
      }
    }
  }
  mouseOut(){
    if(this.notificaciones){
      this.isMouseOver = false;
      setTimeout(()=>{
        if(!this.isMouseOver){
          this.height = '0px';
        }
      }, 200)
    }
  }

  async marcarComoVisto(notificaciones: Notificacion[]) {
    // Comienza desde el final del array y continúa hasta que hayas marcado 4 objetos o llegues al inicio del array
    for (let i = notificaciones.length - 1; i >= 0 && i >= notificaciones.length - 4; i--) {
      notificaciones[i].visto = true;
    }
    const usuarioRef = doc(this.firestore, `usuarios/${this.usuario?.id}`);
    await setDoc(usuarioRef, {notificaciones: notificaciones}, {merge: true});
  }
  //-------------------------
  obtenerUsuario(){
    this.routeSubscription = this.authService.getUsuarioId(this.auth.currentUser?.uid!).subscribe(usuario =>{
      this.usuario = usuario;
      //--- nombre ----
      const palabras = this.usuario.nombre!.trim().split(' ');
      this.nombre = palabras.slice(0, 2).join(' ');
      //---- notificaciones----
      let notificaciones: Notificacion[] = []
      if(usuario.notificaciones){
        for(let notificacion of usuario.notificaciones){
          notificaciones.unshift(notificacion);
        }
        this.nuevaNotificacion = usuario.notificaciones?.some(notificacion => notificacion.visto == false);
      }else{
        this.nuevaNotificacion = false;
      }
      this.notificaciones = notificaciones;
      //---- productos en carrito ------
      let cantidad = 0;
      if(this.usuario.carrito){
        for(let carrito of this.usuario.carrito){
          cantidad += carrito.unidades;
        }
      }
      this.productosEnCarrito = cantidad;
    });
  }

  signOut(){
    this.authService.signOut();
  }

  //--------------------------------------------------  Funciones buscador ----------------------------------- //
  decodificarURL(){ // Saber el texto puesto en el Input
    const url = this.router.url;
      const decodedUrl = decodeURIComponent(url);
      const segments = decodedUrl.split('/');
      if(segments[1] === 'busqueda'){
        this.ultimoDatoUrl = segments[segments.length - 1];
      }
  }
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

  direccionarDirecciones(){
    this.perfilService.selected = 'direcciones';
    this.router.navigate([this.usuario?.usuario + '/perfil/informacion'])
  }

//---------------------------
  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  
}
