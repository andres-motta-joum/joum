import { Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { Chat, Mensaje } from 'src/app/interfaces/chat';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ChatsService } from 'src/app/servicios/chats/chats.service';
import { Firestore, arrayUnion, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.scss']
})
export class EnviarMensajeComponent implements OnInit, OnDestroy{
  constructor(private zone: NgZone, private router: Router,private route: ActivatedRoute, private chatService: ChatsService, private prdsService: ProductosService, private firestore: Firestore, private authService: AuthService, private auth: Auth){}
  private routeSubscription!: Subscription;
  @ViewChild('mensajeElement') mensajeElement!: ElementRef;
  @ViewChild('contenidoMensajes') contenidoMensajes!: ElementRef;
  chat!: Chat | undefined;
  usuarioVendedor!: Usuario | null;
  usuarioCliente!: Usuario | null;
  venta!: Venta;

  productos: Producto[] = [];
  estilos: string[] = [];
  fotos: string[] = [];
  unidades: number[] = [];
  cantidadUnidades: number = 0;

  tipoUsuario!: string;

  isEditable: boolean = true;
  mensaje!: any;
  ngOnInit(){
    this.auth.onAuthStateChanged( user =>{
      if(user){
        this.routeSubscription = this.route.params.subscribe(async (params) => {
          const { id } = params;
          const [userId, userIdDos] = this.route.snapshot.url.map(segment => segment.path);
    
          this.chatService.getChatId(+id).subscribe(chat => {
            chat ? this.chat = chat : this.router.navigate(['']);
            if(this.contenidoMensajes){
              setTimeout(()=>{
                this.contenidoMensajes.nativeElement.scrollTop = this.contenidoMensajes.nativeElement.scrollHeight;
              })
            }
          });
          this.usuarioVendedor = await this.authService.getUsuarioUser(userId);
          this.usuarioCliente = await this.authService.getUsuarioUser(userIdDos);
          if(this.usuarioVendedor && this.usuarioCliente){
            if(user.uid == this.usuarioVendedor.id){
              this.tipoUsuario = 'vendedor';
            }else if(user.uid == this.usuarioCliente.id){
              this.tipoUsuario = 'cliente';
            }else{
              this.router.navigate(['']);
            }
            await this.obtenerVenta(id);
            await this.obtenerProductos();
            const cliente$ = this.authService.getUsuarioId(this.venta?.idCliente!);
            this.usuarioCliente = (await firstValueFrom(cliente$));
      
            const vendedor$ = this.authService.getUsuarioId(this.venta?.idVendedor!);
            this.usuarioVendedor = (await firstValueFrom(vendedor$));
            
          }else{
            this.router.navigate(['']);
          }
        });
      }else{
        this.router.navigate(['']);
      }
    })
  }

  async obtenerVenta(id: string) {
    const ventaRef = doc(this.firestore, `ventas/${id}`);
    const snapshot = await getDoc(ventaRef);
    this.venta = snapshot.data() as Venta;
  }
  async obtenerProductos(){
    const productosRef = await Promise.all(this.venta.referencias.map(ref => {
      this.estilos.push(ref.estilo);
      this.unidades.push(ref.unidades);
      this.cantidadUnidades += ref.unidades; 
      return getDoc(ref.producto);
    }));
    productosRef.forEach(snapshot => {
      const prd = snapshot.data() as Producto;
      prd.id = snapshot.id
      this.productos.push(prd);
    });
    this.contenidoMensajes.nativeElement.scrollTop = this.contenidoMensajes.nativeElement.scrollHeight;
    this.fotos = await this.prdsService.obtenerFotosSegunEstilo(this.productos, this.estilos);
  }

  inputMensaje(){
    this.mensaje = (this.mensajeElement.nativeElement.textContent).trim();
  }

  async enviar(){
    if(this.mensaje !== ''){
      const correccionMensaje = this.mensaje.replace(/\n+$/, "");
      this.mensajeElement.nativeElement.innerHTML = '';
      this.mensaje = '';
      const chatRef = doc(this.firestore, `chats/${this.chat?.numVenta}`);
      await updateDoc(chatRef, {
        mensajes: arrayUnion({
          contenido: correccionMensaje,
          fecha: new Date(),
          remitente: this.tipoUsuario
        })
      });
    }
  }
  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        this.enviar(); 
        event.preventDefault();
      }
    }
  }


  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }
}
