import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './registro-routing.module';
import { NgIconsModule } from '@ng-icons/core';

import { ComponentesGeneralesModule } from '../../componentes-generales/componentes-generales.module';

import { RegistroComponent } from './registro.component';
import { IniciarSesionComponent } from './secciones/iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './secciones/crear-cuenta/crear-cuenta.component';
import { CodigoSMSComponent } from './secciones/codigo-sms/codigo-sms.component';
import { CorreoCodigoSMSComponent } from './secciones/validar-correo-sms/correo-codigo-sms.component';

import { ReactiveFormsModule}  from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from './componentes/error-message/error-message.component';
import { ValidarTelefonoComponent } from './secciones/validar-telefono/validar-telefono.component';
import { CorreoEnviadoComponent } from './secciones/correo-enviado/correo-enviado.component';

@NgModule({
  declarations: [
    RegistroComponent,
    IniciarSesionComponent,
    CrearCuentaComponent,
    CodigoSMSComponent,
    CorreoCodigoSMSComponent,
    ErrorMessageComponent,
    ValidarTelefonoComponent,
    CorreoEnviadoComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class RegistroModule { }
