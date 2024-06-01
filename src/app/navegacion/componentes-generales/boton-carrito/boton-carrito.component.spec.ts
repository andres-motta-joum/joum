import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonCarritoComponent } from './boton-carrito.component';

describe('BotonCarritoComponent', () => {
  let component: BotonCarritoComponent;
  let fixture: ComponentFixture<BotonCarritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotonCarritoComponent]
    });
    fixture = TestBed.createComponent(BotonCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
