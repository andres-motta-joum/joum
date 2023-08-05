import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../perfil-routing.module';
import { NgIconsModule } from '@ng-icons/core';

import { InformacionComponent } from './secciones/informacion/informacion.component';
import { ProductosComponent } from './secciones/productos/productos.component';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { EditarDatosComponent } from './secciones/editar-datos/editar-datos.component';

import { RouterModule } from '@angular/router';
/*---------- Componentes internos ---------*/
import { TuDineroComponent } from './secciones/tu-dinero/tu-dinero.component';
import { MovimientoDineroComponent } from './secciones/tu-dinero/componentes/movimiento-dinero/movimiento-dinero.component';
import { ProductoComponent } from './secciones/productos/componentes/producto/producto.component';

@NgModule({
  declarations: [
    InformacionComponent,
    ProductosComponent,
    PerfilUsuarioComponent,
    EditarDatosComponent,
    MovimientoDineroComponent,
    TuDineroComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    EditarDatosComponent,
    InformacionComponent,
    ProductosComponent
  ]
})
export class PerfilUsuarioModule { }
