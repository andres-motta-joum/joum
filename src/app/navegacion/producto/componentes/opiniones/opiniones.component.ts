import { Component, Input, SimpleChanges} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { Opinion, Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss'],
  providers: [provideIcons({heroStarSolid})]
})
export class OpinionesComponent {
  @Input() opiniones!: Producto['opiniones'];
  fechas!: Date[];
  promedioCalificacion: number = 0;
  promedio!: number;
  calificaciones!: any[];
  opinionesSelecionadas!: Opinion[];

  tieneOpiniones: boolean = false;

  ngOnInit(){
    this.inicializarDatos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['opiniones']) {
      this.inicializarDatos();
    }
  }

  inicializarDatos(){
    if(this.opiniones?.length !== 0){
      let opinionesCheck: Opinion[] = [];
      for(let opinion of this.opiniones){
        if(opinion.check){
          opinionesCheck.unshift(opinion);
        }
      }
      if(opinionesCheck.length !== 0){
        this.tieneOpiniones = true;
        this.promedioCalificacion = this.calcularPromedioCalificaciones(this.opiniones);
      }
      this.opiniones = opinionesCheck;
    }
    this.calcularPorcentajes();
    this.opcionSeleccionada = '0';
    this.opinionesSelecionadas = this.opiniones?.sort((a, b) => {
      const fechaA = a.fecha ? a.fecha.toDate().getTime() : 0;
      const fechaB = b.fecha ? b.fecha.toDate().getTime() : 0;
      return fechaB - fechaA;
    });

    this.fechas = this.opiniones.map((opinion)=>{
      return opinion.fecha.toDate();
    })
  }

  calcularPorcentajes() {
    const totalOpiniones = this.opiniones!.length;
    const calificacionFrecuencia: number[] = [0, 0, 0, 0, 0, 0];

    if(this.tieneOpiniones){
      this.opiniones.forEach(opinion => {
        calificacionFrecuencia[opinion.calificacion!] += 1;
      });

      this.calificaciones = calificacionFrecuencia.slice(1).reverse().map((frecuencia, index) => ({
          estrellas: 5 - index,
          porcentaje: (frecuencia / totalOpiniones) * 100
      }));
    }else{
      this.calificaciones = calificacionFrecuencia.slice(1).reverse().map((frecuencia, index) => ({
        estrellas: 5 - index,
        porcentaje: 0
      }));
    }
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

  public opcionSeleccionada: string = '0';
  
  leccionarOpcion() {
    let opinionesPorFecha = this.opiniones?.sort((a, b) => {
      const fechaA = a.fecha ? a.fecha.toDate().getTime() : 0;
      const fechaB = b.fecha ? b.fecha.toDate().getTime() : 0;
      return fechaB - fechaA;
    });
    
    if(this.opcionSeleccionada === 'todas') {
      this.opinionesSelecionadas =  opinionesPorFecha;
    } else if(this.opcionSeleccionada) {
      this.opinionesSelecionadas = opinionesPorFecha?.filter(opinion => opinion.calificacion?.toString() === this.opcionSeleccionada);
    }
  }
}
