import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { iconoirNavArrowRight } from '@ng-icons/iconoir';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [provideIcons({iconoirNavArrowRight})]
})

export class AyudaVentasComponent {
  constructor(private router: Router){}
  routeSubscription!: Subscription;
  selected!: string;

  ngOnInit(): void {
    const url = this.router.url.split('/')[3]
    if(url){
      this.selected = url
    }else{
      this.selected = 'vender-seguro';
    }
    this.routeSubscription = this.router.events.subscribe( async event =>{
      if(event instanceof NavigationEnd){
        const url = this.router.url.split('/')[3];
        if(url){
          this.selected = url
        }else{
          this.selected = 'vender-seguro';
        }
      }
    })    
  }

  navegar(ruta: String){
    this.router.navigate([ruta]);
  }
}
