import { Component, NgZone } from '@angular/core';
import { Auth, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { collection, getDocs, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { DataSharingService } from 'src/app/servicios/usuarios/data-sharing.service';

@Component({
  selector: 'app-correo-codigo-sms',
  templateUrl: './correo-codigo-sms.component.html',
  styleUrls: ['./correo-codigo-sms.component.scss']
})
export class CorreoCodigoSMSComponent {
  constructor(private fb: FormBuilder,private zone: NgZone, private router: Router, private auth: Auth, private dataSharingService: DataSharingService, private firestore: Firestore) {}
  public form!: FormGroup;
  private readonly emailattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  public error = '';

  ngOnInit(): void {
    this.initForm();
  }

  private initForm():void {
    this.form = this.fb.group(
      {
        email: ['', [
          Validators.required, Validators.pattern(this.emailattern)
        ]],
      }
    )
  }
  validarCorreo(){
    const error = this.form.get('email')?.errors;
    const validatorName = Object.keys(error ?? {})[0];
    if(validatorName === 'required'){
      this.error = 'Este campo es requerido';
    }else if(validatorName === 'pattern'){
      this.error = 'Por favor, ingresa un correo electrónico válido.';
    }else{
      this.error = '';
    }
  }

  async onSubmit(): Promise<void>{
    this.validarCorreo();
    if(this.form.valid){
      const {email} = this.form.value;
      this.verificarCorreoExistente(email);
    }
  }

  async verificarCorreoExistente(email: string) {
    try {
      const methods = await fetchSignInMethodsForEmail(this.auth , email);
  
      if (methods && methods.length > 0) {
        const usuarios = collection(this.firestore, "usuarios");
        const queri = query(usuarios, where("correo", "==", email));
        const querySnapshot = await getDocs(queri);

        querySnapshot.forEach((doc) => {
          const {telefono} = doc.data()
          this.dataSharingService.setFormData({
            tipo: 'forgotPassword',
            email: email,
            phone: telefono
          })
          this.router.navigate(['cuenta/phone-validation/enter-code']);
        });

      } else {
        this.error = 'El correo electrónico que ingresaste no está vinculado a ninguna cuenta.';
      }
    } catch (error) {
      console.error('Error al verificar el correo electrónico:', error);
    }
  }

  navegar(ruta: string){
    this.zone.run(()=>{
      this.router.navigate([ruta]);
    })
  }
}
