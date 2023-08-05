import { Component, ViewChild, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.scss'],
  viewProviders: [provideIcons({ heroBars3Solid, heroMagnifyingGlassMini, heroUserCircleSolid, heroShoppingCartSolid, matShoppingCart, heroCurrencyDollarMini,heroShoppingCart, heroStar, heroDocumentCheck, heroChatBubbleBottomCenterText, heroBanknotes, heroRectangleGroup, heroBell, heroBuildingStorefront, heroChatBubbleLeftRight, heroBanknotesMini, heroDocumentChartBar, heroArrowTrendingUp, heroDocumentText, heroArrowRightOnRectangle, ionNotificationsOutline, ionChevronDownOutline})]
})
export class BarraMenuComponent{
  public scrollDisplay: Boolean = true;

  @ViewChild(MenuLateralComponent, {static: false})
  menuLateral: MenuLateralComponent = new MenuLateralComponent(this.changeDetectorRef, this.zone,this.router);

  constructor(private changeDetectorRef: ChangeDetectorRef, private zone: NgZone, private router: Router){}

  navegar(ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  
}
