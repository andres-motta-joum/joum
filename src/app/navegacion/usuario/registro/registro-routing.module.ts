import { Routes } from '@angular/router';

import { RegistroComponent } from './registro.component';
import { IniciarSesionComponent } from './secciones/iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './secciones/crear-cuenta/crear-cuenta.component';
import { CodigoSMSComponent } from './secciones/codigo-sms/codigo-sms.component';
import { CorreoCodigoSMSComponent } from './secciones/validar-correo-sms/correo-codigo-sms.component';
import { authGuard } from './guards/auth.guard';
import { ValidarTelefonoComponent } from './secciones/validar-telefono/validar-telefono.component';
import { CorreoEnviadoComponent } from './secciones/correo-enviado/correo-enviado.component';

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
        path: 'phone-validation',
        component: ValidarTelefonoComponent
      },
      {
        path: 'phone-validation/enter-code',
        component: CodigoSMSComponent
      },
      {
        path: 'phone-validation/email-request',
        component: CorreoCodigoSMSComponent,
        canActivate:[authGuard]
      },
      {
        path: 'email-sent',
        component: CorreoEnviadoComponent
      }
    ]
  }
]