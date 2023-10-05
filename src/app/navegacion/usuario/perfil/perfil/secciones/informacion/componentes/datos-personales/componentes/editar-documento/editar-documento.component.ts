import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';
import { ionChevronDown } from '@ng-icons/ionicons';
import { matCheck } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-editar-documento',
  templateUrl: './editar-documento.component.html',
  styleUrls: ['./editar-documento.component.scss'],
  providers: [provideIcons({ionClose, ionChevronDown, matCheck})]
})

export class EditarDocumentoComponent {
  constructor(private auth:Auth, private firestore: Firestore){}
  @Input() documento!: number;
  @Input() tipoDocumento!: string;
  @Output() cerrar = new EventEmitter<void>();
  cargando = false;
  documentoDefecto!: number;
  tipoDocumentoDefecto!: string;
  error = '';
  actualizacionExitosa = false;

  cerrarContenido(){
    this.cerrar.emit();
  }

  ngOnInit(): void {
    if(this.tipoDocumento == undefined){
      this.tipoDocumento = 'CC'
    }
    this.documentoDefecto = this.documento;
    this.tipoDocumentoDefecto = this.tipoDocumento;
  }

  async submit(){
    if(this.documentoDefecto !== this.documento || this.tipoDocumentoDefecto !== this.tipoDocumento){
      if(this.documento.toString().length == 10){
        this.cargando = true;
        const usuarioRef = doc(this.firestore, `usuarios/${this.auth.currentUser!.uid}`);
        await updateDoc(usuarioRef, {
          documento: this.documento,
          tipoDocumento: this.tipoDocumento
        });
        this.actualizacionExitosa = true;
        setTimeout(()=>{
          this.cerrarContenido();
        }, 1700)
      }else{
        this.error = 'Cedula inválida'
      }
    }else{
      //El documento sigue siendo el mismo
      this.error = 'Ingresa un documento distinto al actual';
    }
  }
}
