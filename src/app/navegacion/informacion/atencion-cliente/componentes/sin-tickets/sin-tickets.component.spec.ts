import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinTicketsComponent } from './sin-tickets.component';

describe('SinTicketsComponent', () => {
  let component: SinTicketsComponent;
  let fixture: ComponentFixture<SinTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinTicketsComponent]
    });
    fixture = TestBed.createComponent(SinTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
