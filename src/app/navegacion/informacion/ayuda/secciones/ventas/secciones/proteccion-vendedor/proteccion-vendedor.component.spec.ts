import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteccionVendedorComponent } from './proteccion-vendedor.component';

describe('ProteccionVendedorComponent', () => {
  let component: ProteccionVendedorComponent;
  let fixture: ComponentFixture<ProteccionVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteccionVendedorComponent]
    });
    fixture = TestBed.createComponent(ProteccionVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
