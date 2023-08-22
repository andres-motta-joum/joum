import { Component } from '@angular/core';
import { Novedad } from 'src/app/interfaces/novedad';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent {
  public novedades: Array<Novedad> = [
    {
      id: "MOTTAANDRES20221130093921",
      titulo: "Experimentamos problemas con las Métricas de competitividad desde el 9 al 20 de julio",
      contenido: "Ya estamos trabajando en solucionarlo, pero por ahora es posible que al consultar esas fechas no se muestre información o esta sea incorrecta. Este problema no afecta al resto de tus métricas.",
      fecha: new Date("2023-07-24"),
    }
  ]
}
