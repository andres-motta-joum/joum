import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-parte-superior',
  templateUrl: './parte-superior.component.html',
  styleUrls: ['./parte-superior.component.scss']
})
export class ParteSuperiorComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone, private router: Router, private authService : AuthService){}
  private routeSubscription!: Subscription;
  inUser!: Boolean;

  ngOnInit(): void {
    this.routeSubscription = this.authService.userState$.subscribe((user)=>{
      user ? this.inUser = true : this.inUser = false;
    })
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
