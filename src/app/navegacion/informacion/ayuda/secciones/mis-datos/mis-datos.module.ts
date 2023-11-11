import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './mis-datos-routing.module';

import { CambiarDatosComponent } from './secciones/cambiar-datos/cambiar-datos.component';
import { CambiarContrasenaComponent } from './secciones/cambiar-contrasena/cambiar-contrasena.component';
import { MiSeguridadComponent } from './secciones/seguridad/seguridad.component';
import { ComponentesAyudaModule } from '../../componentes/componentes-ayuda.module';

@NgModule({
  declarations: [
    CambiarDatosComponent,
    CambiarContrasenaComponent,
    MiSeguridadComponent
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
export class MisDatosModule { }
