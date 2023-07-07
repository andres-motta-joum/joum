import { Routes } from '@angular/router'
import { BusquedaComponent } from './busqueda.component'

export const routes: Routes = [
  {
    path: 'busqueda/:id',
    component: BusquedaComponent
  }
]