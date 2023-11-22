import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasInhabilitadasComponent } from './compras-inhabilitadas.component';

describe('ComprasInhabilitadasComponent', () => {
  let component: ComprasInhabilitadasComponent;
  let fixture: ComponentFixture<ComprasInhabilitadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprasInhabilitadasComponent]
    });
    fixture = TestBed.createComponent(ComprasInhabilitadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
