import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnviarMensajeComponent } from './enviar-mensaje.component';
import { ComponentesGeneralesModule } from 'src/app/navegacion/componentes-generales/componentes-generales.module';
import { MensajeComponent } from './componentes/mensaje/mensaje.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EnviarMensajeComponent,
    MensajeComponent,
    ProductoComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ComponentesGeneralesModule
  ],
  exports: [
    EnviarMensajeComponent
  ]
})
export class EnviarMensajeModule { }
