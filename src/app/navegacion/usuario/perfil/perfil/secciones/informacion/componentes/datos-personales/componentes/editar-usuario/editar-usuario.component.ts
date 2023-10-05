import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';
import { matCheck } from '@ng-icons/material-icons/baseline';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
  providers: [provideIcons({ionClose, matCheck})]
})
export class EditarUsuarioComponent {
  constructor(private auth:Auth, private router: Router, private firestore: Firestore, private authService: AuthService){}
  @Input() usuario!: string;
  @Output() cerrar = new EventEmitter<void>();
  cargando = false;
  usuarioDefecto!: string;
  error = '';
  actualizacionExitosa = false;

  cerrarContenido(){
    this.cerrar.emit();
  }

  ngOnInit(): void {
    this.usuarioDefecto = this.usuario;
  }

  async submit(){
    this.usuario = this.usuario.toUpperCase();
    this.usuario = this.usuario.replace(/[^A-Za-z0-9-_Ññ]/g, '');
    if(this.usuarioDefecto !== this.usuario ){
      if(this.usuario.length >= 4){
        const numerosEnCadena = this.usuario.match(/[0-9]/g);
        if ((numerosEnCadena && numerosEnCadena.length <= 6) || numerosEnCadena == null ) { //Verificar el exceso de numeros
          this.cargando = true;
          const existe = await this.authService.getNombreUsuarioExistente(this.usuario);
          if(!existe){
            const usuarioRef = doc(this.firestore, `usuarios/${this.auth.currentUser!.uid}`);
            await updateDoc(usuarioRef, {
              usuario: this.usuario
            });
            this.actualizacionExitosa = true;
            setTimeout(()=>{
              this.cerrarContenido();
              this.router.navigate([this.usuario + `/perfil/informacion`]);
            }, 1700)
          }else{
            this.cargando = false;
            this.error = 'Este usuario ya está en uso.';
          }
        } else {
          this.error = 'Exceso de numeros';
        }
      }else{
        this.error = 'Nombre de usuario muy corto';
      }
    }else{
      //El usuario sigue siendo el mismo
      this.error = 'Ingresa un usuario diferente';
    }
  }

  toUpper(event: any){
    this.usuario = this.usuario.toUpperCase();
    const value = event.target.value;
    if(this.usuario.length >= 21){
      this.usuario = value.slice(0, 20);
    }
    event.target.value = value.replace(/[^A-Za-z0-9-_Ññ]/g, ''); // Filtra caracteres no deseados
  }

  lenghtPermitidos(event: any){
    const valor = event.target.value;
    const tecla = event.key;
    if ((valor.length >= 20  && event.keyCode !== 8) || tecla == ' ') {
      event.preventDefault();
    }
  }

}
