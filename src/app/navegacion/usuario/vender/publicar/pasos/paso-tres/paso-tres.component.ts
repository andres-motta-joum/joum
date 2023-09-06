import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';
import { provideIcons } from '@ng-icons/core';
import { heroArrowSmallLeft } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss'],
  providers: [provideIcons({heroArrowSmallLeft})]
})
export class PasoTresComponent implements OnInit{
  constructor(private pasos: PasosVenderService,private router: Router,private formBuilder: FormBuilder, private changeDetector: ChangeDetectorRef) {}
  form!: FormGroup;
  producto!: any;

  ngOnInit(): void {
    this.pasos.paso3 ? this.buildForm(this.pasos.producto) : this.router.navigate(['/vender', 'formulario', 'paso2']);
  }

  private buildForm(producto: any): void {
    this.producto = producto;
    this.form = this.formBuilder.group({
      autoria: [producto.autoria, [Validators.required ]],
      marca: [producto.marca, []],
      modelo: [producto.modelo, []],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.producto.autoria = this.form.value.autoria;
      this.form.value.marca ? this.producto.marca = this.form.value.marca : this.producto.marca = 'Genérica'
      this.form.value.modelo ? this.producto.modelo = this.form.value.modelo : this.producto.modelo = 'N/A'
      //-------------------
      this.pasos.paso4 = true;
      this.router.navigate(['/vender', 'formulario', 'paso4']);
    }
  }

  atras(): void {
    this.producto.autoria = this.form.value.autoria;
    this.form.value.marca ? this.producto.marca = this.form.value.marca : this.producto.marca = 'Genérica'
    this.form.value.modelo ? this.producto.modelo = this.form.value.modelo : this.producto.modelo = 'N/A'

    this.router.navigate(['/vender', 'formulario', 'paso2']);
  }
}
