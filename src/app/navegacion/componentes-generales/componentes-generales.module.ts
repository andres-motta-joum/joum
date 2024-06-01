import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { FooterComponent } from './footer/footer.component';
import { MenuLateralComponent } from './barra-menu/menu-lateral/menu-lateral.component';
import { MenuSimpleComponent } from './barra-menu/menu-simple/menu-simple.component';
import { NotificacionComponent } from './barra-menu/notificacion/notificacion.component';
import { CargandoComponent } from './cargando/cargando.component';
import { BotonCompraComponent } from './boton-compra/boton-compra.component';
import { BotonCarritoComponent } from './boton-carrito/boton-carrito.component';

@NgModule({
  declarations: [
    BarraMenuComponent,
    FooterComponent,
    MenuLateralComponent,
    MenuSimpleComponent,
    NotificacionComponent,
    CargandoComponent,
    BotonCompraComponent,
    BotonCarritoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    NgIconsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BarraMenuComponent,
    FooterComponent,
    MenuSimpleComponent,
    MenuLateralComponent,
    CargandoComponent,
    BotonCompraComponent,
    BotonCarritoComponent
  ]
})
export class ComponentesGeneralesModule { }
