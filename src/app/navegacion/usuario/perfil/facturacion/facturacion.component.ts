import { Component, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { provideIcons } from '@ng-icons/core';
import { matEdit } from '@ng-icons/material-icons/baseline';
import { matKeyboardArrowDown } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss'],
  providers: [provideIcons({matEdit, matKeyboardArrowDown})]
})
export class FacturacionComponent {
  constructor(private router: Router, private firestore: Firestore, private auth: Auth, private authService: AuthService){}
  user!: string;
  nombre!: string;
  documento!: string;

  facturasReportes = false;
  retenciones = false;

  ngOnInit(): void {
    this.obtenerUrl()
    this.router.events.subscribe( event =>{
      if (event instanceof NavigationEnd) {
        this.obtenerUrl()
      }
    })
    this.auth.onAuthStateChanged(async (user)=>{
      if(user){
        const usuario = await this.authService.getUsuarioIdPromise(user.uid);
        this.user = usuario.usuario;
        this.nombre = usuario.nombre;
        this.documento = usuario.tipoDocumento + ' ' + usuario.documento ;
      }
    })
  }

  obtenerUrl(){
    const url = this.router.url.split('/')[3];
    switch (url) {
      case 'facturas-reportes':
        this.facturasReportes = true; this.retenciones = false;
        break;
      case 'retenciones':
        this.facturasReportes = false; this.retenciones = true;
        break;
      default:
        this.facturasReportes = false; this.retenciones = false;
    } 
  }

  navegar(ruta: string):void{
    this.router.navigate([ruta]);
    window.scroll(0,0);
  }

}
