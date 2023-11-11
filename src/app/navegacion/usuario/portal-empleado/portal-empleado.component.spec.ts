import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalEmpleadoComponent } from './portal-empleado.component';

describe('PortalEmpleadoComponent', () => {
  let component: PortalEmpleadoComponent;
  let fixture: ComponentFixture<PortalEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortalEmpleadoComponent]
    });
    fixture = TestBed.createComponent(PortalEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
