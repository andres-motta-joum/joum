import { Component} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  public usuario!: Usuario | undefined;
  public productos!: Producto[];

  constructor(private route: ActivatedRoute, private userService: UsuarioService, private prdService: ProductoService) {}

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      const userId = params['id'];
      this.usuario = this.userService.getUserUsuario(userId);
      this.obtenerProductos();
    });
  }

  obtenerProductos() {
    this.productos = [];
    if (this.usuario?.publicaciones) {
      for (const id of this.usuario.publicaciones) {
        const producto = this.prdService.getProductsId(id.id!);
        if (producto) {
          this.productos.push(producto);
        }
      }
    }
  }
}
