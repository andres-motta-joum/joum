import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto/producto';
import { ProductoService } from 'src/app/servicios/producto/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  constructor( private router: Router, private productoService: ProductoService){}
  @Input() listadoCuadradosInp!: boolean;
  @Input() listadoLineadoInp!: boolean;
  @Input() productos!: Producto[];
  public checkHeart = false;

  ngOnInit(): void {
    this.productos = this.productoService.getProducts();
  }
}
