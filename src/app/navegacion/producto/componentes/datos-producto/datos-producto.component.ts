import { Component, EventEmitter, HostListener, Input, NgZone, OnChanges,OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../../../interfaces/producto/producto';

import { provideIcons } from '@ng-icons/core';
import { matStarRound } from '@ng-icons/material-icons/round';
import { ionLogoWhatsapp } from '@ng-icons/ionicons';
import { heroTruck } from '@ng-icons/heroicons/outline';
import { matGppGoodOutline } from '@ng-icons/material-icons/outline';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { heroCheckBadge } from '@ng-icons/heroicons/outline';
import { heroChevronRight } from '@ng-icons/heroicons/outline';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { DocumentData, DocumentReference, Firestore, doc, getDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss'],
  providers: [provideIcons({matStarRound, heroTruck, matGppGoodOutline, heroXMark, heroCheckBadge, heroChevronRight, ionLogoWhatsapp})]
})
export class DatosProductoComponent implements OnInit,OnChanges{
  constructor(private zone: NgZone, private router: Router, private comprarService: ComprarService, private auth: Auth, private authService: AuthService, private firestore: Firestore){}
  @Input() producto!: Producto;
  @Output() ventasHechas = new EventEmitter<string>();
  @Output() unidadeS = new EventEmitter<number>();
  @Output() seleccionarColr = new EventEmitter<number>();
  @Output() seleccionarEstl = new EventEmitter<number>();
  @Input() productoCargado!: boolean;
  entrega: string = '';

  unidades: number = 1;
  unaUnidad = true;

  vendidos!: string;

  productoPropio!: boolean;
  tamanioSelec = 0;

  anchoPagina: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.anchoPagina = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.fechaEntregas();
  }
  

  fechaEntregas(){
    let hoy = new Date();
    let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    let fechaUno = new Date();
    let fechaDos = new Date();
    fechaUno.setDate(hoy.getDate() + 1);
    fechaDos.setDate(hoy.getDate() + 2);
    if(fechaUno.getMonth == fechaDos.getMonth){ //Mañana y pasado mañana, siguen siendo en el mismo mes
      this.entrega = `${fechaUno.getDate()} y ${fechaDos.getDate()} de ${meses[fechaDos.getMonth()]}`;
    }else{
      this.entrega = `${fechaUno.getDate()} de ${meses[fechaUno.getMonth()]} y  el ${fechaDos.getDate()} de ${meses[fechaDos.getMonth()]}`;
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['producto'] && changes['producto'].currentValue) {
      this.vendidos = this.calcularVentas(this.producto.ventas);
      this.ventasHechas.emit(this.vendidos);
      this.unidades= 1;
      this.productoPropio = false;
      this.tamanioSelec = 0;
      if(this.auth.currentUser){
        if(this.producto.idUsuario == this.auth.currentUser.uid){
          this.productoPropio = true;
        }
      }
    }
    setTimeout(()=>{
      const select: HTMLSelectElement | null = document.querySelector('#unidades');
      if(select){
        select!.value = '1';
      }
    })
    this.unaUnidad = true;
  }

  calcularVentas(ventas: number): string {
    if(ventas == 0){
      return "nuevo producto"
    }else if(ventas == 1){
      return `${ventas} vendido`;
    }else{
      return `${ventas} vendidos`;
    }
    //if (ventas <= 9 || ventas % 10 === 0 || ventas % 50 === 0 || ventas % 100 === 0) {
    //  if(ventas == 0){
    //    return "nuevo producto"
    //  }else if(ventas == 1){
    //    return `${ventas} vendido`;
    //  }else{
    //    return `${ventas} vendidos`;
    //  }
    //} else if (ventas < 100) {
    //  return `+ ${Math.floor(ventas / 10) * 10} vendidos`;
    //} else if (ventas < 1000) {
    //  return `+ ${Math.floor(ventas / 50) * 50} vendidos`;
    //} else {
    //  return `+ ${Math.floor(ventas / 100) * 100} vendidos`;
    //}
  }

