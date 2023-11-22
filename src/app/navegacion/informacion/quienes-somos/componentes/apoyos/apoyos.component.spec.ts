import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoyosComponent } from './apoyos.component';

describe('ApoyosComponent', () => {
  let component: ApoyosComponent;
  let fixture: ComponentFixture<ApoyosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApoyosComponent]
    });
    fixture = TestBed.createComponent(ApoyosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
