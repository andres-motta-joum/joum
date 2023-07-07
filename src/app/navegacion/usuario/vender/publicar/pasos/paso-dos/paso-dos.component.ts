import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss']
})
export class PasoDosComponent {
  form!: FormGroup;

  constructor(
    private pasos: PasosVenderService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    if (this.pasos.producto !== undefined) {
      this.buildForm(this.pasos.producto.nombre);
    } else {
      this.router.navigate(['/vender', 'formulario', 'paso1']);
    }
  }

  private buildForm(inDefault: string): void {
    this.form = this.formBuilder.group({
      titulo: [inDefault, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    if (!this.pasos.paso2) {
      this.router.navigate(['/vender', 'formulario', 'paso1']);
    }
    this.changeDetector.detectChanges();
  }

  irPaso3(event: Event): any {
    event.preventDefault();
    if (this.form.valid) {
      this.pasos.producto.nombre = this.form.value.titulo;
      this.pasos.paso3 = true;
      this.router.navigate(['/vender', 'formulario', 'paso3']);
    }
  }

  irPaso1(): void {
    this.router.navigate(['/vender', 'formulario', 'paso1']);
  }
}
