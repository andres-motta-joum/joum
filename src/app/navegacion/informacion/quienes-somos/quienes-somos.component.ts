import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss']
})
export class QuienesSomosComponent {
    constructor( private router: Router) {}

    navegar( ruta: string): void{
        this.router.navigate([ruta]);
    }
}
