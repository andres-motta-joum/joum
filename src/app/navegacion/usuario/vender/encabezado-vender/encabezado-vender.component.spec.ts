import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoVenderComponent } from './encabezado-vender.component';

describe('EncabezadoVenderComponent', () => {
  let component: EncabezadoVenderComponent;
  let fixture: ComponentFixture<EncabezadoVenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncabezadoVenderComponent]
    });
    fixture = TestBed.createComponent(EncabezadoVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
