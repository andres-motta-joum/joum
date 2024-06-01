import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonCompraComponent } from './boton-compra.component';

describe('BotonCompraComponent', () => {
  let component: BotonCompraComponent;
  let fixture: ComponentFixture<BotonCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotonCompraComponent]
    });
    fixture = TestBed.createComponent(BotonCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
