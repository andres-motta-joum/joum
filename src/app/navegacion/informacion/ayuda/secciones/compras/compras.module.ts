import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './compras-routing.module';
import { PasosCompraComponent } from './secciones/pasos-compra/pasos-compra.component';
import { CompraSeguraComponent } from './secciones/compra-segura/compra-segura.component';
import { DevolucionesComponent } from './secciones/devoluciones/devoluciones.component';
import { CancelacionesComponent } from './secciones/cancelaciones/cancelaciones.component';
import { EnviosComponent } from './secciones/envios/envios.component';
import { ComprasOpinionesComponent } from './secciones/opiniones/opiniones.component';
import { ComponentesAyudaModule } from '../../componentes/componentes-ayuda.module';


@NgModule({
  declarations: [
    PasosCompraComponent,
    CompraSeguraComponent,
    DevolucionesComponent,
    CancelacionesComponent,
    EnviosComponent,
    ComprasOpinionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentesAyudaModule
  ],
  exports: [
    RouterModule
  ]
})
export class ComprasModule { }
