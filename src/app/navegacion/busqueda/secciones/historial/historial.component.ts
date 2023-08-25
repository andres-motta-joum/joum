import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {

  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute, private userService: UsuarioService,private prdService: ProductoService){}

  private routeSubscription!: Subscription;
  public usuario!: Usuario | undefined;
  public productos!: Producto[];


  public url!: string;
  ngOnInit() {
    this.productos = [];
    this.usuario = this.userService.getUserUsuario('MOTTAANDRES20221130093921');
    for(const producto of this.usuario?.historial!){
      this.productos.push(this.prdService.getProductsId(producto.id!)!);
    }
  }

  registroHistorial: boolean = true;

  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  onButtonClick(): void {
    this.registroHistorial = !this.registroHistorial;
  }
}
