import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-paso-seis',
  templateUrl: './paso-seis.component.html',
  styleUrls: ['./paso-seis.component.scss']
})
export class PasoSeisComponent {
  public formPaso6!: FormGroup; 

  private subscriptions: Subscription[] = [];

  constructor(
    private pasos: PasosVenderService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private zone: NgZone,
    private formBuilder: FormBuilder
  ) {
    if (this.pasos.producto === undefined) {
      this.router.navigate(['/vender', 'formulario', 'paso1']);
    }
    this.buildForm();
  }

  private buildForm(): void {
    this.formPaso6 = this.formBuilder.group({
      precio: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(11)]]
    });
    this.subscriptions.push(this.formPaso6.valueChanges.subscribe((form) => {
      if (form.precio) {
        this.formPaso6.patchValue({
          precio: this.currencyPipe.transform(form.precio.replace(/\D/g, '').replace(/^0+/, ''), '$', 'symbol', '1.0-0')
        }, {emitEvent: false});
      }
    }));
  }


  ngOnInit(): void {
    if (!this.pasos.paso6) {
      this.router.navigate(['/vender', 'formulario', 'paso5']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  transformar(i: string): number {
      const primero = i.slice(1);
      const segundo = primero.split(',');
      const tercero = segundo.join('');
      // tslint:disable-next-line: radix
      return parseInt(tercero);
  }

  irPaso5(): void {
    this.router.navigate(['/vender', 'formulario', 'paso5']);
  }
}
