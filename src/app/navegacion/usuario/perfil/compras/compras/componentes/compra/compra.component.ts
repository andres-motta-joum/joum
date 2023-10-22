import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { first } from 'rxjs';
import { porComprar } from 'src/app/interfaces/usuario/usuario';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent {
  @Input() compra!: Venta;
  @Input() miUsuario!: string;
  @Input() fecha!: Date;
  referencias!: porComprar[];
  usuarioVendedor!: string;
  nombreVendedor!: string;
  constructor(private zone: NgZone, private router: Router, private prdsService: ProductosService, private authService: AuthService, private firestore: Firestore){}
  
  async ngOnInit(){
    this.obtenerReferencias();
    const vendedor = await this.authService.getUsuarioIdPromise(this.compra.idVendedor);
    this.usuarioVendedor = vendedor.usuario!;
    this.nombreVendedor = vendedor.nombre!;
  }

  async obtenerReferencias(){
    this.referencias = await Promise.all(this.compra.referencias.map(ref => ref));
    console.log(this.referencias)
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
