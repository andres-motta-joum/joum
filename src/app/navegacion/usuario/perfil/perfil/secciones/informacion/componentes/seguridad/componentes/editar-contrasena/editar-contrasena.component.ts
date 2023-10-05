import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auth, GoogleAuthProvider, getAuth, reauthenticateWithPopup, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-editar-contrasena',
  templateUrl: './editar-contrasena.component.html',
  styleUrls: ['./editar-contrasena.component.scss'],
  providers: [provideIcons({ionClose})]
})
export class EditarContrasenaComponent {
  constructor(private auth:Auth, private authService: AuthService, private firestore: Firestore){}
  @Output() cerrar = new EventEmitter<void>();
  password!: string;
  cargando = false;
  ingresarContrasena = false;
  ingresarCodigoEmail = false;
  ingresarNuevaContrasena = false;
  error = '';
  actualizacionExitosa = false;


  ngOnInit(): void {
    this.ingresarContrasena = this.auth.currentUser!.providerData.some(provide => provide.providerId === 'password');
    if(!this.ingresarContrasena){
      this.ingresarCodigoEmail = true;
    }
  }

  cerrarContenido(){
    this.cerrar.emit();
  }

  async validarcontrasena(){
    this.cargando = true;
    this.error = '';
    const email = this.auth.currentUser!.email!; // reemplaza esto con el correo electrónico del usuario

    signInWithEmailAndPassword(this.auth, email, this.password)
      .then(async () => {
        this.cargando = false;
        this.ingresarNuevaContrasena = true;
      })
      .catch((error) => {
        this.cargando = false;
        // Error al iniciar sesión
        if(error = 'auth/wrong-password'){
          this.error = 'Contraseña incorrecta';
        }else{
          console.log(error)
        }
      });
  }

  async reautenticarGmail(){
    this.error = '';
    const provider = new GoogleAuthProvider();
    try {
      await reauthenticateWithPopup(this.auth.currentUser!, provider);
      // Permitir al usuario cambiar su número de teléfono
      this.ingresarNuevaContrasena = true;
    } catch (error: any) {
      if(error.code == 'auth/user-mismatch'){
        this.error = 'Cuenta incorrecta'
      }else{
        console.log(error);
      }
    }
  }
}
