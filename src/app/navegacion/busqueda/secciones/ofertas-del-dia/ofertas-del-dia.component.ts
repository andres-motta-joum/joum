import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofertas-del-dia',
  templateUrl: './ofertas-del-dia.component.html',
  styleUrls: ['./ofertas-del-dia.component.scss']
})
export class OfertasDelDiaComponent{
  constructor(private router: Router){}

  navegar(ruta: string){
    this.router.navigate([ruta]);
    window.scroll(0,0);
  }
}
