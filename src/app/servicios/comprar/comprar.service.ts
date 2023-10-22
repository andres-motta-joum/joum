import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Direccion } from 'src/app/interfaces/usuario/subInterfaces/direccion';
import { AuthService } from '../usuarios/auth.service';
import { Observable, map } from 'rxjs';
import { Usuario, porComprar, referenciaCompra } from 'src/app/interfaces/usuario/usuario';
import { Estilo, Opinion, Producto } from 'src/app/interfaces/producto/producto';
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
  async agregarReferenciaCompra(idProducto: string, idUsuario: string, estilo: string, unidades: number): Promise<void>{
    const productoRef = doc(this.firestore, '/productos/' + idProducto);
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    await updateDoc(usuarioRef, {
      referenciaCompra: [{
          producto: productoRef,
          estilo: estilo,
          unidades: unidades
        }]
    })
  }
  async agregarReferenciaCarritoCompra(referencia: referenciaCompra[], idUsuario: string): Promise<void>{
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    await updateDoc(usuarioRef, {
      referenciaCompra: referencia
    })
  }

  async agregarReferenciaCarrito(idProducto: string, idUsuario: string, estilo: string, unidades: number): Promise<void>{
    const productoRef = doc(this.firestore, '/productos/' + idProducto);
    const usuarioRef = doc(this.firestore, '/usuarios/' + idUsuario);
    await updateDoc(usuarioRef, {
      carrito: arrayUnion({
        producto: productoRef,
        estilo: estilo,
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
      //--- opiniones
      
      let opiniones: Opinion[] | any = [];

      for(let referencia of venta.referencias) {
          const q = query(collection(this.firestore, "opiniones"), where("foto", "==", referencia.foto));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
              opiniones.push({
                  idUsuario: venta.idCliente,
                  idProducto: referencia.idProducto,
                  tituloProducto: referencia.tituloProducto,
                  foto: referencia.foto,
                  numVenta: venta.numVenta,
                  fecha: new Date(),
                  check: false
              });
          }
      }

      for(let opinion of opiniones){
          const opinionRef = await addDoc(collection(this.firestore, "opiniones"), opinion);
          await updateDoc(clienteRef, {opiniones: arrayUnion(opinionRef)});
          await updateDoc(doc(this.firestore, `productos/${opinion.idProducto}`), {opiniones: arrayUnion(opinionRef)});
      }
      

  
      //---- modificar unidades
      const productosSnapshot = await Promise.all(venta.referencias!.map(async (ref:porComprar) => {
        return await getDoc(doc(this.firestore, `productos/${ref.idProducto}`));
      }));
      const productos: Producto[] = [];
      const estilos: Estilo[] = [];
      const estilosRef: DocumentReference<DocumentData>[] = [];
      await Promise.all(productosSnapshot.map(async (productoSnapshot, index) => {
        const prd = productoSnapshot.data() as Producto;
        prd.id = productoSnapshot.id;
        productos.push(prd);
    
        const estiloRef = doc(this.firestore, `productos/${prd.id}/estilos/${venta.referencias[index].idEstilo}`);
        const estiloSnapshot = await getDoc(estiloRef);
        const estilo = estiloSnapshot.data() as Estilo;
        estilo.id = estiloSnapshot.id;
        estilos.push(estilo);
        estilosRef.push(estiloRef);
      }));
      for(let [index, producto] of productos.entries()){
        const ref = doc(this.firestore, `productos/${producto.id}`);
        const unidadEstilo = estilos[index].unidades! -= venta.referencias[index].unidades;
        producto.ventas! += venta.referencias[index].unidades;
        if(estilos[index].unidades == 0){
          producto.estado = false;
        }
        await updateDoc(estilosRef[index], {unidades: unidadEstilo})
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
      console.error("ERROR",error);
    }
  
  }

}
