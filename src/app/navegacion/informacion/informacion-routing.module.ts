import { Routes }  from "@angular/router";
import { AtencionClienteComponent } from "./atencion-cliente/atencion-cliente.component";
import { AyudaComponent } from "./ayuda/ayuda.component";
import { NotificacionesComponent } from "./notificaciones/notificaciones.component";
import { PrivacidadComponent } from "./privacidad/privacidad.component";
import { QuienesSomosComponent } from "./quienes-somos/quienes-somos.component";
import { TerminosCondicionesComponent } from "./terminos-condiciones/terminos-condiciones.component";
import { TicketsComponent } from "./atencion-cliente/componentes/tickets/tickets.component";
import { TicketComponent } from "../usuario/portal-empleado/secciones/tickets/ticket/ticket.component";

export const routes: Routes = [
  {
    path: "atencion-cliente/:id",
    component: TicketsComponent
  },
  {
    path: "atencion-cliente",
    component: AtencionClienteComponent
  },
  {
    path: "atencion-cliente/ticket/:id",
    component: TicketComponent
  },
  {
    path: "ayuda",
    component: AyudaComponent,
    children: [
      {
        path: '',
        redirectTo: 'compras',
        pathMatch: 'full'
      },
      {
        path: 'compras',
        loadChildren: ()=> import('./ayuda/secciones/compras/compras.module').then( m => m.ComprasModule)
      },
      {
        path: 'mis-datos',
        loadChildren: ()=> import('./ayuda/secciones/mis-datos/mis-datos.module').then( m => m.MisDatosModule)
      },
      {
        path: 'general',
        loadChildren: ()=> import('./ayuda/secciones/general/general.module').then( m => m.GeneralModule)
      },
    ]
  },
  {
    path: "notificaciones",
    component: NotificacionesComponent
  },
  {
    path: "privacidad",
    component: PrivacidadComponent
  },
  {
    path: "quienes-somos",
    component: QuienesSomosComponent
  },
  {
    path: "terminos-condiciones",
    component: TerminosCondicionesComponent
  }
]