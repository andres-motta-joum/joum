import { ProductoComponent } from './producto.component';
import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'prod/:id',
    component: ProductoComponent
  }
]