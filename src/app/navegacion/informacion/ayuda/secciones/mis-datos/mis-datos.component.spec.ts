import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaMisDatosComponent } from './mis-datos.component';

describe('MisDatosComponent', () => {
  let component: AyudaMisDatosComponent;
  let fixture: ComponentFixture<AyudaMisDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AyudaMisDatosComponent]
    });
    fixture = TestBed.createComponent(AyudaMisDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
