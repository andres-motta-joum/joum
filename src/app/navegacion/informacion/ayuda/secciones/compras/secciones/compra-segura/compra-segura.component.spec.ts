import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraSeguraComponent } from './compra-segura.component';

describe('CompraSeguraComponent', () => {
  let component: CompraSeguraComponent;
  let fixture: ComponentFixture<CompraSeguraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompraSeguraComponent]
    });
    fixture = TestBed.createComponent(CompraSeguraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
