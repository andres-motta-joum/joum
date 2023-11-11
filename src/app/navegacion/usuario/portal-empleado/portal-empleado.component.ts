import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Component({
  selector: 'app-portal-empleado',
  templateUrl: './portal-empleado.component.html',
  styleUrls: ['./portal-empleado.component.scss']
})
export class PortalEmpleadoComponent implements OnInit, OnDestroy{
  constructor( private router: Router ,private auth: Auth, private firestore: Firestore){}
  private routeSubscription!: Subscription;
  usuarioId!: string;
  acceso = false;
  seccion!: string;

  ngOnInit(): void {
    this.obtenerSeccion();
    this.auth.onAuthStateChanged(async (user)=>{
      if(user){
        const url = this.router.url.split('/')[2];
        if(url == user.uid){
          const usuarioSnapshot = await getDoc(doc(this.firestore, `usuarios-internos/${user.uid}`));
          if(usuarioSnapshot.exists()){
            this.acceso = true;
            this.usuarioId = usuarioSnapshot.id;
          }else{
            this.router.navigate(['']);
          }
        }else{
          this.router.navigate(['']);
        }
      }else{
        this.router.navigate(['']);
      }
    })
  }

  obtenerSeccion(){
    this.seccion = this.router.url.split('/')[3];
    if(!this.seccion){
      this.seccion = 'tickets'
    }
    this.routeSubscription = this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
          this.seccion = this.router.url.split('/')[3];
        }
    });
  }

  navegar(ruta: string){
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }
}
