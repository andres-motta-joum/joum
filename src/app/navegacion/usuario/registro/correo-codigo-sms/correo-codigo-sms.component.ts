import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correo-codigo-sms',
  templateUrl: './correo-codigo-sms.component.html',
  styleUrls: ['./correo-codigo-sms.component.scss']
})
export class CorreoCodigoSMSComponent {
  constructor(private formBuilder: FormBuilder,private zone: NgZone, private router: Router) {}
  form!: FormGroup;
  navegar(ruta: string){
    this.zone.run(()=>{
      this.router.navigate([ruta]);
    })
  }
}
