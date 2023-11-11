import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaUtilidadComponent } from './encuesta-utilidad.component';

describe('EncuestaUtilidadComponent', () => {
  let component: EncuestaUtilidadComponent;
  let fixture: ComponentFixture<EncuestaUtilidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaUtilidadComponent]
    });
    fixture = TestBed.createComponent(EncuestaUtilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
