import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Component({
  selector: 'app-menu-simple',
  templateUrl: './menu-simple.component.html',
  styleUrls: ['./menu-simple.component.scss'],
  providers: [provideIcons({heroInformationCircle})]
})
export class MenuSimpleComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute){}
  private routeSubscription!: Subscription;
  public usuario!: Usuario | undefined;
  
  ngOnInit() {
  }

  navegar(ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

}
