import { ComprarComponent } from './comprar.component'
import { Routes } from '@angular/router';
import { DatosEnvioComponent } from './secciones/datos-envio/datos-envio.component';
import { MetodoPagoComponent } from './secciones/metodo-pago/metodo-pago.component';
import { ResumenComponent } from './secciones/resumen/resumen.component';
import { CambiarDireccionComponent } from './secciones/cambiar-direccion/cambiar-direccion.component';

export const routes: Routes = [
  {
    path: 'comprar/checkout',
    component: ComprarComponent,
    children: [
      {
        path: 'detalles-envio',
        component: DatosEnvioComponent
      },
      {
        path: 'payment',
        component: MetodoPagoComponent
      },
      {
        path: 'resumen',
        component: ResumenComponent
      },
      {
        path: 'cambiar-direccion',
        component: CambiarDireccionComponent
      },
    ]
  }
]