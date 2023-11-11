import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { provideIcons } from '@ng-icons/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss'],
  providers: [provideIcons({})]
})
export class AyudaComponent implements OnInit, OnDestroy{
  constructor(private router: Router){}
  private routeSubscription!: Subscription;
  categoria!: string;

  ngOnInit(): any { 
    this.categoria = this.router.url.split('/')[2];
    if(!this.categoria){
      this.categoria = 'compras'
    }
    this.routeSubscription = this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
          this.categoria = this.router.url.split('/')[2];
        }
    });
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

  navegar(ruta: string){
    this.router.navigate([ruta]);
    window.scroll(0,0);
  }
}
