import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss'],
  providers: [provideIcons({heroAdjustmentsHorizontal})]
})
export class MetricasComponent{

  public encabezadoUrl: String = "";

  constructor(private zone: NgZone, private router: Router){
    this.url();
  }

  url(){
    if(this.router.url == '/abcd/metricas/negocio'){
      this.encabezadoUrl = "negocio";
    } else if(this.router.url == '/abcd/metricas/atencion-compradores'){
      this.encabezadoUrl = "atencion";
    }else if(this.router.url == '/abcd/metricas/stock'){
      this.encabezadoUrl = "stock";
    }else if(this.router.url == '/abcd/metricas/puntos'){
      this.encabezadoUrl = "puntos";
    }
  }
  

  navegar(ruta: any[], event: Event):void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
    setTimeout(() => {
      this.url()
    }, .1);
  }
  

}
