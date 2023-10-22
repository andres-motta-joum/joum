import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  private periodoTiempoSource = new BehaviorSubject<string>('valor inicial');
  periodoTiempo = this.periodoTiempoSource.asObservable();

  constructor() { }

  cambiarMiVariable(nuevoValor: string) {
    this.periodoTiempoSource.next(nuevoValor);
  }
}
