import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasCompradorComponent } from './preguntas-comprador.component';

describe('PreguntasCompradorComponent', () => {
  let component: PreguntasCompradorComponent;
  let fixture: ComponentFixture<PreguntasCompradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntasCompradorComponent]
    });
    fixture = TestBed.createComponent(PreguntasCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
