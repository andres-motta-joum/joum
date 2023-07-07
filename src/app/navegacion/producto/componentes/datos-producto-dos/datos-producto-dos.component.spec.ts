import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosProductoDosComponent } from './datos-producto-dos.component';

describe('DatosProductoDosComponent', () => {
  let component: DatosProductoDosComponent;
  let fixture: ComponentFixture<DatosProductoDosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosProductoDosComponent]
    });
    fixture = TestBed.createComponent(DatosProductoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
