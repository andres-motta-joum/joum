import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteSuperiorComponent } from './parte-superior.component';

describe('ParteSuperiorComponent', () => {
  let component: ParteSuperiorComponent;
  let fixture: ComponentFixture<ParteSuperiorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParteSuperiorComponent]
    });
    fixture = TestBed.createComponent(ParteSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
