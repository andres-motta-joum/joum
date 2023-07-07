import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from '../perfil-routing.module';
import { RouterModule } from '@angular/router';
import { FacturacionComponent } from './facturacion.component';
import { FacturasReportesComponent } from './secciones/facturas-reportes/facturas-reportes.component';
import { ResumenFacturacionComponent } from './secciones/resumen-facturacion/resumen-facturacion.component';
import { SaldosPendientesComponent } from './secciones/saldos-pendientes/saldos-pendientes.component';

@NgModule({
  declarations: [
    FacturacionComponent,
    FacturasReportesComponent,
    ResumenFacturacionComponent,
    SaldosPendientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FacturasReportesComponent,
    ResumenFacturacionComponent,
    SaldosPendientesComponent
  ]
})
export class FacturacionModule { }
