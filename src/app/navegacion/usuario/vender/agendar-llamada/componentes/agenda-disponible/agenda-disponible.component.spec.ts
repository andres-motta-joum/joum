import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDisponibleComponent } from './agenda-disponible.component';

describe('AgendaDisponibleComponent', () => {
  let component: AgendaDisponibleComponent;
  let fixture: ComponentFixture<AgendaDisponibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaDisponibleComponent]
    });
    fixture = TestBed.createComponent(AgendaDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
