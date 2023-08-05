import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionClienteComponent } from './atencion-cliente.component';

describe('AtencionClienteComponent', () => {
  let component: AtencionClienteComponent;
  let fixture: ComponentFixture<AtencionClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtencionClienteComponent]
    });
    fixture = TestBed.createComponent(AtencionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
