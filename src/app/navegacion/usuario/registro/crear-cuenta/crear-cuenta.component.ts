import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';
import { heroEnvelopeSolid } from '@ng-icons/heroicons/solid';
import { heroLockClosedSolid } from '@ng-icons/heroicons/solid';
import { heroPhoneSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'],
  providers: [provideIcons({heroUserCircleSolid, heroEnvelopeSolid, heroLockClosedSolid, heroPhoneSolid})]
})
export class CrearCuentaComponent {

  form!: FormGroup;

  btnDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone
    ) {
      this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: [null, [Validators.required]],
      terminosAceptados: [false, [Validators.required]]
    });
  }

  /*----------- Crear usuario y Productos -------------*/
  
  guardar(event: Event): void{
    event.preventDefault()
  }

}
