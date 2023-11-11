import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosImpuestosComponent } from './cargos-impuestos.component';

describe('CargosImpuestosComponent', () => {
  let component: CargosImpuestosComponent;
  let fixture: ComponentFixture<CargosImpuestosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargosImpuestosComponent]
    });
    fixture = TestBed.createComponent(CargosImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
