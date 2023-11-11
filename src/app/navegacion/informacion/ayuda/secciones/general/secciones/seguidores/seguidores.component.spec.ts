import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguidoresComponent } from './seguidores.component';

describe('SeguidoresComponent', () => {
  let component: SeguidoresComponent;
  let fixture: ComponentFixture<SeguidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguidoresComponent]
    });
    fixture = TestBed.createComponent(SeguidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
