import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './informacion-routing.module';
import { RouterModule } from '@angular/router';

import { AtencionClienteComponent } from './atencion-cliente/atencion-cliente.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';

import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';

@NgModule({
  declarations: [
    AtencionClienteComponent,
    AyudaComponent,
    NotificacionesComponent,
    PrivacidadComponent,
    QuienesSomosComponent,
    TerminosCondicionesComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    RouterModule.forChild(routes)
  ]
})
export class InformacionModule { }
