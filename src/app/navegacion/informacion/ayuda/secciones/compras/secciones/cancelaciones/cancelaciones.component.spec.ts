import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelacionesComponent } from './cancelaciones.component';

describe('CancelacionesComponent', () => {
  let component: CancelacionesComponent;
  let fixture: ComponentFixture<CancelacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelacionesComponent]
    });
    fixture = TestBed.createComponent(CancelacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
