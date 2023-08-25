import { Injectable } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User, authState, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithRedirect, updatePhoneNumber, updateProfile, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, UserCredential, getRedirectResult, getAdditionalUserInfo} from '@angular/fire/auth';
import { doc, setDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import 'firebase/auth';
import { DataSharingService } from './data-sharing.service';
import { getFirestore } from "firebase/firestore";
import { getApp } from '@angular/fire/app';

interface ErrorResponse  {
  code: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router, private dataSharingService: DataSharingService) { this.handleRedirectResult() }
  private readonly googleProvider = new GoogleAuthProvider();
  private readonly facebookProvider = new FacebookAuthProvider();
  private readonly twitterProvider = new TwitterAuthProvider();

  get userState$(){
    return authState(this.auth);
  }

  //--------------------------------------------------------------------------------------------------------------------------

  async singUp(email: string, password: string, name: string, lastname: string): Promise<void> {
    try {
      const { user} = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(user, {
        displayName: `${name} ${lastname}`
      });
      await this.addUserFirestore();
      await this.sendEmail(user);
    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse;
      console.log('code', code);
      console.log('message', message);
    }

  }

  sendCode(phoneNumber: string, recaptchaVerifier: RecaptchaVerifier): Promise<ConfirmationResult> {
    return signInWithPhoneNumber(this.auth, phoneNumber, recaptchaVerifier);
  }

  async addUserFirestore(){
    const app = getApp();
    const db = getFirestore(app);
    const currentUser = this.auth.currentUser;

    const palabras = currentUser?.displayName?.trim().split(' ')!;
    const nombre = palabras.slice(0, 2).join(' ');
    const usuario = nombre.toUpperCase() + '022341';
    const userData = {
      usuario: usuario.replace(/\s/g, ''),
      nombre: currentUser?.displayName,
      correo: currentUser?.email,
      seguidores: 0,
      correoVerificado: currentUser?.emailVerified,
      planJoum: "Gratuito",
    };
    await setDoc(doc(db, "usuarios", this.auth.currentUser?.uid!), userData);
  }

  //------------------------------------------------------------------------------------------------------------------------------

  
  async singIn(email:string, password:string):Promise<string | void>{
    try {
      const { user } =  await signInWithEmailAndPassword(this.auth, email, password);
      this.checkUserIsVerified(user);
      // SingIN
      // verificar si verificó el Email
      // redireccionar
    } catch (error:unknown) {
      const {code, message} = error as ErrorResponse;
      console.log('code', code);
      console.log('message', message)
      if(code === 'auth/user-not-found'){
        return 'emailError'
      } else if(code === 'auth/wrong-password'){
        return 'passwordError'
      }else if(code === 'auth/invalid-email'){
        return 'emailRequier'
      }else if(code === 'auth/missing-password'){
        return 'passwordRequier'
      }
    }
  }


  //------------------------------------------------------------------------------------------------------------------------------------------------------


  async signOut(): Promise<void>{
    try{
      this.auth.signOut();
    }catch(error: unknown){
      console.log(error)
    }
  }
  async sendEmail(user:User): Promise<void>{
    try {
      await sendEmailVerification(user);
    } catch (error:unknown) {
      console.log(error)
    }
  }

  private checkUserIsVerified(user: User){
    const verified = user.emailVerified;
    const route = verified ? 'cuenta/phone-validation/enter-code': 'cuenta/phone-validation/enter-code';
    //this.router.navigate([route]);
  }
  //--------------------------------------------------------------------------------------------


  async handleRedirectResult() {
    try {
      const result = await getRedirectResult(this.auth);
      if (result) {
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        if (isNewUser) {
          this.dataSharingService.setFormData({
            phone: this.auth.currentUser?.phoneNumber,
            tipo: "singUpGoogle"
          });
          await this.addUserFirestore();
        } else {
          this.dataSharingService.setFormData({
            phone: this.auth.currentUser?.phoneNumber,
            tipo: "singInGoogle"
          });
        }
        this.router.navigate(['cuenta/phone-validation']);
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  //----------------------------------------------------------

  async singInGoogle(): Promise<void>{
    try{
      await signInWithRedirect(this.auth, this.googleProvider);
    }catch(error){
      console.log('google login', error)
    }
  }
  async singInFacebook(): Promise<void>{
    try{
      await signInWithRedirect(this.auth, this.facebookProvider);
    }catch(error){
      console.log('google login', error)
    }
  }
  async singInTwitter(): Promise<void>{
    try{
      await signInWithRedirect(this.auth, this.twitterProvider);
    }catch(error){
      console.log('google login', error)
    }
  }
}