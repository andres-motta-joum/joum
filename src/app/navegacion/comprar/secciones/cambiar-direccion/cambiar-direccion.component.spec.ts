import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarDireccionComponent } from './cambiar-direccion.component';

describe('CambiarDireccionComponent', () => {
  let component: CambiarDireccionComponent;
  let fixture: ComponentFixture<CambiarDireccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarDireccionComponent]
    });
    fixture = TestBed.createComponent(CambiarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
