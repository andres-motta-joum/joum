import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarDatosComponent } from './cambiar-datos.component';

describe('CambiarDatosComponent', () => {
  let component: CambiarDatosComponent;
  let fixture: ComponentFixture<CambiarDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarDatosComponent]
    });
    fixture = TestBed.createComponent(CambiarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
