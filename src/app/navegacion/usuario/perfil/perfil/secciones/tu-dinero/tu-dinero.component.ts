import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovimientoDinero } from 'src/app/interfaces/movimiento-dinero';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-tu-dinero',
  templateUrl: './tu-dinero.component.html',
  styleUrls: ['./tu-dinero.component.scss']
})
export class TuDineroComponent {
  constructor(private route: ActivatedRoute, private userService: UsuarioService){}
  public usuario!: Usuario | undefined;

  ngOnInit(){
    this.usuario = this.userService.getUserUsuario(this.route.parent?.snapshot.paramMap.get('id')!)
  }
}
