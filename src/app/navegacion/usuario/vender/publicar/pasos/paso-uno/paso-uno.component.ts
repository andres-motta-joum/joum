import { Component,NgZone, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss']
})
export class PasoUnoComponent implements OnInit, OnDestroy{
  constructor(private pasos: PasosVenderService,private router: Router,private changeDetector: ChangeDetectorRef) {}
  boxes: string[] = ['check1', 'check2', 'check3', 'check4', 'check5', 'check6', 'check7', 'check8'];
  images: string[] = [ 'assets/img/categoria/cuadros/22.jpg', 'assets/img/categoria/repisas/12.jpg', 'assets/img/categoria/iluminacion/6.jpg', 'assets/img/categoria/macetas/1.jpg', 'assets/img/categoria/relojes/14.jpg', 'assets/img/categoria/difusores/1.jpg', 'assets/img/categoria/vinilos/9.jpg', 'assets/img/categoria/adornos/19.jpg' ];
  titulos: string[] = [ 'Cuadros', 'Repisas', 'Iluminacion', 'Macetas', 'Relojes', 'Difusores', 'Vinilos', 'Adornos'];

  formValue!: string;
  disabled = true;
  alerta = false;
  nuevoInput!: number;

  private routeSubscription!: Subscription;

  ngOnInit(): void {
    if (this.pasos.producto !== undefined) {
      this.formValue = this.pasos.producto.categoria;
      this.disabled = false;
      this.changeDetector.detectChanges();
    }
  }

  changeDisabled(event:Event, index:number, categoria: string): void {
    if(this.pasos.producto){
      if(this.pasos.producto.nombre !== null){
        event.preventDefault();
        if(categoria !== this.pasos.producto.categoria){
          this.alerta = true;
          this.nuevoInput = index;
        }
      }
    }
    this.disabled = false;

    // Aquí seleccionamos manualmente el input radio correspondiente al índice
  }

  alert(opcion: boolean){
    this.alerta = false;
    if(opcion){
      this.pasos.producto = undefined;
      const inputs = document.querySelectorAll('input[type="radio"]');
      if (inputs && inputs.length > this.nuevoInput) {
        (inputs[this.nuevoInput] as HTMLInputElement).checked = true;
      }
      this.updateFormValue(this.titulos[this.nuevoInput]);
    }
  }
  updateFormValue(newValue: string) {
    this.formValue = newValue;
  }
  

  submit(form: NgForm): any {
    if (form.valid && !this.disabled) {
      if(this.pasos.producto){
        this.pasos.producto.categoria = form.value.categoria;
      }else{
        this.pasos.producto = { categoria: form.value.categoria };
      }
      this.pasos.paso2 = true;
      this.router.navigate(['/vender', 'formulario', 'paso2']);
    } else {
      return false;
    }
  }

  //---------------------------------------------------

  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe()
    }
  }
}
