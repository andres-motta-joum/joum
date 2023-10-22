import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, arrayUnion, collection, doc, docData, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Observable, map } from 'rxjs';
import { Estilo, Producto } from 'src/app/interfaces/producto/producto';
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

  async obtenerFotos(productos: Producto[]): Promise<string[]>{
    return Promise.all(productos.map(async (producto:any) => {
      const estiloSnapshot = await getDoc(producto.estilos[0]);
      const estilo = await estiloSnapshot.data() as Estilo;
      const imgRef = ref(this.storage, `productos/${producto.id}/${producto.estilos[0].id}/${estilo.fotos[0].id}`);
      return await getDownloadURL(imgRef);
    }));
  }

  async obtenerFotosSegunEstilo(productos: Producto[], estilos: string[]): Promise<string[]>{
    return Promise.all(productos.map(async (producto:any, index: number) => {
      const estiloRef = doc(this.firestore, `productos/${producto.id}/estilos/${estilos[index]}`);
      const estiloSnapshot = await getDoc(estiloRef);
      const estilo = estiloSnapshot.data() as Estilo;
      const imgRef = ref(this.storage, `productos/${producto.id}/${estilos[index]}/${estilo.fotos[0].id}`);
      const url = await getDownloadURL(imgRef);
      return url;
    }));
  }


  async obtenerFotosProducto(producto: Producto): Promise<string[][]>{
    return Promise.all(producto.estilos.map(async (estiloRef: any)=>{
      const estiloSnapshot = await getDoc(estiloRef);
      const estilo = estiloSnapshot.data() as Estilo;
      return Promise.all(estilo.fotos.map(async (urlRef)=>{
        const imgRef = ref(this.storage, `productos/${producto.id}/${estiloRef.id}/${urlRef.id}`);
        return await getDownloadURL(imgRef);
      }))
    }))
  }
  
  async obtenerFotoUno(producto: any): Promise<string[][]>{
    const urlsArrays: string[][] = [['']];

    const estiloSnapshot = await getDoc(producto.estilos[0]);
    const estilo = await estiloSnapshot.data() as Estilo;
    const imgRef = ref(this.storage, `productos/${producto.id}/${producto.estilos[0].id}/${estilo.fotos[0].id}`);
    urlsArrays[0][0] =  await getDownloadURL(imgRef);
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
