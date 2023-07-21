import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuDineroComponent } from './tu-dinero.component';

describe('TuDineroComponent', () => {
  let component: TuDineroComponent;
  let fixture: ComponentFixture<TuDineroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuDineroComponent]
    });
    fixture = TestBed.createComponent(TuDineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
