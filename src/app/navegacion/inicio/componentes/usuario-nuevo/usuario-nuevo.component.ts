import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { ionChevronDown } from '@ng-icons/ionicons';
import { matCheck } from '@ng-icons/material-icons/baseline';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.scss'],
  providers: [provideIcons({heroXMark, ionChevronDown, matCheck})]
})
export class UsuarioNuevoComponent implements OnInit{
  constructor(private auth: Auth, private authService: AuthService, private firestore: Firestore){}
  @Output() cerrar = new EventEmitter<void>();
  nombre!: string;
  error = '';
  cargando = false;
  actualizacionExitosa = false;
  documento = '';
  tipoDocumento = 'CC';
  reenviado = false;

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.nombre = user.displayName!.split(' ')[0];
      }
    })
  }

  async enviarCorreo(){
    if(!this.reenviado){
      this.reenviado = true;
      await this.authService.sendEmail(this.auth.currentUser!);
    }
  }

  async enviarDocumento(){
    if(!this.cargando){
      if(this.documento.toString().length == 10){
        this.cargando = true;
        const usuarioRef = doc(this.firestore, `usuarios/${this.auth.currentUser!.uid}`);
        await updateDoc(usuarioRef, {
          documento: this.documento,
          tipoDocumento: this.tipoDocumento
        });
        this.actualizacionExitosa = true;
        setTimeout(()=>{
          this.cerrarVentana();
        }, 1600)
      }else{
        this.error = 'Documento inválido'
      }
    }
  }

  @HostListener('document:click')
  cerrarVentana(){
    this.authService.usuarioNuevo = false;
    this.cerrar.emit();
  }
}
