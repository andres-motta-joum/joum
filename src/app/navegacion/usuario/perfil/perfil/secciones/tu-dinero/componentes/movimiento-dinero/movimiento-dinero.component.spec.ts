import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoDineroComponent } from './movimiento-dinero.component';

describe('MovimientoDineroComponent', () => {
  let component: MovimientoDineroComponent;
  let fixture: ComponentFixture<MovimientoDineroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientoDineroComponent]
    });
    fixture = TestBed.createComponent(MovimientoDineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
