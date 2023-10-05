import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Direccion } from 'src/app/interfaces/usuario/subInterfaces/direccion';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss']
})
export class DireccionesComponent implements OnInit{
  constructor(private auth: Auth, private authService: AuthService){}
  @Output() mostrarContenido = new EventEmitter<string>(); 
  direcciones: Direccion[] = [];
  direccionesString: string[] = [];
  subMenu: boolean = false;

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  async obtenerUsuario(){
    if(this.auth.currentUser){
      const usuario = await this.authService.getUsuarioIdPromise(this.auth.currentUser.uid);
      if(usuario.direcciones){
        for(let direccion of usuario.direcciones){
          this.direcciones.push(direccion);
        }
        this.obtenerDireccionString();
      }
    }
  }

  obtenerDireccionString(){
    this.direccionesString = this.direcciones.map((direccion)=>{
      const arrayModificado: string[] = direccion.direccion!.map((element, index) => {
        if (index === 2) {
          return `#${element}`;
        } else if (index === 3) {
          if(element !== ''){
            return `- ${element}`;
          }else{
            return ''
          }
        } else {
          return element
        }
      });
  
      return arrayModificado.join(' ');
    })
  }

  editarContenido(editar: string){
    this.mostrarContenido.emit(editar);
  }

  desplegarSubMenu(){
    this.subMenu = !this.subMenu;
  }
}
