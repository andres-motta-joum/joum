import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContrasenaComponent } from './editar-contrasena.component';

describe('EditarContrasenaComponent', () => {
  let component: EditarContrasenaComponent;
  let fixture: ComponentFixture<EditarContrasenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarContrasenaComponent]
    });
    fixture = TestBed.createComponent(EditarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
