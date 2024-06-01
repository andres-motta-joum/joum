import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../perfil-routing.module';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

import { InformacionComponent } from './secciones/informacion/informacion.component';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { ReactiveFormsModule}  from '@angular/forms';

import { RouterModule } from '@angular/router';
/*---------- Componentes internos ---------*/
import { TuDineroComponent } from './secciones/tu-dinero/tu-dinero.component';
import { MovimientoDineroComponent } from './secciones/tu-dinero/componentes/movimiento-dinero/movimiento-dinero.component';


import { DatosPersonalesComponent } from './secciones/informacion/componentes/datos-personales/datos-personales.component';
import { SeguridadComponent } from './secciones/informacion/componentes/seguridad/seguridad.component';
import { DireccionesComponent } from './secciones/informacion/componentes/direcciones/direcciones.component';
import { PrivacidadComponent } from './secciones/informacion/componentes/privacidad/privacidad.component';
import { EMailsComponent } from './secciones/informacion/componentes/e-mails/e-mails.component';

import { EditarCorreoComponent } from './secciones/informacion/componentes/datos-personales/componentes/editar-correo/editar-correo.component';
import { EditarUsuarioComponent } from './secciones/informacion/componentes/datos-personales/componentes/editar-usuario/editar-usuario.component';
import { EditarTelefonoComponent } from './secciones/informacion/componentes/datos-personales/componentes/editar-telefono/editar-telefono.component';
import { EditarDocumentoComponent } from './secciones/informacion/componentes/datos-personales/componentes/editar-documento/editar-documento.component';
import { EditarNombreComponent } from './secciones/informacion/componentes/datos-personales/componentes/editar-nombre/editar-nombre.component';
import { EditarDireccionComponent } from './secciones/informacion/componentes/direcciones/componentes/editar-direccion/editar-direccion.component';
import { EditarContrasenaComponent } from './secciones/informacion/componentes/seguridad/componentes/editar-contrasena/editar-contrasena.component';

@NgModule({
  declarations: [
    InformacionComponent,
    PerfilUsuarioComponent,
    MovimientoDineroComponent,
    TuDineroComponent,
    DatosPersonalesComponent,
    SeguridadComponent,
    DireccionesComponent,
    PrivacidadComponent,
    EMailsComponent,
    EditarCorreoComponent,
    EditarUsuarioComponent,
    EditarTelefonoComponent,
    EditarDocumentoComponent,
    EditarNombreComponent,
    EditarDireccionComponent,
    EditarContrasenaComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    InformacionComponent
  ]
})
export class PerfilUsuarioModule { }
