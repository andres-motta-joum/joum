import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';

import { ComponentesGeneralesModule } from 'src/app/navegacion/componentes-generales/componentes-generales.module';

import { routes } from '../../perfil-routing.module';
import { RouterModule } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { VentaComponent } from './componentes/venta/venta.component';

@NgModule({
  declarations: [
    VentasComponent,
    DetalleVentaComponent,
    VentaComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    VentasComponent,
    DetalleVentaComponent
  ]
})
export class VentasModule { }
