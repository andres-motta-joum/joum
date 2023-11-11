import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderSeguroComponent } from './vender-seguro.component';

describe('VenderSeguroComponent', () => {
  let component: VenderSeguroComponent;
  let fixture: ComponentFixture<VenderSeguroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenderSeguroComponent]
    });
    fixture = TestBed.createComponent(VenderSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
