import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { provideIcons } from '@ng-icons/core';
import { heroChevronDownMini } from '@ng-icons/heroicons/mini';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  providers: [provideIcons({heroChevronDownMini})]
})
export class PublicacionComponent implements OnInit{
  constructor(private zone: NgZone, private router: Router, private storage: Storage){}
  @Input() publicacion!: Producto;
  subMenu: boolean = false;
  unidades: boolean = false;
  unidadesMasEstilos: boolean = false;
  fecha!: Date;
  totalUnidades: number = 0;
  estado = true;

  vistas: number = 0;

  async ngOnInit(): Promise<void> {
    
    if(!this.publicacion.estado){
      this.estado = false;
    }
    if(this.publicacion.vistas){
      this.publicacion.vistas.forEach((vista)=>{
        this.vistas += vista.cantidad;
      })
    }
    this.obtenerFecha();
  }

  obtenerFecha(){
    const timestamp = this.publicacion.fecha;
    this.fecha = new Date(timestamp.seconds * 1000);
  }

  desplegarSubMenu(event: Event){
    event.stopPropagation();
    this.subMenu = !this.subMenu;
  }
  desplegarUnidades(){
    this.unidades = !this.unidades;
  }

  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }

  @HostListener('document:click')
  closeMenu() {
    this.subMenu = false;
  }
  
}
