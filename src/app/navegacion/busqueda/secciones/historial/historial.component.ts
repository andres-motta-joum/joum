import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  constructor(private zone: NgZone, private router: Router){}
  registroHistorial: boolean = true;

  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  onButtonClick(): void {
    this.registroHistorial = !this.registroHistorial;
  }
}
