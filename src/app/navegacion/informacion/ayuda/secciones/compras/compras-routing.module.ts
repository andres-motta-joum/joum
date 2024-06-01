import { Routes } from "@angular/router";
import { PasosCompraComponent } from "./secciones/pasos-compra/pasos-compra.component";
import { AyudaComprasComponent } from "./compras.component";
import { CancelacionesComponent } from "./secciones/cancelaciones/cancelaciones.component";
import { EnviosComponent } from "./secciones/envios/envios.component";


export const routes: Routes = [
  {
    path: '',
    component: AyudaComprasComponent,
    children: [
      {
        path: '',
        component: PasosCompraComponent
      },
      {
        path: 'pasos-compra',
        component: PasosCompraComponent
      },
      {
        path: 'cancelaciones',
        component: CancelacionesComponent
      },
      {
        path: 'envios',
        component: EnviosComponent
      }
    ]
  }
]
