import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionIzquierdaComponent } from './seccion-izquierda.component';

describe('SeccionIzquierdaComponent', () => {
  let component: SeccionIzquierdaComponent;
  let fixture: ComponentFixture<SeccionIzquierdaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeccionIzquierdaComponent]
    });
    fixture = TestBed.createComponent(SeccionIzquierdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
