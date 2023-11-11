import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasosCompraComponent } from './pasos-compra.component';

describe('PasosCompraComponent', () => {
  let component: PasosCompraComponent;
  let fixture: ComponentFixture<PasosCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasosCompraComponent]
    });
    fixture = TestBed.createComponent(PasosCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
