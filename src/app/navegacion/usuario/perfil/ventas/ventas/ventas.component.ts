import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassMini } from '@ng-icons/heroicons/mini';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/usuario/subInterfaces/venta';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [provideIcons({heroMagnifyingGlassMini, heroAdjustmentsHorizontal})]
})
export class VentasComponent {
  constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private userService: UsuarioService, private prdService: ProductoService) {}
  public usuario!: Usuario | undefined;
  public productos!: Producto[];
  public ventas!: Venta[]
  public unidades!: number[]

  public porPreparar = 0;
  public enCamino = 0;
  public finalizadas = 0;

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
    this.unidades = [];
    if (this.usuario) {
      for (const opinion of this.usuario.ventas!){
        for (const vendedor of this.userService.getAllUsers()) { //Obtener el vendedor de cada compra según su numVenta
          for (const venta of vendedor.ventas || []) {
            if (venta.numVenta === opinion.numVenta) {
              for(const id of venta.productos!){
                this.ventas.push(venta);
                this.productos.push(this.prdService.getProductsId(id.id!)!);
              }
              for(const unidad of venta.unidades!){
                this.unidades.push(unidad);
              }
            }
          }
        }
      }
    }
    for (const venta of this.ventas) {
      if (!venta.entregado) {
        this.porPreparar += !venta.enCamino ? 1 : 0;
        this.enCamino += venta.enCamino ? 1 : 0;
      } else {
        this.finalizadas += 1;
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
