import { Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda.component';
import { CarritoComponent } from './secciones/carrito/carrito.component';
import { HistorialComponent } from './secciones/historial/historial.component';
import { GuardadosComponent } from './secciones/carrito/secciones/guardados/guardados.component';
import { CarritoSeccionComponent } from './secciones/carrito/secciones/carrito/carrito.component';

export const routes: Routes = [
  {
    path: 'busqueda/:id',
    component: BusquedaComponent
  },
  {
    path: ':id/historial',
    component: HistorialComponent
  },
  {
    path: ':id',
    component: CarritoComponent,
    children: [
      {
        path: 'carrito',
        component: CarritoSeccionComponent,
      },
      {
        path: 'guardados',
        component: GuardadosComponent,
      }
    ]
  }

]