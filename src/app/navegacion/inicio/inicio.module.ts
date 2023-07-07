import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './inicio.component';
import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';
import { SubMenuComponent } from './componentes/sub-menu/sub-menu.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { SliderComponent } from './componentes/slider/slider.component';

@NgModule({
  declarations: [
    InicioComponent,
    SubMenuComponent,
    CarruselComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule
  ],
  exports: [
    InicioComponent,
    CarruselComponent
  ]
})
export class InicioModule { }
