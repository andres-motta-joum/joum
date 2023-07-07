import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoSeisComponent } from './paso-seis.component';

describe('PasoSeisComponent', () => {
  let component: PasoSeisComponent;
  let fixture: ComponentFixture<PasoSeisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasoSeisComponent]
    });
    fixture = TestBed.createComponent(PasoSeisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
