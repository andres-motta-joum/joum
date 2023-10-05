import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDireccionComponent } from './editar-direccion.component';

describe('EditarDireccionComponent', () => {
  let component: EditarDireccionComponent;
  let fixture: ComponentFixture<EditarDireccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarDireccionComponent]
    });
    fixture = TestBed.createComponent(EditarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
