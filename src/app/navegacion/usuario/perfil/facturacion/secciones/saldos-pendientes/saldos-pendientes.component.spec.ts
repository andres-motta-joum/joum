import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldosPendientesComponent } from './saldos-pendientes.component';

describe('SaldosPendientesComponent', () => {
  let component: SaldosPendientesComponent;
  let fixture: ComponentFixture<SaldosPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaldosPendientesComponent]
    });
    fixture = TestBed.createComponent(SaldosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
