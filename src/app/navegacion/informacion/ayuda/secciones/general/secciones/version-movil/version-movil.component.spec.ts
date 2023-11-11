import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionMovilComponent } from './version-movil.component';

describe('VersionMovilComponent', () => {
  let component: VersionMovilComponent;
  let fixture: ComponentFixture<VersionMovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VersionMovilComponent]
    });
    fixture = TestBed.createComponent(VersionMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
