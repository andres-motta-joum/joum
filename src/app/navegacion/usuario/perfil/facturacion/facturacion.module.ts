import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

import { routes } from '../perfil-routing.module';
import { RouterModule } from '@angular/router';
import { FacturacionComponent } from './facturacion.component';
import { FacturasReportesComponent } from './secciones/facturas-reportes/facturas-reportes.component';
import { RetencionesComponent } from './secciones/retenciones/retenciones.component';
/*--- Componentes internos ---*/
import { FacturaReporteComponent } from './secciones/facturas-reportes/componentes/factura-reporte/factura-reporte.component';
import { RetencionComponent } from './secciones/retenciones/componentes/retencion/retencion.component';
@NgModule({
  declarations: [
    FacturacionComponent,
    FacturasReportesComponent,
    RetencionesComponent,
    FacturaReporteComponent,
    RetencionComponent
  ],
  imports: [
    CommonModule,
    NgIconComponent,
    RouterModule.forChild(routes)
  ],
  exports: [
    FacturasReportesComponent,
    RetencionesComponent
  ]
})
export class FacturacionModule { }
