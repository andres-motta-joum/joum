import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  @Input() listadoCuadradosInp: boolean;
  @Input() listadoLineadoInp: boolean;
  public checkHeart = false;

  private nombres: string[] = [
    'Macetas finas y galantes',
    'Pequeñas macetas para tu decoración',
    'Macetas de varios tamaños',
    'macetas finas de tamaño pequeño para hogar habitación habitación',
    'Macetas coloridas',
    'Macetas en forma cilindrica',
    'Macetas grandes colores suaves',
    'Macetas con cactus (Tamaño grande)',
    'Macetas de marca Tugo',
    'Macetas marca tugo blanco y negro',
    'Pequeñas macetas colores suaves',
    'Pequeñas macetas con cactus',
    'macetas con estilo puntos fuera',
    'Macetas estilo cartoon',
    'Macetas de marca Tugo dorado'
  ];

  private imagenes: string[] = [
    '../../../../../assets/img/categoria/macetas/1.jpg',
    '../../../../../assets/img/categoria/macetas/2.jpg',
    '../../../../../assets/img/categoria/macetas/3.jpg',
    '../../../../../assets/img/categoria/macetas/4.jpg',
    '../../../../../assets/img/categoria/macetas/5.jpg',
    '../../../../../assets/img/categoria/macetas/6.jpg',
    '../../../../../assets/img/categoria/macetas/7.jpg',
    '../../../../../assets/img/categoria/macetas/8.jpg',
    '../../../../../assets/img/categoria/macetas/9.jpg',
    '../../../../../assets/img/categoria/macetas/10.jpg',
    '../../../../../assets/img/categoria/macetas/11.jpg',
    '../../../../../assets/img/categoria/macetas/12.jpg',
    '../../../../../assets/img/categoria/macetas/13.jpg',
    '../../../../../assets/img/categoria/macetas/5.jpg',
    '../../../../../assets/img/categoria/macetas/9.jpg',
  ];
  private precios: string[] = [
    '12000',
    '30000',
    '100000',
    '12000',
    '367000',
    '5000',
    '12000',
    '23000',
    '1000000',
    '54000',
    '12000',
    '132000',
    '1000',
    '87000',
    '603000',
  ];
  private preciosRebajas: string[] = [
    '10000',
    '25000',
    '91000',
    '10000',
    '310000',
    '2000',
    '9000',
    '17000',
    '899900',
    '47000',
    '10000',
    '98000',
    '900',
    '81000',
    '550000',
  ];
  private porcentajesRebajas: string[] = [
    '5',
    '12% OFF',
    '7% OFF',
    '9% OFF',
    '14% OFF',
    '20% OFF',
    '5% OFF',
    '28% OFF',
    '3% OFF',
    '40% OFF',
    '12% OFF',
    '4% OFF',
    '16% OFF',
    '9% OFF',
    '6% OFF',
  ];

  public productos: any[] = [
    
  ];

  public imgsOfertas: any[] = [];

  constructor( private router: Router ){
    for(let i = 0; i < this.nombres.length; i++) {
      this.productos.push({
        nombre: this.nombres[i],
        foto: this.imagenes[i],
        precio: this.precios[i],
        descuento: this.preciosRebajas[i],
        porcentajeRebaja: this.porcentajesRebajas[i],
        favorito: false
      });
    }
    this.listadoCuadradosInp = true;
    this.listadoLineadoInp = false;
  }

  /*------ Base de datos
  get cliente(): Cliente {
    return this.de.cliente ? this.de.cliente : this.clienteDefault;
  }---*/

  ngOnInit(): void {   }

  /*------ Base de datos
  heartChange(id: string, adicion: boolean): void {
    this.cliente.agregarFavorito(id, adicion).then((msg) => {
      console.log(msg);
      this.cd.detectChanges();
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    });
  }...*/

  comprarPage(id: String): void{
    this.router.navigate([`producto/${id}`]);
    window.scroll(0,0)
  }
}
