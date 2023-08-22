import { Routes } from '@angular/router';

import { RegistroComponent } from './registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { CodigoSMSComponent } from './codigo-sms/codigo-sms.component';
import { CorreoCodigoSMSComponent } from './correo-codigo-sms/correo-codigo-sms.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'cuenta',
    component: RegistroComponent,
    children: [
      {
        path: 'iniciar-sesion',
        component: IniciarSesionComponent,
        canActivate:[authGuard]
      },
      {
        path: 'crear-cuenta',
        component: CrearCuentaComponent,
        canActivate:[authGuard]
      },
      {
        path: 'phone-validation/:id/enter-code',
        component: CodigoSMSComponent
      },
      {
        path: 'phone-validation/email-request',
        component: CorreoCodigoSMSComponent
      }
    ]
  }
]