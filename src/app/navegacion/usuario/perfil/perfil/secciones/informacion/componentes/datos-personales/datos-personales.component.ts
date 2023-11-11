import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { heroPencilSquareMini } from '@ng-icons/heroicons/mini';
import { ionChevronDown } from '@ng-icons/ionicons';
import { heroCheckCircle } from '@ng-icons/heroicons/outline';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss'],
  providers: [provideIcons({ionChevronDown, heroPencilSquareMini, heroCheckCircle})]
})
export class DatosPersonalesComponent implements OnInit{
  constructor(private fb: FormBuilder, private auth: Auth, private authService: AuthService){}
  @Output() mostrarContenido = new EventEmitter<string>(); 
  usuario!: Usuario;
  correoVerificado!: boolean;
  subscription!: Subscription;

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  editarContenido(editar: string){
    this.mostrarContenido.emit(editar);
  }

  private async obtenerUsuario(): Promise<void> {
    if(this.auth.currentUser){
      this.subscription = this.authService.getUsuarioId(this.auth.currentUser.uid).subscribe((usuario)=>{
        if(usuario){
          this.usuario = usuario;
          this.correoVerificado = this.auth.currentUser!.emailVerified;
        }
      })
    }
  }

}
