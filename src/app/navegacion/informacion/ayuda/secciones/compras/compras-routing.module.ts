import { Routes } from "@angular/router";
import { PasosCompraComponent } from "./secciones/pasos-compra/pasos-compra.component";
import { AyudaComprasComponent } from "./compras.component";
import { CompraSeguraComponent } from "./secciones/compra-segura/compra-segura.component";
import { DevolucionesComponent } from "./secciones/devoluciones/devoluciones.component";
import { CancelacionesComponent } from "./secciones/cancelaciones/cancelaciones.component";
import { EnviosComponent } from "./secciones/envios/envios.component";
import { ComprasOpinionesComponent } from "./secciones/opiniones/opiniones.component";


export const routes: Routes = [
  {
    path: '',
    component: AyudaComprasComponent,
    children: [
      {
        path: '',
        component: CompraSeguraComponent
      },
      {
        path: 'compra-segura',
        component: CompraSeguraComponent
      },
      {
        path: 'pasos-compra',
        component: PasosCompraComponent
      },
      {
        path: 'devoluciones',
        component: DevolucionesComponent
      },
      {
        path: 'cancelaciones',
        component: CancelacionesComponent
      },
      {
        path: 'envios',
        component: EnviosComponent
      },
      {
        path: 'opiniones',
        component: ComprasOpinionesComponent
      }
    ]
  }
]
