import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, DocumentReference, collection, getDoc, getDocs } from '@angular/fire/firestore';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Reclamo, Venta } from 'src/app/interfaces/venta';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  constructor(private auth: Auth, private authService: AuthService){}
  stockTotal: number = 0;
  productos: number = 0;
  productosEnCamino: number = 0;

  productosPorcentaje!: number;
  productosEnCaminoPorcentaje!: number;

  sinProductos = true;

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.obtenerUsuario()
      }
    })
  }


  async obtenerUsuario(){
    if(this.auth.currentUser){
      const usuario = await this.authService.getUsuarioIdPromise(this.auth.currentUser.uid);
      const productosRef = usuario.publicaciones;
      const ventasRef = usuario.ventas;
      if(ventasRef){
        await this.obtenerVentas(ventasRef);
      }
      this.obtenerPorcentajesReclamos();
    }
  }

  async obtenerVentas(ventasRef: DocumentReference<DocumentData>[]) {
    const ventasSnapshots = await Promise.all(ventasRef.map((ref:any) => getDoc(ref)));
    ventasSnapshots.forEach(productSnapshot => {
      const vnta = productSnapshot.data() as Venta;
      if(!vnta.entregado){
        vnta.referencias.forEach((ref)=>{
          this.productosEnCamino += ref.unidades
        })
      }
    });
  }

  obtenerPorcentajesReclamos(){
    this.stockTotal = this.productos + this.productosEnCamino;
    if(this.productos == 0 && this.productosEnCamino == 0){
      this.sinProductos = true;
      return;
    }
    this.sinProductos = false;
    this.productosPorcentaje = (this.productos / (this.productos + this.productosEnCamino)) * 100;
    this.productosEnCaminoPorcentaje = (this.productosEnCamino / (this.productos + this.productosEnCamino)) * 100;

  }

  sonMismoDia(fecha1: Date, fecha2: Date) {
    return fecha1.getFullYear() === fecha2.getFullYear() && fecha1.getMonth() === fecha2.getMonth() && fecha1.getDate() === fecha2.getDate();
  }
}
