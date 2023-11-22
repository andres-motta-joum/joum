import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
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
import { fotosProductoComponent } from './componentes/fotos-producto/fotos-producto.component';
import { OpinionesComponent } from './componentes/opiniones/opiniones.component';
import { DatosProductoTresComponent } from './componentes/datos-producto-tres/datos-producto-tres.component';
import { FormsModule } from '@angular/forms';

import localeEs from '@angular/common/locales/es';
import { ComprasInhabilitadasComponent } from './componentes/datos-producto/compras-inhabilitadas/compras-inhabilitadas.component';
import { EncabezadoNavegadorComponent } from './componentes/encabezado-navegador/encabezado-navegador.component';
registerLocaleData(localeEs);
@NgModule({
  declarations: [
    ProductoComponent,
    DescripcionComponent,
    DatosVendedorComponent,
    DatosProductoComponent,
    DatosProductoDosComponent,
    fotosProductoComponent,
    OpinionesComponent,
    DatosProductoTresComponent,
    ComprasInhabilitadasComponent,
    EncabezadoNavegadorComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule,
    ComponentesGeneralesModule,
    InicioModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ]
})
export class ProductoModule { }
