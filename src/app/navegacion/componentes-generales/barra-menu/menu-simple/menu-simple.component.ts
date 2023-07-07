import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

import { heroInformationCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-menu-simple',
  templateUrl: './menu-simple.component.html',
  styleUrls: ['./menu-simple.component.scss'],
  providers: [provideIcons({heroInformationCircle})]
})
export class MenuSimpleComponent {

  constructor(private zone: NgZone, private router: Router){}

  navegar(ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

}
