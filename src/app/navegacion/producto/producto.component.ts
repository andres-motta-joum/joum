import { ChangeDetectorRef, Component, OnDestroy, OnInit, SimpleChanges, HostListener, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription, first, firstValueFrom } from 'rxjs';
import { Usuario, porComprar } from '../../interfaces/usuario/usuario';
import { Producto } from '../../interfaces/producto/producto';
import { provideIcons } from '@ng-icons/core';
import { heroHeart } from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { matAddShoppingCart } from '@ng-icons/material-icons/baseline';
import { matShoppingCart } from '@ng-icons/material-icons/baseline';
import { heroChevronLeftSolid } from '@ng-icons/heroicons/solid';
import { heroChevronRightSolid } from '@ng-icons/heroicons/solid';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { Auth } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [provideIcons({heroHeart, heroHeartSolid,matAddShoppingCart,matShoppingCart, heroChevronLeftSolid, heroChevronRightSolid})]
})
export class ProductoComponent implements OnInit{
  constructor(private route: ActivatedRoute,private cd: ChangeDetectorRef, private authService: AuthService, private router: Router, private prdService: ProductosService, private comprarService: ComprarService, private auth: Auth, private firestore: Firestore) {}
  private routerSubscription!: Subscription;
  private productoId!: string;
  producto!: Producto;
  usuarioVendedor!: Usuario; //Proteger datos
  miUsuario!: Usuario; //Proteger datos
  productos!: Producto[];
  fotos: string[][] = [['assets/img/categoria/pic-loading.svg']];

  enFavoritos: boolean = false;
  enCarrito: boolean = false;
  carouselSimilaress: Array<any> = [];

  sombraBool: boolean = false;
  indexFoto = 0;
  estiloSelec = 0;
  unidades = 1;

  productoCargado = false;
  productoPropio!: boolean; productoPropioFixed = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.productoPropioFixed = window.scrollY > 32;
  }

  async ngOnInit() {
    const urlSegments = (this.router.url).split('/');
    const idProducto = urlSegments[urlSegments.length - 1];
    this.prdService.obtenerProductos().then(productos => {this.productos = productos});
    const producto = await this.obtenerProducto(idProducto);
    if(producto && producto.estado){
      this.productoPropio = false;
      if(this.auth.currentUser){
        this.authService.getUsuarioId(this.auth.currentUser?.uid!).pipe(first()).subscribe(usuario => {
          if(usuario.registroHistorial){
            this.prdService.agregarHistorial(this.producto.id!, usuario.id!, usuario.historial!);
          }
          this.miUsuario = usuario;
          this.definirCarrito(producto.id!);
          this.definirFavorito(usuario, producto.id!);
        });
        if(producto.idUsuario == this.auth.currentUser.uid){
          this.productoPropio = true;
        }
      }
      this.producto = producto;
      this.prdService.obtenerFotoUno(this.producto).then(fotos => this.fotos = fotos);
      this.obtenerFotos(this.producto).then((fotos)=> this.fotos = fotos);
      this.usuarioVendedor = await this.authService.getUsuarioIdPromise(this.producto.idUsuario!);

      this.productoCargado = true;
      //---------------------------------- Cargado -------
      this.subcription();
    }else{
      this.router.navigate(['']);
    }
  }
  subcription(){
    this.routerSubscription = this.router.events.subscribe(async (event) => {
      this.productoCargado = false;
      if (event instanceof NavigationEnd) {
        this.estiloSelec = 0;
        this.indexFoto = 0;
        const urlSegments = (event.urlAfterRedirects).split('/');
        this.fotos = [['assets/img/categoria/pic-loading.svg']];
        const idProducto = urlSegments[urlSegments.length - 1];
        const producto = await this.obtenerProducto(idProducto);
        if(producto && producto.estado){
          this.productoPropio = false;
          if(this.auth.currentUser){
            this.authService.getUsuarioId(this.auth.currentUser.uid!).pipe(first()).subscribe(usuario => {
              if(usuario.registroHistorial){
                this.prdService.agregarHistorial(this.producto.id!, usuario.id!, usuario.historial!);
              }
              this.miUsuario = usuario;
              this.definirCarrito(producto.id!);
              this.definirFavorito(usuario, producto.id!);
            });
            if(producto.idUsuario == this.auth.currentUser.uid){
              this.productoPropio = true;
            }
          }
          this.producto = producto;
          this.productos = [];
          this.prdService.obtenerProductos().then(productos => {this.productos = productos});
          this.prdService.obtenerFotoUno(this.producto).then(fotos => this.fotos = fotos);
          this.obtenerFotos(this.producto).then((fotos)=> this.fotos = fotos);
          this.usuarioVendedor = await this.authService.getUsuarioIdPromise(this.producto.idUsuario!);
          this.productoCargado = true;
          //---------------------------------- Cargado -------
        }else{
          this.router.navigate(['']);
        }
      }
    });
  }

  cambioDeEstilo(event : number){
    this.estiloSelec = event; this.indexFoto = 0;
    this.definirCarrito(this.producto.id!);
  }
  //------- definir carrito y favoritos ------

  async definirCarrito(productoId: string){
    const usuarioRef = doc(this.firestore, `usuarios/${this.miUsuario.id}`); //Obtener usuario actualizado. Esto en caso de haber agregado a carrito
    const snapshot = await getDoc(usuarioRef);
    const usuario = snapshot.data() as Usuario;
    if( usuario.carrito){
      const carrito = usuario.carrito.filter(ref => ref.producto.id === productoId);
      if(carrito){
        const existe = carrito.find(ref => Number(ref.estilo.split(':')[0]) === (this.estiloSelec + 1));
        if(existe){
          this.enCarrito = true;
        }else{
          this.enCarrito = false;
        }
      }else{
        this.enCarrito = false;
      }
    }
  }

  definirFavorito(usuario: Usuario, productoId: string){
    if(usuario.favoritos){
      const favorito = usuario.favoritos.find(ref => ref.id === productoId);
      if(favorito){
        this.enFavoritos = true;
      }else{
        this.enFavoritos = false;
      }
    }
  }

  //------------------------------------------

  async obtenerProducto(idProducto: string): Promise<Producto | null> {
    const producto$ = this.prdService.obtenerProductoId(idProducto);
    const producto = await firstValueFrom(producto$);
    if(producto){
      return producto
    }else{
      return null
    }
  }

  async obtenerFotos(producto: Producto): Promise<string[][]> {
    return await this.prdService.obtenerFotosProducto(producto);
  }

