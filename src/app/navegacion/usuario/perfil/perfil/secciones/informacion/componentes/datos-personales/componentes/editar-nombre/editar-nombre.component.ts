import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';
import { matCheck } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-editar-nombre',
  templateUrl: './editar-nombre.component.html',
  styleUrls: ['./editar-nombre.component.scss'],
  providers: [provideIcons({ionClose, matCheck})]
})

export class EditarNombreComponent {
  constructor(private auth:Auth, private firestore: Firestore){}
  @Input() nombre!: string;
  @Output() cerrar = new EventEmitter<void>();
  cargando = false;
  nombreDefecto!: string;
  error = '';
  actualizacionExitosa = false;

  cerrarContenido(){
    this.cerrar.emit();
  }

  ngOnInit(): void {
    this.nombreDefecto = this.nombre;
  }

  async submit(){
    this.nombre = this.nombre.replace(/\s+/g, ' ').trim();
    if(this.nombreDefecto !== this.nombre ){
      const palabras = this.nombre.split(' ');
      const soloLetras = /^[a-zA-Z\s]*$/.test(this.nombre);
      if(palabras.length >= 2 && soloLetras && this.nombre.length >= 6 && !/\d/.test(this.nombre)){
        this.cargando = true;
        const usuarioRef = doc(this.firestore, `usuarios/${this.auth.currentUser!.uid}`);
        await updateDoc(usuarioRef, {
          nombre: this.nombre
        });
        this.actualizacionExitosa = true;
        setTimeout(()=>{
          this.cerrarContenido();
        }, 1700)
      }else{
        this.error = 'El nombre debe coincidir con el formato del documento de identidad.'
      }
    }else{
      //El nombre sigue siendo el mismo
      this.error = 'Ingresa un nombre distinto al actual';
    }
  }
}
