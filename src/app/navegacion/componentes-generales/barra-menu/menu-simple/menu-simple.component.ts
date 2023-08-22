import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-menu-simple',
  templateUrl: './menu-simple.component.html',
  styleUrls: ['./menu-simple.component.scss'],
  providers: [provideIcons({heroInformationCircle})]
})
export class MenuSimpleComponent {
  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute, private userService: UsuarioService){}
  private routeSubscription!: Subscription;
  public usuario!: Usuario | undefined;
  
  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.usuario = this.userService.getUserUsuario('MOTTAANDRES20221130093921');
    });
  }

  navegar(ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

}
