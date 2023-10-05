import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario, porComprar } from 'src/app/interfaces/usuario/usuario';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.component.html',
  styleUrls: ['./guardados.component.scss']
})
export class GuardadosComponent implements OnInit{
  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute, private authService: AuthService, private prdsService: ProductosService, private auth: Auth, private comprarService: ComprarService){}
  private subscription!: Subscription;
  private usuario!: Usuario;
  guardados!: porComprar[];
  productos: Producto[] = [];
  unidades: number[] = [];
  fotos: string[] = [];
  estilos: string[] = [];
  indexEstilos: number[] = [];

  public cantidadProductos = 0;

  verificacion = false;
  productosLenght!: number;

  singuardados!: boolean;

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.authService.getUsuarioId(user.uid).pipe(first()).subscribe((usuario)=>{
          if(usuario.guardados && usuario.guardados.length !== 0){
            this.usuario = usuario;
            this.guardados = usuario.guardados;
            this.obtenerProductos();
            this.singuardados = false;
          }else{
            this.singuardados = true;
          }
        })
      } else {
        this.router.navigate(['cuenta/iniciar-sesion']);
      }
    });
  }

  async obtenerProductos() {
    if (this.usuario?.guardados) {
      const productosRef = await Promise.all(this.usuario?.guardados.map((ref:any) => getDoc(ref.producto)));
      productosRef.forEach((productSnapshot, index) => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        this.productos.push(prd);
        this.estilos.push(this.usuario.guardados![index].estilo!);
      });
      this.indexEstilos = this.usuario.guardados!.map((guardado)=>{
        const partes = guardado.estilo.split(':');
        return Number(partes[0]) - 1;
      })
      this.fotos = await this.prdsService.obtenerFotosSegunEstilo(this.productos, this.estilos);
    }
    this.unidades = this.usuario.guardados!.map((guardados)=>{
      return guardados.unidades;
    })
    this.productos = await this.comprarService.obtenerProductos(this.guardados);
  }

  eliminar(index: number){
    this.guardados.splice(index, 1);
    this.productos.splice(index, 1);
    this.unidades.splice(index, 1);
    this.fotos.splice(index, 1);
    this.estilos.splice(index, 1);
    this.indexEstilos.splice(index, 1);
    if(this.guardados.length !== 0){
      this.singuardados = false;
    }else{
      this.singuardados = true;
    }
  }

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

}
