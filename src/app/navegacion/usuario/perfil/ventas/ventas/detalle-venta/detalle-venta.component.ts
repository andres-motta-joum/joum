import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftEllipsisSolid } from '@ng-icons/heroicons/solid';
import { matQuestionMark } from '@ng-icons/material-icons/baseline';
import { matMoveToInbox } from '@ng-icons/material-icons/baseline';
import { heroTruckSolid } from '@ng-icons/heroicons/solid';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { aspectsPlatformDropbox } from '@ng-icons/ux-aspects';
import { heroBanknotes } from '@ng-icons/heroicons/outline';
import { heroDocumentText } from '@ng-icons/heroicons/outline';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/usuario/subInterfaces/venta';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { ProductoService } from 'src/app/servicios/producto/producto.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss'],
  providers: [provideIcons({heroChatBubbleLeftEllipsisSolid, matQuestionMark, matMoveToInbox, heroTruckSolid, heroCheckCircleSolid, aspectsPlatformDropbox, heroBanknotes, heroDocumentText})]
})
export class DetalleVentaComponent {

  public usuario!: Usuario | undefined;
  public productos!: Producto[];
  public ventas!: Venta[]
  public numVenta!: string;
  public usuarioCliente!: Usuario | undefined;
  public unidades!: number[];

  public precio = 0;
  public precioEnvio = 0;
  public impuestos = 0;
  public cargoPorVenta = 0;

  constructor(private zone: NgZone,private router: Router, private route: ActivatedRoute, private userService: UsuarioService, private prdService: ProductoService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const segmentsUser = this.route.snapshot.url.map(segment => segment.path);
      const userId = segmentsUser[0];
      this.usuario = this.userService.getUserUsuario(userId);
      const segmentsNumVenta = this.route.snapshot.url.map(segment => segment.path);
      this.numVenta =  segmentsNumVenta[segmentsNumVenta.length - 1];
      this.obtenerprecios();
    });
  }

  async obtenerDatos() {
    this.ventas = [];
    this.productos = [];
    if (this.usuario) {
      for (const venta of this.usuario.ventas!){ 
        for(const id of venta.productos!){
          if(venta.numVenta === parseInt(this.numVenta)){
            this.ventas.push(venta);
            this.productos.push(this.prdService.getProductsId(id.id!)!);
            this.usuarioCliente = this.userService.getUserId(this.ventas[0].idCliente!);
            this.unidades = this.ventas[0].unidades!;
          }
        }
      }
    }
  }

  async obtenerprecios(){
    await this.obtenerDatos();
    for(const [index, producto] of this.productos.entries()){
      this.precio += (producto.precio! * this.unidades[index]);
      if(producto.envioGratis){
        this.precioEnvio += producto.precioEnvio!;
      }
    }
    const fuente = this.precio * 0.015;
    const ICA = this.precio * 0.00414;
    this.impuestos = (fuente + ICA);
  }

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
