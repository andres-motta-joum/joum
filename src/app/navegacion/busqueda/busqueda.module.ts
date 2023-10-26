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
import { ProductoComponent } from './componentes/productos/producto/producto.component';
import { CarritoModule } from './secciones/carrito/carrito.module';
import { HistorialComponent } from './secciones/historial/historial.component';
import { RecomendacionesComponent } from './secciones/recomendaciones/recomendaciones.component';

import { ProductoHistorialComponent } from './secciones/historial/producto-historial/producto-historial.component';
import { OfertasDelDiaComponent } from './secciones/ofertas-del-dia/ofertas-del-dia.component';

@NgModule({
  declarations: [
    BusquedaComponent,
    SeccionIzquierdaComponent,
    EncabezadoComponent,
    ProductosComponent,
    ProductoComponent,
    HistorialComponent,
    RecomendacionesComponent,
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
    ProductosComponent,
    ProductoComponent,
    HistorialComponent,
    RecomendacionesComponent
  ]
})
export class BusquedaModule { }
