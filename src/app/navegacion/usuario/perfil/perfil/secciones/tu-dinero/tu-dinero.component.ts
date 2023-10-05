import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-tu-dinero',
  templateUrl: './tu-dinero.component.html',
  styleUrls: ['./tu-dinero.component.scss']
})
export class TuDineroComponent {
  constructor(private route: ActivatedRoute, private authService: AuthService){}
  public usuario!: Usuario;

  ngOnInit(): any { 
    this.obtenerUsuario();
  }

  async obtenerUsuario() {
    const idUsuario = this.route.parent?.snapshot.paramMap.get('id')!;
    await this.authService.getUsuarioUser(idUsuario).then((usuario)=>{
      if(usuario){
        this.usuario = usuario;
      }
    })
  }
}
