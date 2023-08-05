import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoGuardadoComponent } from './producto-guardado.component';

describe('ProductoGuardadoComponent', () => {
  let component: ProductoGuardadoComponent;
  let fixture: ComponentFixture<ProductoGuardadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoGuardadoComponent]
    });
    fixture = TestBed.createComponent(ProductoGuardadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
