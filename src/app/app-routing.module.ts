import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './navegacion/inicio/inicio.component'; 


import { ComoVenderComponent } from './navegacion/usuario/vender/como-vender/como-vender.component';
import { DetalleVentaComponent } from './navegacion/usuario/perfil/ventas/ventas/detalle-venta/detalle-venta.component';
import { EnviarMensajeComponent } from './navegacion/usuario/perfil/perfil/secciones/enviar-mensaje/enviar-mensaje.component';

const routes: Routes = [
  { 
    path: '', component: InicioComponent
  },
  { 
    path: 'vender', component: ComoVenderComponent
  },
  /*------ Sección Perfil ------*/
  {
    path: ':id/ventas/detalle-venta',
    component: DetalleVentaComponent
  },
  {
    path: ':id/:id/enviar-mensaje',
    component: EnviarMensajeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
