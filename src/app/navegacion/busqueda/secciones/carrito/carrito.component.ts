import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  constructor(private route: ActivatedRoute, private zone: NgZone, private router: Router) {
  }

  public url!: string;
  private routeSubscription!: Subscription;

  ngOnInit() {
    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        const segments = url.split('/');
        this.url = segments[segments.length - 1];
    });
    this.routeSubscription = this.route.paramMap.subscribe(() => {
      const url = this.router.url;
      const segments = url.split('/');
      this.url = segments[segments.length - 1];
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  
  
}
