import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPublicacionesComponent } from './tipo-publicaciones.component';

describe('TipoPublicacionesComponent', () => {
  let component: TipoPublicacionesComponent;
  let fixture: ComponentFixture<TipoPublicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoPublicacionesComponent]
    });
    fixture = TestBed.createComponent(TipoPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
