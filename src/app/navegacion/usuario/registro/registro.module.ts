import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './registro-routing.module';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms'

import { ComponentesGeneralesModule } from '../../componentes-generales/componentes-generales.module';

import { RegistroComponent } from './registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';


@NgModule({
  declarations: [
    RegistroComponent,
    IniciarSesionComponent,
    CrearCuentaComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistroModule { }
