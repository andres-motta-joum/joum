import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarLlamadaComponent } from './agendar-llamada.component';

describe('AgendarLlamadaComponent', () => {
  let component: AgendarLlamadaComponent;
  let fixture: ComponentFixture<AgendarLlamadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendarLlamadaComponent]
    });
    fixture = TestBed.createComponent(AgendarLlamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
