import { Routes } from "@angular/router";
import { AyudaMisDatosComponent } from "./mis-datos.component";
import { CambiarDatosComponent } from "./secciones/cambiar-datos/cambiar-datos.component";
import { MiSeguridadComponent } from "./secciones/seguridad/seguridad.component";
import { CambiarContrasenaComponent } from "./secciones/cambiar-contrasena/cambiar-contrasena.component";


export const routes: Routes = [
  {
    path: '',
    component: AyudaMisDatosComponent,
    children: [
      {
        path: '',
        component: CambiarDatosComponent
      },
      {
        path: 'cambiar-mis-datos',
        component: CambiarDatosComponent
      },
      {
        path: 'cambiar-contrasena',
        component: CambiarContrasenaComponent
      },
      {
        path: 'seguridad',
        component: MiSeguridadComponent
      }
    ]
  }
]