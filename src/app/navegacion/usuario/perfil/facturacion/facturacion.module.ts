import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from '../perfil-routing.module';
import { RouterModule } from '@angular/router';
import { FacturacionComponent } from './facturacion.component';
import { FacturasReportesComponent } from './secciones/facturas-reportes/facturas-reportes.component';
import { RetencionesComponent } from './secciones/retenciones/retenciones.component';
@NgModule({
  declarations: [
    FacturacionComponent,
    FacturasReportesComponent,
    RetencionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FacturasReportesComponent,
    RetencionesComponent
  ]
})
export class FacturacionModule { }
