import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-reputacion',
  templateUrl: './reputacion.component.html',
  styleUrls: ['./reputacion.component.scss']
})
export class ReputacionComponent {
  constructor(private zone: NgZone, private router: Router){
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta)
    })
  }
}
