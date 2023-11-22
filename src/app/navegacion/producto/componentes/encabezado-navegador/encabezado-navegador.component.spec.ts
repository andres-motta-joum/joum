import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoNavegadorComponent } from './encabezado-navegador.component';

describe('EncabezadoNavegadorComponent', () => {
  let component: EncabezadoNavegadorComponent;
  let fixture: ComponentFixture<EncabezadoNavegadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncabezadoNavegadorComponent]
    });
    fixture = TestBed.createComponent(EncabezadoNavegadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
