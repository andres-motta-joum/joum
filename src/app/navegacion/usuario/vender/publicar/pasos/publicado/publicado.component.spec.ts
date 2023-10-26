import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicadoComponent } from './publicado.component';

describe('PublicadoComponent', () => {
  let component: PublicadoComponent;
  let fixture: ComponentFixture<PublicadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicadoComponent]
    });
    fixture = TestBed.createComponent(PublicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
