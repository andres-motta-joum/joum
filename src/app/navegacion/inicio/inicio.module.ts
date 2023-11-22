import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InicioComponent } from './inicio.component';
import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';
import { SubMenuComponent } from './componentes/sub-menu/sub-menu.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { SliderComponent } from './componentes/slider/slider.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { UsuarioNuevoComponent } from './componentes/usuario-nuevo/usuario-nuevo.component';

@NgModule({
  declarations: [
    InicioComponent,
    SubMenuComponent,
    CarruselComponent,
    SliderComponent,
    CategoriasComponent,
    UsuarioNuevoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentesGeneralesModule,
    NgIconsModule
  ],
  exports: [
    InicioComponent,
    CarruselComponent
  ]
})
export class InicioModule { }
