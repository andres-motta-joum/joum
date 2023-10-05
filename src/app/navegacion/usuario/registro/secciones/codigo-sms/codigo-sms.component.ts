import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Auth, EmailAuthProvider, PhoneAuthCredential, PhoneAuthProvider, RecaptchaVerifier, linkWithCredential, sendPasswordResetEmail, signInWithCredential, signInWithPhoneNumber, updatePhoneNumber, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationResult, signInWithEmailAndPassword } from 'firebase/auth';
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
  constructor(private authService: AuthService, private auth: Auth, private router: Router, private dataSharingService: DataSharingService, private firestore: Firestore){}
  @ViewChildren('verificationInput') verificationInputs!: QueryList<ElementRef>;
  @ViewChild('firstInput') firstInput!: ElementRef;
  private verificationId!: string;
  capcha = false;
  private datos!: any;
  numero!: string;
  private algo: boolean = false;
  codigoIncorrecto = false;
  check = false;
  recaptchaVerifier!: RecaptchaVerifier;

  confirmationResult!: ConfirmationResult;

  enteredCodes: string[] = ['', '', '', '', '', ''];
  cargando = false;



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
      size: 'normal',
      callback: () => {
      },
    }, this.auth);

    await signInWithPhoneNumber(this.auth, this.numero, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.verificationId = confirmationResult.verificationId;
        this.capcha = true;
        this.firstInput.nativeElement.focus();
      })
      .catch((error) => {
        console.log(error)
      });
    
  }

  async verifyCode() {
    this.cargando = true;
    const enteredCode = this.enteredCodes.join(''); //Codigo ingresado por el usuario
    const phoneCredential: PhoneAuthCredential = PhoneAuthProvider.credential(this.verificationId, enteredCode); // Creación de credencial
    try {
      if(this.datos.tipo === 'singIn'){
        await signInWithCredential(this.auth, phoneCredential); //verificación de credencial
      } else if(this.datos.tipo === 'singUp'){
        const singCredential = await signInWithCredential(this.auth, phoneCredential);// ya creó la cuenta con el numero o inició la cuenta con el numero. 
        const emailCredential = EmailAuthProvider.credential(this.datos.email, this.datos.password);
        const currentUser = this.auth.currentUser;
        await linkWithCredential(currentUser!, emailCredential);
        await updateProfile(singCredential.user, {
          displayName: `${this.datos.name} ${this.datos.lastname}`
        });
        await this.authService.addUserFirestore();
        await this.authService.sendEmail(singCredential.user);
        await updateDoc(doc(this.firestore, "usuarios", currentUser?.uid!), { telefono: this.numero });
      } else if(this.datos.tipo === 'singUpGoogle' || this.datos.tipo === 'singInGoogle'){
        const currentUser = this.auth.currentUser;
        await updatePhoneNumber(currentUser!, phoneCredential);
        await updateDoc(doc(this.firestore, "usuarios", currentUser?.uid!), { telefono: this.numero });
      }
      //-----------------------------------------------------------
      if(this.datos.tipo !== 'forgotPassword'){
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
      this.cargando = false;
      const {code, message} = error as ErrorResponse;
      if (code === 'auth/invalid-verification-code') {
        this.codigoIncorrecto = true;
      }else {
        console.error('Error al verificar el código:', error);
        this.codigoIncorrecto = false;
      }
    }
  }

  //--- funcionalidad Inputs ----------------------------------------------------------------------
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
