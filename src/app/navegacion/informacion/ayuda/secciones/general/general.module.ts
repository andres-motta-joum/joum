import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './general-routing.module';

import { PublicarProductoComponent } from './secciones/publicar-producto/publicar-producto.component';
import { ModificarPublicacionComponent } from './secciones/modificar-publicacion/modificar-publicacion.component';
import { PromocionesComponent } from './secciones/promociones/promociones.component';
import { CuponesComponent } from './secciones/cupones/cupones.component';
import { VersionMovilComponent } from './secciones/version-movil/version-movil.component';
import { ComponentesAyudaModule } from '../../componentes/componentes-ayuda.module';
import { SeguidoresComponent } from './secciones/seguidores/seguidores.component';

@NgModule({
  declarations: [
    PublicarProductoComponent,
    ModificarPublicacionComponent,
    PromocionesComponent,
    CuponesComponent,
    VersionMovilComponent,
    SeguidoresComponent
  ],
  imports: [
    CommonModule,
    ComponentesAyudaModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GeneralModule { }
