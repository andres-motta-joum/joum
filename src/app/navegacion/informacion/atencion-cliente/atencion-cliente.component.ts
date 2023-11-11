import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { matCheck } from '@ng-icons/material-icons/baseline';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { iconoirMail } from '@ng-icons/iconoir';
import { heroArrowDownMini } from '@ng-icons/heroicons/mini';
import { iconoirSendMail } from '@ng-icons/iconoir';
import { heroExclamationCircle } from '@ng-icons/heroicons/outline';
import { Firestore, addDoc, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Ticket } from 'src/app/interfaces/ticket';

interface usuarioInterno {
  rol: string,
  tickets: any[]
}

@Component({
  selector: 'app-atencion-cliente',
  templateUrl: './atencion-cliente.component.html',
  styleUrls: ['./atencion-cliente.component.scss'],
  providers: [provideIcons({heroArrowDownMini, matCheck, iconoirMail, iconoirSendMail, heroUserCircle, heroExclamationCircle})]
})

export class AtencionClienteComponent implements OnInit{
  constructor(private router: Router, private auth: Auth, private fb: FormBuilder, private firestore: Firestore, private authService: AuthService){}
  form!: FormGroup;
  descripcion!: string | null | undefined;
  usuario!: boolean;
  correoVerificado!: boolean;
  limiteTickets = false;
  reportado = false

  iniciaSesion = false;
  verificaCorreo = false;
  descripcionError = false;
  asuntoError = false;
  error!: string;

  actualizacionExitosa = false;
  cargando = false;


  ngOnInit(): void {
    this.initForm();
    this.auth.onAuthStateChanged(async (user)=>{
      if(user){
        this.usuario = true;
        this.correoVerificado = user.emailVerified;
      }else{
        this.usuario = false;
        this.correoVerificado = false;
      }
    })
  }

  private initForm():void {
    this.form = this.fb.group(
      {
        asunto: ['', [Validators.required]],
        tipo: ['', []]
      }
    )
  }

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

  async submit(textoDescripcion: HTMLElement){
    if(this.usuario){
      if(this.correoVerificado){
        if(this.form.valid){
          this.asuntoError = false;
          if(this.descripcion && this.descripcion !== ''){
            if(this.descripcion.length > 20){
              if(this.descripcion.length < 1400){
                //Agregar ticket
                const usuario = await this.authService.getUsuarioIdPromise(this.auth.currentUser!.uid);
                if(usuario.reportes && usuario.reportes.atencionCliente && usuario.reportes.atencionCliente >= 5){
                    this.reportado = true;
                }else{
                  if(usuario.tickets){
                    const ticketsSnapshot = await Promise.all(usuario.tickets.map( ref => getDoc(ref)));
                    let tickets = ticketsSnapshot.map((ticketSnapshot)=>{
                      return ticketSnapshot.data() as Ticket;
                    });
                    const cantidadTicketsHoy = this.obtenerTicketsHoy(tickets);
                    if(cantidadTicketsHoy >= 3){
                      this.limiteTickets = true;
                    }else{
                      this.agregarTicket(textoDescripcion)
                    }
                    
                  }else{
                    this.agregarTicket(textoDescripcion)
                  }
                }
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
        }else{
          this.asuntoError = true;
        }
      }else{
        this.verificaCorreo = true;
      }
    }else{
      this.iniciaSesion = true;
    }
  }

  async agregarTicket(textoDescripcion: HTMLElement){
    this.descripcionError = false;
    this.cargando = true;
    const idUsaurio = this.auth.currentUser!.uid;
    const usuarioInterno = await this.obtenerUsuarioConMenosTickets();
    const ticket = {
      fecha: new Date(),
      asunto: this.form.value.asunto.trim(),
      tipo: this.form.value.tipo == '' ? 'Consulta general': this.form.value.tipo,
      descripcion: this.descripcion!.trim(),
      idUsuario: idUsaurio,
      idUsuarioInterno: usuarioInterno.id,
      estado: 'En proceso',
      reportado: false
    }
    const ticketRef = await addDoc(collection(this.firestore, 'informacion/atencion-cliente/tickets'), ticket);
    await updateDoc(doc(this.firestore, `usuarios/${idUsaurio}`), {tickets: arrayUnion(ticketRef)});
    await updateDoc(doc(this.firestore, `usuarios-internos/${usuarioInterno.id}`), {tickets: arrayUnion(ticketRef)});
    this.restaurarDatos(textoDescripcion);
    this.actualizacionExitosa = true;
    setTimeout(()=>{
      this.cargando = false;
      this.actualizacionExitosa = false;
    }, 1500);
  }

  obtenerTicketsHoy(tickets: Ticket[]){
    let fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0); // establece la hora a medianoche para comparar solo la fecha
    
    let contador = 0;
    for (let objeto of tickets) {
      let fechaObjeto = objeto.fecha.toDate(); // asumiendo que 'fecha' es el campo de Timestamp
      fechaObjeto.setHours(0, 0, 0, 0); // establece la hora a medianoche para comparar solo la fecha
    
      if (fechaObjeto.getTime() === fechaHoy.getTime()) {
        contador++;
      }
    }
    return contador
  }

  restaurarDatos(textoDescripcion: HTMLElement){
    this.form.reset({
      asunto: '',
      tipo: ''
    });
    this.descripcion = '';

    let nodos = textoDescripcion.childNodes;
    for(let i = nodos.length - 1; i >= 0; i--) {
      if(nodos[i].nodeType === Node.TEXT_NODE) {
        textoDescripcion.removeChild(nodos[i]);
      } else if(nodos[i].nodeType === Node.ELEMENT_NODE && nodos[i].nodeName === 'DIV') {
        let elemento = <Element>nodos[i];
        if(!elemento.hasAttribute('class') && !elemento.hasAttribute('id')) {
          textoDescripcion.removeChild(nodos[i]);
        }
      }
    }
  }

  async obtenerUsuarioConMenosTickets() {
    const usuariosRef = collection(this.firestore, 'usuarios-internos');
    const snapshot = await getDocs(usuariosRef);
    const usuarios = snapshot.docs.map(doc => ({...doc.data() as usuarioInterno, id: doc.id}));
  
    // Ordenar los usuarios por la cantidad de tickets
    usuarios.sort((a, b) => a.tickets.length - b.tickets.length);
  
    // Filtrar los usuarios que tienen la misma cantidad mínima de tickets
    const usuariosConMenosTickets = usuarios.filter(usuario => usuario.tickets.length === usuarios[0].tickets.length);
  
    let usuarioElegido;
    if (usuariosConMenosTickets.length === 1) {
      // Si solo hay un usuario con la cantidad mínima de tickets, lo elegimos
      usuarioElegido = usuariosConMenosTickets[0];
    } else {
      // Si hay más de un usuario con la cantidad mínima de tickets, elegimos uno aleatoriamente
      usuarioElegido = usuariosConMenosTickets[Math.floor(Math.random() * usuariosConMenosTickets.length)];
    }
  
    return usuarioElegido;
  }

  @HostListener('document:click')
  closeSing() {
    if(this.iniciaSesion || this.verificaCorreo || this.limiteTickets || this.reportado){
      this.iniciaSesion = false;
      this.verificaCorreo = false;
      this.limiteTickets = false;
      this.reportado = false;
    }
  } 

  navegar(ruta: string){
    this.router.navigate([ruta]);
    window.scroll(0,0);
  }
}
