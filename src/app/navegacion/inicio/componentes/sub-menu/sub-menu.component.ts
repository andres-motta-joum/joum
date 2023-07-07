import { Component, NgZone } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroBanknotes } from '@ng-icons/heroicons/outline';
import { heroCheckBadge } from '@ng-icons/heroicons/outline';
import { heroArrowUturnLeft } from '@ng-icons/heroicons/outline';
import { heroStar } from '@ng-icons/heroicons/outline';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  providers: provideIcons({heroBanknotes, heroCheckBadge, heroArrowUturnLeft, heroStar})
})
export class SubMenuComponent {
  constructor(private zone: NgZone, private router: Router){}

  navegar(ruta : any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
