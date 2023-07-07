import { Routes } from '@angular/router';

import { RegistroComponent } from './registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';

export const routes: Routes = [
  {
    path: 'cuenta',
    component: RegistroComponent,
    children: [
      {
        path: 'iniciar-sesion',
        component: IniciarSesionComponent
      },
      {
        path: 'crear-cuenta',
        component: CrearCuentaComponent
      }
    ]
  }
]