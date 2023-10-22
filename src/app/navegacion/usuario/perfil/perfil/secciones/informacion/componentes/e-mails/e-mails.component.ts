import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { EmailsConfiguracion } from 'src/app/interfaces/usuario/subInterfaces/emails-configuracion';

@Component({
  selector: 'app-e-mails',
  templateUrl: './e-mails.component.html',
  styleUrls: ['./e-mails.component.scss']
})
export class EMailsComponent implements OnInit{
  constructor(private auth: Auth, private firestore: Firestore){}
  @Input() emailsRecibidos!: EmailsConfiguracion;
  private usuarioRef!: DocumentReference<DocumentData>;
  ofertas!: boolean;
  mensajes!: boolean;
  opiniones!: boolean;
  ventas!: boolean;
  publicacionesPorFinalizar!: boolean;
  publicacionesFinalizadas!: boolean;
  compras!: boolean;

  ngOnInit(): void {
    this.usuarioRef = doc(this.firestore, `usuarios/${this.auth.currentUser!.uid}`);
    this.ofertas = this.emailsRecibidos.ofertas;
    this.mensajes = this.emailsRecibidos.mensajes;
    this.opiniones = this.emailsRecibidos.opiniones;
    this.ventas = this.emailsRecibidos.ventas;
    this.publicacionesPorFinalizar = this.emailsRecibidos.publicacionesPorFinalizar;
    this.publicacionesFinalizadas = this.emailsRecibidos.publicacionesFinalizadas;
    this.compras = this.emailsRecibidos.compras;
  }

  async configuracionNotificaciones(dato: string): Promise<void> {
    if(dato === 'ofertas'){
      this.ofertas = !this.ofertas; // Pronombres y agregar ajustes
      this.emailsRecibidos.ofertas = !this.emailsRecibidos.ofertas;
    }
    if(dato === 'mensajes'){
      this.mensajes = !this.mensajes;
      this.emailsRecibidos.mensajes = !this.emailsRecibidos.mensajes;
    }
    if(dato === 'opiniones'){
      this.opiniones = !this.opiniones;
      this.emailsRecibidos.opiniones = !this.emailsRecibidos.opiniones;
    }
    if(dato === 'ventas'){
      this.ventas = !this.ventas;
      this.emailsRecibidos.ventas = !this.emailsRecibidos.ventas;
    }
    if(dato === 'publicacionesPorFinalizar'){
      this.publicacionesPorFinalizar = !this.publicacionesPorFinalizar;
      this.emailsRecibidos.publicacionesPorFinalizar = !this.emailsRecibidos.publicacionesPorFinalizar;
    }
    if(dato === 'publicacionesFinalizadas'){
      this.publicacionesFinalizadas = !this.publicacionesFinalizadas;
      this.emailsRecibidos.publicacionesFinalizadas = !this.emailsRecibidos.publicacionesFinalizadas;
    }
    if(dato === 'compras'){
      this.compras = !this.compras;
      this.emailsRecibidos.compras = !this.emailsRecibidos.compras;
    }
    updateDoc(this.usuarioRef, {emailsRecibidos: this.emailsRecibidos});
  }
}
