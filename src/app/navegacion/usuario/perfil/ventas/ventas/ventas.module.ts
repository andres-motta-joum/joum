import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesGeneralesModule } from 'src/app/navegacion/componentes-generales/componentes-generales.module';

import { routes } from '../../perfil-routing.module';
import { RouterModule } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';

@NgModule({
  declarations: [
    VentasComponent,
    EnviarMensajeComponent,
    DetalleVentaComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    EnviarMensajeComponent,
    DetalleVentaComponent
  ]
})
export class VentasModule { }
