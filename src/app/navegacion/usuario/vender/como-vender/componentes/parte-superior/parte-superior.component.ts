import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-parte-superior',
  templateUrl: './parte-superior.component.html',
  styleUrls: ['./parte-superior.component.scss']
})
export class ParteSuperiorComponent {

  constructor(private zone: NgZone, private router: Router){
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

}
