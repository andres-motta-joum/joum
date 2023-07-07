import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasosVenderService {

  paso1: boolean;
  paso2: boolean;
  paso3: boolean;
  paso4: boolean;
  paso5: boolean;
  paso6: boolean;

  producto!: any;

  constructor() {
    this.paso1 = true;
    this.paso2 = false;
    this.paso3 = false;
    this.paso4 = false;
    this.paso5 = false;
    this.paso6 = false;
  }
}
