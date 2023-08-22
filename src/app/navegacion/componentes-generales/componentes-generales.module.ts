import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { FooterComponent } from './footer/footer.component';
import { MenuLateralComponent } from './barra-menu/menu-lateral/menu-lateral.component';
import { MenuSimpleComponent } from './barra-menu/menu-simple/menu-simple.component';
import { NotificacionComponent } from './barra-menu/notificacion/notificacion.component';

@NgModule({
  declarations: [
    BarraMenuComponent,
    FooterComponent,
    MenuLateralComponent,
    MenuSimpleComponent,
    NotificacionComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule,
    FormsModule
  ],
  exports: [
    BarraMenuComponent,
    FooterComponent,
    MenuSimpleComponent,
    MenuLateralComponent
  ]
})
export class ComponentesGeneralesModule { }
