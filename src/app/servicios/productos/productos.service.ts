import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, arrayUnion, collection, doc, docData, getDoc, getDocs, increment, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Observable, map } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private firestore: Firestore, private storage: Storage) { }

  async obtenerProductosSimilares(categoria: string, idProducto: string): Promise<Producto[]> {
    const queri = query(collection(this.firestore, 'productos'), orderBy('enFavorito', 'desc'));
    const snapshot = await getDocs(queri);
    const productos = snapshot.docs.map(doc => ({...doc.data(), id: doc.id} as Producto));
    let filtro = productos.filter(producto => producto.categoria == categoria && producto.id !== idProducto);
    return filtro;
  }

  obtenerProductoId(id: string): Observable<Producto | null> {
    const documentoProducto = doc(this.firestore, 'productos', id);
    return docData(documentoProducto).pipe(
      map(producto => {
        if (producto) {
          return { ...producto, id: id } as Producto;
        } else {
          return null;
        }
      })
    );
  }

  async obtenerProductoIdPromise(id: string): Promise<Producto | null> {
    const productoRef = doc(this.firestore, 'productos', id);
    const productoSnapshot = await getDoc(productoRef);
    let prd = productoSnapshot.data() as Producto;
    if(prd){
      prd['id'] = productoSnapshot.id;
      return prd
    }else{
      return null
    }
  }
  
  async obtenerFotoUno(producto: any): Promise<string[]>{
    const urlsArrays: string[] = [''];
    const imgRef = ref(this.storage, `productos/${producto.id}/${producto.fotos[0].id}`);
    urlsArrays[0] =  await getDownloadURL(imgRef);
    return urlsArrays;
  }

  async agregarFavorito(productoId: string, usuarioId: string){
    const usuarioRef = doc(this.firestore, `usuarios/${usuarioId}`);
    const productoRef = doc(this.firestore, `productos/${productoId}`);
    await updateDoc(usuarioRef, {favoritos: arrayUnion(productoRef)});
    await updateDoc(productoRef, {enFavorito: increment(1)})
  }

  async eliminarFavorito(usuarioId: string, favoritos: Usuario['favoritos'], productoRef:  DocumentReference<DocumentData>){
    const usuarioRef = doc(this.firestore, `usuarios/${usuarioId}`);
    await setDoc(usuarioRef, {favoritos: favoritos}, {merge: true});
    await updateDoc(productoRef, {enFavorito: increment(-1)});
  }

  async eliminarCarrito(usuarioId: string, carrito: Usuario['carrito']){
    const usuarioRef = doc(this.firestore, `usuarios/${usuarioId}`);
    await setDoc(usuarioRef, {carrito: carrito}, {merge: true});
  }

  async agregarHistorial(productoId: string, usuarioId: string, historial: any[]){
    const usuarioRef = doc(this.firestore, `usuarios/${usuarioId}`);
    const productoRef = doc(this.firestore, `productos/${productoId}`);

    if(historial){
      const index = historial.findIndex( ref => ref.id === productoId);
      if (index !== -1) {
        historial.splice(index, 1);
        historial.push(productoRef);
      } else {
        historial.push(productoRef);
      }
      await updateDoc(usuarioRef, {
        historial: historial
      })
    }else{
      await updateDoc(usuarioRef, {
        historial: arrayUnion(productoRef)
      })
    }
  }

}
