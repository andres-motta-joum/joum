import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from '../../perfil-routing.module';
import { RouterModule } from '@angular/router';
import { MetricasComponent } from './metricas.component';
import { NegocioComponent } from './secciones/negocio/negocio.component';
import { AtencionCompradoresComponent } from './secciones/atencion-compradores/atencion-compradores.component';
import { StockComponent } from './secciones/stock/stock.component';

@NgModule({
  declarations: [
    MetricasComponent,
    NegocioComponent,
    AtencionCompradoresComponent,
    StockComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    NegocioComponent,
    AtencionCompradoresComponent,
    StockComponent
  ]
})
export class MetricasModule { }
