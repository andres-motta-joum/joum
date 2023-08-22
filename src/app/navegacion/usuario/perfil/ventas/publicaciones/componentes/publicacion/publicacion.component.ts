import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { provideIcons } from '@ng-icons/core';
import { heroChevronDownMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  providers: [provideIcons({heroChevronDownMini})]
})
export class PublicacionComponent {
  @Input() publicacion!: Producto;
  subMenu: boolean = false;
  unidades: boolean = false;

  constructor(private zone: NgZone, private router: Router){}
  desplegarSubMenu(){
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
}
