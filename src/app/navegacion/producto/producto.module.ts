import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { ProductoComponent } from './producto.component';
import { RouterModule } from '@angular/router'
import { routes } from './producto-routing.module';
import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';
import { InicioModule } from '../inicio/inicio.module';
import { DescripcionComponent } from './componentes/descripcion/descripcion.component';
import { DatosVendedorComponent } from './componentes/datos-vendedor/datos-vendedor.component';
import { DatosProductoComponent } from './componentes/datos-producto/datos-producto.component';
import { DatosProductoDosComponent } from './componentes/datos-producto-dos/datos-producto-dos.component';
import { FotosProductoComponent } from './componentes/fotos-producto/fotos-producto.component';
import { OpinionesComponent } from './componentes/opiniones/opiniones.component';
import { DatosProductoTresComponent } from './componentes/datos-producto-tres/datos-producto-tres.component';

@NgModule({
  declarations: [
    ProductoComponent,
    DescripcionComponent,
    DatosVendedorComponent,
    DatosProductoComponent,
    DatosProductoDosComponent,
    FotosProductoComponent,
    OpinionesComponent,
    DatosProductoTresComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule,
    ComponentesGeneralesModule,
    InicioModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductoModule { }
