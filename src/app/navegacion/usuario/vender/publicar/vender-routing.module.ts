import { Routes } from '@angular/router';

import { PublicarComponent } from './publicar.component';
import { PasoUnoComponent } from './pasos/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pasos/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pasos/paso-tres/paso-tres.component';
import { PasoCuatroComponent } from './pasos/paso-cuatro/paso-cuatro.component';
import { PasoCincoComponent } from './pasos/paso-cinco/paso-cinco.component';
import { PasoSeisComponent } from './pasos/paso-seis/paso-seis.component';

export const routes: Routes = [
  {
    path: 'vender/formulario',
    component: PublicarComponent,
    children: [
      {
        path: 'paso1',
        component: PasoUnoComponent
      },
      {
        path: 'paso2',
        component: PasoDosComponent
      },
      {
        path: 'paso3',
        component: PasoTresComponent
      },
      {
        path: 'paso4',
        component: PasoCuatroComponent
      },
      {
        path: 'paso5',
        component: PasoCincoComponent
      },
      {
        path: 'paso6',
        component: PasoSeisComponent
      },
    ]
  }
]
