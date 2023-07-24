import { Component } from '@angular/core';
import { MovimientoDinero } from 'src/app/interfaces/movimiento-dinero';

@Component({
  selector: 'app-tu-dinero',
  templateUrl: './tu-dinero.component.html',
  styleUrls: ['./tu-dinero.component.scss']
})
export class TuDineroComponent {
  public movimientos: Array<MovimientoDinero>= [
    {
      fecha: new Date("2023-07-24"),
      nombreCuenta: "Andres Yesid Motta Sarmiento",
      cantidad: "$ 85.000,00",
      tipo: "Transferencia"
    },
    {
      fecha: new Date("2023-07-24"),
      nombreCuenta: "Andres Yesid Motta Sarmiento",
      cantidad: "$ 165.000,00",
      tipo: "Pago por venta"
    },
    {
      fecha: new Date("2023-07-24"),
      nombreCuenta: "Andres Yesid Motta Sarmiento",
      cantidad: "$ 24.700,00",
      tipo: "Pago por venta"
    }
  ]
}
