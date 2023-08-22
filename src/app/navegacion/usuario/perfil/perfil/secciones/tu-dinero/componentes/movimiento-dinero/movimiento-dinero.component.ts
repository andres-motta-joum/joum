import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MovimientoDinero } from 'src/app/interfaces/movimiento-dinero';
import { transacion } from 'src/app/interfaces/usuario/subInterfaces/dinero';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Component({
  selector: 'app-movimiento-dinero',
  templateUrl: './movimiento-dinero.component.html',
  styleUrls: ['./movimiento-dinero.component.scss']
})
export class MovimientoDineroComponent {
 @Input() movimiento!: transacion ;

  ngOnInit(): void {
    
  }
}
