import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Direccion } from 'src/app/interfaces/usuario/subInterfaces/direccion';
import { AuthService } from '../usuarios/auth.service';
import { Observable, first, firstValueFrom, map } from 'rxjs';
import { Usuario, porComprar, referenciaCompra } from 'src/app/interfaces/usuario/usuario';
import { Opinion, Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
@Injectable({
  providedIn: 'root'
})
export class ComprarService {
  constructor(private firestore: Firestore, private auth: Auth, private authService: AuthService){}
  agregarDir = false;
  modificarDir = false;
  direccionIndex!: number;

  get $obtenerReferencias(): Observable<referenciaCompra[]>{
    return this.authService.getUsuarioId(this.auth.currentUser?.uid!).pipe(
      map(usuario => usuario.referenciaCompra!)
    );
  }

  get $obtenerCarrito(): Observable<porComprar[]>{
    return this.authService.getUsuarioId(this.auth.currentUser?.uid!).pipe(
      map(usuario => usuario.carrito!)
    );
  }

  get $obtenerGuardado(): Observable<porComprar[]>{
    return this.authService.getUsuarioId(this.auth.currentUser?.uid!).pipe(
      map(usuario => usuario.guardados!)
    );
  }
//-----------------------------------------
  async agregarReferenciaCompra(idProducto: string, idUsuario: string, estilo: string, numeroEstilo: number, unidades: number): Promise<void>{
    const productoRef = doc(this.firestore, '/productos/' + idProducto);
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    await updateDoc(usuarioRef, {
      referenciaCompra: [{
          producto: productoRef,
          estilo: `${numeroEstilo}:${estilo}`,
          unidades: unidades
        }]
    })
  }
  async agregarReferenciaCarritoCompra(referencia: porComprar[], idUsuario: string): Promise<void>{
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    await updateDoc(usuarioRef, {
      referenciaCompra: referencia
    })
  }

  async agregarReferenciaCarrito(idProducto: string, idUsuario: string, estilo: string, numeroEstilo: number, unidades: number): Promise<void>{
    const productoRef = doc(this.firestore, '/productos/' + idProducto);
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    await updateDoc(usuarioRef, {
      carrito: arrayUnion({
        producto: productoRef,
        estilo: `${numeroEstilo}:${estilo}`,
        unidades: unidades
      })
    })
  }
  async agregarReferenciaGuardado(idProducto: string, idUsuario: string, estilo: string, unidades: number): Promise<void>{
    const productoRef = doc(this.firestore, '/productos/' + idProducto);
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    await updateDoc(usuarioRef, {
      guardados: arrayUnion({
        producto: productoRef,
        estilo: estilo,
        unidades: unidades
      })
    })
  }

//---------------------
  async eliminarReferenciaCarrito(usuario: Usuario, index: number): Promise<void>{
    const usuarioRef = doc(this.firestore, '/usuarios/' + usuario.id);
    if(usuario.carrito){
      const carrito = usuario.carrito;
      carrito.splice(index, 1);
      await setDoc(usuarioRef, {carrito: carrito}, {merge: true});
    }
  }
  async eliminarReferenciaGuardado(usuario: Usuario, index: number): Promise<void>{
    const usuarioRef = doc(this.firestore, '/usuarios/' + usuario.id);
    if(usuario.guardados){
      const guardados = usuario.guardados;
      guardados.splice(index, 1);
      await setDoc(usuarioRef, {guardados: guardados}, {merge: true});
    }
  }

//--------------------
  async obtenerProductos(referencias: referenciaCompra[] | porComprar[]): Promise<Producto[]>{
    const promises = referencias.map(async (referencia) => {
      const doc = await getDoc(referencia.producto);
      const producto = doc.data() as Producto;
      producto.id = doc.id;
      return producto;
    });
  
    const productos = await Promise.all(promises);
    return productos;
  } 

//------------------------------------------------------------------------------ Direcciones -----------

  async agregarDireccion(usuario: Usuario, direccion: Direccion): Promise<void>{
    const usuarioRef = doc(this.firestore, '/usuarios/' + usuario.id);
    if(direccion.direccionPredeterminada){
      if(usuario.direcciones){
        const direcciones = usuario.direcciones;
        for(let dir of direcciones){
          dir.direccionPredeterminada = false;
        }
        await setDoc(usuarioRef, {direcciones: direcciones}, {merge: true})
      }
      await updateDoc(usuarioRef, {
        direcciones: arrayUnion(direccion)
      });
    }else{
      await updateDoc(usuarioRef, {
        direcciones: arrayUnion(direccion)
      });
    }
  }

  async modificarDireccion(usuario: Usuario, direccion: Direccion): Promise<void>{
    const usuarioRef = doc(this.firestore, '/usuarios/' + usuario.id);
    if(usuario.direcciones){
        const direcciones = usuario.direcciones;
        if(direccion.direccionPredeterminada){
            for(let dir of direcciones){
                dir.direccionPredeterminada = false;
            }
        }
        direcciones[this.direccionIndex] = direccion;
        await setDoc(usuarioRef, {direcciones: direcciones}, {merge: true});
    }
  }

  async seleccionarDireccion(usuario: Usuario, direccion: Direccion, index: number): Promise<void>{
    const usuarioRef = doc(this.firestore, '/usuarios/' + usuario.id);

    if(usuario.direcciones){
        const direcciones = usuario.direcciones;
        for(let dir of direcciones){
          dir.direccionPredeterminada = false;
        }
        direccion.direccionPredeterminada = true;
        direcciones[index] = direccion;
        await setDoc(usuarioRef, {direcciones: direcciones}, {merge: true});
    }
  }

  async eliminarDireccion(usuario: Usuario, index: number): Promise<void>{
    const usuarioRef = doc(this.firestore, '/usuarios/' + usuario.id);
    if(usuario.direcciones){
        const direcciones = usuario.direcciones;
        direcciones.splice(index, 1);
        await setDoc(usuarioRef, {direcciones: direcciones}, {merge: true});
    }
  }

  //----------------- Agregar venta ---------

  async agregarVenta(venta: Venta){
    try {
      const refCliente = doc(this.firestore, `usuarios/${venta.idCliente}`);
      const refVendedor = doc(this.firestore, `usuarios/${venta.idVendedor}`);
      await setDoc(doc(this.firestore, `ventas/${venta.numVenta}`), venta);
      const refventa = doc(this.firestore, `ventas/${venta.numVenta}`);
      await updateDoc(refVendedor, {
        ventas: arrayUnion(refventa)
      })
      await updateDoc(refCliente, {
        compras: arrayUnion(refventa)
      })
      //--- opiniones
      let opiniones: Opinion[] = [];
      for(let referencia of venta.referencias){//Crear documentos de opiniones
        opiniones.push({
            idUsuario: venta.idCliente,
            producto: referencia.producto,
            numVenta: venta.numVenta,
            check: false,
        })
      }
      for(let opinion of opiniones){
        const opinionRef = await addDoc(collection(this.firestore, "opiniones"), opinion);
        await updateDoc(refCliente, {opiniones: arrayUnion(opinionRef)});
        await updateDoc(opinion.producto!, {opiniones: arrayUnion(opinionRef)});
      }
  
      //---- modificar unidades
      const productosRef = await Promise.all(venta.referencias!.map((ref:any) => getDoc(ref.producto)));
      const productos: Producto[] = [];
      productosRef.forEach((productSnapshot, index) => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        productos.push(prd)
      });
      for(let [index, producto] of productos.entries()){
        const ref = doc(this.firestore, `productos/${producto.id}`);
        const estiloFragmentos = (venta.referencias[index].estilo).split(':');
        const estiloIndex = Number(estiloFragmentos[0]) - 1;
        producto.estilos![estiloIndex].unidades! -= venta.referencias[index].unidades;
        producto.ventas! += venta.referencias[index].unidades;
        for(let estilo of producto.estilos!){
          if(estilo.unidades == 0){
            producto.estado = false;
          }
        }
        await updateDoc(ref, {
          estilos: producto.estilos,
          ventas: producto.ventas,
          estado: producto.estado
        });
      }
      //--- agregar chat
      const chat = {
        bloqueoCliente: false,
        bloqueoVendedor: false
      }
      await setDoc(doc(this.firestore, `chats/${venta.numVenta}`), chat);
    } catch (error) {
      console.error("ERRRRRRRRRRROR",error);
    }
  
  }

}
