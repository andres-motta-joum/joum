import { Component, HostListener, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, arrayRemove, doc, getDoc, increment, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/interfaces/ticket';
import { provideIcons } from '@ng-icons/core';
import { iconoirMailOpened } from '@ng-icons/iconoir';
import { matImageOutline } from '@ng-icons/material-icons/outline';
import { ionCloseCircleSharp } from '@ng-icons/ionicons';
import { matCheck } from '@ng-icons/material-icons/baseline';
import { heroExclamationCircle } from '@ng-icons/heroicons/outline';
import { heroExclamationCircleSolid } from '@ng-icons/heroicons/solid';
import { ref, uploadBytes, Storage, getDownloadURL } from '@angular/fire/storage';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [provideIcons({iconoirMailOpened, matImageOutline, ionCloseCircleSharp, matCheck, heroExclamationCircle, heroExclamationCircleSolid})]
})
export class TicketComponent implements OnInit{
  constructor( private router: Router, private auth: Auth, private firestore: Firestore, private storage: Storage){}
  descripcion!: string | null | undefined;
  descripcionError = false;
  actualizacionExitosa = false;
  cargando = false;
  cargandoReporte = false;
  ticket!: Ticket;
  tipoUsuario!: string;
  error!: string;
  fotoShow: any[] = ['', false];
  fotos: string[] = [];
  fotosFile: File[] = [];

  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (user)=>{
      if(user){
        const url = this.router.url.split('/');

        if(url[1] == 'portal-empleado'){//Verificar si es portal-empleado
          if(url[2] == user.uid){
            const usuarioSnapshot = await getDoc(doc(this.firestore, `usuarios-internos/${user.uid}`));
            if(usuarioSnapshot.exists()){
              //Existe usuario interno
              this.obtenerTicket(url[4]);
            }else{
              this.router.navigate(['']);
            }
          }else{
            this.router.navigate(['']);
          }
        }else if(url[1] == 'atencion-cliente'){
          this.obtenerTicket(url[3], true);
        }else{
          this.router.navigate(['']);
        }
      }else{
        this.router.navigate(['']);
      }
    })
  }

  async obtenerTicket(ticketId: string, usuario?: boolean){
    const ticketSnapshot = await getDoc(doc(this.firestore, `ayuda/atencion-clientes/tickets/${ticketId}`));
    if(ticketSnapshot.exists()){
      this.ticket = ticketSnapshot.data() as Ticket;
      this.ticket.id = ticketSnapshot.id;
      if(usuario){
        if(this.ticket.idUsuario == this.auth.currentUser!.uid){
          this.tipoUsuario = 'usuario';
          if(this.ticket.respuesta && !this.ticket.respuesta.visto){
            this.ticket.respuesta.visto = true;
            await updateDoc(doc(this.firestore, `ayuda/atencion-clientes/tickets/${this.ticket.id}`), {respuesta: this.ticket.respuesta});
          }
        }else{
          this.router.navigate(['']);
        }
      }else{
        this.tipoUsuario = 'usuario-interno';
      }

    }else{
      this.router.navigate(['']);
    }
  }

  replaceNewlines(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  @HostListener('document:click')
  cerrarFoto() {
    if(this.fotoShow[1]){
      this.fotoShow[1] = false
    }
  } 

  async reporte(){
    if(!this.cargandoReporte){
      this.cargandoReporte = true;
      const usuarioRef = doc(this.firestore, `usuarios/${this.ticket.idUsuario}`);
      const ricketRef = doc(this.firestore, `ayuda/atencion-clientes/tickets/${this.ticket.id}`);
      const usuarioSnapshot = await getDoc(usuarioRef);
      const usuario = usuarioSnapshot.data() as Usuario;
      if(this.ticket.reportado){
        this.ticket.reportado = false;
        usuario.reportes!.atencionCliente! --;
        await updateDoc(usuarioRef, {reportes: usuario.reportes});
        await updateDoc(ricketRef, {reportado: false});
      }else{
        this.ticket.reportado = true;
        if(usuario.reportes){
          if(usuario.reportes.atencionCliente){
            usuario.reportes.atencionCliente ++;
            await updateDoc(usuarioRef, {reportes: usuario.reportes})
          }else{
            usuario.reportes.atencionCliente = 1;
            await updateDoc(usuarioRef, {reportes: usuario.reportes})
          }
        }else{
          const reportes = {
            atencionCliente: 1
          }
          await updateDoc(usuarioRef, {reportes: reportes})
        }
        await updateDoc(ricketRef, {reportado: true});
      }
      this.cargandoReporte = false;
    }
  }

  //-------------- FORMULARIO -------------------------
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    navigator.clipboard.readText().then((text) => {
      document.execCommand('insertText', false, text);
    });
  }
  
  onInputChange(event: any) {
    this.descripcion = event.target.innerText;
  }

  focus(){
    if(this.descripcion == null){
      this.descripcion = '';
    }
  }

  verFoto(link: string){
    this.fotoShow = [link, true];
  }

  subirFoto(event: any) {
    const file = event.target.files[0];
    const extenciones = ['jpg', 'jpeg', 'png'];
    if (file) {
      const nombre = file.name.split('.');
      const fileExtension = nombre[nombre.length - 1].toLowerCase();
      if (extenciones.includes(fileExtension)) { //Validar extensión de la foto
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if(file.size <= 5000000){ //Validar tamaño de la foto, no superior a 5 MB
            const imageDataUrl = reader.result as string;
            this.fotos.push(imageDataUrl);
            this.fotosFile.push(file);
          }else{
            event.preventDefault();
            alert('El peso maximo de cada foto es de 5MB');
          }
        };
      } else {
        alert('Solo se permiten archivos PNG y JPG.');
        event.target.value = ''; // Limpia el valor del input para evitar que el usuario suba el archivo incorrecto nuevamente
      }
    }
  }

  eliminarFoto(index: number){
    this.fotos.splice(index, 1);
    this.fotosFile.splice(index, 1);
  }

  async enviarRespuesta(){
    if(this.descripcion && this.descripcion !== ''){
      if(this.descripcion.length > 20){
        if(this.descripcion.length < 1400){
          //Agregar ticket
          this.agregarTicket()
        }else{
          this.descripcionError = true;  
          this.error = 'Descripción muy larga'
        }
      }else{
        this.descripcionError = true;  
        this.error = 'Descripción muy corta'
      }
    }else{
      this.descripcionError = true;
      this.error = 'Este campo es requerido'
    }
  }

  async agregarTicket(){
    this.cargando = true;
    const fotosLinks = await this.subirFotosFirestorage();
    this.descripcionError = false;
    let respuesta = {
      fecha: new Date(),
      descripcion: this.descripcion!.trim(),
      fotos: fotosLinks,
      visto: false
    }
    const ticketRef = doc(this.firestore, `ayuda/atencion-clientes/tickets/${this.ticket.id}`);
    await updateDoc(ticketRef, {respuesta: respuesta, estado: 'Finalizado'});
    await updateDoc(doc(this.firestore, `usuarios-internos/${this.ticket.idUsuarioInterno}`), {tickets: arrayRemove(ticketRef)});
    this.actualizacionExitosa = true;
    setTimeout(()=>{
      this.cargando = false;
      this.actualizacionExitosa = false;
      this.ticket.respuesta = respuesta as any;
    }, 1500);
  }

  async subirFotosFirestorage(): Promise<string[]>{
    const fotosLinks =  await Promise.all(this.fotosFile.map(async (foto: any, index: number) => {
      const storageRef = ref(this.storage, `tickets/${this.ticket.id}/${index}`);
      await uploadBytes(storageRef, foto);
      return getDownloadURL(storageRef);
    }));
    return fotosLinks
  }
  

  //---------------- ENCUESTA ------
  informacion!: string;
  seleccionado!: string;
  seleccionarMotivo = false;
  check = false;
  
  async si(){
    this.check = true;
    await updateDoc(doc(this.firestore, `ayuda/atencion-clientes/tickets/${this.ticket.id}`), {utilidad: 'util'});
  }

  no(){
    this.seleccionarMotivo = true;
  }

  seleccionar(seleccion: string){
    this.seleccionado = seleccion;
  }

  async enviarEncuesta(){
    if(this.seleccionado){
      this.check = true;
      await updateDoc(doc(this.firestore, `ayuda/atencion-clientes/tickets/${this.ticket.id}`), {utilidad: this.seleccionado});
    }
  }
  

}
