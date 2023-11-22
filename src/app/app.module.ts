import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';

import { InicioModule } from './navegacion/inicio/inicio.module';
import { RegistroModule } from './navegacion/usuario/registro/registro.module';
import { PerfilModule } from './navegacion/usuario/perfil/perfil.module';
import { VenderModule } from './navegacion/usuario/vender/publicar/vender.module';
import { BusquedaModule } from './navegacion/busqueda//busqueda.module';
import { InformacionModule } from './navegacion/informacion/informacion.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentesGeneralesModule } from './navegacion/componentes-generales/componentes-generales.module';
import { CurrencyPipe } from '@angular/common';

import { ProductoModule } from './navegacion/producto/producto.module';
import { ComprarModule } from './navegacion/comprar/comprar.module';

/*----------- FireBase --------*/
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { provideAuth,getAuth} from '@angular/fire/auth';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { FirebaseAppModule, getApp } from '@angular/fire/app';
import { PortalEmpleadoModule } from './navegacion/usuario/portal-empleado/portal-empleado.module';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InformacionModule,
    PortalEmpleadoModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
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
    ComprarModule,

  ],
  providers: [CurrencyPipe, FirebaseAppModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

