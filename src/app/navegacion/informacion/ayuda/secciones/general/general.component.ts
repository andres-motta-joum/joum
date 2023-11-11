import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { iconoirNavArrowRight } from '@ng-icons/iconoir';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  providers: [provideIcons({iconoirNavArrowRight})]
})
export class AyudaGeneralComponent {
  constructor(private router: Router){}
  routeSubscription!: Subscription;
  selected!: string;

  ngOnInit(): void {
    const url = this.router.url.split('/')[3]
    if(url){
      this.selected = url
    }else{
      this.selected = 'publicar-producto';
    }
    this.routeSubscription = this.router.events.subscribe( async event =>{
      if(event instanceof NavigationEnd){
        const url = this.router.url.split('/')[3];
        if(url){
          this.selected = url
        }else{
          this.selected = 'publicar-producto';
        }
      }
    })    
  }

  navegar(ruta: String){
    this.router.navigate([ruta]);
  }
}
