import { Routes } from "@angular/router";
import { AyudaVentasComponent } from "./ventas.component";
import { VenderSeguroComponent } from "./secciones/vender-seguro/vender-seguro.component";
import { AyudaEnvioComponent } from "./secciones/envio/envio.component";
import { CobrosComponent } from "./secciones/cobros/cobros.component";
import { ReputacionComponent } from "./secciones/reputacion/reputacion.component";
import { AyudaFacturacionComponent } from "./secciones/facturacion/facturacion.component";
import { AyudaCancelacionesComponent } from "./secciones/cancelaciones/cancelaciones.component";
import { ProteccionVendedorComponent } from "./secciones/proteccion-vendedor/proteccion-vendedor.component";
import { CargosImpuestosComponent } from "./secciones/cargos-impuestos/cargos-impuestos.component";
import { TipoPublicacionesComponent } from "./secciones/tipo-publicaciones/tipo-publicaciones.component";


export const routes: Routes = [
  {
    path: '',
    component: AyudaVentasComponent,
    children: [
      {
        path: '',
        component: VenderSeguroComponent
      },
      {
        path: 'vender-seguro',
        component: VenderSeguroComponent
      },
      {
        path: 'tipo-publicaciones',
        component: TipoPublicacionesComponent
      },
      {
        path: 'envio',
        component: AyudaEnvioComponent
      },
      {
        path: 'cobros',
        component: CobrosComponent
      },
      {
        path: 'reputacion',
        component: ReputacionComponent
      },
      {
        path: 'facturacion',
        component: AyudaFacturacionComponent
      },
      {
        path: 'cargos-impuestos',
        component: CargosImpuestosComponent
      },
      {
        path: 'cancelaciones',
        component: AyudaCancelacionesComponent
      },
      {
        path: 'proteccion',
        component: ProteccionVendedorComponent
      }
    ]
  }
]