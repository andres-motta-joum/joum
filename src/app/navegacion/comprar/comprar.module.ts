import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './comprar-routing.module';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';

import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';

import { ComprarComponent } from './comprar.component';
import { DatosEnvioComponent } from './secciones/datos-envio/datos-envio.component';
import { MetodoPagoComponent } from './secciones/metodo-pago/metodo-pago.component';
import { ResumenComponent } from './secciones/resumen/resumen.component';

@NgModule({
  declarations: [
    ComprarComponent,
    DatosEnvioComponent,
    MetodoPagoComponent,
    ResumenComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    RouterModule.forChild(routes)
  ]
})
export class ComprarModule { }
