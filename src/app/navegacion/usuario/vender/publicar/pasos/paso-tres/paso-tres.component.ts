import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss']
})
export class PasoTresComponent {

  form!: FormGroup;

  constructor(
    private pasos: PasosVenderService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
    if (this.pasos.producto !== undefined) {
      this.buildForm(this.pasos.producto.fabricante, this.pasos.producto.condicion, this.pasos.producto.marca);
    } else {
      this.router.navigate(['/vender', 'formulario', 'paso1']);
    }
  }

  private buildForm(defFabricante: string, defCondicion: string, defMarca?: string): void {
    if (defCondicion === undefined || defCondicion === null) {
      defCondicion = "";
    }
    const marca = defMarca === null ? '' : defMarca;
    this.form = this.formBuilder.group({
      fabricante: [defFabricante, [Validators.required]],
      marca: [marca],
      condicion: [defCondicion, [Validators.required]]
    });
  }

  

  ngAfterViewInit(): void {
    if (!this.pasos.paso3) {
      this.router.navigate(['/vender', 'formulario', 'paso2']);
    }
  }

  irPaso2(): void {
    this.router.navigate(['/vender', 'formulario', 'paso2']);
  }

  irPaso4(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.pasos.paso4 = true;
      this.pasos.producto.fabricante = this.form.value.fabricante;
      if (this.form.value.marca !== null && this.form.value.marca !== '') {
        this.pasos.producto.marca = this.form.value.marca;
      } else if (this.form.value.marca === '') {
        this.pasos.producto.marca = undefined;
      }
      this.pasos.producto.condicion = this.form.value.condicion;
      this.router.navigate(['/vender', 'formulario', 'paso4']);
    }
  }
}
