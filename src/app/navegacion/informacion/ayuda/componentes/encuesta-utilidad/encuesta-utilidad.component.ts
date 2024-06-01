import { Component, Input, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, increment, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-encuesta-utilidad',
  templateUrl: './encuesta-utilidad.component.html',
  styleUrls: ['./encuesta-utilidad.component.scss']
})
export class EncuestaUtilidadComponent{
  constructor(private firestore: Firestore){}
  @Input() informacion!: string;
  seleccionado!: string;
  seleccionarMotivo = false;
  check = false;
  
  async si(){
    const [seccion, informacion] = this.informacion.split('/');
    await updateDoc(doc(this.firestore, `ayuda/atencion-clientes/${seccion}/${informacion}`), {util: increment(1)});
    this.check = true;
  }

  no(){
    this.seleccionarMotivo = true;
  }

  seleccionar(seleccion: string){
    this.seleccionado = seleccion;
  }

  async enviarEncuesta(){
    if(this.seleccionado){
      const [seccion, informacion] = this.informacion.split('/');
      await updateDoc(doc(this.firestore, `ayuda/atencion-clientes/${seccion}/${informacion}`), {[this.seleccionado]: increment(1)})
      this.check = true;
    }
  }
}
