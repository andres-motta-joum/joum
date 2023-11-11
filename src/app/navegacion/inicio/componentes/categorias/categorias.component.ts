import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent{
  constructor(private router: Router){}

  navegar(ruta: string){
    this.router.navigate([ruta]);
  }
}
