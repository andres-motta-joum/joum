import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule}  from '@angular/forms';

import { ComponentesGeneralesModule } from '../../componentes-generales/componentes-generales.module';
import { NgIconsModule } from '@ng-icons/core';

import { ComoVenderComponent } from './como-vender.component';
import { EncabezadoVenderComponent } from './encabezado-vender/encabezado-vender.component';
import { AgendarLlamadaComponent } from './agendar-llamada/agendar-llamada.component';
import { FormularioAgendamientoComponent } from './agendar-llamada/componentes/formulario-agendamiento/formulario-agendamiento.component';
import { AgendaDisponibleComponent } from './agendar-llamada/componentes/agenda-disponible/agenda-disponible.component';


@NgModule({
  declarations: [
    ComoVenderComponent,
    EncabezadoVenderComponent,
    AgendarLlamadaComponent,
    FormularioAgendamientoComponent,
    AgendaDisponibleComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgIconsModule,
    ComponentesGeneralesModule,
    CommonModule
  ]
})
export class VenderModule { }
