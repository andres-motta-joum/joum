import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './navegacion/inicio/inicio.component'; 

import { SaldosPendientesComponent } from './navegacion/usuario/perfil/facturacion/secciones/saldos-pendientes/saldos-pendientes.component';

import { ComoVenderComponent } from './navegacion/usuario/vender/como-vender/como-vender.component';
import { DetalleVentaComponent } from './navegacion/usuario/perfil/ventas/ventas/detalle-venta/detalle-venta.component';
import { EnviarMensajeComponent } from './navegacion/usuario/perfil/ventas/ventas/enviar-mensaje/enviar-mensaje.component';

const routes: Routes = [
  { 
    path: '', component: InicioComponent
  },
  { 
    path: 'vender', component: ComoVenderComponent
  },
  /* ---- sección perfil -----*/
  {
    path: ':id/facturacion/saldos-pendientes',
    component: SaldosPendientesComponent
  },
  /*------ Sección Perfil/Ventas ------*/
  {
    path: ':id/ventas/detalle-venta',
    component: DetalleVentaComponent
  },
  {
    path: ':id/ventas/detalle-venta/enviar-mensaje',
    component: EnviarMensajeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
