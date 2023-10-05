import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent {
  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute, private  authService: AuthService){}
  usuario!: string;

  ngOnInit(): any { 
    this.obtenerUsuario();
  }

  async obtenerUsuario() {
    const idUsuario = this.route.parent?.snapshot.paramMap.get('id')!;
    await this.authService.getUsuarioUser(idUsuario).then((usuario)=>{
      if(usuario){
        this.usuario = usuario['usuario']!;
      }
    })
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
