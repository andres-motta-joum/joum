import { Component,NgZone, ChangeDetectorRef } from '@angular/core';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss']
})
export class PasoUnoComponent {
  public formValue = '';

  public boxes: string[] = ['check1', 'check2', 'check3', 'check4', 'check5', 'check6', 'check7', 'check8'];

  public images: string[] = [
    '../../../../../../assets/img/categoria/cuadros/4.jpg',
    '../../../../../../assets/img/categoria/estantes/3.jpg',
    '../../../../../../assets/img/categoria/lamparas/6.jpg',
    '../../../../../../assets/img/categoria/macetas/1.jpg',
    '../../../../../../assets/img/categoria/relojespared/4.jpg',
    '../../../../../../assets/img/categoria/tapetes/1.jpg',
    '../../../../../../assets/img/categoria/vinilos/3.jpg',
    '../../../../../../assets/img/categoria/macetas/2.jpg'
  ];

  public titulos: string[] = [
    'Cuadros',
    'Estantes',
    'Lámparas',
    'Macetas',
    'Relojes',
    'Tapetes',
    'Vinilos',
    'Adornos'
  ];

  public disabled: boolean;

  private subscriptions: Subscription[] = [];

  constructor(
    private pasos: PasosVenderService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.disabled = true;
  }

  

  ngAfterViewInit(): void {
    if (this.pasos.producto !== undefined) {
      this.formValue = this.pasos.producto.categoria;
      this.disabled = false;
      this.changeDetector.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  irPaso2(form: NgForm): any {
    if (form.valid && !this.disabled) {
      this.pasos.paso2 = true;
      this.pasos.producto = {
        categoria: form.value.categoria
      };
      this.router.navigate(['/vender', 'formulario', 'paso2']);
    } else if (!this.disabled) {
      this.router.navigate(['/vender', 'formulario', 'paso2']);
    } else {
      return false;
    }
  }

  changeDisabled(): void {
    this.disabled = false;
    this.changeDetector.detectChanges();
  }
}
