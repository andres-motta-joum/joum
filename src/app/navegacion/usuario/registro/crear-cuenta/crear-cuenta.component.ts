import { Component, NgZone, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { aspectsSocialFacebook } from '@ng-icons/ux-aspects';
import { ionLogoTwitter } from '@ng-icons/ionicons';
import { ionLogoGoogle } from '@ng-icons/ionicons';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'],
  providers: [provideIcons({aspectsSocialFacebook, ionLogoTwitter, ionLogoGoogle})]
})
export class CrearCuentaComponent implements OnInit{
  constructor(private fb: FormBuilder,private zone: NgZone, private router: Router, private authService: AuthService) {}
  public form!: FormGroup;
  public user$!: Observable<any>;
  private readonly emailattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  private readonly passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

  ngOnInit(): void {
    this.initForm();
    //this.authService.singOut();
    this.user$ = this.authService.userState$;
  }

  private initForm():void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)] ],
        lastname: ['', [Validators.required, Validators.minLength(2)] ],
        email: ['', [Validators.required, Validators.pattern(this.emailattern)] ],
        password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(24),Validators.pattern(this.passwordPattern)]],
        phone: ['', [Validators.required, Validators.minLength(8)] ],
      }
    )
  }
  hasError(field: string ): boolean{
    const fieldName = this.form.get(field);
    return !! fieldName?.invalid && fieldName.touched
  }

  onSubmit(): void{

    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
    if (this.form.valid) {
      const { email, password, name, lastname, phone } = this.form.value;
      this.authService.singUp(email, password, name, lastname, phone);
    }
  }


  //------------------------------------------
  singInGoogle(){
    this.authService.singInGoogle();
  }
  singInFacebook(){
    this.authService.singInFacebook();
  }
  singInTwitter(){
    this.authService.singInTwitter();
  }
  //---------------------------------------------------------------
  navegar(ruta: string){
    this.zone.run(()=>{
      this.router.navigate([ruta]);
    })
  }
}
