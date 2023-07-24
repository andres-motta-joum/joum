import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaReporteComponent } from './factura-reporte.component';

describe('FacturaReporteComponent', () => {
  let component: FacturaReporteComponent;
  let fixture: ComponentFixture<FacturaReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturaReporteComponent]
    });
    fixture = TestBed.createComponent(FacturaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
