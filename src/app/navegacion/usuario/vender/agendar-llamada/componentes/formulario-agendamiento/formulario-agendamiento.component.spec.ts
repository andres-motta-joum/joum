import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgendamientoComponent } from './formulario-agendamiento.component';

describe('FormularioAgendamientoComponent', () => {
  let component: FormularioAgendamientoComponent;
  let fixture: ComponentFixture<FormularioAgendamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioAgendamientoComponent]
    });
    fixture = TestBed.createComponent(FormularioAgendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
