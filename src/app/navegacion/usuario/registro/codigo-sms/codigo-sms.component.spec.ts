import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoSMSComponent } from './codigo-sms.component';

describe('CodigoSMSComponent', () => {
  let component: CodigoSMSComponent;
  let fixture: ComponentFixture<CodigoSMSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodigoSMSComponent]
    });
    fixture = TestBed.createComponent(CodigoSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
