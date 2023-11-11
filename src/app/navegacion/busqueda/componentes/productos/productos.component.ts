import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Estilo, Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  constructor( private firestore: Firestore, private storage: Storage){}
  @Input() listadoCuadradosInp!: boolean;
  @Input() listadoLineadoInp!: boolean;
  @Input() productos!: Producto[];
  fotos: string[] = [];
  public checkHeart = false;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['productos'] && changes['productos'].currentValue) {
      const productos = changes['productos'].currentValue as Producto[];

      this.fotos = await Promise.all(productos.map(async producto =>{
        const estiloSnapshot = await getDoc(producto.estilos[0]);
        const estilo = estiloSnapshot.data() as Estilo;
        const fotoRef = ref(this.storage, `productos/${producto.id}/${estiloSnapshot.id}/${estilo.fotos[0].id}`);
        return await getDownloadURL(fotoRef);
      }))
    }
  }

}
