import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.scss']
})
export class TiempoComponent implements OnInit{
  tiempoFinal = new Date();
  horas!: number;
  minutos!: number;
  segundos!: number;

  ngOnInit() {
    this.tiempoFinal.setHours(23, 59, 59, 999); // Establece la hora final a 23:59:59.999
    interval(1000)
      .pipe(
        map(() => {
          const ahora = new Date();
          const diferencia = this.tiempoFinal.getTime() - ahora.getTime();
          return {
            horas: Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
            segundos: Math.floor((diferencia % (1000 * 60)) / 1000)
          };
        }),
        takeWhile(tiempo => tiempo.horas >= 0 || tiempo.minutos >= 0 || tiempo.segundos >= 0)
      )
      .subscribe(tiempo => {
        this.horas = tiempo.horas;
        this.minutos = tiempo.minutos;
        this.segundos = tiempo.segundos;
      });
    }
  }
