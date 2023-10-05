import { Component, OnDestroy, OnInit } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { matEdit } from '@ng-icons/material-icons/baseline';
import { heroMapPin } from '@ng-icons/heroicons/outline'; 
import { matDelete } from '@ng-icons/material-icons/baseline';

import { Router } from '@angular/router';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Subscription, first } from 'rxjs';
import { Direccion } from 'src/app/interfaces/usuario/subInterfaces/direccion';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Component({
  selector: 'app-cambiar-direccion',
  templateUrl: './cambiar-direccion.component.html',
  styleUrls: ['./cambiar-direccion.component.scss'],
  providers: [provideIcons({matEdit, heroMapPin, matDelete})]
})
export class CambiarDireccionComponent implements OnInit, OnDestroy{
  constructor(private router: Router, private comprarService: ComprarService, private auth: Auth, private authService: AuthService){}
  private usuario!: Usuario;
  direcciones!: Direccion[];
  direccionesString: string[] = [];
  routeSubscription!: Subscription;
  ngOnInit(): void {
    this.routeSubscription = this.authService.getUsuarioId(this.auth.currentUser?.uid!).subscribe((usuario)=>{
      if(usuario){
        this.usuario = usuario;
        this.direcciones = usuario.direcciones!;
        this.obtenerDireccionString();
      }
    })
  }

  obtenerDireccionString(){
    this.direccionesString = this.direcciones.map((direccion)=>{
      const arrayModificado: string[] = direccion.direccion!.map((element, index) => {
        if (index === 2) {
          return `#${element}`;
        } else if (index === 3) {
          if(element !== ''){
            return `- ${element}`;
          }else{
            return ''
          }
        } else {
          return element
        }
      });
  
      return arrayModificado.join(' ');
    })
  }
  
  direccionar(funcion: string, index?: number){
    if(funcion === 'modificar'){
      this.comprarService.direccionIndex = index!;
      this.comprarService.modificarDir = true;
    }else
    if(funcion === 'agregar'){
      this.comprarService.agregarDir = true;
    }
    this.router.navigate(['comprar/checkout/detalles-envio']);
  }

  eliminar(index: number){
    this.comprarService.eliminarDireccion(this.usuario, index);
  }

  async seleccionar(direccion: Direccion, index: number){
    await this.comprarService.seleccionarDireccion(this.usuario, direccion, index);
    this.router.navigate(['comprar/checkout/resumen']);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
