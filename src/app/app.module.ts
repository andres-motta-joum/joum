import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';

import { InicioModule } from './navegacion/inicio/inicio.module';
import { RegistroModule } from './navegacion/usuario/registro/registro.module';
import { PerfilModule } from './navegacion/usuario/perfil/perfil.module';
import { VenderModule } from './navegacion/usuario/vender/publicar/vender.module';
import { BusquedaModule } from './navegacion/busqueda//busqueda.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentesGeneralesModule } from './navegacion/componentes-generales/componentes-generales.module';
import { CurrencyPipe } from '@angular/common';

import { ProductoModule } from './navegacion/producto/producto.module';
import { ComprarModule } from './navegacion/comprar/comprar.module';

/*----------- FireBase --------*/
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InicioModule,
    RegistroModule,
    AppRoutingModule,
    NgIconsModule.withIcons({}),
    BrowserAnimationsModule,
    VenderModule,
    PerfilModule,
    ComponentesGeneralesModule,
    BusquedaModule,
    ProductoModule,
    ComprarModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