//------------------------------------------------------
  saboresBatidos: any = {
    vainilla: 'prod/0MDi2sGNF4mLVTzaQJpD',
    fresa: 'prod/2iUqgXkQd7Ya7szCNKtB',
    cookiesandcream: 'prod/2C225aI5Lf0lC307TGVC',
    canelayespecias: 'prod/BCkcBetjBHdoLrCZPsrI',
    cafelatte: 'prod/EcCgFOLi5SR2Vdots6kb',
    chocoavellana: 'prod/LrIE3BECxcRf6KbqmLbO',
    mango: 'prod/kAJJXZYZOM5DeSAShNgg',
    bananacaramelo: 'prod/WLCQWkTHjcYboCMPb3M2',
    dulcedelechecremoso: 'prod/vqb0HjLakVjyyswSF599'
  }
  saboresGuarana: any = {
    guarana: 'prod/yNGbGRHFIzdokqnuQo0t',
    guaranatropical: 'prod/EtnWcoqdm9543iUDEAFg'
  }
  saboresAloe: any = {
    original: 'prod/QIR7CN8x6OmKIe65kTrw',
    mandarina: 'prod/wgx6IvVRTNJqykmiG71h',
    mango: 'prod/uY2mwoVkSh7f71EEOv4p'
  }
  saboresBebidas: any = {
    original: 'prod/3Ar8IiBQug4E6EhkNGc6',
    limon: 'prod/9PWVOmf0UsBlsxFG1Foq',
    frambuesa: 'prod/Whpm7t5mCj2Zna5MsNNv',
    durazno: 'prod/rjXwvvbEFnUyfRZwf8RT',
    chai: 'prod/h2nSCuYoskY9IKjVkZ7q'
  }
  saboresKit: any = {
    vainilla: 'prod/gJnZ6IfKpac9WP4OkHmi',
    fresa: 'prod/t4LDF385McKnc9BLQpkz',
    cookiesandcream: 'prod/1XAfXaHYm5FEmUs29jJ3',
    canelayespecias: 'prod/mlQtiDL8O7FFWNfTmM1t',
    cafelatte: 'prod/UUVyc112LtywbskmgmVZ',
    chocoavellana: 'prod/Lm7RExnUfQpxpvmHHlgU',
    mango: 'prod/YXCd4C1zajChAvBdtkUM',
    bananacaramelo: 'prod/DHbjqfffiX7Hnpl3i4Jo',
    dulcedelechecremoso: 'prod/kfc3oui1335AH8UYGXON'
  }
  

  async seleccionarColor(htmlSelect: any){
    let index = htmlSelect.target.value;
    if(this.producto.colores && this.producto.colores.length !== 1){
      this.seleccionarColr.emit(index);
      this.producto.botonCompra!.id = this.producto.colores[index].idBoton;
      this.producto.botonCompra!.idDocumento = this.producto.colores[index].idBotonDocumento;
      this.producto.botonCompra!.variante = this.producto.colores[index].variante;
    }
  }

  async seleccionarEstilo(htmlSelect: any){
    let index = htmlSelect.target.value;
    if(this.producto.estilos && this.producto.estilos.length !== 1){
      this.seleccionarEstl.emit(index);
      this.producto.botonCompra!.id = this.producto.estilos[index].idBoton;
      this.producto.botonCompra!.idDocumento = this.producto.estilos[index].idBotonDocumento;
      this.producto.botonCompra!.variante = this.producto.estilos[index].variante;
    }
  }

  cambiarUnidades(event: any) {
    this.unidades = event.target.value;
    this.unaUnidad = event.target.value == 1;
    this.unidadeS.emit(this.unidades);
  }

  async comprar(){
    if(this.productoCargado){
      if(this.producto){ //verificar que el producto ah cargado para no enviar datos undefined
        if(this.auth.currentUser){
          if(this.productoPropio){
            //Este es tu producto
          }else{
            if(this.producto.tamanios){
              this.comprarService.agregarReferenciaCompra(this.producto.id!, this.auth.currentUser.uid, Number(this.unidades), this.tamanioSelec);
            }else{
              this.comprarService.agregarReferenciaCompra(this.producto.id!, this.auth.currentUser.uid, Number(this.unidades));
            }
            this.authService.getUsuarioId(this.auth.currentUser.uid).pipe(first()).subscribe((usuario)=>{
              if(usuario.direcciones && usuario.direcciones.length !== 0){
                this.router.navigate(['comprar/checkout/resumen']);
              }else{
                this.comprarService.agregarDir = true;
                this.router.navigate(['comprar/checkout/detalles-envio']);
              }
            })
          }
        }else{
          this.router.navigate(['cuenta/crear-cuenta']);
        }
      }
    }
  }

  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  opiniones(){
    window.scroll(0,3000)
  }
}
