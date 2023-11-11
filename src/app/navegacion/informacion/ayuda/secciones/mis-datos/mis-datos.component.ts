import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { iconoirNavArrowRight } from '@ng-icons/iconoir';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  providers: [provideIcons({iconoirNavArrowRight})]
})

export class AyudaMisDatosComponent {
  constructor(private router: Router){}
  routeSubscription!: Subscription;
  selected!: string;

  ngOnInit(): void {
    const url = this.router.url.split('/')[3]
    if(url){
      this.selected = url
    }else{
      this.selected = 'cambiar-mis-datos';
    }
    this.routeSubscription = this.router.events.subscribe( async event =>{
      if(event instanceof NavigationEnd){
        const url = this.router.url.split('/')[3];
        if(url){
          this.selected = url
        }else{
          this.selected = 'cambiar-mis-datos';
        }
      }
    })    
  }

  navegar(ruta: String){
    this.router.navigate([ruta]);
  }
}
