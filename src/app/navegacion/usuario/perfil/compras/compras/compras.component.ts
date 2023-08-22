import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassMini } from '@ng-icons/heroicons/mini';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { Producto } from 'src/app/interfaces/producto/producto';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Venta } from 'src/app/interfaces/usuario/subInterfaces/venta';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
  providers: [provideIcons({heroMagnifyingGlassMini, heroAdjustmentsHorizontal})]
})
export class ComprasComponent {
  public usuario!: Usuario | undefined;
  public productos!: Producto[];
  public ventas!: Venta[]

  constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private userService: UsuarioService, private prdService: ProductoService) {}

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      const userId = params['id'];
      this.usuario = this.userService.getUserUsuario(userId);
      this.obtenerDatos();
    });
  }

  obtenerDatos() {
    this.ventas = [];
    this.productos = [];
    if (this.usuario) {
      for (const compra of this.usuario.compras!){
        for (const vendedor of this.userService.getAllUsers()) { //Obtener el vendedor de cada compra según su numVenta
          for (const venta of vendedor.ventas || []) {
            if (venta.numVenta === compra.numVenta) {
              for(const id of venta.productos!){
                this.ventas.push(venta);
                this.productos.push(this.prdService.getProductsId(id.id!)!);
              }
            }
          }
        }
      }
    }
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
