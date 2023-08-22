import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroStar } from '@ng-icons/heroicons/outline';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/usuario/subInterfaces/venta';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss'],
  providers: [provideIcons({heroStar})]
})
  export class OpinionesComponent {

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
        for (const opinion of this.usuario.opiniones!){
          this.productos.push(this.prdService.getProductsId(opinion.idProducto!)!);
          for (const vendedor of this.userService.getAllUsers()) { //Obtener el vendedor de cada compra según su numVenta
            for (const venta of vendedor.ventas || []) {
              if (venta.numVenta === opinion.numVenta) {
                this.ventas.push(venta);
              }
            }
          }
        }
      }
    }

    navegar(ruta: any[], event: Event){
      event.preventDefault();
      this.zone.run(()=>{
        this.router.navigate(ruta)
      })
    }
}
