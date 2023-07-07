import { Component } from '@angular/core';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent {
  public listadoCuadrados: boolean;
  public listadoLineado: boolean;

  constructor() {
    this.listadoCuadrados = true;
    this.listadoLineado = false;
  }


  
  getCuadradoList(cuadradoList: boolean): void{
    this.listadoCuadrados = cuadradoList;
  }
  getLineadoList(lineadoList: boolean): void{
    this.listadoLineado = lineadoList;
  }
}
