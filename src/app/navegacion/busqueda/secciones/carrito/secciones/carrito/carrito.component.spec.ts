import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoSeccionComponent } from './carrito.component';

describe('CarritoComponent', () => {
  let component: CarritoSeccionComponent;
  let fixture: ComponentFixture<CarritoSeccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoSeccionComponent]
    });
    fixture = TestBed.createComponent(CarritoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
