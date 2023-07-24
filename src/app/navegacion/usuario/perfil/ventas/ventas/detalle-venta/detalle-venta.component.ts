import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftEllipsisSolid } from '@ng-icons/heroicons/solid';
import { matQuestionMark } from '@ng-icons/material-icons/baseline';
import { matMoveToInbox } from '@ng-icons/material-icons/baseline';
import { heroTruckSolid } from '@ng-icons/heroicons/solid';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { aspectsPlatformDropbox } from '@ng-icons/ux-aspects';
import { heroBanknotes } from '@ng-icons/heroicons/outline';
import { heroDocumentText } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss'],
  providers: [provideIcons({heroChatBubbleLeftEllipsisSolid, matQuestionMark, matMoveToInbox, heroTruckSolid, heroCheckCircleSolid, aspectsPlatformDropbox, heroBanknotes, heroDocumentText})]
})
export class DetalleVentaComponent {

  constructor(private zone: NgZone, private router: Router){}

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
