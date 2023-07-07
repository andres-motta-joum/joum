import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms'

import { RouterModule } from '@angular/router';
import { routes } from './vender-routing.module';

import { ComponentesGeneralesModule } from 'src/app/navegacion/componentes-generales/componentes-generales.module';

import { PublicarComponent } from './publicar.component';
import { PasoUnoComponent } from './pasos/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pasos/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pasos/paso-tres/paso-tres.component';
import { PasoCuatroComponent } from './pasos/paso-cuatro/paso-cuatro.component';
import { PasoCincoComponent } from './pasos/paso-cinco/paso-cinco.component';
import { PasoSeisComponent } from './pasos/paso-seis/paso-seis.component';
/*--------  Pasos para vender ----------*/
import { ComoVenderComponent } from '../como-vender/como-vender.component';
import { PasosComponent } from '../como-vender/componentes/pasos/pasos.component';
import { ParteSuperiorComponent } from '../como-vender/componentes/parte-superior/parte-superior.component';

@NgModule({
  declarations: [
    PublicarComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoCuatroComponent,
    PasoCincoComponent,
    PasoSeisComponent,
    ComoVenderComponent,
    PasosComponent,
    ParteSuperiorComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ComponentesGeneralesModule,
    RouterModule.forChild(routes),
    CommonModule,
    NgIconsModule.withIcons({})
  ]
})
export class VenderModule { }
