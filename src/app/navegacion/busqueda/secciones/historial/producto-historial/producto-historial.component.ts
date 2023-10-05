import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';
import { provideIcons } from '@ng-icons/core';

import { matStarRound } from '@ng-icons/material-icons/round';

import { heroHeart } from '@ng-icons/heroicons/outline'; 
import { heroHeartSolid } from '@ng-icons/heroicons/solid';


@Component({
  selector: 'app-producto-historial',
  templateUrl: './producto-historial.component.html',
  styleUrls: ['./producto-historial.component.scss'],
  providers: [provideIcons({heroHeart,matStarRound, heroHeartSolid})]
})
export class ProductoHistorialComponent {
  @Input() producto!: Producto;
  @Input() foto!: string;
  @Input() index!: number;
  @Output() eliminarIndex =  new EventEmitter<number>();
  public corazonClick: boolean = false;
  public corazonOver: boolean = false;

  public promedioCalificacion!: number;
  public promedio!: number;
  
  constructor(private zone: NgZone, private router: Router){}

  ngOnInit(){
    this.promedioCalificacion = this.calcularPromedioCalificaciones(this.producto.opiniones);
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  agregarFavorito(){
    this.corazonClick = !this.corazonClick;
  }
  mostrarCorazon(){
    this.corazonOver = !this.corazonOver;
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
  eliminarProductoHistorial(){
    this.eliminarIndex.emit(this.index);
  }

}


