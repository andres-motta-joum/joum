import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Estilo, Producto } from 'src/app/interfaces/producto/producto';
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
  @Input() foto!: string;
  estilos!: Estilo[];
  subMenu: boolean = false;
  unidades: boolean = false;
  unidadesMasEstilos: boolean = false;
  fotosEstilos!: string[];
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
    await this.obtenerFotosEstilos();
    this.estilos.forEach(estilo => {
      this.totalUnidades += estilo.unidades;
    });
  }

  obtenerFecha(){
    const timestamp = this.publicacion.fecha;
    this.fecha = new Date(timestamp.seconds * 1000);
  }

  async obtenerFotosEstilos(){
    this.estilos = await Promise.all(this.publicacion.estilos.map(async (estiloRef)=>{
      const estiloSnapshot = await getDoc(estiloRef);
      let estilo = estiloSnapshot.data() as Estilo;
      estilo.id = estiloSnapshot.id;
      return estilo;
    }))
    this.fotosEstilos = await Promise.all(this.estilos.map(async (estilo)=>{
      const fotoSnapshot = await getDoc(estilo.fotos[0]);
      let foto = fotoSnapshot.data() as any;
      return foto.url;
    }))
  }

  desplegarSubMenu(event: Event){
    event.stopPropagation();
    this.subMenu = !this.subMenu;
  }
  desplegarUnidades(){
    if(this.estilos.length > 5){
      this.unidadesMasEstilos = !this.unidadesMasEstilos;
    }else{
      this.unidades = !this.unidades;
    }
  }

  editarProducto(){
    const idUrl = this.router.url.split('/')[1];
    this.router.navigate([idUrl + '/editar-publicacion/' + this.publicacion.id]);
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
