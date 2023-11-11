import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './ventas-routing.module';

import { VenderSeguroComponent } from './secciones/vender-seguro/vender-seguro.component';
import { AyudaEnvioComponent } from './secciones/envio/envio.component';
import { CobrosComponent } from './secciones/cobros/cobros.component';
import { ReputacionComponent } from './secciones/reputacion/reputacion.component';
import { AyudaFacturacionComponent } from './secciones/facturacion/facturacion.component';
import { CargosImpuestosComponent } from './secciones/cargos-impuestos/cargos-impuestos.component';
import { AyudaCancelacionesComponent } from './secciones/cancelaciones/cancelaciones.component';
import { ProteccionVendedorComponent } from './secciones/proteccion-vendedor/proteccion-vendedor.component';
import { ComponentesAyudaModule } from '../../componentes/componentes-ayuda.module';
import { TipoPublicacionesComponent } from './secciones/tipo-publicaciones/tipo-publicaciones.component';

@NgModule({
  declarations: [
    VenderSeguroComponent,
    AyudaEnvioComponent,
    CobrosComponent,
    ReputacionComponent,
    AyudaFacturacionComponent,
    CargosImpuestosComponent,
    AyudaCancelacionesComponent,
    ProteccionVendedorComponent,
    TipoPublicacionesComponent
  ],
  imports: [
    CommonModule,
    ComponentesAyudaModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VentasModule { }
