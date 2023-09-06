import { Injectable } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User, authState, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithRedirect, updateProfile, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, getRedirectResult, getAdditionalUserInfo} from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, docData, getDoc, getDocs, query, setDoc, where} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataSharingService } from './data-sharing.service';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { Observable } from 'rxjs';

interface ErrorResponse  {
  code: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router, private dataSharingService: DataSharingService, private firestore: Firestore) { this.handleRedirectResult() }
  private readonly googleProvider = new GoogleAuthProvider();
  private readonly facebookProvider = new FacebookAuthProvider();
  private readonly twitterProvider = new TwitterAuthProvider();

  get userState$(){
    return authState(this.auth);
  }

  //------------------------------------------------------------- FIRESTORE  --------------------------------------------

  getUsuarioId(id: string): Observable<Usuario>{
    const documentoUsuario = doc(this.firestore, 'usuarios', id);
    return docData(documentoUsuario);
  }
  async getUsuarioUser(usuario: string){
    const q = query(collection(this.firestore, 'usuarios'), where('usuario', '==', usuario));
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];
    if (doc) {
      return doc.data()
    }else{
      return null
    }
  }
  
  async getTelefonoExistente(telefono: string){
    const queri = query(collection(this.firestore, 'usuarios'), where('telefono', '==', telefono));
    const querySnapshot = await getDocs(queri);
    const doc = querySnapshot.docs[0];
    if(doc){
      return true
    }else{
      return false
    }
  }

  get getUsuarios$(): Observable<Usuario[]>{
    const collectionUsuarios = collection(this.firestore, 'usuarios');
    return collectionData(collectionUsuarios, {idField: 'id'}) as Observable<Usuario[]>;
  }

  async addUserFirestore(): Promise<void>{
    const usuario = this.obtenerUsuarioUnico();
    await setDoc(doc(this.firestore, "usuarios", this.auth.currentUser?.uid!), usuario);
  }

  obtenerUsuarioUnico(): Usuario {
    const currentUser = this.auth.currentUser;
    const palabras = currentUser?.displayName?.trim().split(' ')!;
    const nombre = palabras.slice(0, 2).join(' ');
    const usuario = nombre.toUpperCase() + '022341';
    return {
      usuario: usuario.replace(/\s/g, ''),
      nombre: currentUser?.displayName!,
      correo: currentUser?.email!,
      seguidores: 0,
      correoVerificado: currentUser?.emailVerified,
      planJoum: "Gratuito",
    };
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
  //-------------------------------------------------------------------------------------------- GOOGLE --------------


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