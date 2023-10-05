import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auth, fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword, updateEmail, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';
import { matCheck } from '@ng-icons/material-icons/baseline';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-editar-correo',
  templateUrl: './editar-correo.component.html',
  styleUrls: ['./editar-correo.component.scss'],
  providers: [provideIcons({ionClose, matCheck})]
})
export class EditarCorreoComponent implements OnInit{
  constructor(private auth:Auth, private authService: AuthService, private firestore: Firestore){}
  @Input() correo!: string;
  @Output() cerrar = new EventEmitter<void>();
  password!: string;
  cargando = false;
  correoUsuario!: string;
  ingresarContrasena = false;
  error = '';
  actualizacionExitosa = false;

  cerrarContenido(){
    this.cerrar.emit();
  }
  cerrarcontrasena(){
    this.ingresarContrasena = false; 
    this.error = '';
    this.password = '';
  }

  ngOnInit(): void {
    this.correoUsuario = this.correo;
  }

  async submit(){
    if(this.correoUsuario !== this.correo ){
      this.cargando = true;
      const user = this.auth.currentUser;
      const auth = getAuth();
      fetchSignInMethodsForEmail(auth, this.correo) //Verificar que el correo aún no está en uso
       .then((signInMethods) => {
          if (signInMethods.length > 0) {
            // El correo electrónico ya está en uso
            this.error = 'Este correo electrónico ya está en uso';
            this.cargando = false;
          } else {
            updateEmail(auth.currentUser!, this.correo).then(async () => {
              // Correo actualizado
              this.actualizacionExitosa = true;
              setTimeout(()=>{
                this.cerrarContenido();
              }, 1700)
              const usuarioRef = doc(this.firestore, `usuarios/${user!.uid}`);
              await updateDoc(usuarioRef, {
                correo: this.correo
              });
            }).catch((error) => { //Se necesita autenticación (Se necesita un registro reciente);
              this.cargando = false;
              if(error.code == 'auth/requires-recent-login'){
                this.ingresarContrasena = true;
              }
            });
          }
       })
       .catch((error) => {
          this.cargando = false;
          switch (error.code) {
            case 'auth/invalid-email':
              this.error = 'Ingresa un correo válido'
              break;
            case 'auth/network-request-failed':
              // Manejar fallo de la red
              this.error = 'Fallo de red'
              break;
            default:
              console.log(error);
          }
       });
    }else{
      //El correo sigue siendo el mismo
      this.error = 'Ingresa un correo diferente';
    }
  }

  async validarcontrasena(){
    this.cargando = true;
    this.error = '';
    const auth = getAuth();
    const email = auth.currentUser!.email!; // reemplaza esto con el correo electrónico del usuario

    signInWithEmailAndPassword(auth, email, this.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateEmail(auth.currentUser!, this.correo);
        this.actualizacionExitosa = true;
        setTimeout(()=>{
          this.cerrarContenido();
        }, 1700)
        const usuarioRef = doc(this.firestore, `usuarios/${user!.uid}`);
        await updateDoc(usuarioRef, {
          correo: this.correo
        });
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

}
