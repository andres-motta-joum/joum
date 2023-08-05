import { Component } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent{
  public dato!:string;

  over(dato:string){
    if(dato !== ''){
      this.dato = dato;
    }else{
      this.dato = '';
    }
  }
}
