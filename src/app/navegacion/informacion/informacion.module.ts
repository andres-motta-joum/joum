import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './informacion-routing.module';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AtencionClienteComponent } from './atencion-cliente/atencion-cliente.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';

import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';
import { NotificacionComponent } from './notificaciones/notificacion/notificacion.component';
import { TicketsComponent } from './atencion-cliente/componentes/tickets/tickets.component';
import { AyudaComprasComponent } from './ayuda/secciones/compras/compras.component';
import { AyudaVentasComponent } from './ayuda/secciones/ventas/ventas.component';
import { AyudaMisDatosComponent } from './ayuda/secciones/mis-datos/mis-datos.component';
import { AyudaGeneralComponent } from './ayuda/secciones/general/general.component';
import { SinTicketsComponent } from './atencion-cliente/componentes/sin-tickets/sin-tickets.component';
import { MetodosPagoComponent } from './quienes-somos/componentes/metodos-pago/metodos-pago.component';
import { CategoriasComponent } from './quienes-somos/componentes/categorias/categorias.component';
import { ApoyosComponent } from './quienes-somos/componentes/apoyos/apoyos.component';

import { PrecioNumberPipe } from './quienes-somos/componentes/apoyos/precioNumber';
import { SugerenciasComponent } from './quienes-somos/componentes/apoyos/sugerencias/sugerencias.component';
import { SuccessComponent } from './quienes-somos/componentes/apoyos/success/success.component';

@NgModule({
  declarations: [
    AtencionClienteComponent,
    AyudaComponent,
    NotificacionesComponent,
    PrivacidadComponent,
    QuienesSomosComponent,
    TerminosCondicionesComponent,
    NotificacionComponent,
    TicketsComponent,
    AyudaComprasComponent,
    AyudaVentasComponent,
    AyudaMisDatosComponent,
    AyudaGeneralComponent,
    SinTicketsComponent,
    MetodosPagoComponent,
    CategoriasComponent,
    ApoyosComponent,
    PrecioNumberPipe,
    SugerenciasComponent,
    SuccessComponent
  ],
  imports: [
    NgIconsModule,
    CommonModule,
    ComponentesGeneralesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class InformacionModule { }
