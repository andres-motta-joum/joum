import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsEmpleadoComponent } from './tickets.component';

describe('TicketsComponent', () => {
  let component: TicketsEmpleadoComponent;
  let fixture: ComponentFixture<TicketsEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketsEmpleadoComponent]
    });
    fixture = TestBed.createComponent(TicketsEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
