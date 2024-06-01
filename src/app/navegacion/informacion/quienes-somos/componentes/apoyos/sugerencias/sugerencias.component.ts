import { Component, EventEmitter, Output } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { provideIcons } from '@ng-icons/core';
import { matCheck } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.scss'],
  providers: [provideIcons({matCheck})]
})
export class SugerenciasComponent {
  constructor(private firestore: Firestore){}
  @Output() cerrar = new EventEmitter<void>();
  descripcion!: string | null | undefined;
  descripcionError = false;
  actualizacionExitosa = false;
  cargando = false;

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    navigator.clipboard.readText().then((text) => {
      document.execCommand('insertText', false, text);
    });
  }
  
  onInputChange(event: any) {
    this.descripcion = event.target.innerText;
  }

  focus(){
    if(this.descripcion == null){
      this.descripcion = '';
    }
  }

  async enviarEncuesta(){
    if(!this.cargando){
      if(this.descripcion){
        this.cargando = true;
        this.descripcionError = false;
        await addDoc(collection(this.firestore, 'cookies/informacion/sugerencias'), {descripcion: this.descripcion});
        this.cargando = false;
        this.actualizacionExitosa = true;
        setTimeout(()=>{
          this.cerrar.emit()
        }, 1550)
      }else{
        this.descripcionError = true;
      }
    }
  }
}
