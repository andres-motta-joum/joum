import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosVendedorComponent } from './datos-vendedor.component';

describe('DatosVendedorComponent', () => {
  let component: DatosVendedorComponent;
  let fixture: ComponentFixture<DatosVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosVendedorComponent]
    });
    fixture = TestBed.createComponent(DatosVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
