import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MovimientoDinero } from 'src/app/interfaces/movimiento-dinero';

@Component({
  selector: 'app-movimiento-dinero',
  templateUrl: './movimiento-dinero.component.html',
  styleUrls: ['./movimiento-dinero.component.scss']
})
export class MovimientoDineroComponent {
 @Input() movimiento: MovimientoDinero = {};
 public day = '';
  public month = '';
  public year = 0;
  public fecha = ``;

  ngOnInit(): void {
    if (this.movimiento, this.movimiento.fecha) {
      this.day = this.movimiento.fecha.getDate().toString();
      this.month = (this.movimiento.fecha.getMonth() + 1).toString().padStart(2, '0');
      this.year = this.movimiento.fecha.getFullYear();
    }
    this.fecha = `${this.day} de ${this.month} del ${this.year}`;
  }
}
