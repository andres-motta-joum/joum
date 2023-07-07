import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';

import { PerfilUsuarioComponent } from './perfil/perfil-usuario.component';
/*---------  Secciones Perfil Usuario  -----------*/
  import { InformacionComponent } from './perfil/secciones/informacion/informacion.component';
  import { ProductosComponent } from './perfil/secciones/productos/productos.component';
  import { VideosComponent } from './perfil/secciones/videos/videos.component';
  import { EditarDatosComponent } from '../perfil/perfil/secciones/editar-datos/editar-datos.component';

import { ComprasComponent } from './compras/compras/compras.component';
import { FavoritosComponent } from './compras/favoritos/favoritos.component';
import { OpinionesComponent } from './compras/opiniones/opiniones.component';
import { PreguntasCompradorComponent } from './compras/preguntas-comprador/preguntas-comprador.component';

import { MetricasComponent } from './ventas/metricas/metricas.component';
/*---------  Secciones Métricas  -----------*/
  import { NegocioComponent } from './ventas/metricas/secciones/negocio/negocio.component';
  import { AtencionCompradoresComponent } from './ventas/metricas/secciones/atencion-compradores/atencion-compradores.component';
  import { StockComponent } from './ventas/metricas/secciones/stock/stock.component';
import { NovedadesComponent } from './ventas/novedades/novedades.component';
import { PreguntasVendedorComponent } from './ventas/preguntas-vendedor/preguntas-vendedor.component';
import { PublicacionesComponent } from './ventas/publicaciones/publicaciones.component';
import { ReputacionComponent } from './ventas/reputacion/reputacion.component';
import { ResumenComponent } from './ventas/resumen/resumen.component';
import { VentasComponent } from './ventas/ventas/ventas.component';
/*---------  Secciones Ventas  -----------*/
  import { EnviarMensajeComponent } from './ventas/ventas/enviar-mensaje/enviar-mensaje.component';
  import { DetalleVentaComponent } from './ventas/ventas/detalle-venta/detalle-venta.component';


import { FacturacionComponent } from './facturacion/facturacion.component';
/*---------  Secciones facturación  -----------*/
  import { SaldosPendientesComponent } from './facturacion/secciones/saldos-pendientes/saldos-pendientes.component';
  import { ResumenFacturacionComponent } from './facturacion/secciones/resumen-facturacion/resumen-facturacion.component';
  import { FacturasReportesComponent } from './facturacion/secciones/facturas-reportes/facturas-reportes.component';
export const routes: Routes = [
  {
    path: ':id',
    component: PerfilComponent,
    children: [
      {/*---------------  Perfil -----------*/
        path: 'perfil',
        component: PerfilUsuarioComponent,
        children: [
          {
            path: 'informacion',
            component: InformacionComponent
          },
          {
            path: 'productos',
            component: ProductosComponent
          },
          {
            path: 'videos',
            component: VideosComponent
          },
        ]
      },
      {
        path: 'perfil/editar-datos',
        component: EditarDatosComponent
      },
      {
        path: 'facturacion/editar-datos',
        component: EditarDatosComponent
      },/*-----------------------------------------*/
      {
        path: 'compras',
        component: ComprasComponent
      },
      {
        path: 'favoritos',
        component: FavoritosComponent
      },
      {
        path: 'opiniones',
        component: OpinionesComponent
      },
      {
        path: 'preguntas-comprador',
        component: PreguntasCompradorComponent
      },
      {
        path: 'metricas',
        component: MetricasComponent,
        children: [
          {
            path: 'negocio',
            component: NegocioComponent
          },
          {
            path: 'atencion-compradores',
            component: AtencionCompradoresComponent
          },
          {
            path: 'stock',
            component: StockComponent
          },
        ]
      },
      {
        path: 'novedades',
        component: NovedadesComponent
      },
      {
        path: 'preguntas-vendedor',
        component: PreguntasVendedorComponent
      },
      {
        path: 'publicaciones',
        component: PublicacionesComponent
      },
      {
        path: 'reputacion',
        component: ReputacionComponent
      },
      {
        path: 'resumen',
        component: ResumenComponent
      },

      /*------- Seccion Ventas-------*/
      {
        path: 'ventas',
        component: VentasComponent
      },
      /*---------  Seccion Facturación  ----------*/
      {
        path: 'facturacion',
        component: FacturacionComponent
      },
      {
        path: 'facturacion/resumen-facturacion',
        component: ResumenFacturacionComponent
      },
      {
        path: 'facturacion/facturas-reportes',
        component: FacturasReportesComponent
      }

    ]
  }
    
]