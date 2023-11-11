import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './portal-empleado-routing.module';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentesGeneralesModule } from '../../componentes-generales/componentes-generales.module';
import { PortalEmpleadoComponent } from './portal-empleado.component';
import { TicketsEmpleadoComponent } from './secciones/tickets/tickets.component';
import { TicketComponent } from './secciones/tickets/ticket/ticket.component';

@NgModule({
  declarations: [
    PortalEmpleadoComponent,
    TicketsEmpleadoComponent,
    TicketComponent
  ],
  imports: [
    NgIconsModule,
    CommonModule,
    ComponentesGeneralesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PortalEmpleadoModule { }
