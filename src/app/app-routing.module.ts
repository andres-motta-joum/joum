import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './navegacion/inicio/inicio.component'; 

import { PortalEmpleadoComponent } from './navegacion/usuario/portal-empleado/portal-empleado.component';
import { ComoVenderComponent } from './navegacion/usuario/vender/como-vender/como-vender.component';
import { DetalleVentaComponent } from './navegacion/usuario/perfil/ventas/ventas/detalle-venta/detalle-venta.component';
import { EnviarMensajeComponent } from './navegacion/usuario/perfil/perfil/secciones/enviar-mensaje/enviar-mensaje.component';
import { OfertasDelDiaComponent } from './navegacion/busqueda/secciones/ofertas-del-dia/ofertas-del-dia.component';

const routes: Routes = [

  { 
    path: '', component: InicioComponent
  },
  { 
    path: 'vender', component: ComoVenderComponent
  },
  {
    path: 'ofertas-del-dia', component: OfertasDelDiaComponent
  },
  /*------ Sección Perfil ------*/
  {
    path: ':id/ventas/detalle-venta/:id', component: DetalleVentaComponent
  },
  {
    path: ':id/:id/:id/enviar-mensaje', component: EnviarMensajeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
