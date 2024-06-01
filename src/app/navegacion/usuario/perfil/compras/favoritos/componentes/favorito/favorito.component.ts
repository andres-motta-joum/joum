import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { provideIcons } from '@ng-icons/core';
import { matDelete } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.scss'],
  providers: [provideIcons({matDelete})]
})
export class FavoritoComponent {
  @Input() favorito!: Producto;
  @Output() elimar = new EventEmitter<string>()
  subMenu: boolean = false;
  constructor(private zone: NgZone, private router: Router){
  }
  
  desplegar(){
    this.subMenu = !this.subMenu;
  }

  eliminar(){
    this.elimar.emit(this.favorito.id);
  }
   
  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
