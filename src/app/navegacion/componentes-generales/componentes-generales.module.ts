import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { RouterModule } from '@angular/router';

import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { FooterComponent } from './footer/footer.component';
import { MenuLateralComponent } from './barra-menu/menu-lateral/menu-lateral.component';
import { MenuSimpleComponent } from './barra-menu/menu-simple/menu-simple.component';

@NgModule({
  declarations: [
    BarraMenuComponent,
    FooterComponent,
    MenuLateralComponent,
    MenuSimpleComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule
  ],
  exports: [
    BarraMenuComponent,
    FooterComponent,
    MenuSimpleComponent,
    MenuLateralComponent
  ]
})
export class ComponentesGeneralesModule { }
