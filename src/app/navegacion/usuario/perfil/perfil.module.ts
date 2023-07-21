import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './perfil-routing.module';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';

import { ComponentesGeneralesModule } from '../../componentes-generales/componentes-generales.module';

import { PerfilComponent } from './perfil.component';
/*-- Perfil --*/
import { PerfilUsuarioModule } from './perfil/perfil-usuario.module';
/*-- Compras --*/
import { ComprasComponent } from './compras/compras/compras.component';
  import { DetalleCompraComponent } from './compras/compras/detalle-compra/detalle-compra.component';
import { FavoritosComponent } from './compras/favoritos/favoritos.component';
import { OpinionesComponent } from './compras/opiniones/opiniones.component';/*-- Ventas --*/
import { MetricasModule } from './ventas/metricas/metricas.module';
import { NovedadesComponent } from './ventas/novedades/novedades.component';
import { PublicacionesComponent } from './ventas/publicaciones/publicaciones.component';
import { ReputacionComponent } from './ventas/reputacion/reputacion.component';
import { ResumenComponent } from './ventas/resumen/resumen.component';
import { VentasModule } from './ventas/ventas/ventas.module';
/*-- Facturación --*/
import { FacturacionModule } from './facturacion/facturacion.module';
import { EnviarMensajeComponent } from './perfil/secciones/enviar-mensaje/enviar-mensaje.component';
import { TuDineroComponent } from './perfil/secciones/tu-dinero/tu-dinero.component';

@NgModule({
  declarations: [
    PerfilComponent,
    ComprasComponent,
    DetalleCompraComponent,
    FavoritosComponent,
    OpinionesComponent,
    NovedadesComponent,
    PublicacionesComponent,
    ReputacionComponent,
    ResumenComponent,
    EnviarMensajeComponent,
    TuDineroComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    PerfilUsuarioModule,
    VentasModule,
    MetricasModule,
    FacturacionModule,
    RouterModule.forChild(routes),
  ]
})
export class PerfilModule { }
