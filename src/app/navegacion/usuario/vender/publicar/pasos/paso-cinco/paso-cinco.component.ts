import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service'; 

@Component({
  selector: 'app-paso-cinco',
  templateUrl: './paso-cinco.component.html',
  styleUrls: ['./paso-cinco.component.scss']
})
export class PasoCincoComponent {
  public textFoto = 'Agregar foto de tu producto';
  public descripcion!: string;

  constructor(
    private pasos: PasosVenderService,
    private router: Router
    ) {
    if (this.pasos.producto !== undefined) {
      if (this.pasos.producto.descripcion !== undefined) {
        this.descripcion = this.pasos.producto.descripcion;
      } else {
        this.descripcion = '';
      }
    } else {
      this.router.navigate(['/vender', 'formulario', 'paso1']);
    }
  }

  ngOnInit(): void {
    if (!this.pasos.paso5) {
      this.router.navigate(['/vender', 'formulario', 'paso4']);
    }
  }

  getFoto(fotoFile: HTMLInputElement): void {
    // tslint:disable-next-line: no-non-null-assertion
    this.textFoto = fotoFile.files![0].name;
  }

  irPaso4(): void {
    this.router.navigate(['/vender', 'formulario', 'paso4']);
  }

  irPaso6(form: NgForm, fotoFile: HTMLInputElement): void {
    if (form.valid && fotoFile.files !== null && fotoFile.files[0] !== undefined && this.textFoto !== 'Agregar foto de tu producto') {
      this.pasos.paso6 = true;
      this.pasos.producto.descripcion = form.value.descripcion;
      this.pasos.producto.foto = fotoFile.files[0];
      this.router.navigate(['/vender', 'formulario', 'paso6']);
    }
  }
}
