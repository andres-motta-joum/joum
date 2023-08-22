import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './registro-routing.module';
import { NgIconsModule } from '@ng-icons/core';

import { ComponentesGeneralesModule } from '../../componentes-generales/componentes-generales.module';

import { RegistroComponent } from './registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { CodigoSMSComponent } from './codigo-sms/codigo-sms.component';
import { CorreoCodigoSMSComponent } from './correo-codigo-sms/correo-codigo-sms.component';

import { ReactiveFormsModule}  from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from './componentes/error-message/error-message.component';

@NgModule({
  declarations: [
    RegistroComponent,
    IniciarSesionComponent,
    CrearCuentaComponent,
    CodigoSMSComponent,
    CorreoCodigoSMSComponent,
    ErrorMessageComponent
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
