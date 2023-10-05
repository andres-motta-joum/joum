import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, arrayUnion, collection, doc, docData, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Observable, map } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private firestore: Firestore, private storage: Storage) { }

  async obtenerProductos(): Promise<Producto[]> {
    const querySnapshot = await getDocs(collection(this.firestore, 'productos'));
    const productos:Producto[] = [];
  
    querySnapshot.forEach((doc) => {
      const producto = doc.data() as Producto;
      producto['id'] = doc.id;
      if(producto['estado']){
        productos.push(producto);
      } 
    });
    
    return productos;
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

  async obtenerFotos(productos: Producto[]): Promise<string[]>{
    let fotos = productos.map(async (producto:any) => {
      const imgRef = ref(this.storage, `${producto.id}/1:${producto.estilos[0].nombre}`);
      const response = await listAll(imgRef);
      return await getDownloadURL(response.items[0]);
    });
    const urls = await Promise.all(fotos)
    return urls;
  }
  async obtenerFotosSegunEstilo(productos: Producto[], estilos: string[]): Promise<string[]>{
    let fotos = productos.map(async (producto:any, index: number) => {
      const imgRef = ref(this.storage, `${producto.id}/${estilos[index]}`);
      const response = await listAll(imgRef);
      return await getDownloadURL(response.items[0]);
    });
    const urls = await Promise.all(fotos)
    return urls;
  }


  async obtenerFotosProducto(producto: Producto): Promise<string[][]>{
    const urlsArrays: string[][] = [];
    
    for (const [index, estilo] of (producto.estilos || []).entries()) {
      const imgRef = ref(this.storage, `${producto.id}/${index + 1}:${estilo.nombre}`);
      const response = await listAll(imgRef);
      
      const ulrsEstilo = await Promise.all(response.items.map(async (item) => {
        return await getDownloadURL(item);
      }));

      urlsArrays.push(ulrsEstilo);
    }

    return urlsArrays;
  }
  
  async obtenerFotoUno(producto: Producto): Promise<string[][]>{
    const urlsArrays: string[][] = [['']];
    
    const imgRef = ref(this.storage, `${producto.id}/1:${producto.estilos![0].nombre}`);
    const response = await listAll(imgRef);
    const foto = await getDownloadURL(response.items[0]);
    urlsArrays[0][0] = foto;
    return urlsArrays;
  }

  async agregarFavorito(productoId: string, usuarioId: string){
    const usuarioRef = doc(this.firestore, `usuarios/${usuarioId}`);
    const productoRef = doc(this.firestore, `productos/${productoId}`);
    await updateDoc(usuarioRef, {
      favoritos: arrayUnion(productoRef)
    })
  }

  async eliminarFavorito(usuarioId: string, favoritos: Usuario['favoritos']){
    console.log(favoritos);
    const usuarioRef = doc(this.firestore, `usuarios/${usuarioId}`);
    await setDoc(usuarioRef, {favoritos: favoritos}, {merge: true});
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
