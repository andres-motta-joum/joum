import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './compras-routing.module';
import { PasosCompraComponent } from './secciones/pasos-compra/pasos-compra.component';
import { CancelacionesComponent } from './secciones/cancelaciones/cancelaciones.component';
import { EnviosComponent } from './secciones/envios/envios.component';
import { ComponentesAyudaModule } from '../../componentes/componentes-ayuda.module';


@NgModule({
  declarations: [
    PasosCompraComponent,
    CancelacionesComponent,
    EnviosComponent
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
