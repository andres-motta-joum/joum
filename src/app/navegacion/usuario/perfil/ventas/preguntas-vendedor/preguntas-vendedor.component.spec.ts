import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasVendedorComponent } from './preguntas-vendedor.component';

describe('PreguntasVendedorComponent', () => {
  let component: PreguntasVendedorComponent;
  let fixture: ComponentFixture<PreguntasVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntasVendedorComponent]
    });
    fixture = TestBed.createComponent(PreguntasVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
