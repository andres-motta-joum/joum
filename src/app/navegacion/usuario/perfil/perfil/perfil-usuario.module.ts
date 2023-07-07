import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../perfil-routing.module';
import { NgIconsModule } from '@ng-icons/core';

import { InformacionComponent } from './secciones/informacion/informacion.component';
import { ProductosComponent } from './secciones/productos/productos.component';
import { VideosComponent } from './secciones/videos/videos.component';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { EditarDatosComponent } from './secciones/editar-datos/editar-datos.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InformacionComponent,
    ProductosComponent,
    VideosComponent,
    PerfilUsuarioComponent,
    EditarDatosComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    EditarDatosComponent,
    InformacionComponent,
    ProductosComponent,
    VideosComponent,
  ]
})
export class PerfilUsuarioModule { }
