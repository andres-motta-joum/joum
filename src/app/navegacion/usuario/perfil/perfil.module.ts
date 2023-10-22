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
import { OpinionesComponent } from './compras/opiniones/opiniones.component';
/*-- Ventas --*/
import { MetricasModule } from './ventas/metricas/metricas.module';
import { NovedadesComponent } from './ventas/novedades/novedades.component';
import { PublicacionesComponent } from './ventas/publicaciones/publicaciones.component';
import { ReputacionComponent } from './ventas/reputacion/reputacion.component';
import { ResumenComponent } from './ventas/resumen/resumen.component';
import { VentasModule } from './ventas/ventas/ventas.module';
/*-- Facturación --*/
import { FacturacionModule } from './facturacion/facturacion.module';
import { EnviarMensajeModule } from './perfil/secciones/enviar-mensaje/enviar-mensaje.module';

/*-- componentes internos __*/
import { PublicacionComponent } from './ventas/publicaciones/componentes/publicacion/publicacion.component';
import { CompraComponent } from './compras/compras/componentes/compra/compra.component';
import { FavoritoComponent } from './compras/favoritos/componentes/favorito/favorito.component';
import { OpinionComponent } from './compras/opiniones/componentes/opinion/opinion.component';
import { NovedadComponent } from './ventas/novedades/componentes/novedad/novedad.component';
import { ProductoComponent } from './compras/compras/detalle-compra/producto/producto.component';

import { ChatsService } from 'src/app/servicios/chats/chats.service';
import { EditarPublicacionModule } from './ventas/publicaciones/editar-publicacion/editar-publicacion.module';

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
    PublicacionComponent,
    CompraComponent,
    FavoritoComponent,
    OpinionComponent,
    NovedadComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    EditarPublicacionModule,
    ComponentesGeneralesModule,
    NgIconsModule,
    PerfilUsuarioModule,
    VentasModule,
    MetricasModule,
    FacturacionModule,
    EnviarMensajeModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ChatsService
  ]
})
export class PerfilModule { }
