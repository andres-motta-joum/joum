import { Routes }  from "@angular/router";
import { AtencionClienteComponent } from "./atencion-cliente/atencion-cliente.component";
import { AyudaComponent } from "./ayuda/ayuda.component";
import { NotificacionesComponent } from "./notificaciones/notificaciones.component";
import { PrivacidadComponent } from "./privacidad/privacidad.component";
import { QuienesSomosComponent } from "./quienes-somos/quienes-somos.component";
import { TerminosCondicionesComponent } from "./terminos-condiciones/terminos-condiciones.component";

export const routes: Routes = [
  {
    path: "atencion-cliente",
    component: AtencionClienteComponent
  },
  {
    path: "ayuda",
    component: AyudaComponent
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
  },
]