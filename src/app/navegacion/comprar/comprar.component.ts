import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, increment, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { Estilo, Producto } from 'src/app/interfaces/producto/producto';
import { Direccion } from 'src/app/interfaces/usuario/subInterfaces/direccion';
import { Usuario, porComprar, referenciaCompra } from 'src/app/interfaces/usuario/usuario';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit, OnDestroy{
  constructor(private router: Router, private auth: Auth, private authService: AuthService, private comprarService: ComprarService, private firestore: Firestore){}
  private subscription!: Subscription;
  private usuario!: Usuario;
  productosLenght!: number;
  productos: Producto[] = [];
  precioProductos!: number;
  precioEnvios!: number;
  grupoReferencias: { [idUsuario: string]: porComprar[] } = {};

  cargando = false;

  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const usuario = await this.authService.getUsuarioIdPromise(user.uid);
        if(!this.cargando){
          this.usuario = usuario;
          if(usuario.referenciaCompra && usuario.referenciaCompra.length !== 0){
            this.obtenerProductos()
          }else{
            this.router.navigate(['']);
          }
        }
      } else {
        this.router.navigate(['cuenta/iniciar-sesion']);
      }
    });
  }

  async obtenerProductos(){
    if(this.usuario.referenciaCompra){
      const productosRef = await Promise.all(this.usuario?.referenciaCompra.map((ref:any) => getDoc(ref.producto)));
      productosRef.forEach((productSnapshot, index) => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        this.productos.push(prd);
      });
      this.subscription = this.comprarService.$obtenerReferencias.subscribe(async (referencias)=>{
        this.obtenerPrecios(referencias);
        let productosLenght = 0;
        for(let referencia of referencias){
          productosLenght += referencia.unidades;
        }
        this.productosLenght = productosLenght;
        this.productos = await this.comprarService.obtenerProductos(referencias);
      });
    }
  }

  obtenerPrecios(referencias: referenciaCompra[]){
    let precioProductos = 0;
    let precioEnvios = 0;
    if(this.productosLenght == 1){
      precioProductos = this.productos[0].precio!;
      if(!this.productos[0].envioGratis){
        precioEnvios = this.productos[0].precioEnvio!;
      }
    }else{
      for (const [index, producto] of this.productos.entries()) {
        precioProductos += producto.precio! * referencias[index].unidades;
        if(!producto.envioGratis){
          precioEnvios += producto.precioEnvio!;
        }else{
          precioEnvios += 0;
        }
      }
    }
    this.precioProductos = precioProductos;
    this.precioEnvios = precioEnvios;
  }

//-------------------------------------------------------------------------- Crear venta ---------------------------------

  async comprar(){
    if(!this.cargando){
      this.cargando = true;
      this.usuario = await this.authService.getUsuarioIdPromise(this.auth.currentUser!.uid!);
      if(this.usuario.referenciaCompra && this.usuario.referenciaCompra.length !== 0){
        await this.agruparReferenciasPorVendedor(this.usuario);
        for(let idVendedor in this.grupoReferencias){
          //----- obtener numero de venta y sumarle 1 -----
          const refVenta = doc(this.firestore, 'informacion/1');
          await updateDoc(refVenta, {
            ventas: increment(1)
          });
          const infoVentasRef = await getDoc(refVenta);
          const direcciones = this.usuario.direcciones;
          //----------------------------------------------- definir valores -------
          const referencias = this.grupoReferencias[idVendedor];
          const numVenta = infoVentasRef.data()!;
          const fechaActual = new Date();
          let direccion!: Direccion;
          for(let dir of direcciones!){
            if(dir.direccionPredeterminada){
              direccion = dir //Obtener dirección que tenga por defecto
            }
          }
          const venta = {
            numVenta: numVenta['ventas'],
            referencias: referencias,
            fechaVenta: new Date(),
            enCamino: false,
            entregado: false,
            aproxEntrega: new Date(fechaActual.setDate(fechaActual.getDate() + 10)),
            idCliente: this.usuario.id!,
            idVendedor: idVendedor,
            datosEnvio: direccion,
            cancelada: false
          }

          await this.comprarService.agregarVenta(venta);
          this.router.navigate(['']);
        }
      }
    }
  }
  
  async agruparReferenciasPorVendedor(usuario: Usuario): Promise<void>{
    const referenciasCompra = await this.convertirReferenciasACompra(usuario.referenciaCompra!);
    const productosSnapshot = await Promise.all(referenciasCompra.map(async (ref: porComprar) => {
      return await getDoc(doc(this.firestore, `productos/${ref.idProducto}`))
    })); //--Obtener referencias totales

    productosSnapshot.forEach((productoSnapshot, index) => {
      const prd = productoSnapshot.data() as Producto;
      const idVendedor = prd.idUsuario;

      if (!this.grupoReferencias[idVendedor!]) { //Se agrega el id del producto de la referencia a grupoReferencias si aún no existe. Si ya existe, agrega la referencia al id.
        this.grupoReferencias[idVendedor!] = [];
      }

      this.grupoReferencias[idVendedor!].push(referenciasCompra[index]);
    });
  }

  async convertirReferenciasACompra(referencias: referenciaCompra[]): Promise<porComprar[]>{
    return await Promise.all(referencias!.map( async(referencia: referenciaCompra) => {
      const productoSnapshot = await getDoc(referencia.producto);
      const producto = productoSnapshot.data() as Producto;

      const estiloRef = doc(this.firestore, `productos/${productoSnapshot.id}/estilos/${referencia.estilo}`);
      const estiloSnapshot = await getDoc(estiloRef);
      const estilo = estiloSnapshot.data() as Estilo;

      const fotoRef = doc(this.firestore, `productos/${productoSnapshot.id}/estilos/${estiloSnapshot.id}/fotos/${estilo.fotos[0].id}`);
      const fotoSnapshot = await getDoc(fotoRef);
      const foto = fotoSnapshot.data() as any;
      return {
        idProducto: referencia.producto.id,
        tituloProducto: producto.nombre,
        precioProducto: producto.precio,
        nombreEstilo: estilo.nombre,
        idEstilo: estiloSnapshot.id,
        skuEstilo: estilo.sku ? estilo.sku : '',
        foto: foto.url,
        unidades: referencia.unidades,
        envioGratis: producto.envioGratis,
        precioEnvio: producto.precioEnvio,
        tipoPublicacion: producto.tipoPublicacion
      } as porComprar
    }));
  }

  //-------------------------------------
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.comprarService.agregarDir = false;
    this.comprarService.agregarDir = false;
  }
  
}