//-------------------------- carrito y favoritos ------------------------

  async editarFavorito(){
    if(this.usuarioVendedor){
      if(this.enFavoritos){
        if(this.auth.currentUser){ //Eliminar
          this.enFavoritos = false;
          const usuarioRef = doc(this.firestore, `usuarios/${this.auth.currentUser.uid}`);
          const productoRef = doc(this.firestore, `productos/${this.producto.id}`);
          const snapshot = await getDoc(usuarioRef);
          const usuario = snapshot.data();
          const index = usuario!['favoritos'].findIndex((referencia: DocumentReference<DocumentData>) => referencia.id == productoRef.id);
          usuario!['favoritos'].splice(index, 1);

          this.prdService.eliminarFavorito(this.auth.currentUser.uid, usuario!['favoritos']);
        }else{
          this.router.navigate(['cuenta/iniciar-sesion']);
        }
      }else{
        if(this.auth.currentUser){ //Agregar
          this.enFavoritos = true;
          this.prdService.agregarFavorito(this.producto.id!, this.auth.currentUser.uid);
        }else{
          this.router.navigate(['cuenta/iniciar-sesion']);
        }
      }
    }
  }

//------------------------- carrito

  editarCarrito(){
    if(this.usuarioVendedor){
      if(this.enCarrito){
        this.eliminarCarritoUsuario();
      }else{
        this.agregarCarritoUsuario()
      }
    }
  }
  
  async agregarCarritoUsuario(){
    if(this.auth.currentUser){
      if(this.producto.idUsuario !== this.auth.currentUser.uid){
        this.enCarrito = true;
        this.comprarService.agregarReferenciaCarrito(this.producto.id!, this.auth.currentUser.uid, this.producto.estilos![this.estiloSelec].nombre, this.estiloSelec + 1, Number(this.unidades));
      }else{
        //Este es tu producto
      }
    }else{
      this.router.navigate(['cuenta/iniciar-sesion']);
    }
  }

  async eliminarCarritoUsuario(){
    if(this.auth.currentUser){
      this.enCarrito = false;

      const usuarioRef = doc(this.firestore, `usuarios/${this.auth.currentUser.uid}`);
      const snapshot = await getDoc(usuarioRef);
      const usuario = snapshot.data() as Usuario;
      const index = await this.obtenerIndice(usuario);
      usuario['carrito']!.splice(index, 1);
      this.prdService.eliminarCarrito(this.auth.currentUser.uid, usuario['carrito']);
    }else{
      this.router.navigate(['cuenta/iniciar-sesion']);
    }
  }

  async obtenerIndice(usuario: Usuario) {
    for (let i = 0; i < usuario['carrito']!.length; i++) {
      const referencia = usuario['carrito']![i];
      if (referencia.producto.id == this.producto.id) {
        if (Number(referencia.estilo.split(':')[0]) === (this.estiloSelec + 1)) {
          return i;
        }
      }
    }
    return -1; // Devuelve -1 si no se encuentra el producto 
  }
  
  


//----------------- Mostrar fotos ------------------------------------------------------
  nuevoDatoHijoSombra(newDato: boolean){ //Al recibir nuevo dato de componente Hijo
    this.sombraBool = newDato;
  }

  nuevoIndex(numero: number){ //Al recibir nuevo dato de componente Hijo
    this.indexFoto = numero;
  }

  fotoNex() {
    this.indexFoto = (this.indexFoto + 1) % this.fotos[this.estiloSelec].length;
  }

  fotoPrev() {
    this.indexFoto = (this.indexFoto - 1 + this.fotos[this.estiloSelec].length) % this.fotos[this.estiloSelec].length;
  }

  @HostListener('document:keydown', ['$event'])
  miFuncionPersonalizada(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' && this.sombraBool === true) {
      this.fotoPrev();
    }else if (event.key === 'ArrowRight' && this.sombraBool === true){
      this.fotoNex()
    }
  }

  ngOnDestroy() {
    if(this.routerSubscription){
      this.routerSubscription.unsubscribe();
    }
  }
}
