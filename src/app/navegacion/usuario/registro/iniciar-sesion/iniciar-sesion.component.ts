import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { heroEnvelopeSolid } from '@ng-icons/heroicons/solid';
import { heroLockClosedSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],
  providers: [provideIcons({heroEnvelopeSolid, heroLockClosedSolid})]
})
export class IniciarSesionComponent {
  form!: FormGroup;

  btnDisabled = false;

  constructor(
    private formBuilder: FormBuilder
    ) {
      this.buildForm();
  }

  private buildForm(): any {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  /*-------- Crear Usuario y Producto ---------*/
  ingresar(event: Event):void{
    event.preventDefault()
  }


}
