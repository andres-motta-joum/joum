import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Venta } from 'src/app/interfaces/usuario/subInterfaces/venta';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent {
  @Input() producto!: Producto;
  @Input() venta!: Venta;
  public usuarioVendedor!: Usuario | undefined;
  public miUsuario!: Usuario | undefined;

  subMenu: boolean = false;
  constructor(private zone: NgZone,private route: ActivatedRoute, private router: Router, private usrService: UsuarioService){}
  ngOnInit(){
    const miId = this.route.parent?.snapshot.paramMap.get('id');
    this.miUsuario = this.usrService.getUserUsuario(miId!);
    this.usuarioVendedor = this.usrService.getUserId(this.producto.idUsuario!);
  }
  navegar(ruta: any[], event: Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
}
