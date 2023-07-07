import { Component } from '@angular/core';
import { PasosVenderService } from 'src/app/servicios/vender/vender.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss']
})
export class PublicarComponent {
  constructor(
    private pasos: PasosVenderService
  ) { }

  

  ngOnDestroy(): void {
    this.pasos.paso2 = false;
    this.pasos.paso3 = false;
    this.pasos.paso4 = false;
    this.pasos.paso5 = false;
  }

  getPaso(num: number): any {
    switch (num) {
      case 1: return this.pasos.paso1;
              break;
      case 2: return this.pasos.paso2;
              break;
      case 3: return this.pasos.paso3;
              break;
      case 4: return this.pasos.paso4;
              break;
      case 5: return this.pasos.paso5;
              break;
    }
  }
}
