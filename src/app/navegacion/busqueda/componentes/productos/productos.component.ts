import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  constructor( private router: Router, private storage: Storage){}
  @Input() listadoCuadradosInp!: boolean;
  @Input() listadoLineadoInp!: boolean;
  @Input() productos!: Producto[];
  fotos: string[] = [];
  public checkHeart = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productos'] && changes['productos'].currentValue) {
      const productos = changes['productos'].currentValue;
      let fotos = productos.map(async (producto:any) => {
        const imgRef = ref(this.storage, `productos/${producto.id}/1:${producto.estilos[0].nombre}`);
        const response = await listAll(imgRef);
        return await getDownloadURL(response.items[0]);
      });
      
      Promise.all(fotos)
      .then(urls => {
          this.fotos = urls;
      });
    }
  }

}
