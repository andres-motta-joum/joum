import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../perfil-routing.module';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

import { InformacionComponent } from './secciones/informacion/informacion.component';
import { ProductosComponent } from './secciones/productos/productos.component';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { EditarDatosComponent } from './secciones/editar-datos/editar-datos.component';
import { ReactiveFormsModule}  from '@angular/forms';

import { RouterModule } from '@angular/router';
/*---------- Componentes internos ---------*/
import { TuDineroComponent } from './secciones/tu-dinero/tu-dinero.component';
import { MovimientoDineroComponent } from './secciones/tu-dinero/componentes/movimiento-dinero/movimiento-dinero.component';
import { ProductoComponent } from './secciones/productos/componentes/producto/producto.component';


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
import { EditarPermisosPrivacidadComponent } from './secciones/informacion/componentes/privacidad/componentes/editar-permisos-privacidad/editar-permisos-privacidad.component';
import { EliminarCuentaComponent } from './secciones/informacion/componentes/privacidad/componentes/eliminar-cuenta/eliminar-cuenta.component';

@NgModule({
  declarations: [
    InformacionComponent,
    ProductosComponent,
    PerfilUsuarioComponent,
    EditarDatosComponent,
    MovimientoDineroComponent,
    TuDineroComponent,
    ProductoComponent,
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
    EditarContrasenaComponent,
    EditarPermisosPrivacidadComponent,
    EliminarCuentaComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    EditarDatosComponent,
    InformacionComponent,
    ProductosComponent
  ]
})
export class PerfilUsuarioModule { }
