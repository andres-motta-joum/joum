import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosProductoTresComponent } from './datos-producto-tres.component';

describe('DatosProductoTresComponent', () => {
  let component: DatosProductoTresComponent;
  let fixture: ComponentFixture<DatosProductoTresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosProductoTresComponent]
    });
    fixture = TestBed.createComponent(DatosProductoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
