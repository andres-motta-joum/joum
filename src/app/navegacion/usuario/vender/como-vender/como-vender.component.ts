import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-como-vender',
  templateUrl: './como-vender.component.html',
  styleUrls: ['./como-vender.component.scss']
})
export class ComoVenderComponent {

  constructor(private zone: NgZone, private router: Router){}
  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

}
