import { Component, OnDestroy } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Fuse from 'fuse.js';
import { ProductosService } from 'src/app/servicios/productos/productos.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnDestroy {
  public productos!: Producto[];
  private fuse!: Fuse<Producto>;
  public productosFiltrados!: Producto[];

  constructor(private prdService: ProductosService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.busquedaNombre();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  // --------------- Inicialización ---------------
  inicializarFuse() {
    const options = {
      keys: ['nombre'],
      includeScore: true,
      threshold: 0.3
    };
    this.fuse = new Fuse(this.productos, options);
  }

  // --------------- Búsqueda en Productos ---------------
  buscarEnProductos(query: string): Producto[] {
    const resultados = this.fuse.search(query);
    return resultados.map(resultado => resultado.item);
  }

  // --------------- Filtros ---------------
  filtroEnvioGratis(producto: Producto): boolean {
    return producto.envioGratis!;
  }

  filtroPrecio(producto: Producto, precioMinimo: number, precioMaximo: number): boolean {
    return producto.precio! >= precioMinimo && producto.precio! <= precioMaximo;
  }

  filtrarProductos(envioGratis: boolean, rangoPrecio: { min: number; max: number }): Producto[] {
    return this.productos.filter(producto => {
      let cumpleFiltros = true;

      if (envioGratis) {
        cumpleFiltros = cumpleFiltros && this.filtroEnvioGratis(producto);
      }

      if (rangoPrecio.min > 0 || rangoPrecio.max > 0) {
        cumpleFiltros = cumpleFiltros && this.filtroPrecio(producto, rangoPrecio.min, rangoPrecio.max);
      }

      return cumpleFiltros;
    });
  }

  // --------------- Búsqueda de Nombre ---------------
  private routeSubscription!: Subscription;
  public busqueda!: string;
  async busquedaNombre() {
    this.routeSubscription = this.route.paramMap.subscribe(async () => {
      const url = this.router.url;
      const decodedUrl = decodeURIComponent(url);
      const segments = decodedUrl.split('/');
      this.busqueda = segments[segments.length - 1];

      await this.obtenerProductos();
      this.inicializarFuse();
      this.productosFiltrados = this.buscarEnProductos(this.busqueda);
    });
  }

  async obtenerProductos() {
    await this.prdService.obtenerProductos().then((productos)=>{
      this.productos = productos
    })
  }

  //-------------------------- Funciones secundarias ------------------------------------
  public listadoCuadrados = true;
  public listadoLineado = false;

  getCuadradoList(cuadradoList: boolean): void {
    this.listadoCuadrados = cuadradoList;
  }

  getLineadoList(lineadoList: boolean): void {
    this.listadoLineado = lineadoList;
  }
}
