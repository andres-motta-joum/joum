import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './general-routing.module';

import { CuponesComponent } from './secciones/cupones/cupones.component';
import { VersionMovilComponent } from './secciones/version-movil/version-movil.component';
import { ComponentesAyudaModule } from '../../componentes/componentes-ayuda.module';

@NgModule({
  declarations: [
    CuponesComponent,
    VersionMovilComponent
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
