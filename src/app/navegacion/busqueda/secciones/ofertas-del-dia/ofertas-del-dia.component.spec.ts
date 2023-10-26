import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasDelDiaComponent } from './ofertas-del-dia.component';

describe('OfertasDelDiaComponent', () => {
  let component: OfertasDelDiaComponent;
  let fixture: ComponentFixture<OfertasDelDiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfertasDelDiaComponent]
    });
    fixture = TestBed.createComponent(OfertasDelDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
