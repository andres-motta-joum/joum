import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Notificacion, NotificacionesRecibidas } from 'src/app/interfaces/usuario/subInterfaces/notificacion';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone, private router: Router, private authService: AuthService, private auth: Auth, private firestore: Firestore){}
  private userSubscription!: Subscription;
  descuentos!: boolean;
  ventas!: boolean;
  publicaciones!: boolean;
  reclamos!: boolean;
  mensajes!: boolean;

  notificaciones!: Notificacion[];
  usuarioId!: string;
  notificacionesVistas!: Notificacion[];
  notificacionesRecibidas!: NotificacionesRecibidas;

  private usuarioRef!: DocumentReference<DocumentData>;
  ngOnInit() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        await this.obtenerusuario(uid);
        this.usuarioRef = doc(this.firestore, `usuarios/${this.usuarioId}`);
        await setDoc(this.usuarioRef, {notificaciones: this.notificacionesVistas}, {merge: true});
      } else {
        this.router.navigate(['cuenta/crear-cuenta']);
      }
    });
  }

  obtenerusuario(usuario: string): Promise<void>{
    return new Promise((resolve, reject) => {
      this.userSubscription = this.authService.getUsuarioId(usuario).subscribe((usuario)=>{
        if(usuario){
          this.usuarioId = usuario.id!;
          this.notificacionesVistas = usuario.notificaciones!;
          this.notificacionesRecibidas = usuario.notificacionesRecibidas;
          const notOnn = usuario.notificacionesRecibidas;
          this.descuentos = notOnn?.ofertasDecuentos!;
          this.ventas = notOnn?.ventas!;
          this.publicaciones = notOnn?.publicaciones!;
          this.reclamos = notOnn?.reclamos!;
          this.mensajes = notOnn?.mensajes!;
          let notificaciones: Notificacion[] = [];
          if(usuario.notificaciones){
            for(let [index, notificacion] of usuario.notificaciones.entries()){
              this.notificacionesVistas[index].visto = true;
              notificaciones.unshift(notificacion);
            }
          }
          this.notificaciones = notificaciones;
          resolve();
        }else{
          this.router.navigate(['']);
        }
      })
    });
  }

  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  async configuracionNotificaciones(dato: string): Promise<void> {
    if(dato === 'descuentos'){
      this.descuentos = !this.descuentos; // Pronombres y agregar ajustes
      this.notificacionesRecibidas.ofertasDecuentos = !this.notificacionesRecibidas.ofertasDecuentos;
      await updateDoc(this.usuarioRef, {notificacionesRecibidas: this.notificacionesRecibidas});
    }
    if(dato === 'ventas'){
      this.ventas = !this.ventas;
      this.notificacionesRecibidas.ventas = !this.notificacionesRecibidas.ventas;
      await updateDoc(this.usuarioRef, {notificacionesRecibidas: this.notificacionesRecibidas});
    }
    if(dato === 'publicaciones'){
      this.publicaciones = !this.publicaciones;
      this.notificacionesRecibidas.publicaciones = !this.notificacionesRecibidas.publicaciones;
      await updateDoc(this.usuarioRef, {notificacionesRecibidas: this.notificacionesRecibidas});
    }
    if(dato === 'reclamos'){
      this.reclamos = !this.reclamos;
      this.notificacionesRecibidas.reclamos = !this.notificacionesRecibidas.reclamos;
      await updateDoc(this.usuarioRef, {notificacionesRecibidas: this.notificacionesRecibidas});
    }
    if(dato === 'mensajes'){
      this.mensajes = !this.mensajes;
      this.notificacionesRecibidas.mensajes = !this.notificacionesRecibidas.mensajes;
      await updateDoc(this.usuarioRef, {notificacionesRecibidas: this.notificacionesRecibidas});
    }
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
