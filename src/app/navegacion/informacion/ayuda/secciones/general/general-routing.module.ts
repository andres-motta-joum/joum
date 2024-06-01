import { Routes } from "@angular/router";
import { AyudaGeneralComponent } from "./general.component";
import { CuponesComponent } from "./secciones/cupones/cupones.component";
import { VersionMovilComponent } from "./secciones/version-movil/version-movil.component";


export const routes: Routes = [
  {
    path: '',
    component: AyudaGeneralComponent,
    children: [
      {
        path: '',
        component: CuponesComponent
      },
      {
        path: 'cupones',
        component: CuponesComponent
      },
      {
        path: 'version-movil',
        component: VersionMovilComponent
      }
    ]
  }
]
