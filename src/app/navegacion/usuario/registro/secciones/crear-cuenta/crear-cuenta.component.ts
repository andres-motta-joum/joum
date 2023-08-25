import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { aspectsSocialFacebook } from '@ng-icons/ux-aspects';
import { ionLogoTwitter } from '@ng-icons/ionicons';
import { ionLogoGoogle } from '@ng-icons/ionicons';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Auth } from '@angular/fire/auth';
import { DataSharingService } from 'src/app/servicios/usuarios/data-sharing.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'],
  providers: [provideIcons({aspectsSocialFacebook, ionLogoTwitter, ionLogoGoogle})]
})
export class CrearCuentaComponent implements OnInit{
  constructor(private fb: FormBuilder,private zone: NgZone, private router: Router, private authService: AuthService, private auth: Auth, private dataSharingService: DataSharingService) {}
  public form!: FormGroup;
  public user$!: Observable<any>;
  private readonly emailattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  private readonly passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  public passwordCheck!: boolean | null;
  public inputFunction = false;
  public checkbox = true;

  ngOnInit(): void {
    this.initForm();
    //this.authService.signOut();
    this.user$ = this.authService.userState$;
  }

  private initForm():void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)] ],
        lastname: ['', [Validators.required, Validators.minLength(2)] ],
        email: ['', [Validators.required, Validators.pattern(this.emailattern)] ],
        password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(24),Validators.pattern(this.passwordPattern)]],
        passwordVerify: ['', [Validators.required]],
        checkbox: false 
      });
  }
  passwordVerifyValidator(group: FormGroup){
    const password = group.get('password')?.value;
    const passwordVerify = group.get('passwordVerify')?.value;
    this.passwordCheck = password === passwordVerify ? true : false;
  }
  hasError(field: string ): boolean{
    const fieldName = this.form.get(field);
    return !! fieldName?.invalid && fieldName.touched;
  }

  //----------------------------------------------------------

  async onSubmit(): Promise<void> {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  
    if (this.form.valid) {
      this.passwordVerifyValidator(this.form);
      if(this.form.get('checkbox')!.value){
        if(this.passwordCheck){
          const { email, password, name, lastname, phone } = this.form.value;
          this.dataSharingService.setFormData({
            email: email,
            password: password,
            name: name,
            lastname: lastname,
            tipo: 'singUp'
          });
          this.router.navigate(['cuenta/phone-validation']);
        }else{
          this.inputFunction = true;
        }
      }else{
        this.checkbox = false;
      }
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
  handleCheckBoxChange() { // CheckBox
    const isChecked = this.form.get('checkbox')!.value;
    this.checkbox = isChecked;
  }
}
