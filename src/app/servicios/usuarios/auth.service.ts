import { Injectable } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User, authState, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithRedirect, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface ErrorResponse  {
  code: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) { }
  private readonly googleProvider = new GoogleAuthProvider();
  private readonly facebookProvider = new FacebookAuthProvider();
  private readonly twitterProvider = new TwitterAuthProvider();

  get userState$(){
    return authState(this.auth);
  }

  async singUp(email:string, password:string, name: string, lastname: string, phone: string):Promise<void>{
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      const userDos = await createUserWithEmailAndPassword(this.auth, email, password)

      await this.sendEmail(user);
      this.router.navigate(['']);
      // crear cuenta
      // EnviarEmail
      // Redireccionar al Home
    } catch (error:unknown) {
      const {code, message} = error as ErrorResponse;
      console.log('code', code);
      console.log('message', message)
    }
  }
  
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

  //--------------
  async singOut(): Promise<void>{
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
    const route = verified ? '': 'cuenta/phone-validation/sJd3fg4JhSOj9fSNDF/enter-code';
    this.router.navigate([route]);
  }

  //-----------------------------------------

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
