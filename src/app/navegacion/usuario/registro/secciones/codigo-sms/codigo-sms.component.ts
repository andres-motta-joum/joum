import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Auth, PhoneAuthCredential, PhoneAuthProvider, RecaptchaVerifier, sendPasswordResetEmail, signInWithPhoneNumber, updatePhoneNumber } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { getApp } from 'firebase/app';
import { ConfirmationResult } from 'firebase/auth';
import { getFirestore, doc, updateDoc  } from "firebase/firestore";
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { DataSharingService } from 'src/app/servicios/usuarios/data-sharing.service';

interface ErrorResponse  {
  code: string;
  message: string;
}

@Component({
  selector: 'app-codigo-sms',
  templateUrl: './codigo-sms.component.html',
  styleUrls: ['./codigo-sms.component.scss']
})
export class CodigoSMSComponent implements OnInit{
  constructor(private authService: AuthService, private auth: Auth, private router: Router, private route: ActivatedRoute, private dataSharingService: DataSharingService){}
  @ViewChildren('verificationInput') verificationInputs!: QueryList<ElementRef>;
  @ViewChild('firstInput') firstInput!: ElementRef;
  private datos!: any;
  public numero!: string;
  private algo: boolean = false;
  public codigoIncorrecto = false;
  public check = false;
  public recaptchaVerifier!: RecaptchaVerifier;

  public confirmationResult!: ConfirmationResult;

  enteredCodes: string[] = ['', '', '', '', '', ''];

  ngOnInit(): void {
    const formData = this.dataSharingService.getFormData();
    if (formData) {
      if(Object.keys(formData).length === 0){
        this.router.navigate(['']);
      }
      this.datos = formData;
      if(this.datos.tipo === 'singUp' || this.datos.tipo === 'singUpGoogle'){
        this.numero = this.datos.phone.toString();
        this.numero = '+57' + this.numero;
      }else{
        this.numero = this.datos.phone;
      }
    }
    setTimeout(() => {
      this.sendVerificationCode();
    }, 10);
  }

  async sendVerificationCode() {
    this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: () => {
      },
    }, this.auth);

    await this.authService.sendCode(this.numero, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error)
      });
    
  }

  async verifyCode() {
    const enteredCode = this.enteredCodes.join('');
    try {
      const verificationId = this.confirmationResult.verificationId;
      const app = getApp();
      const db = getFirestore(app);

      if(this.datos.tipo === 'singUp'){
        await this.authService.singUp(this.datos.email, this.datos.password, this.datos.name, this.datos.lastname);
      }else if(this.datos.tipo === 'singIn'){
        await this.authService.singIn(this.datos.email, this.datos.password);
      }

      //-----------------------------------------------------------
      if(this.datos.tipo !== 'forgotPassword'){
        const currentUser = this.auth.currentUser; //agregar numero UserAuht y a Firestore
        const phoneCredential: PhoneAuthCredential = PhoneAuthProvider.credential(verificationId, enteredCode);

        //No tienen un numero asignado.
        if(this.datos.tipo === 'singUpGoogle' || this.datos.tipo === 'singUp'){ //Agregar numero "Firestore"
          await updateDoc(doc(db, "usuarios", currentUser?.uid!), { telefono: this.numero });
          await updatePhoneNumber(currentUser!, phoneCredential);
        }
        this.dataSharingService.deleteData();
        this.check = true;
        this.router.navigate(['']);
      }else{
        sendPasswordResetEmail(this.auth, this.datos.email)
        .then(() => {
          this.check = true;
          this.dataSharingService.setFormData({
            email: this.datos.email
          })
          this.router.navigate(['cuenta/email-sent']);
        })
        .catch((error) => {
          console.error("Error al enviar el correo electrónico:", error);
        });
      }
    } catch (error) {
      const {code, message} = error as ErrorResponse;
      if (code === 'auth/invalid-verification-code') {
        this.codigoIncorrecto = true;
      }else {
        console.error('Error al verificar el código:', error);
        this.codigoIncorrecto = false;
      }
    }
  }

  onInput(event: Event,keyboardEvent: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const enteredCode = input.value;
    this.enteredCodes[index] = enteredCode;
    const inputValue = input.value;

    if (/^\d$/.test(inputValue)) {
      if (inputValue.length === 1 && !this.algo) {
        const nextIndex = index + 1;
        const nextInput = this.verificationInputs.toArray()[nextIndex];
        if (nextInput) {
          nextInput.nativeElement.focus();
        }
      }
    } else {
      input.value = ''; 
    }

    if (inputValue.length > 1 ) {
      input.value = inputValue.charAt(0);
    }
    if (keyboardEvent.repeat) {
      keyboardEvent.preventDefault();
    }
  }
  
  onInputBefore(event: Event,keyboardEvent: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    if (inputValue.length !== 0) {
      if (keyboardEvent.key === 'Backspace') {
        this.algo = false;
      }else{
        this.algo = true;
        keyboardEvent.preventDefault();
      }
    }
    if (inputValue.length === 0 && keyboardEvent.key === 'Backspace') {
      this.algo = false;
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        const previousInput = this.verificationInputs.toArray()[previousIndex];
        if (previousInput) {
          previousInput.nativeElement.focus();
          previousInput.nativeElement.value = '';
        }
      }
    }
    if (inputValue.length === 0 && keyboardEvent.key === 'e') {
      keyboardEvent.preventDefault();
    }
    if (inputValue.length === 0 && (keyboardEvent.key !== 'e' && keyboardEvent.key !== 'Backspace')) {
      this.algo = false;
    }

  }


  ngAfterViewInit(): void {
    this.firstInput.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if(!this.check){
      this.authService.signOut();
      this.dataSharingService.deleteData();
    }
  }
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event: any): void {
    if (!this.check) {
      this.authService.signOut();
      $event.returnValue = true;
    }
  }
  
}
