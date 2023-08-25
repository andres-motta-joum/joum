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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore,getFirestore, connectFirestoreEmulator} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    InformacionModule,
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
    ComprarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      return auth
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      return firestore;
    })
    
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
