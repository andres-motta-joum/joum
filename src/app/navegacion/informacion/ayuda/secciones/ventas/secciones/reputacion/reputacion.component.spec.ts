import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputacionComponent } from './reputacion.component';

describe('ReputacionComponent', () => {
  let component: ReputacionComponent;
  let fixture: ComponentFixture<ReputacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReputacionComponent]
    });
    fixture = TestBed.createComponent(ReputacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
