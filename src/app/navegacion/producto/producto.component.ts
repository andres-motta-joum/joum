import { ChangeDetectorRef, Component, OnDestroy, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from '../../interfaces/usuario/usuario';
import { Producto } from '../../interfaces/producto/producto';
import { provideIcons } from '@ng-icons/core';
import { heroHeart } from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { matAddShoppingCart } from '@ng-icons/material-icons/baseline';
import { matShoppingCart } from '@ng-icons/material-icons/baseline';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { heroChevronLeftSolid } from '@ng-icons/heroicons/solid';
import { heroChevronRightSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [provideIcons({heroHeart, heroHeartSolid,matAddShoppingCart,matShoppingCart, heroChevronLeftSolid, heroChevronRightSolid})]
})
export class ProductoComponent {
  constructor(private route: ActivatedRoute,private cd: ChangeDetectorRef, private productoService: ProductoService, private router: Router) {}
  private routerSubscription!: Subscription;
  public producto!: Producto;
  public usuario!: Usuario;
  public productos!: Producto[];
  private productoId!: string;

  public corazonClick: boolean = false;
  public carritoClick: boolean = false;
  public carouselSimilaress: Array<any> = [];

  public sombraBool: boolean = false;
  public currentIndex = 0;

  @HostListener('document:keydown', ['$event'])
  miFuncionPersonalizada(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' && this.sombraBool === true) {
      this.fotoPrev();
    }else if (event.key === 'ArrowRight' && this.sombraBool === true){
      this.fotoNex()
    }
  }

  ngOnInit() {
    this.obtenerProducto();
    this.usuario = {
      nombre: "Andres Yesid",
      apellido: "Motta"
    };
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.obtenerProducto();
      }
    });
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  obtenerProducto() { //Validamos si el producto existe por la URL, si definimos cual es en caso de existir
    this.route.url.subscribe(segments => {
      this.productoId = segments[segments.length - 1].path;
    });

    this.productos = this.productoService.getProducts();
    const productoEncontrado = this.productos.find(product => product.id === this.productoId);

    if (productoEncontrado !== undefined) {
      this.producto = productoEncontrado;
    } else {
      alert("Producto no encontrado");
      this.router.navigate([''])
    }
  }

  nuevoDatoHijoSombra(newDato: boolean){ //Al recibir nuevo dato de componente Hijo
    this.sombraBool = newDato;
  }
  nuevoIndex(numero: number){ //Al recibir nuevo dato de componente Hijo
    this.currentIndex = numero;
  }

  fotoNex() {
    this.currentIndex = (this.currentIndex + 1) % this.producto.detalles!.fotos![0].length;
  }
  fotoPrev() {
    this.currentIndex = (this.currentIndex - 1 + this.producto.detalles!.fotos![0].length) % this.producto.detalles!.fotos![0].length;
  }

  agregarFavorito(){
    this.corazonClick = !this.corazonClick;
  }
  agregarCarrito(){
    this.carritoClick = !this.carritoClick;
  }
}
