import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../../busqueda-routing.module';
import { RouterModule } from '@angular/router';

import { CarritoComponent } from './carrito.component';
import { CarritoSeccionComponent } from './secciones/carrito/carrito.component';
import { GuardadosComponent } from './secciones/guardados/guardados.component';
import { ComponentesGeneralesModule } from 'src/app/navegacion/componentes-generales/componentes-generales.module';
import { NgIconsModule } from '@ng-icons/core';
import { ProductoCarritoComponent } from './secciones/carrito/componentes/producto-carrito/producto-carrito.component';
import { ProductoGuardadoComponent } from './secciones/guardados/componentes/producto-guardado/producto-guardado.component';

@NgModule({
  declarations: [
    CarritoComponent,
    CarritoSeccionComponent,
    GuardadosComponent,
    ProductoCarritoComponent,
    ProductoGuardadoComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CarritoComponent,
    CarritoSeccionComponent,
    GuardadosComponent
  ]
})
export class CarritoModule { }
