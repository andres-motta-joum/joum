import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, arrayUnion, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Direccion } from 'src/app/interfaces/usuario/subInterfaces/direccion';
import { AuthService } from '../usuarios/auth.service';
import { Observable, map } from 'rxjs';
import { Usuario, porComprar, referenciaCompra } from 'src/app/interfaces/usuario/usuario';
import { Producto } from 'src/app/interfaces/producto/producto';
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

  get $obtenerCarrito(): Observable<referenciaCompra[]>{
    return this.authService.getUsuarioId(this.auth.currentUser?.uid!).pipe(
      map(usuario => usuario.carrito!)
    );
  }

  get $obtenerGuardado(): Observable<referenciaCompra[]>{
    return this.authService.getUsuarioId(this.auth.currentUser?.uid!).pipe(
      map(usuario => usuario.guardados!)
    );
  }
//-----------------------------------------
  async agregarReferenciaCompra(idProducto: string, idUsuario: string, unidades: number, tamanioI?: number): Promise<void>{
    const productoRef = doc(this.firestore, '/productos/' + idProducto);
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    if(typeof tamanioI == 'number'){
      await updateDoc(usuarioRef, {
        referenciaCompra: [{
          producto: productoRef,
          unidades: unidades,
          tamanioIndex: tamanioI
        }]
      })
    }else{
      await updateDoc(usuarioRef, {
        referenciaCompra: [{
          producto: productoRef,
          unidades: unidades
        }]
      })
    }
  }
  async agregarReferenciaCarritoCompra(referencias: referenciaCompra[], idUsuario: string): Promise<void>{
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    await updateDoc(usuarioRef, {
      referenciaCompra: referencias
    })
  }

  async agregarReferenciaCarrito(idProducto: string, idUsuario: string, unidades: number, tamanioI?: number): Promise<void>{
    const productoRef = doc(this.firestore, '/productos/' + idProducto);
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    console.log(tamanioI);
    if(typeof tamanioI == 'number'){
      await updateDoc(usuarioRef, {
        carrito: arrayUnion({
          producto: productoRef,
          unidades: unidades,
          tamanioIndex: tamanioI
        })
      })
    }else{
      await updateDoc(usuarioRef, {
        carrito: arrayUnion({
          producto: productoRef,
          unidades: unidades
        })
      })
    }
  }
  async agregarReferenciaGuardado(idProducto: string, idUsuario: string, unidades: number, tamanioI?: number): Promise<void>{
    const productoRef = doc(this.firestore, '/productos/' + idProducto);
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    if(typeof tamanioI == 'number'){
      await updateDoc(usuarioRef, {
        guardados: arrayUnion({
          producto: productoRef,
          unidades: unidades,
          tamanioIndex: tamanioI
        })
      })
    }else{
      await updateDoc(usuarioRef, {
        guardados: arrayUnion({
          producto: productoRef,
          unidades: unidades
        })
      })
    }
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
  async obtenerProductos(referencias: referenciaCompra[]): Promise<Producto[]>{
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
        for(let dir of direcciones){
          dir.direccionPredeterminada = false;
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
      const clienteRef = doc(this.firestore, `usuarios/${venta.idCliente}`);
      const vendedorRef = doc(this.firestore, `usuarios/${venta.idVendedor}`);
      await setDoc(doc(this.firestore, `ventas/${venta.numVenta}`), venta);
      const ventaRef = doc(this.firestore, `ventas/${venta.numVenta}`);
      await updateDoc(vendedorRef, {
        ventas: arrayUnion(ventaRef)
      })
      await updateDoc(clienteRef, {
        compras: arrayUnion(ventaRef)
      })
      if(venta.referencias.length !== 1){
        await updateDoc(clienteRef, {
          carrito: []
        })
      }
      //--- agregar chat
      const chat = {
        bloqueoCliente: false,
        bloqueoVendedor: false
      }
      await setDoc(doc(this.firestore, `chats/${venta.numVenta}`), chat);
    } catch (error) {
      console.error("ERROR",error);
    }
  
  }

}
