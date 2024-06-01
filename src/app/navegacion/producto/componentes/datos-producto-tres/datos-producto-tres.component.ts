import { Component, Input, SimpleChanges } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-datos-producto-tres',
  templateUrl: './datos-producto-tres.component.html',
  styleUrls: ['./datos-producto-tres.component.scss']
})
export class DatosProductoTresComponent {
  @Input() producto!: Producto;
  public detalles!: string[][]; // se guardan los datos de todos los detalles en formato de string[][]

  //-------------- ASIGNACIÓN DE VARIABLES ------------
  ngOnInit(){
    const detallesIniciales = this.producto.detalles;
    this.detalles = detallesIniciales.map((detalle)=>{
      const [etiqueta, valor] = detalle.split(':');
      return [etiqueta.trim(), valor.trim()];
    })
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['producto'] && changes['producto'].currentValue) {
      const detallesIniciales = this.producto.detalles;
      this.detalles = detallesIniciales.map((detalle)=>{
        const [etiqueta, valor] = detalle.split(':');
        return [etiqueta.trim(), valor.trim()];
      })
    }
    
  }
}
