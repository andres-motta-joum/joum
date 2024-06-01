import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './busqueda-routing.module';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';

import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';
import { BusquedaComponent } from './busqueda.component';
import { ProductoComponent } from './componentes/productos/producto/producto.component';
import { CarritoModule } from './secciones/carrito/carrito.module';
import { HistorialComponent } from './secciones/historial/historial.component';

import { ProductoHistorialComponent } from './secciones/historial/producto-historial/producto-historial.component';
import { OfertasDelDiaComponent } from './secciones/ofertas-del-dia/ofertas-del-dia.component';

@NgModule({
  declarations: [
    BusquedaComponent,
    ProductoComponent,
    HistorialComponent,
    ProductoHistorialComponent,
    OfertasDelDiaComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    CarritoModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    ProductoComponent,
    HistorialComponent
  ]
})
export class BusquedaModule { }
