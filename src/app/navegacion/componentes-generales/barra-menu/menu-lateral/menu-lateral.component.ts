import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { AnimationMenu } from './barra-menu-animation.component';

import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';
import { aspectsContactCard } from '@ng-icons/ux-aspects';
import { aspectsStatusErrorFilled } from '@ng-icons/ux-aspects';
import { heroSquares2x2Solid } from '@ng-icons/heroicons/solid';
import { aspectsDeliver } from '@ng-icons/ux-aspects';
import { heroNewspaper } from '@ng-icons/heroicons/outline';
import { heroCheckBadge } from '@ng-icons/heroicons/outline';
import { heroArrowUturnLeft } from '@ng-icons/heroicons/outline';
import { heroUsers } from '@ng-icons/heroicons/outline';

import { ionNotificationsOutline } from '@ng-icons/ionicons';
import { heroCalendarDays } from '@ng-icons/heroicons/outline';
import { heroArrowSmallLeftMini } from '@ng-icons/heroicons/mini';
import { heroChevronRightMini } from '@ng-icons/heroicons/mini';
import { heroCheckCircle } from '@ng-icons/heroicons/outline';
import { heroQuestionMarkCircle } from '@ng-icons/heroicons/outline';
import { aspectsLineChart } from '@ng-icons/ux-aspects';
import { heroLockClosed } from '@ng-icons/heroicons/outline';
import { heroFingerPrint } from '@ng-icons/heroicons/outline';
import { heroArrowRightOnRectangle } from '@ng-icons/heroicons/outline';

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
import { heroCurrencyDollar } from '@ng-icons/heroicons/outline';

import { heroDocumentText } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  animations: AnimationMenu,
  providers: [provideIcons({ionNotificationsOutline, heroUserCircleSolid,aspectsContactCard, aspectsStatusErrorFilled, heroSquares2x2Solid, aspectsDeliver, heroNewspaper, heroCheckBadge, heroArrowUturnLeft, heroUsers, heroCalendarDays,/*-iconos- perfil*/ heroArrowSmallLeftMini, heroChevronRightMini, heroCheckCircle, heroQuestionMarkCircle, aspectsLineChart, heroLockClosed, heroFingerPrint, heroArrowRightOnRectangle, heroShoppingCart, heroStar, heroDocumentCheck, heroChatBubbleBottomCenterText, heroBanknotes,heroCurrencyDollar, heroRectangleGroup, heroBell, heroBuildingStorefront, heroChatBubbleLeftRight, heroBanknotesMini, heroDocumentChartBar, heroArrowTrendingUp, heroDocumentText})]
})
export class MenuLateralComponent {

  public state = 'inactive';
  public submenuState: Array<string> = ['inactive', 'inactive', 'inactive'];

  constructor(private changeDetector: ChangeDetectorRef, private zone: NgZone, private router: Router){

  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  animarMenu(): void {
    if ( this.state === 'active' ) {
      for (const submenu in this.submenuState) {
        if (Object.prototype.hasOwnProperty.call(this.submenuState, submenu)) {
          this.submenuState[submenu] = 'inactive';
        }
      }
    }
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
    
  }

  animarSubmenu(submenu: number): void {
    this.submenuState[0] = this.submenuState[submenu] === 'inactive' ? 'active' : 'inactive';
    this.submenuState[submenu] = this.submenuState[submenu] === 'inactive' ? 'active' : 'inactive';
    this.changeDetector.detectChanges();
  }

}
