import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassMini } from '@ng-icons/heroicons/mini';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  providers: [provideIcons({heroMagnifyingGlassMini, heroAdjustmentsHorizontal})]
})
export class PublicacionesComponent {
  constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private userService: UsuarioService, private prdService: ProductoService) {}
  public usuario!: Usuario | undefined;
  public publicaciones!: Producto[];
  
  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      const userId = params['id'];
      this.publicaciones = [];
      this.usuario = this.userService.getUserUsuario(userId);
      for(const id of this.usuario?.publicaciones!){
        this.publicaciones.push(this.prdService.getProductsId(id.id!)!)
      }
    });
  }


  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

}
