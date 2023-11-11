import { Routes } from "@angular/router";
import { AyudaGeneralComponent } from "./general.component";
import { CuponesComponent } from "./secciones/cupones/cupones.component";
import { PublicarProductoComponent } from "./secciones/publicar-producto/publicar-producto.component";
import { ModificarPublicacionComponent } from "./secciones/modificar-publicacion/modificar-publicacion.component";
import { PromocionesComponent } from "./secciones/promociones/promociones.component";
import { VersionMovilComponent } from "./secciones/version-movil/version-movil.component";
import { SeguidoresComponent } from "./secciones/seguidores/seguidores.component";


export const routes: Routes = [
  {
    path: '',
    component: AyudaGeneralComponent,
    children: [
      {
        path: '',
        component: PublicarProductoComponent
      },
      {
        path: 'publicar-producto',
        component: PublicarProductoComponent
      },
      {
        path: 'modificar-publicacion',
        component: ModificarPublicacionComponent
      },
      {
        path: 'seguidores',
        component: SeguidoresComponent
      },
      {
        path: 'promociones',
        component: PromocionesComponent
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
