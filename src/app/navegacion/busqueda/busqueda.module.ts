import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './busqueda-routing.module';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';

import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';
import { BusquedaComponent } from './busqueda.component';
import { SeccionIzquierdaComponent } from './componentes/seccion-izquierda/seccion-izquierda.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductoComponent } from './componentes/productos/producto/producto.component'

@NgModule({
  declarations: [
    BusquedaComponent,
    SeccionIzquierdaComponent,
    EncabezadoComponent,
    ProductosComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    RouterModule.forChild(routes)
  ]
})
export class BusquedaModule { }
