import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat, Mensaje } from 'src/app/interfaces/chat';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/usuario/subInterfaces/venta';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ChatsService } from 'src/app/servicios/chats/chats.service';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.scss']
})
export class EnviarMensajeComponent {
  constructor(private zone: NgZone, private router: Router,private route: ActivatedRoute, private chatService: ChatsService, private userService: UsuarioService, private prdService: ProductoService){}
  public chat!: Chat | undefined;
  public usuario!: Usuario | undefined;
  public usuarioDos!: Usuario | undefined;
  public venta!: Venta | undefined;

  public productos!: Producto[] | undefined;

  public vendedor!: string | undefined;
  public cliente!: string | undefined;

  public tipoUsuario!: string;

  ngOnInit(){
    this.route.params.subscribe(params => {
      const { id } = params;
      const [userId, userIdDos] = this.route.snapshot.url.map(segment => segment.path);

      this.chat = this.chatService.getChatId(+id);
      this.usuario = this.userService.getUserUsuario(userId);
      this.usuarioDos = this.userService.getUserUsuario(userIdDos);
      this.venta = this.userService.getVenta(+id);
      this.obtenerProductos();

      this.cliente = this.userService.getUserId(this.venta?.idCliente!)?.usuario;
      this.vendedor = this.userService.getUserId(this.productos![0].idUsuario!)?.usuario;

      this.obtenerTipoUsuario();
    });
  }
  obtenerProductos(){
    this.productos = [];
    for(let producto of this.venta?.productos!){
      this.productos.push(this.prdService.getProductsId(producto.id!)!);
    }
  }
  obtenerTipoUsuario(){
    if(this.usuario?.usuario == this.cliente && this.usuarioDos?.usuario == this.vendedor){
      this.tipoUsuario = 'cliente';
    }else if(this.usuario?.usuario == this.vendedor && this.usuarioDos?.usuario == this.cliente){
      this.tipoUsuario = 'vendedor';
    }else{
      this.router.navigate(['']);
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

}
