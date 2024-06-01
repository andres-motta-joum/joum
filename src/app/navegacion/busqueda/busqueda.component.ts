import { Component, OnDestroy } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Fuse from 'fuse.js';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Firestore, collection, getDocs, orderBy, query } from '@angular/fire/firestore';
import { provideIcons } from '@ng-icons/core';
import { matSearch } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
  viewProviders: provideIcons({matSearch})
})
export class BusquedaComponent implements OnDestroy {
  constructor(private prdService: ProductosService,private route: ActivatedRoute,private router: Router, private prdsService: ProductosService, private auth: Auth, private authService: AuthService, private firestore: Firestore) {}
  public productos!: Producto[];
  private fuse!: Fuse<Producto>;
  public productosFiltrados!: Producto[];
  public usuario!: Usuario | undefined;
  registroHistorial: boolean = true;
  datosCargados = false;

  public url!: string;

  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (usuario)=>{
      if(usuario){
        const miUsuario = await this.authService.getUsuarioIdPromise(usuario.uid);
        this.usuario = miUsuario;
      }else{
        this.usuario = undefined;
      }
      this.busquedaNombre();
    })
  }

  ngOnDestroy() {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
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

  // --------------- Búsqueda de Nombre ---------------
  routeSubscription!: Subscription;
  busqueda!: string;
  async busquedaNombre() {
    this.routeSubscription = this.route.paramMap.subscribe(async () => {
      const url = this.router.url.split('?')[0];
      const decodedUrl = decodeURIComponent(url);
      const segments = decodedUrl.split('/');
      this.busqueda = segments[segments.length - 1];

      await this.obtenerProductos();
      switch (this.busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()){
        case 'cuadros':{
          this.productosFiltrados = this.productos.filter((producto)=> producto.categoria == 'Cuadros');
          break
        }
        case 'repisas':{
          this.productosFiltrados = this.productos.filter((producto)=> producto.categoria == 'Repisas');
          break
        }
        case 'iluminacion':{
          this.productosFiltrados = this.productos.filter((producto)=> producto.categoria == 'Iluminación');
          break
        }
        case 'macetas':{
          this.productosFiltrados = this.productos.filter((producto)=> producto.categoria == 'Macetas');
          break
        }
        case 'relojes':{
          this.productosFiltrados = this.productos.filter((producto)=> producto.categoria == 'Relojes');
          break
        }
        case 'difusores':{
          this.productosFiltrados = this.productos.filter((producto)=> producto.categoria == 'Difusores');
          break
        }
        case 'adornos':{
          this.productosFiltrados = this.productos.filter((producto)=> producto.categoria == 'Adornos');
          break
        }
        default: {
          this.inicializarFuse();
          this.productosFiltrados = this.buscarEnProductos(this.busqueda);
        }
      }
      this.datosCargados = true;
    });
  }

  async obtenerProductos() {
    const queri = query(collection(this.firestore, 'productos'), orderBy('enFavorito', 'desc'));
    const snapshot = await getDocs(queri);
    this.productos = snapshot.docs.map(doc => ({...doc.data(), id: doc.id} as Producto));
  }
}
