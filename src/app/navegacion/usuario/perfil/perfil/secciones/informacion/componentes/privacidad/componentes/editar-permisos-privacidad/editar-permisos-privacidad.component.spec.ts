import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPermisosPrivacidadComponent } from './editar-permisos-privacidad.component';

describe('EditarPermisosPrivacidadComponent', () => {
  let component: EditarPermisosPrivacidadComponent;
  let fixture: ComponentFixture<EditarPermisosPrivacidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPermisosPrivacidadComponent]
    });
    fixture = TestBed.createComponent(EditarPermisosPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
