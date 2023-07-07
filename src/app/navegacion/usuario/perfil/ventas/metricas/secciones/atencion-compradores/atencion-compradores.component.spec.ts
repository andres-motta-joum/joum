import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionCompradoresComponent } from './atencion-compradores.component';

describe('AtencionCompradoresComponent', () => {
  let component: AtencionCompradoresComponent;
  let fixture: ComponentFixture<AtencionCompradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtencionCompradoresComponent]
    });
    fixture = TestBed.createComponent(AtencionCompradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
