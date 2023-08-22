import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoCodigoSMSComponent } from './correo-codigo-sms.component';

describe('CorreoCodigoSMSComponent', () => {
  let component: CorreoCodigoSMSComponent;
  let fixture: ComponentFixture<CorreoCodigoSMSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorreoCodigoSMSComponent]
    });
    fixture = TestBed.createComponent(CorreoCodigoSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
