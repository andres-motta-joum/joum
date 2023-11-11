import { Routes }  from "@angular/router";
import { PortalEmpleadoComponent } from "./portal-empleado.component";
import { TicketsEmpleadoComponent } from "./secciones/tickets/tickets.component";
import { TicketComponent } from "./secciones/tickets/ticket/ticket.component";

export const routes: Routes = [
    {
        path: 'portal-empleado/:id', component: PortalEmpleadoComponent,
        children: [
            {
                path: '',
                redirectTo: 'tickets',
                pathMatch: 'full'
            },
            {
                path: 'tickets',
                component:TicketsEmpleadoComponent
            },
            {
                path: 'reportes',
                component:TicketsEmpleadoComponent
            },
            {
                path: 'suspenciones',
                component:TicketsEmpleadoComponent
            },
            {
                path: 'devoluciones',
                component:TicketsEmpleadoComponent
            }
        ]
    },
    {
        path: 'portal-empleado/:id/ticket/:id',
        component: TicketComponent
    }
]