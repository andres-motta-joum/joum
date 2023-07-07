import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMapPin } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-datos-envio',
  templateUrl: './datos-envio.component.html',
  styleUrls: ['./datos-envio.component.scss'],
  providers: [provideIcons({heroMapPin})]
})
export class DatosEnvioComponent {
  constructor(private zone: NgZone, private router: Router){}

  navegar(ruta : any[], event:Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      scroll(0,0)
    })
  }
}
