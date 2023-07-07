import { Component,OnInit, EventEmitter, Output  } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroChevronDown} from '@ng-icons/heroicons/outline'; 
import { heroQueueList } from '@ng-icons/heroicons/outline'; 
import { aspectsGrid } from '@ng-icons/ux-aspects'; 

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
  providers: [provideIcons({heroChevronDown, aspectsGrid, heroQueueList})]
})
export class EncabezadoComponent implements OnInit{

  @Output() listadoCuadradosOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() listadoLineadoOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  public listadoCuadrados: boolean;
  public listadoLineado: boolean;
  constructor() {
    this.listadoCuadrados = true;
    this.listadoLineado = false;
  }

  ngOnInit(): void {
    this.cambiarListado1();
  }

  cambiarListado1(): void{
    if (this.listadoCuadrados === false) {
      this.listadoCuadrados = true; this.listadoLineado = false;
      this.listadoCuadradosOut.emit(true);
      this.listadoLineadoOut.emit(false);
    }
  }
  cambiarListado2(): void{
    if (this.listadoLineado === false) {
      this.listadoCuadrados = false; this.listadoLineado = true;
      this.listadoCuadradosOut.emit(false);
      this.listadoLineadoOut.emit(true);
    }
  }


}
