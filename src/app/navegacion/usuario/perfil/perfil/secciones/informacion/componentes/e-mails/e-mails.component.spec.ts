import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMailsComponent } from './e-mails.component';

describe('EMailsComponent', () => {
  let component: EMailsComponent;
  let fixture: ComponentFixture<EMailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EMailsComponent]
    });
    fixture = TestBed.createComponent(EMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
