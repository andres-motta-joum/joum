import { Component, Input, NgZone, OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../../../interfaces/producto/producto';
import { Usuario } from '../../../../interfaces/usuario/usuario';

import { provideIcons } from '@ng-icons/core';
import { matStarRound } from '@ng-icons/material-icons/round';
import { heroTruck } from '@ng-icons/heroicons/outline';
import { matGppGoodOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss'],
  providers: [provideIcons({matStarRound, heroTruck, matGppGoodOutline})]
})
export class DatosProductoComponent implements OnChanges, OnInit{
  constructor(private zone: NgZone, private router: Router){}
  @Input() producto!: Producto;
  @Input() usuario!: Usuario;
  public promedioCalificacion!: number;
  public promedio!: number;

  public unaUnidad = true;

  unidadesChange(event: any) {
    this.unaUnidad = event.target.value == 1;
  }
  ngOnInit(){
    this.promedioCalificacion = this.calcularPromedioCalificaciones(this.producto.opiniones);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['producto']) {
      this.promedioCalificacion = this.calcularPromedioCalificaciones(this.producto.opiniones);
    }
    const select: HTMLSelectElement | null = document.querySelector('#unidades');
    select!.value = '1';
    this.unaUnidad = true;
  }

  calcularPromedioCalificaciones(opiniones: Producto['opiniones']): number {
    const sumaCalificaciones = opiniones!.reduce((total, calificacion) => total + calificacion.calificacion!, 0);
    const promedio = sumaCalificaciones / opiniones!.length;
    this.promedio = Number(promedio.toFixed(1));
    return this.redondearCalificacion(promedio);
}

  redondearCalificacion(calificacion: number): number {
    const valoresPosibles = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    let valorCercano = valoresPosibles[0];
    let diferenciaMinima = Math.abs(calificacion - valorCercano);

    for (const valor of valoresPosibles) {
        const diferencia = Math.abs(calificacion - valor);
        if (diferencia < diferenciaMinima) {
            valorCercano = valor;
            diferenciaMinima = diferencia;
        }
    }

    return Math.round(valorCercano * 20);
  }

  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  opiniones(){
    window.scroll(0,3000)
  }
}
