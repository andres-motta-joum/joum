import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-producto-guardado',
  templateUrl: './producto-guardado.component.html',
  styleUrls: ['./producto-guardado.component.scss']
})
export class ProductoGuardadoComponent {
  @Input() productoGuardado!: Producto;
  @Input() unidades!: number;
  @Input() indice!: number;
  @Output() unidadEmitida = new EventEmitter<{ unidad: number, indice: number }>();
  
  constructor(private zone: NgZone, private router: Router){}

  cambiarUnidad(accion: string){
    if(accion === '+'){
      if(this.unidades < this.productoGuardado.unidades!){
        this.unidadEmitida.emit({ unidad: this.unidades + 1, indice: this.indice });
      }
    }
    if(accion === '-'){
      if(this.unidades !== 1){
        this.unidadEmitida.emit({ unidad: this.unidades - 1, indice: this.indice });
      }
    }
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
