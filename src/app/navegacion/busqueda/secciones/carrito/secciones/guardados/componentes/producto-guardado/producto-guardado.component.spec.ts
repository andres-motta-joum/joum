import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productosComponent } from './producto-guardado.component';

describe('productosComponent', () => {
  let component: productosComponent;
  let fixture: ComponentFixture<productosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [productosComponent]
    });
    fixture = TestBed.createComponent(productosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
