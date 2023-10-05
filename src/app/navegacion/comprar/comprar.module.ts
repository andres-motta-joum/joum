import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './comprar-routing.module';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';

import { ComprarComponent } from './comprar.component';
import { DatosEnvioComponent } from './secciones/datos-envio/datos-envio.component';
import { MetodoPagoComponent } from './secciones/metodo-pago/metodo-pago.component';
import { ResumenComponent } from './secciones/resumen/resumen.component';
import { CambiarDireccionComponent } from './secciones/cambiar-direccion/cambiar-direccion.component';

@NgModule({
  declarations: [
    ComprarComponent,
    DatosEnvioComponent,
    MetodoPagoComponent,
    ResumenComponent,
    CambiarDireccionComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ComprarModule { }
