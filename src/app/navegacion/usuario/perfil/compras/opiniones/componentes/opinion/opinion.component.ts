import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss']
})
export class OpinionComponent implements OnInit{
  @Input() producto!: Producto;
  @Input() foto!: string;
  @Input() fechaVenta!: Timestamp;
  fecha!: Date;
  subMenu: boolean = false;
  constructor(private zone: NgZone, private router: Router){}

  ngOnInit(): void {
    this.fecha = this.fechaVenta.toDate()
  }
  desplegar(){
    this.subMenu = !this.subMenu;
  }
  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
