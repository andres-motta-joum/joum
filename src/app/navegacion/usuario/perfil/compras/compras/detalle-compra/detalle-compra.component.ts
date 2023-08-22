import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftEllipsisSolid } from '@ng-icons/heroicons/solid';
import { matQuestionMark } from '@ng-icons/material-icons/baseline';
import { matMoveToInbox } from '@ng-icons/material-icons/baseline';
import { heroTruckSolid } from '@ng-icons/heroicons/solid';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { aspectsPlatformDropbox } from '@ng-icons/ux-aspects';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/usuario/subInterfaces/venta';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { ProductoService } from 'src/app/servicios/producto/producto.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.scss'],
  providers: [provideIcons({heroChatBubbleLeftEllipsisSolid, matQuestionMark, matMoveToInbox, heroTruckSolid, heroCheckCircleSolid, aspectsPlatformDropbox})]
})
export class DetalleCompraComponent {
  public usuario!: Usuario | undefined;
  public productos!: Producto[];
  public ventas!: Venta[]
  public numVenta!: string;
  public usuarioVendedor!: Usuario | undefined;
  public unidades!: number[];

  public precio = 0;
  public precioEnvio = 0;

  constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private userService: UsuarioService, private prdService: ProductoService) {}

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      const userId = params['id'];
      this.usuario = this.userService.getUserUsuario(userId);
      const segments = this.route.snapshot.url.map(segment => segment.path);
      this.numVenta =  segments[segments.length - 1];
      this.obtenerprecios();
    });
  }

  async obtenerDatos() {
    this.ventas = [];
    this.productos = [];
    if (this.usuario) {
      for (const compra of this.usuario.compras!){
        for (const vendedor of this.userService.getAllUsers()) { //Obtener el vendedor de cada compra según su numVenta
          for (const venta of vendedor.ventas || []) {
            if (venta.numVenta === compra.numVenta) {
              for(const id of venta.productos!){
                if(venta.numVenta === parseInt(this.numVenta)){
                  this.ventas.push(venta);
                  this.productos.push(this.prdService.getProductsId(id.id!)!);
                  this.usuarioVendedor = this.userService.getUserId(this.productos[0].idUsuario!);
                  this.unidades = this.ventas[0].unidades!;
                }
              }
            }
          }
        }
      }
    }
  }

  async obtenerprecios(){
    await this.obtenerDatos();
    for(const [index, producto] of this.productos.entries()){
      this.precio += (producto.precio! * this.unidades[index]);
      if(!producto.envioGratis){
        this.precioEnvio += producto.precioEnvio!;
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
