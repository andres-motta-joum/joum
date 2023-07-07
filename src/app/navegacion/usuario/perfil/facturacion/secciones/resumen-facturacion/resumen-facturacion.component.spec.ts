import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenFacturacionComponent } from './resumen-facturacion.component';

describe('ResumenFacturacionComponent', () => {
  let component: ResumenFacturacionComponent;
  let fixture: ComponentFixture<ResumenFacturacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenFacturacionComponent]
    });
    fixture = TestBed.createComponent(ResumenFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
